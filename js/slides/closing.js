export const html = `
  <!-- ═══ SCREEN 17 – Closing ═══ -->
  <div class="screen intro-type" id="sClosing">
    <div class="closing-screen-v2">
      <div class="closing-bg-grid"></div>

      <div class="closing-split">
        <div class="closing-left">
          <div class="closing-eyebrow">발표를 마치며</div>
          <h1 class="closing-title-v2">감사합니다</h1>
          <p class="closing-quote">"AI의 진짜 가능성은<br>사용자가 어떤 질문을<br>하느냐에 달려 있다."</p>
          <div class="closing-stats">
            <div class="cl-stat">
              <div class="cl-stat-num">3</div>
              <div class="cl-stat-label">AI 서비스</div>
            </div>
            <div class="cl-stat">
              <div class="cl-stat-num">7명</div>
              <div class="cl-stat-label">팀원</div>
            </div>
            <div class="cl-stat">
              <div class="cl-stat-num" style="color:var(--green)">₩0</div>
              <div class="cl-stat-label">Ollama 비용</div>
            </div>
          </div>
          <button class="closing-home" onclick="go(0)">처음으로 ↩</button>
        </div>
        <div class="closing-right">
          <div class="closing-lessons">
            <div class="cl-lessons-title">이 프로젝트에서 배운 것</div>
            <div class="cl-lesson-item">
              <span class="cl-lesson-num">01</span>
              <div>
                <strong>프롬프트 설계가 기능의 절반이다</strong>
                <p>AI의 동작은 코드가 아닌 자연어로 서비스정의된다. 출력 형식, 계산 공식, 금지 사항을 명시적으로 지시해야 원하는 결과를 얻는다.</p>
              </div>
            </div>
            <div class="cl-lesson-item">
              <span class="cl-lesson-num">02</span>
              <div>
                <strong>API 키 보안은 처음부터 설계해야 한다</strong>
                <p>브라우저에서 직접 API를 호출하면 키가 노출된다. Express 프록시 서버로 키를 서버 사이드에만 유지해야 한다.</p>
              </div>
            </div>
            <div class="cl-lesson-item">
              <span class="cl-lesson-num">03</span>
              <div>
                <strong>AI는 도구, 판단은 사람이 한다</strong>
                <p>할루시네이션·비용·개인정보 문제를 직접 경험했다. Ollama 전환은 단순 비용 절감이 아닌 전략적 아키텍처 선택이다.</p>
              </div>
            </div>
          </div>
          <div class="closing-qa-block">
            <div class="cl-qa-text">Q &amp; A</div>
            <div class="cl-qa-sub">질문을 기다립니다</div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
