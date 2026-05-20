import { addChatMsg }                                             from './chat.js';
import { handleHealthChat, analyzeSymptoms, initHealthSymptoms } from './health.js';
import { handleExpenseChat, pickPerson }                         from './expense.js';
import { handleNavChat, calcRoute, onMapScreenActivated }        from './navigation.js';
import { openAddrModal, closeAddrModal, addrModalSearch,
         addrLoadMore, getCachedCoords }                         from './autocomplete.js';

/* ─── 탭 → 화면 매핑 ───
   [표지, 소개(프로젝트), 건강, 생활비, 네비, AI분석, 마무리]
   각 탭이 시작하는 DOM 화면 인덱스 */
const TAB_SCREENS = [0, 3, 5, 7, 9, 11, 13];

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
  if (currentScreen === 10) onMapScreenActivated();
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

initHealthSymptoms();
updateUI();
