export const html = `
  <!-- ═══ SCREEN 3 – AI Basics ═══ -->
  <div class="screen intro-type" id="sAIBasics">
    <div class="ai-basics-screen">

      <!-- 헤더 -->
      <div class="ai-basics-header">
        <div class="ai-basics-badge">AI 기초 개념</div>
        <h1 class="ai-basics-title">AI란 무엇인가</h1>
        <p class="ai-basics-sub">이 발표에서 등장하는 핵심 용어를 먼저 정리합니다</p>
        <div class="ai-basics-divider"></div>
      </div>

      <!-- 계층 구조: 전체 폭 -->
      <div class="ai-hier-wrap">
        <div class="ai-hier-item ai-h0">
          <div class="ai-h-icon">🤖</div>
          <div class="ai-h-name">AI</div>
          <div class="ai-h-full">인공지능</div>
          <div class="ai-h-sub">인간의 지능을 모방하는<br>모든 기술의 총칭</div>
        </div>
        <div class="ai-hier-arrow-col">
          <div class="ai-ha-line"></div>
          <div class="ai-ha-label">포함</div>
        </div>
        <div class="ai-hier-item ai-h1">
          <div class="ai-h-icon">📊</div>
          <div class="ai-h-name">ML</div>
          <div class="ai-h-full">머신러닝</div>
          <div class="ai-h-sub">데이터로부터<br>스스로 규칙을 학습</div>
        </div>
        <div class="ai-hier-arrow-col">
          <div class="ai-ha-line"></div>
          <div class="ai-ha-label">포함</div>
        </div>
        <div class="ai-hier-item ai-h2">
          <div class="ai-h-icon">🧠</div>
          <div class="ai-h-name">DL</div>
          <div class="ai-h-full">딥러닝</div>
          <div class="ai-h-sub">신경망으로<br>복잡한 패턴 추출</div>
        </div>
        <div class="ai-hier-arrow-col">
          <div class="ai-ha-line"></div>
          <div class="ai-ha-label">기반</div>
        </div>
        <div class="ai-hier-item ai-h3">
          <div class="ai-h-icon">💬</div>
          <div class="ai-h-name">LLM</div>
          <div class="ai-h-full">대형 언어 모델</div>
          <div class="ai-h-sub">이 프로젝트의 핵심<br>Gemma3 / Ollama</div>
        </div>
      </div>

      <!-- 개념 카드 3×2 -->
      <div class="ai-concepts-grid">
        <div class="ai-concept-card ac-0">
          <div class="ac-top"><span class="ac-icon">📌</span><span class="ac-label">지도학습</span></div>
          <div class="ac-desc">정답 데이터를 보여주며 학습 — 스팸 분류, 이미지 인식</div>
        </div>
        <div class="ai-concept-card ac-1">
          <div class="ac-top"><span class="ac-icon">🔍</span><span class="ac-label">비지도학습</span></div>
          <div class="ac-desc">정답 없이 데이터에서 군집·패턴 자동 발견</div>
        </div>
        <div class="ai-concept-card ac-2">
          <div class="ac-top"><span class="ac-icon">🎮</span><span class="ac-label">강화학습</span></div>
          <div class="ac-desc">보상·페널티로 행동 최적화 — 게임 AI, 로봇</div>
        </div>
        <div class="ai-concept-card ac-3">
          <div class="ac-top"><span class="ac-icon">✨</span><span class="ac-label">생성형 AI</span></div>
          <div class="ac-desc">텍스트·이미지·코드 등 새로운 콘텐츠를 창작</div>
        </div>
        <div class="ai-concept-card ac-4">
          <div class="ac-top"><span class="ac-icon">💡</span><span class="ac-label">프롬프트</span></div>
          <div class="ac-desc">AI에게 주는 지시문 — 출력 품질을 결정하는 핵심</div>
        </div>
        <div class="ai-concept-card ac-5">
          <div class="ac-top"><span class="ac-icon">⚠️</span><span class="ac-label">할루시네이션</span></div>
          <div class="ac-desc">틀린 정보를 자신 있게 제시하는 AI의 대표 오류</div>
        </div>
      </div>

      <button class="intro-cta" onclick="slideBy(1)">보안 AI 살펴보기 →</button>
    </div>
  </div>
`;
