import { addChatMsg }            from './chat.js';
import { callClaude }            from './claude.js';
import { getCachedCoords }       from './autocomplete.js';

const NAV_SYSTEM =
`당신은 AI 스마트 네비게이션 어시스턴트입니다.

조건이 언급되면 아래 공식으로 추가시간을 계산하세요:

【계산 공식 — 반드시 이 수치를 사용】
• 걷기: 거리(km) ÷ 4 × 60 = 분 (예: 5km 걷기 = 75분)
• 달리기: 거리(km) ÷ 10 × 60 = 분 (예: 5km 달리기 = 30분)
• 층수 이동: 층수 × 0.5분 (예: 10층 = 5분, 20층 = 10분)
  출발+도착 층수가 모두 있으면 각각 계산 후 합산
• 눈·결빙: 기존 주행시간 × 0.35 (35% 추가)
• 비·우천: 기존 주행시간 × 0.15 (15% 추가)
• 흐림: 기존 주행시간 × 0.05 (5% 추가)
• 교통체증: 기존 주행시간 × 0.5 (50% 추가)
여러 조건이 겹치면 분 단위로 합산하세요.

【출력 규칙 — 절대 어기지 말 것】
1. 계산 결과를 한국어 1-2문장으로 설명 (공식 수식은 노출하지 말 것)
2. 응답 마지막 줄에 반드시 [추가시간: X분] 형식만 사용 (X는 정수)
   ❌ 절대 금지: **추가시간: X분**, (추가시간: X분), 추가시간 X분 등 다른 형식
   ✅ 유일한 정답 형식: [추가시간: 75분]
3. 조건이 없는 일반 질문은 조언 후 [추가시간: 0분]`;

let navMap = null, routePolyline = null, mkStart = null, mkEnd = null;
let navBaseDriveMin = 0;

/* ── Maps SDK 로드 ── */
function loadNaverSDK(key) {
  if (window.naver && naver.maps) { initNaverMap(); return; }
  const s = document.createElement('script');
  s.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${key}&submodules=geocoder`;
  s.onload  = () => initNaverMap();
  s.onerror = () => alert('Naver Maps 로드 실패. API 키 및 서비스 URL을 확인하세요.');
  document.head.appendChild(s);
}

function initNaverMap() {
  if (navMap) return;
  const container = document.getElementById('kakaoMap');
  navMap = new naver.maps.Map(container, {
    center: new naver.maps.LatLng(37.5665, 126.9780),
    zoom: 13
  });
  document.getElementById('mapPlaceholder').style.display = 'none';
  container.style.filter = 'brightness(0.88) saturate(1.1)';
}

/* ── 주소 → 좌표 (캐시 → 백엔드 → REST → SDK 순서) ── */
async function resolveCoords(inputId, address) {
  const cached = getCachedCoords(inputId);
  if (cached) return new naver.maps.LatLng(cached.lat, cached.lng);

  /* 1순위: 백엔드 프록시 */
  if (window.BACKEND_URL) {
    try {
      const url = `${window.BACKEND_URL}/api/geocode?query=${encodeURIComponent(address)}&count=1`;
      const res  = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'OK' && data.addresses?.length) {
          const a = data.addresses[0];
          return new naver.maps.LatLng(parseFloat(a.y), parseFloat(a.x));
        }
      }
    } catch { /* fall through */ }
  }

  /* 2순위: NCP REST API 직접 */
  if (window.NCP_API_KEY_ID && window.NCP_API_SECRET) {
    try {
      const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}&count=1`;
      const res = await fetch(url, {
        headers: {
          'x-ncp-apigw-api-key-id': window.NCP_API_KEY_ID,
          'x-ncp-apigw-api-key':    window.NCP_API_SECRET,
          'Accept': 'application/json',
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'OK' && data.addresses?.length) {
          const a = data.addresses[0];
          return new naver.maps.LatLng(parseFloat(a.y), parseFloat(a.x));
        }
      }
    } catch { /* fall through */ }
  }

  /* 3순위: SDK geocode */
  if (window.naver && naver.maps && naver.maps.Service) {
    return new Promise(resolve => {
      naver.maps.Service.geocode({ query: address }, (status, response) => {
        if (status === naver.maps.Service.Status.OK && response.v2.addresses.length) {
          const r = response.v2.addresses[0];
          resolve(new naver.maps.LatLng(parseFloat(r.y), parseFloat(r.x)));
        } else {
          resolve(null);
        }
      });
    });
  }

  return null;
}

