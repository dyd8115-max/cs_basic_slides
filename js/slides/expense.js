export const html = `
  <!-- ═══ SCREEN 11 – Expense Intro ═══ -->
  <div class="screen intro-type" id="sExpenseIntro">
    <div class="intro-screen">
      <div class="intro-num">02</div>

      <div class="intro-head">
        <div class="intro-icon-wrap">📊</div>
        <h1 class="intro-title">AI 생활비 분석기</h1>
        <p class="intro-sub">소비 패턴을 분석해 과소비를 잡아내는 AI 개인 재무 코치</p>
      </div>

      <div class="intro-cards">
        <div class="intro-card">
          <div class="intro-card-icon">📈</div>
          <div class="intro-card-label">Data Analytics</div>
          <div class="intro-card-desc">카테고리별 소비 패턴 분석</div>
        </div>
        <div class="intro-card highlight">
          <div class="intro-card-icon">🧠</div>
          <div class="intro-card-label">NLP</div>
          <div class="intro-card-desc">자연어 목표 금액 이해</div>
        </div>
        <div class="intro-card">
          <div class="intro-card-icon">🎯</div>
          <div class="intro-card-label">Optimization AI</div>
          <div class="intro-card-desc">우선순위 기반 절약 계획</div>
        </div>
      </div>

      <div class="intro-flow">
        <div class="intro-flow-title">AI 활용 흐름</div>
        <div class="intro-steps">
          <div class="intro-step">
            <span class="intro-step-n">1</span>
            <div>
              <strong>시각화</strong> — 월별 지출 데이터를 카테고리 차트로 표시
              <span class="intro-step-sub">막대·원형·꺾은선 차트 중 선택 가능</span>
            </div>
          </div>
          <div class="intro-arrow">▸</div>
          <div class="intro-step">
            <span class="intro-step-n">2</span>
            <div>
              <strong>분석</strong> — AI가 과소비 카테고리 우선순위 파악
              <span class="intro-step-sub">쇼핑 → 여가 → 식비 순으로 감량 우선 제안</span>
            </div>
          </div>
          <div class="intro-arrow">▸</div>
          <div class="intro-step">
            <span class="intro-step-n">3</span>
            <div>
              <strong>계획</strong> — 자연어로 목표 입력 시 즉석 절약 계획
              <span class="intro-step-sub">"32만원으로 감량 계획 짜줘" 입력 후 차트 비교</span>
            </div>
          </div>
        </div>
      </div>

      <button class="intro-cta" onclick="slideBy(1)">직접 체험하기 →</button>
    </div>
  </div>

  <!-- ═══ SCREEN 12 – Expense Feature ═══ -->
  <div class="screen" id="sExpenseFeature">

    <div class="panel">
      <div class="panel-title">AI 생활비 분석기</div>
      <p class="desc" style="font-size:12px;line-height:1.6;flex-shrink:0">
        생활비 데이터를 분석해 <strong>과소비 패턴</strong>을 파악하고
        원하는 감량 목표를 입력하면 즉석에서 절약 계획을 만들어드립니다.
      </p>
      <div class="tags" style="margin-bottom:8px;flex-shrink:0">
        <span class="tag">데이터 분석</span>
        <span class="tag">시각화</span>
        <span class="tag">개인화 추천</span>
      </div>
      <div class="chat-area" id="chat1">
        <div class="chat-msg ai">📊 사용자 선택 후 감량 목표를 입력해보세요!<br>예: "32만원으로 감량 계획 짜줘"</div>
      </div>
      <div class="chat-input-row">
        <input class="chat-input" id="chatInput1" placeholder="감량 계획 요청..." onkeydown="if(event.key==='Enter')sendChat(1)">
        <button class="chat-send" onclick="sendChat(1)">↵</button>
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">사용자 선택</div>
      <div class="person-list">
        <div class="person-card" id="pc0" onclick="pickPerson(0)">
          <div class="avatar" style="background:#ff6b6b22;color:#ff6b6b">박</div>
          <div style="flex:1">
            <div class="person-name">박위찬</div>
            <div class="person-sub">이번 달 지출 182만원</div>
          </div>
          <span style="color:var(--primary)">›</span>
        </div>
        <div class="person-card" id="pc1" onclick="pickPerson(1)">
          <div class="avatar" style="background:#74b9ff22;color:#74b9ff">배</div>
          <div style="flex:1">
            <div class="person-name">배하은</div>
            <div class="person-sub">이번 달 지출 235만원</div>
          </div>
          <span style="color:var(--primary)">›</span>
        </div>
        <div class="person-card" id="pc2" onclick="pickPerson(2)">
          <div class="avatar" style="background:#55efc422;color:#55efc4">장</div>
          <div style="flex:1">
            <div class="person-name">장준수</div>
            <div class="person-sub">이번 달 지출 156만원</div>
          </div>
          <span style="color:var(--primary)">›</span>
        </div>
      </div>
    </div>

    <div class="panel result-panel">
      <div class="panel-title" id="expTitle">생활비 분석 결과</div>
      <div id="expEmpty" class="empty" style="flex:1">
        <div class="empty-icon">📊</div>
        좌측에서 사용자를 선택하세요
      </div>
      <div id="expContent" style="display:none;flex:1;flex-direction:column;min-height:0;">
        <div class="stat-row" id="statRow"></div>
        <div class="chart-wrap">
          <canvas id="expChart"></canvas>
        </div>
      </div>
    </div>
  </div>
`;
