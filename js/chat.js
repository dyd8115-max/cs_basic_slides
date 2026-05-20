export function addChatMsg(screenIdx, text, role) {
  const area = document.getElementById('chat' + screenIdx);
  const div  = document.createElement('div');
  div.className = 'chat-msg ' + role;
  div.textContent = text;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}
