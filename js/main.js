import { addChatMsg }                                             from './chat.js';
import { handleHealthChat, analyzeSymptoms, initHealthSymptoms } from './health.js';
import { handleExpenseChat, pickPerson }                         from './expense.js';
import { handleNavChat, calcRoute, onMapScreenActivated }        from './navigation.js';
import { openAddrModal, closeAddrModal, addrModalSearch,
         addrLoadMore, getCachedCoords }                         from './autocomplete.js';

import { html as coverHtml }    from './slides/cover.js';
import { html as teamHtml }     from './slides/team.js';
import { html as tocHtml }      from './slides/toc.js';
import { html as aiBasicsHtml } from './slides/ai-basics.js';
import { html as securityHtml } from './slides/security.js';
import { html as medicalHtml }  from './slides/medical.js';
import { html as translationHtml } from './slides/translation.js';
import { html as sunoHtml }     from './slides/suno.js';
import { html as introHtml }    from './slides/intro.js';
import { html as healthHtml }   from './slides/health.js';
import { html as expenseHtml }  from './slides/expense.js';
import { html as navHtml }      from './slides/nav.js';
import { html as analysisHtml } from './slides/analysis.js';
import { html as closingHtml }  from './slides/closing.js';

/* ─── 슬라이드 순서: 표지→팀→차례→AI기초→보안→의료→번역→음악→소개→건강→생활비→네비→분석→마무리 ─── */
document.querySelector('main').innerHTML =
  coverHtml + teamHtml + tocHtml + aiBasicsHtml +
  securityHtml + medicalHtml + translationHtml + sunoHtml + introHtml +
  healthHtml + expenseHtml + navHtml +
  analysisHtml + closingHtml;

/* ─── 탭 → 화면 매핑 ───
  [표지, AI기초, 보안, 의료, 번역, 음악, 소개, 건강, 생활비, 네비, AI분석, 마무리]
  각 탭이 시작하는 DOM 화면 인덱스 */
const TAB_SCREENS = [0, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

/* ─── 화면 전환 ─── */
const screens = document.querySelectorAll('.screen');
const tabs    = document.querySelectorAll('.tab');
let currentScreen = 0;

function updateUI() {
  screens.forEach((s, i) => s.classList.toggle('on', i === currentScreen));

  // 현재 화면이 속한 탭 찾기 (TAB_SCREENS 범위 기준)
  let tabIdx = 0;
  for (let i = 0; i < TAB_SCREENS.length; i++) {
    if (currentScreen >= TAB_SCREENS[i]) tabIdx = i;
  }
  tabs.forEach((t, i) => t.classList.toggle('on', i === tabIdx));

  _renderDots();
  if (currentScreen === 19) onMapScreenActivated();
}

function _renderDots() {
  const row = document.getElementById('dotRow');
  if (!row) return;
  row.innerHTML = '';
  screens.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'slide-dot' + (i === currentScreen ? ' on' : '');
    d.onclick = () => { currentScreen = i; updateUI(); };
    row.appendChild(d);
  });
}

function go(index) {
  currentScreen = TAB_SCREENS[index] ?? 0;
  updateUI();
}

function slideBy(n) {
  currentScreen = Math.max(0, Math.min(screens.length - 1, currentScreen + n));
  updateUI();
}

/* ─── 채팅 ─── */
async function sendChat(index) {
  const inputEl = document.getElementById(`chatInput${index}`);
  if (!inputEl) return;
  const msg = inputEl.value.trim();
  if (!msg) return;
  inputEl.value = '';
  addChatMsg(index, msg, 'user');

  if      (index === 0) await handleHealthChat(msg, index);
  else if (index === 1) await handleExpenseChat(msg, index);
  else if (index === 2) await handleNavChat(msg, index);
}

/* ─── 전체화면 ─── */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener('fullscreenchange', () => {
  const btn = document.getElementById('fsBtn');
  if (btn) btn.textContent = document.fullscreenElement ? '✕' : '⛶';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'f' || e.key === 'F') toggleFullscreen();
});

/* ─── 모달 ESC 닫기 ─── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAddrModal();
});

/* ─── 전역 등록 ─── */
window.go              = go;
window.slideBy         = slideBy;
window.sendChat        = sendChat;
window.calcRoute       = calcRoute;
window.analyzeSymptoms = analyzeSymptoms;
window.pickPerson      = pickPerson;
window.openAddrModal   = openAddrModal;
window.closeAddrModal  = closeAddrModal;
window.addrModalSearch = addrModalSearch;
window.addrLoadMore    = addrLoadMore;
window.toggleFullscreen = toggleFullscreen;

initHealthSymptoms();
updateUI();
