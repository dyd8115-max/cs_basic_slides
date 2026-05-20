import { addChatMsg }  from './chat.js';
import { callClaude } from './claude.js';

const FASHION_SYSTEM =
`당신은 AI 가상 피팅 쇼핑몰의 패션 스타일리스트 챗봇입니다.

지원 명령어 (시스템이 자동 처리):
• 색상 변경: "[색상]으로 바꿔줘" — 검은색/흰색/빨간색/파란색/초록색/노란색/보라색/핑크색/회색
• 색상 복원: "원래대로"

응답 규칙:
- 색상 변경 요청 → 변경 완료를 자연스럽게 확인 + 해당 색상 스타일 팁 1줄
- 스타일/코디 질문 → 구체적인 추천과 이유 제시
- 피팅 결과 의견, 사이즈 조언, 계절·장소별 코디 제안 가능
- 한국어 1-2문장, 친근하고 전문적인 어투`;

const PERSONS = [
  { src:'img/asian-man-isolated-expressing-emotions.jpg',                              name:'남성 A', size:'L', skin:'웜톤' },
  { src:'img/smiling-asian-young-woman-face-portrait.jpg',                             name:'여성 A', size:'S', skin:'쿨톤' },
  { src:'img/person-people-portrait-facial-expression-hairstyle-smile-134689-pxhere.com.jpg', name:'남성 B', size:'M', skin:'뉴트럴' },
];

const OUTFITS = [
  { src:'img/스크린샷 2026-05-20 190316.png', name:'블랙 패딩',       fit:'오버핏',  score:'★★★★☆' },
  { src:'img/스크린샷 2026-05-20 190343.png', name:'블랙 가디건',     fit:'세미핏',  score:'★★★★★' },
  { src:'img/스크린샷 2026-05-20 190350.png', name:'화이트 오버셔츠', fit:'루즈핏',  score:'★★★☆☆' },
];

const COLOR_FILTERS = {
  '검은색':   'brightness(0.08) saturate(0)',
  '흰색':     'brightness(6) saturate(0)',
  '빨간색':   'sepia(1) saturate(8) hue-rotate(330deg)',
  '파란색':   'sepia(1) saturate(6) hue-rotate(185deg)',
  '초록색':   'sepia(1) saturate(6) hue-rotate(80deg)',
  '노란색':   'sepia(1) saturate(4) hue-rotate(15deg) brightness(1.4)',
  '보라색':   'sepia(1) saturate(6) hue-rotate(245deg)',
  '핑크색':   'sepia(1) saturate(6) hue-rotate(295deg) brightness(1.1)',
  '회색':     'saturate(0) brightness(0.7)',
  '원래대로': 'none',
};

let selPerson = -1, selOutfit = -1;

export function pickPersonPhoto(el, idx) {
  document.querySelectorAll('#personGrid .photo-card').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  selPerson = idx;
}

export function pickOutfit(el, idx) {
  document.querySelectorAll('#outfitGrid .photo-card').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  selOutfit = idx;
}

export function doFit() {
  if (selPerson < 0 || selOutfit < 0) {
    alert('인물과 의류를 모두 선택해 주세요!');
    return;
  }
  const r = document.getElementById('fitResult');
  r.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
      <div class="spinner"></div>
      <div id="fitStep" style="font-size:12px;color:var(--muted)">얼굴 인식 중...</div>
      <div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
    </div>`;

  const steps = ['체형 측정 중...','피부톤 분석 중...','의류 합성 중...','세부 보정 중...'];
  let i = 0;
  const iv = setInterval(() => {
    i++;
    if (i < steps.length) {
      const el = document.getElementById('fitStep');
      if (el) el.textContent = steps[i];
    } else {
      clearInterval(iv);
      showFit(r);
    }
  }, 700);
}

function showFit(r) {
  const p = PERSONS[selPerson];
  const o = OUTFITS[selOutfit];
  r.innerHTML = `
    <div class="fade-up" style="display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;overflow:auto;padding:4px 4px 8px">
      <div class="fit-composite-wrap">
        <div class="fit-layer-person"><img src="${p.src}" alt="${p.name}"></div>
        <div class="fit-layer-outfit"><img src="${o.src}" alt="${o.name}"></div>
        <div class="fit-seam"></div>
        <div class="fit-ai-badge">AI 합성</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:15px;font-weight:700">${o.name} 피팅 완료!</div>
        <div style="font-size:11px;color:var(--muted);margin-top:3px">${p.name} · ${p.skin} · ${o.fit}</div>
        <div class="chips" style="margin-top:9px">
          <span class="chip">추천 사이즈 ${p.size}</span>
          <span class="chip">${o.score}</span>
        </div>
      </div>
      <div class="ai-insight">
        <div style="font-size:11px;color:var(--muted);margin-bottom:6px">🤖 AI 스타일 분석</div>
        ✓ 얼굴형에 잘 어울리는 넥라인<br>
        ✓ 피부톤(${p.skin})과 조화로운 컬러<br>
        ⚠ 이너 레이어드로 완성도 향상 추천
      </div>
    </div>`;
}

export async function handleFashionChat(msg, idx) {
  for (const [color, filter] of Object.entries(COLOR_FILTERS)) {
    if (msg.includes(color)) {
      const outfitImg = document.querySelector('.fit-layer-outfit img');
      if (!outfitImg) {
        const reply = await callClaude(idx, msg, FASHION_SYSTEM, '피팅 결과 없음 — 사용자가 아직 AI 피팅을 실행하지 않은 상태');
        addChatMsg(idx, reply || '먼저 인물과 의류를 선택 후 AI 피팅을 실행해주세요!', 'ai');
        return;
      }
      outfitImg.style.filter = filter;
      const action = color === '원래대로'
        ? '의류 색상 원래대로 복원 완료'
        : `의류 색상 → ${color} 변경 완료`;
      const reply = await callClaude(idx, msg, FASHION_SYSTEM, action);
      addChatMsg(idx, reply || `✓ ${color}으로 변경했어요!`, 'ai');
      return;
    }
  }

  const reply = await callClaude(idx, msg, FASHION_SYSTEM);
  addChatMsg(idx, reply || '색상 변경이나 스타일에 대해 자유롭게 질문해보세요!', 'ai');
}
