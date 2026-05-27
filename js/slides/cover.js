export const html = `
  <!-- ═══ SCREEN 0 – Cover ═══ -->
  <div class="screen intro-type" id="s0">
    <div class="cover-screen">
      <div class="cover-bg-grid"></div>

      <div class="cover-split">
        <div class="cover-left">
          <div class="cover-eyebrow">AI 기반 서비스 개발 프로젝트 발표</div>
          <h1 class="cover-title">여러가지<br><span class="cover-title-accent">AI 활용법</span></h1>
          <p class="cover-sub">Generative AI의<br>    5가지 대표 활용 영역</p>
          <div class="cover-meta-strip">
            <div class="cover-meta-item">
              <span class="cover-meta-num">5</span>
              <span class="cover-meta-label">메인 주제</span>
            </div>
            <div class="cover-meta-div"></div>
            <div class="cover-meta-item">
              <span class="cover-meta-num">7</span>
              <span class="cover-meta-label">팀원</span>
            </div>
            <div class="cover-meta-div"></div>
            <div class="cover-meta-item">
              <span class="cover-meta-num">1</span>
              <span class="cover-meta-label">LLM</span>
            </div>
          </div>
          <div class="cover-cta-row">
            <div class="cover-model-badge">Ollama 로컬 ai 사용</div>
            <button class="cover-next" onclick="slideBy(1)">발표 시작 ▸</button>
          </div>
        </div>
        <div class="cover-right">
          <div class="cover-service-card cv-sec">
            <div class="cover-sc-num">01</div>
            <div class="cover-sc-icon">🛡️</div>
            <div class="cover-sc-info">
              <div class="cover-sc-title">AI 보안 기술</div>
              <div class="cover-sc-desc">IDS · EDR · UEBA · 실제 사례</div>
            </div>
          </div>
          <div class="cover-service-card cv-med">
            <div class="cover-sc-num">02</div>
            <div class="cover-sc-icon">🔬</div>
            <div class="cover-sc-info">
              <div class="cover-sc-title">AI 의료 기술</div>
              <div class="cover-sc-desc">컴퓨터 비전 · 디지털 트윈 · 신약 개발</div>
            </div>
          </div>
          <div class="cover-service-card cv-health">
            <div class="cover-sc-num">03</div>
            <div class="cover-sc-icon">🏥</div>
            <div class="cover-sc-info">
              <div class="cover-sc-title">AI 건강 분석기</div>
              <div class="cover-sc-desc">증상 선택 → 질병 추론 · 치료법 안내</div>
            </div>
          </div>
          <div class="cover-service-card cv-expense">
            <div class="cover-sc-num">04</div>
            <div class="cover-sc-icon">📊</div>
            <div class="cover-sc-info">
              <div class="cover-sc-title">생활비 분석기</div>
              <div class="cover-sc-desc">지출 시각화 · AI 절약 계획 생성</div>
            </div>
          </div>
          <div class="cover-service-card cv-nav">
            <div class="cover-sc-num">05</div>
            <div class="cover-sc-icon">🗺️</div>
            <div class="cover-sc-info">
              <div class="cover-sc-title">AI 네비게이션</div>
              <div class="cover-sc-desc">경로 계산 · 날씨·층수 조건 반영</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
