import { addChatMsg } from './chat.js';
import { callClaude }  from './claude.js';

const SYMPTOMS = [
  '기침', '콧물', '발열', '두통', '인후통', '피부 발진',
  '소화장애', '구토', '설사', '근육통', '어지러움', '피로감',
  '호흡 곤란', '가슴 통증', '관절통', '식욕 부진',
];

const HEALTH_SYSTEM =
`당신은 AI 건강 증상 분석 어시스턴트입니다. 의사가 아니므로 확정 진단은 하지 않으나, 증상 조합을 바탕으로 가능한 원인과 일반적인 관리법을 안내합니다.

다음 형식으로 응답하세요:

🔍 가능한 원인 (가능성 높은 순):
1. [상태명] — [이 증상 조합과의 연관성]
   💊 관리법: [자가 관리 및 일반적인 치료 방법]

2. [상태명] — [설명]
   💊 관리법: [관리 방법]

3. [상태명] — [설명]
   💊 관리법: [관리 방법]

⚠️ 즉시 병원 방문 권장: [이런 경우 즉시 진료를 받아야 할 경고 징후]

⚕️ 이 분석은 참고용이며 정확한 진단은 반드시 의료 전문가에게 받으세요.`;

export function initHealthSymptoms() {
  const grid = document.getElementById('symptomGrid');
  if (!grid) return;
  grid.innerHTML = SYMPTOMS.map(s =>
    `<button class="symptom-chip" onclick="this.classList.toggle('on')" data-symptom="${s}">${s}</button>`
  ).join('');
}

export async function analyzeSymptoms() {
  const selected = [...document.querySelectorAll('.symptom-chip.on')]
    .map(c => c.dataset.symptom);
  const extra = document.getElementById('symptomExtra')?.value.trim();

  if (!selected.length && !extra) {
    alert('증상을 하나 이상 선택하거나 직접 입력해주세요.');
    return;
  }

  const parts = [];
  if (selected.length) parts.push(`선택 증상: ${selected.join(', ')}`);
  if (extra)           parts.push(`추가 설명: ${extra}`);
  const symptomText = parts.join('\n');

  const resultEl = document.getElementById('healthResult');
  resultEl.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:30px">
      <div class="spinner"></div>
      <div style="font-size:12px;color:var(--muted)">AI가 증상을 분석하는 중...</div>
    </div>`;

  addChatMsg(0, symptomText, 'user');
  const reply = await callClaude(0, symptomText, HEALTH_SYSTEM);

  if (reply) {
    const html = reply
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    resultEl.innerHTML = `<div class="health-result-content fade-up"><p>${html}</p></div>`;
    addChatMsg(0, reply, 'ai');
  } else {
    resultEl.innerHTML = `<div style="color:var(--red);padding:20px;font-size:13px;text-align:center">분석 실패. 다시 시도해주세요.</div>`;
  }
}

export async function handleHealthChat(msg, idx) {
  const reply = await callClaude(idx, msg, HEALTH_SYSTEM);
  addChatMsg(idx, reply || '증상을 더 자세히 설명하거나, 위 증상 선택기를 이용해보세요.', 'ai');
}
