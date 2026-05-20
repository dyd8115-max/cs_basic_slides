const histories = { 0: [], 1: [], 2: [] };

const OLLAMA_MODEL = 'gemma3:1b';
const OLLAMA_URL = 'http://localhost:11434/api/chat';

function addLoadingMsg(screenIdx) {
  const area = document.getElementById('chat' + screenIdx);
  const div  = document.createElement('div');
  div.className = 'chat-msg ai';
  div.id = 'claudeLoading' + screenIdx;
  div.innerHTML = '<span class="dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>';
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

function removeLoadingMsg(screenIdx) {
  const el = document.getElementById('claudeLoading' + screenIdx);
  if (el) el.remove();
}

async function ollamaPost(messages) {
  return fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages,
      stream: false,
    }),
  });
}

function toOllamaMessages(system, history) {
  const msgs = [];
  if (system) msgs.push({ role: 'system', content: system });
  for (const h of history) {
    msgs.push({
      role: h.role === 'model' ? 'assistant' : 'user',
      content: h.parts[0].text,
    });
  }
  return msgs;
}

export async function callClaude(screenIdx, userMsg, system, actionDone = null) {
  histories[screenIdx].push({ role: 'user', parts: [{ text: userMsg }] });
  const contents = histories[screenIdx].slice(-10);

  const finalSystem = actionDone
    ? `${system}\n\n[시스템이 방금 처리한 작업: ${actionDone}]\n이 작업 완료를 자연스럽게 확인하고 관련 팁을 한 마디 덧붙이세요.`
    : system;

  addLoadingMsg(screenIdx);

  try {
    const messages = toOllamaMessages(finalSystem, contents);
    const res = await ollamaPost(messages);

    if (!res.ok) {
      removeLoadingMsg(screenIdx);
      const err = await res.json().catch(() => ({}));
      return `오류 ${res.status}: ${err?.error || '알 수 없는 오류'}`;
    }

    removeLoadingMsg(screenIdx);
    const data = await res.json();
    const reply = data.message?.content;
    if (!reply) return null;

    histories[screenIdx].push({ role: 'model', parts: [{ text: reply }] });
    return reply;

  } catch (err) {
    removeLoadingMsg(screenIdx);
    console.error('[Ollama] 오류:', err);
    return 'Ollama 서버가 실행 중인지 확인해 주세요. (ollama run gemma3)';
  }
}