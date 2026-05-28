export const html = `
  <!-- ═══ SCREEN 7 – Project Overview ═══ -->
  <div class="screen intro-type" id="sOverview">
    <div class="overview-screen">
      <div class="overview-split">
        <div class="overview-left">
          <div class="ov-section-label">이 프로젝트의 배경</div>
          <h2 class="ov-why-title">왜 AI인가?</h2>
          <p class="ov-why-desc">기존 규칙 기반 앱의 한계를 넘어, 자연어 입력 하나로 건강·재무·위치 등 복잡한 도메인 로직을 처리하는 새로운 패러다임을 구현했습니다.</p>
          <div class="ov-stats">
            <div class="ov-stat">
              <div class="ov-stat-num">3x</div>
              <div class="ov-stat-label">개발 속도 향상<br>(규칙 코딩 대비)</div>
            </div>
            <div class="ov-stat">
              <div class="ov-stat-num">1개</div>
              <div class="ov-stat-label">API로<br>3가지 서비스</div>
            </div>
            <div class="ov-stat">
              <div class="ov-stat-num">₩0</div>
              <div class="ov-stat-label">Ollama 전환 시<br>운영 비용</div>
            </div>
          </div>
          <div class="ov-tech-stack">
            <div class="ov-tech-tag">Ollama</div>
            <div class="ov-tech-tag">Node.js + Express</div>
            <div class="ov-tech-tag">Naver Maps API</div>
            <div class="ov-tech-tag">Chart.js 4</div>
            <div class="ov-tech-tag">Vanilla JS ESM</div>
          </div>
        </div>
        <div class="overview-right">
          <div class="ov-service">
            <div class="ov-service-head">
              <span class="ov-service-icon">🏥</span>
              <div>
                <div class="ov-service-title">AI 건강 증상 분석기</div>
                <div class="ov-service-sub">Health Symptom Analyzer</div>
              </div>
            </div>
            <div class="ov-service-desc">16가지 증상 선택 + 자유 텍스트 입력 → AI가 가능성 높은 질병 3가지와 각각의 치료법을 안내합니다</div>
            <div class="ov-service-tags">
              <span>증상 분석</span><span>질병 추론</span><span>치료법</span><span>경고 감지</span>
            </div>
          </div>
          <div class="ov-service">
            <div class="ov-service-head">
              <span class="ov-service-icon">📊</span>
              <div>
                <div class="ov-service-title">AI 생활비 분석기</div>
                <div class="ov-service-sub">Expense Analyzer</div>
              </div>
            </div>
            <div class="ov-service-desc">카테고리별 지출 차트 시각화 + "32만원으로 감량" 자연어 입력 → 즉석에서 절약 계획을 생성합니다</div>
            <div class="ov-service-tags">
              <span>데이터 분석</span><span>차트 시각화</span><span>절약 계획</span><span>NLP</span>
            </div>
          </div>
          <div class="ov-service">
            <div class="ov-service-head">
              <span class="ov-service-icon">🗺️</span>
              <div>
                <div class="ov-service-title">AI 스마트 네비게이션</div>
                <div class="ov-service-sub">Smart Navigation</div>
              </div>
            </div>
            <div class="ov-service-desc">실제 주소 입력 → Naver Maps 경로 계산 + AI가 날씨·층수 조건을 반영한 추가 소요시간을 산출합니다</div>
            <div class="ov-service-tags">
              <span>경로 최적화</span><span>날씨 연동</span><span>층수 산출</span><span>예측 AI</span>
            </div>
          </div>
        </div>
      </div>
      <button class="intro-cta" onclick="slideBy(1)">기술 스택 보기 →</button>
    </div>
  </div>

  <!-- ═══ SCREEN 8 – Tech Stack ═══ -->
  <div class="screen intro-type" id="sTechStack">
    <div class="intro-screen intro-screen--wide">
      <div class="intro-num">기술</div>
      <div class="intro-head">
        <h1 class="intro-title" style="font-size:26px">공통 핵심 기술 스택</h1>
        <p class="intro-sub">AI를 중심으로 세 서비스가 공유하는 아키텍처</p>
      </div>

      <div class="tech-grid">
        <div class="tech-section">
          <div class="tech-section-title">🧠 AI 레이어</div>
          <div class="tech-items">
            <div class="tech-item">
              <div class="tech-name">Ollama</div>
              <div class="tech-desc">전 애플 개발자가 제작한 로컬 LLM — 빠른 응답 속도와 긴 컨텍스트 처리 능력을 무료로 제공</div>
            </div>
            <div class="tech-item">
              <div class="tech-name">Prompt Engineering</div>
              <div class="tech-desc">역할(Role) · 도메인 데이터 · 출력 형식을 시스템 프롬프트로 정밀 제어 — 코드 없이 동작 정의</div>
            </div>
            <div class="tech-item">
              <div class="tech-name">Model Fallback Chain</div>
              <div class="tech-desc">할당량 초과(429) 시 Flash → Flash-Lite 자동 전환 — 모델 장애에도 서비스 중단 없이 연속 운영</div>
            </div>
            <div class="tech-item">
              <div class="tech-name">Multi-turn Conversation</div>
              <div class="tech-desc">대화 히스토리 최근 10턴 유지 — 맥락을 기억하는 자연스러운 연속 대화 구현</div>
            </div>
          </div>
        </div>

        <div class="tech-section">
          <div class="tech-section-title">🔒 보안 & 인프라</div>
          <div class="tech-items">
            <div class="tech-item">
              <div class="tech-name">Express.js 프록시 서버</div>
              <div class="tech-desc">API 키를 .env에서만 보관 — 브라우저 개발자 도구에 키가 절대 노출되지 않음</div>
            </div>
            <div class="tech-item">
              <div class="tech-name">입력 검증 & 화이트리스트</div>
              <div class="tech-desc">모델명·좌표·파라미터를 서버에서 검증 — Prompt Injection 및 API 남용 원천 차단</div>
            </div>
            <div class="tech-item">
              <div class="tech-name">CORS 제한 + 경로 차단</div>
              <div class="tech-desc">localhost 도메인만 허용, .env·server.js 등 민감 파일은 정적 서빙에서 완전 차단</div>
            </div>
          </div>
        </div>

        <div class="tech-section">
          <div class="tech-section-title">🛠️ 도메인별 기술</div>
          <div class="tech-items">
            <div class="tech-item">
              <div class="tech-name">Naver Maps & Directions API</div>
              <div class="tech-desc">지오코딩 + 최적 경로 계산 — OSRM을 폴백으로 설정해 API 키 없이도 동작 가능</div>
            </div>
            <div class="tech-item">
              <div class="tech-name">Chart.js 4</div>
              <div class="tech-desc">막대·원형·꺾은선 차트 실시간 전환 + 감량 계획 오버레이 커스텀 플러그인 구현</div>
            </div>
            <div class="tech-item">
              <div class="tech-name">Vanilla JS ES Modules</div>
              <div class="tech-desc">webpack·Vite 없이 브라우저 네이티브 import/export 활용 — 빌드 과정 없는 경량 아키텍처</div>
            </div>
          </div>
        </div>
      </div>

      <button class="intro-cta" onclick="go(7)">① 건강 서비스 보기 →</button>
    </div>
  </div>
`;
