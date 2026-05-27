export const html = `
  <!-- ═══ SCREEN 15 – AI Pros & Cons ═══ -->
  <div class="screen intro-type" id="sAnalysis1">
    <div class="intro-screen intro-screen--wide">
      <div class="intro-num">총정리</div>
      <div class="intro-head">
        <h1 class="intro-title" style="font-size:26px">AI 도입의 명과 암</h1>
        <p class="intro-sub">기술은 완벽하지 않다 — 무엇을 얻고 무엇을 포기하는가</p>
      </div>

      <div class="pros-cons-grid">
        <div class="pros-col">
          <div class="pros-cons-title pros">✅ 장점 — AI가 가져다 준 것</div>
          <div class="pros-cons-list">
            <div class="pros-item">
              <span class="pcs-icon">💬</span>
              <div>
                <strong>자연어 인터페이스</strong>
                <div class="pcs-desc">"32만원으로 감량 계획 짜줘" 한 문장으로 복잡한 로직 실행 — 규칙 기반 코드 대비 개발 시간 대폭 단축</div>
              </div>
            </div>
            <div class="pros-item">
              <span class="pcs-icon">🧩</span>
              <div>
                <strong>범용 지능</strong>
                <div class="pcs-desc">건강·재무·위치 등 전혀 다른 도메인을 하나의 LLM으로 처리 — 전문가 3명 분량의 지식을 API 하나로</div>
              </div>
            </div>
            <div class="pros-item">
              <span class="pcs-icon">⚡</span>
              <div>
                <strong>빠른 프로토타이핑</strong>
                <div class="pcs-desc">프롬프트 수정만으로 동작 변경 — 새 기능 추가 시 코드가 아닌 언어로 의도를 표현</div>
              </div>
            </div>
            <div class="pros-item">
              <span class="pcs-icon">🔄</span>
              <div>
                <strong>맥락 이해 대화</strong>
                <div class="pcs-desc">이전 대화를 기억하며 흐름 있는 연속 대화 유지 — 단순 챗봇을 넘어 실질적인 어시스턴트 역할</div>
              </div>
            </div>
            <div class="pros-item">
              <span class="pcs-icon">🌐</span>
              <div>
                <strong>24/7 일관성</strong>
                <div class="pcs-desc">언제 접속해도 동일한 품질의 응답 — 사람 전문가와 달리 피로 없이 반복 가능</div>
              </div>
            </div>
          </div>
        </div>

        <div class="cons-col">
          <div class="pros-cons-title cons">❌ 한계 — AI가 아직 못 하는 것</div>
          <div class="pros-cons-list">
            <div class="cons-item">
              <span class="pcs-icon">💸</span>
              <div>
                <strong>높은 API 비용</strong>
                <div class="pcs-desc">GPT-4o는 1M 토큰당 최대 $60 — 트래픽이 늘어나면 월 수십만 원의 청구서가 날아옴</div>
              </div>
            </div>
            <div class="cons-item">
              <span class="pcs-icon">🎭</span>
              <div>
                <strong>환각(Hallucination)</strong>
                <div class="pcs-desc">틀린 정보를 자신 있게 제시 — 의료·법률 등 고신뢰 도메인에서 검증 없이 사용 시 위험</div>
              </div>
            </div>
            <div class="cons-item">
              <span class="pcs-icon">📡</span>
              <div>
                <strong>인터넷 의존성</strong>
                <div class="pcs-desc">클라우드 API 장애 시 서비스 전체 중단 — 단일 장애점(SPOF) 문제로 안정성 취약</div>
              </div>
            </div>
            <div class="cons-item">
              <span class="pcs-icon">🔐</span>
              <div>
                <strong>개인정보 유출 리스크</strong>
                <div class="pcs-desc">사용자 입력 데이터가 외부 AI 서버로 전송 — 민감 정보 처리 시 법적 이슈 발생 가능</div>
              </div>
            </div>
            <div class="cons-item">
              <span class="pcs-icon">⏳</span>
              <div>
                <strong>할당량 제한</strong>
                <div class="pcs-desc">무료 티어에서 분당 요청 수 초과 시 서비스 중단 — 개발 중 429 오류를 반복 경험함</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="intro-cta" onclick="slideBy(1)">Ollama를 선택한 이유 →</button>
    </div>
  </div>

  <!-- ═══ SCREEN 16 – Why Ollama ═══ -->
  <div class="screen intro-type" id="sAnalysis2">
    <div class="intro-screen intro-screen--wide">
      <div class="intro-num">결론</div>
      <div class="intro-head">
        <h1 class="intro-title" style="font-size:26px">왜 Ollama인가</h1>
        <p class="intro-sub">클라우드 AI의 한계를 로컬 LLM으로 극복하기 — 비용 $0, 개인정보 100% 보호</p>
      </div>

      <div class="ollama-layout">
        <div class="cost-compare">
          <div class="cost-title">💰 API 비용 비교 (월 100만 토큰 기준, 입출력 합산)</div>
          <div class="cost-rows">
            <div class="cost-row">
              <span class="cost-model">GPT-4o</span>
              <div class="cost-bar-wrap"><div class="cost-bar" style="width:100%;background:#ff6b6b"></div></div>
              <span class="cost-price">~₩85,000</span>
            </div>
            <div class="cost-row">
              <span class="cost-model">Claude Sonnet</span>
              <div class="cost-bar-wrap"><div class="cost-bar" style="width:52%;background:#ffd93d"></div></div>
              <span class="cost-price">~₩44,000</span>
            </div>
            <div class="cost-row">
              <span class="cost-model">Gemini 2.0 Flash</span>
              <div class="cost-bar-wrap"><div class="cost-bar" style="width:5%;background:#4ecdc4"></div></div>
              <span class="cost-price">~₩4,000</span>
            </div>
            <div class="cost-row highlight-row">
              <span class="cost-model">Ollama (로컬)</span>
              <div class="cost-bar-wrap"><div class="cost-bar" style="width:1%;background:var(--primary)"></div></div>
              <span class="cost-price">₩0</span>
            </div>
          </div>
          <div style="margin-top:12px;font-size:10px;color:var(--muted);opacity:.6">
            * 이 프로젝트는 Gemini Free Tier(무료 한도 내)를 사용합니다
          </div>
        </div>

        <div class="ollama-reasons">
          <div class="ollama-reason-title">🦙 Ollama를 선택한 이유</div>
          <div class="ollama-reason-list">
            <div class="ollama-reason">
              <span class="or-icon">💲</span>
              <div>
                <strong>완전 무료</strong> — API 요금 없음, 토큰 할당량 없음, 429 오류 없음
                <div class="or-sub">테스트를 걱정 없이 무한 반복 — 청구서 스트레스 제로</div>
              </div>
            </div>
            <div class="ollama-reason">
              <span class="or-icon">🔒</span>
              <div>
                <strong>완전한 개인정보 보호</strong> — 데이터가 내 PC 밖으로 나가지 않음
                <div class="or-sub">의료·금융 등 민감 도메인에서 법적 위험 없이 사용 가능</div>
              </div>
            </div>
            <div class="ollama-reason">
              <span class="or-icon">✈️</span>
              <div>
                <strong>오프라인 동작</strong> — 인터넷 없이 로컬에서 완전히 실행
                <div class="or-sub">클라우드 장애와 무관하게 안정적인 서비스 유지</div>
              </div>
            </div>
            <div class="ollama-reason">
              <span class="or-icon">📦</span>
              <div>
                <strong>다양한 모델 선택</strong> — Llama 3.1, Gemma 3, Mistral 등 자유롭게 교체
                <div class="or-sub">용도·성능·크기에 따라 최적 모델을 로컬에서 즉시 전환</div>
              </div>
            </div>
            <div class="ollama-reason">
              <span class="or-icon">🛠️</span>
              <div>
                <strong>완전한 커스터마이징</strong> — Modelfile로 시스템 프롬프트 · 온도 영구 설정
                <div class="or-sub">코드 없이 모델 성격을 원하는 대로 조정 가능</div>
              </div>
            </div>
          </div>
        </div>

        <div class="ollama-caveat">
          <div class="caveat-title">⚠️ 현실적인 조건</div>
          <div class="caveat-list">
            <span class="caveat-item">최소 8GB RAM (8B 모델 기준)</span>
            <span class="caveat-item">GPU 있으면 응답 속도 대폭 향상</span>
            <span class="caveat-item">한국어 성능은 클라우드 대비 낮음</span>
            <span class="caveat-item">최신 지식 반영에 모델 업데이트 필요</span>
          </div>
          <div class="caveat-conclusion">
            결론: 비용·보안이 중요한 프로덕션 환경이라면 Ollama가 최선의 선택.<br>
            이 프로젝트는 데모용으로 Gemini Free Tier를 활용했지만, 실서비스 전환 시 Ollama를 권장합니다.
          </div>
        </div>
      </div>
    </div>
  </div>
`;