/* ── Naver Directions 15 ── */
async function getNaverDirections(from, to) {
  const start = `${from.lng()},${from.lat()}`;
  const goal  = `${to.lng()},${to.lat()}`;

  /* 1순위: 백엔드 프록시 */
  if (window.BACKEND_URL) {
    try {
      const url = `${window.BACKEND_URL}/api/directions?start=${start}&goal=${goal}&option=traoptimal`;
      const res  = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.code === 0 && data.route?.traoptimal?.length) {
          return { source: 'naver', route: data.route.traoptimal[0] };
        }
      }
    } catch { /* fall through */ }
  }

  /* 2순위: NCP REST API 직접 */
  if (!window.NCP_API_KEY_ID || !window.NCP_API_SECRET) return null;
  try {
    const url = `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving` +
      `?start=${start}&goal=${goal}&option=traoptimal`;
    const res = await fetch(url, {
      headers: {
        'x-ncp-apigw-api-key-id': window.NCP_API_KEY_ID,
        'x-ncp-apigw-api-key':    window.NCP_API_SECRET,
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.code !== 0 || !data.route?.traoptimal?.length) return null;
    return { source: 'naver', route: data.route.traoptimal[0] };
  } catch {
    return null;
  }
}

/* ── OSRM fallback ── */
async function getOsrmRoute(from, to) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/` +
      `${from.lng()},${from.lat()};${to.lng()},${to.lat()}?overview=full&geometries=geojson`;
    const res  = await fetch(url);
    const data = await res.json();
    if (data.code === 'Ok') return { source: 'osrm', route: data.routes[0] };
  } catch { /* ignore */ }
  return null;
}

/* ── 마커 ── */
function makeMarker(latLng, color, title) {
  const content = `<div style="display:flex;flex-direction:column;align-items:center">
    <div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.5)"></div>
    <div style="font-size:10px;color:#fff;background:${color};padding:2px 6px;border-radius:4px;margin-top:3px;white-space:nowrap;font-weight:700">${title}</div>
  </div>`;
  return new naver.maps.Marker({
    position: latLng, map: navMap,
    icon: { content, anchor: new naver.maps.Point(7, 0) }
  });
}

export function onMapScreenActivated() {
  if (navMap) {
    naver.maps.Event.trigger(navMap, 'resize');
  } else if (window.NAVER_CLIENT_ID) {
    loadNaverSDK(window.NAVER_CLIENT_ID);
  }
}

/* ── 경로 계산 ── */
export async function calcRoute() {
  const fromAddr = document.getElementById('navFrom').value.trim();
  const toAddr   = document.getElementById('navTo').value.trim();
  if (!fromAddr || !toAddr) { alert('출발지와 도착지를 입력해 주세요!'); return; }

  if (!window.naver || !naver.maps) {
    if (window.NAVER_CLIENT_ID) {
      loadNaverSDK(window.NAVER_CLIENT_ID);
      addChatMsg(2, '지도를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.', 'ai');
    } else {
      alert('config.js 파일에 NAVER_CLIENT_ID가 설정되지 않았습니다.');
    }
    return;
  }

  const ph = document.getElementById('mapPlaceholder');
  ph.style.display = 'flex';
  ph.innerHTML = '<div class="spinner"></div><span style="font-size:12px;color:var(--muted)">AI 경로 분석 중...</span>';
  document.getElementById('navCard').style.display = 'none';

  try {
    const [fromLatLng, toLatLng] = await Promise.all([
      resolveCoords('navFrom', fromAddr),
      resolveCoords('navTo',   toAddr),
    ]);

    if (!fromLatLng || !toLatLng) {
      ph.innerHTML = '<span style="font-size:13px;color:#ff6b6b">주소를 찾을 수 없습니다.<br>더 구체적인 주소를 입력해 주세요.</span>';
      return;
    }

    /* Directions 15 → OSRM fallback */
    const result = (await getNaverDirections(fromLatLng, toLatLng))
                || (await getOsrmRoute(fromLatLng, toLatLng));

    ph.style.display = 'none';

    if (routePolyline) routePolyline.setMap(null);
    if (mkStart) mkStart.setMap(null);
    if (mkEnd)   mkEnd.setMap(null);

    let coords = [];
    let driveMin = 15, distKm = '-', tollFare = '-', fuelPrice = '-';

    if (result?.source === 'naver') {
      const r = result.route;
      coords   = r.path.map(([lng, lat]) => new naver.maps.LatLng(lat, lng));
      driveMin = Math.round(r.summary.duration / 60000);
      distKm   = (r.summary.distance / 1000).toFixed(1) + ' km';
      if (r.summary.tollFare)  tollFare  = r.summary.tollFare.toLocaleString() + '원';
      if (r.summary.fuelPrice) fuelPrice = r.summary.fuelPrice.toLocaleString() + '원';
    } else if (result?.source === 'osrm') {
      const r = result.route;
      coords   = r.geometry.coordinates.map(([lng, lat]) => new naver.maps.LatLng(lat, lng));
      driveMin = Math.round(r.duration / 60);
      distKm   = (r.distance / 1000).toFixed(1) + ' km';
    }

    if (coords.length > 1) {
      routePolyline = new naver.maps.Polyline({
        map: navMap, path: coords,
        strokeColor: '#7c6ff7', strokeWeight: 5, strokeOpacity: 0.9, strokeStyle: 'shortdash'
      });
      const bounds = coords.reduce(
        (b, p) => { b.extend(p); return b; },
        new naver.maps.LatLngBounds(coords[0], coords[0])
      );
      navMap.fitBounds(bounds, 60);
    } else {
      navMap.setCenter(new naver.maps.LatLng(
        (fromLatLng.lat() + toLatLng.lat()) / 2,
        (fromLatLng.lng() + toLatLng.lng()) / 2
      ));
      navMap.setZoom(12);
    }

    mkStart = makeMarker(fromLatLng, '#4ecdc4', '출발');
    mkEnd   = makeMarker(toLatLng,   '#ff6b6b', '도착');

    navBaseDriveMin = driveMin;

    document.getElementById('navTimeEl').textContent  = `${driveMin}분`;
    document.getElementById('navAlpha').textContent   = '+ α';
    document.getElementById('navDrive').textContent   = `주행 ${driveMin}분`;
    document.getElementById('navDist').textContent    = distKm;
    document.getElementById('navToll').textContent    = tollFare !== '-' ? `통행료 ${tollFare}` : '';
    document.getElementById('navFuel').textContent    = fuelPrice !== '-' ? `유류비 ${fuelPrice}` : '';
    document.getElementById('navElev').textContent    = '엘리베이터 -';
    document.getElementById('navWIcon').textContent   = '-';
    document.getElementById('navWText').textContent   = '날씨·층수 조건 미입력';

    const card = document.getElementById('navCard');
    card.style.display = 'block';
    card.classList.remove('fade-up');
    void card.offsetWidth;
    card.classList.add('fade-up');

  } catch(err) {
    ph.style.display = 'flex';
    ph.innerHTML = '<span style="font-size:13px;color:#ff6b6b">경로 조회 실패.<br>인터넷 연결을 확인하세요.</span>';
  }
}

/* ── 채팅 ── */
export async function handleNavChat(msg, idx) {
  const card = document.getElementById('navCard');
  if (card.style.display === 'none') {
    const reply = await callClaude(idx, msg, NAV_SYSTEM);
    const displayReply = reply ? reply.replace(/\[추가시간:\s*\d+\s*분\]/g, '').trim() : null;
    addChatMsg(idx, displayReply || '먼저 출발지·도착지를 입력하고 경로를 계산해 주세요.', 'ai');
    return;
  }

  const reply = await callClaude(idx, msg, NAV_SYSTEM);
  if (!reply) {
    addChatMsg(idx, '💡 "비가 오고 출발 3층 도착 15층" 형식으로 조건을 입력해보세요.', 'ai');
    return;
  }

  // AI가 계산한 추가시간 파싱 (다양한 형식 허용)
  const extraMatch = reply.match(/[\[【\*\(]?\s*추가시간\s*[:：]\s*(\d+)\s*분\s*[\]\】\*\)]/);
  const displayReply = reply
    .replace(/[\[【\*\(]?\s*추가시간\s*[:：]\s*\d+\s*분\s*[\]\】\*\)]/g, '')
    .trim();

  if (extraMatch) {
    const extraMin = parseInt(extraMatch[1]);
    const total = navBaseDriveMin + extraMin;
    document.getElementById('navTimeEl').textContent = `${total}분`;
    document.getElementById('navAlpha').textContent  = extraMin > 0 ? `+${extraMin}분` : '';

    // 날씨 아이콘 업데이트
    if (/눈|snow/i.test(msg)) {
      document.getElementById('navWIcon').textContent = '❄️';
      document.getElementById('navWText').textContent = `+${extraMin}분 (적설)`;
    } else if (/비|rain/i.test(msg)) {
      document.getElementById('navWIcon').textContent = '🌧️';
      document.getElementById('navWText').textContent = `+${extraMin}분 (우천)`;
    } else if (/흐/i.test(msg)) {
      document.getElementById('navWIcon').textContent = '🌤️';
      document.getElementById('navWText').textContent = `+${extraMin}분 (흐림)`;
    }

    // 층수 정보 업데이트
    const floorNums = [...msg.matchAll(/(\d+)\s*층/g)].map(m => parseInt(m[1]));
    if (floorNums.length >= 2) {
      const [f1, f2] = floorNums;
      document.getElementById('navElev').textContent = `엘리베이터 (출발 ${f1}층 + 도착 ${f2}층)`;
    } else if (floorNums.length === 1) {
      document.getElementById('navElev').textContent = `엘리베이터 (${floorNums[0]}층)`;
    }
  }

  addChatMsg(idx, displayReply || '💡 "비가 오고 출발 3층 도착 15층" 형식으로 조건을 입력해보세요.', 'ai');
}
