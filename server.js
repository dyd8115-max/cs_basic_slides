require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

const NCP_KEY_ID     = process.env.NCP_API_KEY_ID;
const NCP_KEY_SECRET = process.env.NCP_API_SECRET;
const GEMINI_KEY     = process.env.GEMINI_API_KEY;

/* ── CORS: localhost만 허용 ── */
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      cb(null, true);
    } else {
      cb(new Error('CORS: 허용되지 않은 출처입니다.'));
    }
  },
  methods: ['GET', 'POST'],
}));

app.use(express.json({ limit: '64kb' }));

/* ── 민감 파일 노출 차단 (express.static 보다 먼저) ── */
app.use((req, res, next) => {
  if (/^\/(\.env|\.git|node_modules|server\.js|package(?:-lock)?\.json)/i.test(req.path)) {
    return res.status(403).end();
  }
  next();
});

app.use(express.static(path.join(__dirname), { dotfiles: 'deny' }));

/* ── 허용된 Gemini 모델 화이트리스트 ── */
const ALLOWED_MODELS = new Set([
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b',
]);

/* ── 허용된 Directions 옵션 ── */
const ALLOWED_NAV_OPTIONS = new Set(['traoptimal', 'tracomfort', 'trafast', 'traavoidtoll']);

/* ── 공통 Naver API 호출 헬퍼 ── */
async function naverGet(url) {
  const res = await fetch(url, {
    headers: {
      'x-ncp-apigw-api-key-id': NCP_KEY_ID,
      'x-ncp-apigw-api-key':    NCP_KEY_SECRET,
      'Accept': 'application/json',
    },
  });
  if (!res.ok) throw Object.assign(new Error('Naver API error'), { status: res.status });
  return res.json();
}

/* ── 지오코딩 ── */
app.get('/api/geocode', async (req, res) => {
  try {
    const { query, coordinate, filter, language } = req.query;
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({ error: '유효한 query가 필요합니다.' });
    }
    if (!NCP_KEY_ID || !NCP_KEY_SECRET) {
      return res.status(503).json({ error: '서버 설정이 완료되지 않았습니다.' });
    }

    const count = Math.min(100, Math.max(1, parseInt(req.query.count) || 10));
    const page  = Math.max(1, parseInt(req.query.page) || 1);

    const params = new URLSearchParams({ query: query.trim(), count, page });
    if (coordinate && /^-?\d+\.?\d*,-?\d+\.?\d*$/.test(coordinate)) params.set('coordinate', coordinate);
    if (filter && /^[A-Z]+@[\d;]+$/.test(filter)) params.set('filter', filter);
    if (language === 'eng') params.set('language', 'eng');

    const data = await naverGet(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?${params}`);
    res.json(data);
  } catch (err) {
    console.error('[geocode]', err.message);
    res.status(err.status || 500).json({ error: '주소 검색 중 오류가 발생했습니다.' });
  }
});

/* ── 역지오코딩 ── */
app.get('/api/reverse-geocode', async (req, res) => {
  try {
    const { coords } = req.query;
    if (!coords || !/^-?\d{1,3}\.\d+,-?\d{1,3}\.\d+$/.test(coords)) {
      return res.status(400).json({ error: '유효한 좌표 형식이 아닙니다. (경도,위도)' });
    }
    if (!NCP_KEY_ID || !NCP_KEY_SECRET) {
      return res.status(503).json({ error: '서버 설정이 완료되지 않았습니다.' });
    }

    const output = req.query.output === 'xml' ? 'xml' : 'json';
    const orders = 'roadaddr,addr';
    const data   = await naverGet(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${coords}&output=${output}&orders=${orders}`
    );
    res.json(data);
  } catch (err) {
    console.error('[reverse-geocode]', err.message);
    res.status(err.status || 500).json({ error: '역지오코딩 중 오류가 발생했습니다.' });
  }
});

/* ── 경로 탐색 ── */
app.get('/api/directions', async (req, res) => {
  try {
    const { start, goal, waypoints } = req.query;
    const coordPattern = /^-?\d{1,3}\.\d+,-?\d{1,3}\.\d+$/;
    if (!start || !goal || !coordPattern.test(start) || !coordPattern.test(goal)) {
      return res.status(400).json({ error: '유효한 start, goal 좌표가 필요합니다.' });
    }
    if (!NCP_KEY_ID || !NCP_KEY_SECRET) {
      return res.status(503).json({ error: '서버 설정이 완료되지 않았습니다.' });
    }

    const option = ALLOWED_NAV_OPTIONS.has(req.query.option) ? req.query.option : 'traoptimal';
    const params = new URLSearchParams({ start, goal, option });
    if (waypoints && coordPattern.test(waypoints.split('|')[0])) params.set('waypoints', waypoints);

    const data = await naverGet(`https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?${params}`);
    res.json(data);
  } catch (err) {
    console.error('[directions]', err.message);
    res.status(err.status || 500).json({ error: '경로 탐색 중 오류가 발생했습니다.' });
  }
});

/* ── Gemini 채팅 프록시 (키가 브라우저에 노출되지 않음) ── */
app.post('/api/chat', async (req, res) => {
  try {
    if (!GEMINI_KEY) {
      return res.status(503).json({ error: '서버 설정이 완료되지 않았습니다.' });
    }
    const { model, body } = req.body;
    if (!model || !ALLOWED_MODELS.has(model)) {
      return res.status(400).json({ error: '허용되지 않은 모델입니다.' });
    }
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: '유효한 body가 필요합니다.' });
    }

    const url  = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`;
    const resp = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });
    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (err) {
    console.error('[chat]', err.message);
    res.status(500).json({ error: '채팅 처리 중 오류가 발생했습니다.' });
  }
});

/* ── 헬스 체크 ── */
app.get('/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n✅  서버 시작: ${url}\n`);
  if (!GEMINI_KEY) console.warn('⚠️  GEMINI_API_KEY 미설정 — 채팅 기능 비활성');
  if (!NCP_KEY_ID) console.warn('⚠️  NCP_API_KEY_ID 미설정 — 주소검색 직접 API 불가');

  // 브라우저 자동 오픈
  const { exec } = require('child_process');
  const cmd = process.platform === 'win32' ? `start ${url}`
            : process.platform === 'darwin' ? `open ${url}`
            : `xdg-open ${url}`;
  exec(cmd);
});
