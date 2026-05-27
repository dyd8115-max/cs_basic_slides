export const html = `
  <!-- ═══ SCREEN 13 – Navigation Intro ═══ -->
  <div class="screen intro-type" id="sNavIntro">
    <div class="intro-screen">
      <div class="intro-num">03</div>

      <div class="intro-head">
        <div class="intro-icon-wrap">🗺️</div>
        <h1 class="intro-title">AI 스마트 네비게이션</h1>
        <p class="intro-sub">실시간 날씨·층수 조건을 반영해 소요시간을 정밀 예측하는 AI 경로 안내</p>
      </div>

      <div class="intro-cards">
        <div class="intro-card">
          <div class="intro-card-icon">🛣️</div>
          <div class="intro-card-label">Route Optimization</div>
          <div class="intro-card-desc">OSRM 기반 최적 경로 계산</div>
        </div>
        <div class="intro-card highlight">
          <div class="intro-card-icon">🌦️</div>
          <div class="intro-card-label">Predictive AI</div>
          <div class="intro-card-desc">날씨 조건별 시간 예측 모델</div>
        </div>
        <div class="intro-card">
          <div class="intro-card-icon">🏢</div>
          <div class="intro-card-label">Context Modeling</div>
          <div class="intro-card-desc">층수·엘리베이터 대기 산출</div>
        </div>
      </div>

      <div class="intro-flow">
        <div class="intro-flow-title">AI 활용 흐름</div>
        <div class="intro-steps">
          <div class="intro-step">
            <span class="intro-step-n">1</span>
            <div>
              <strong>경로</strong> — 실제 주소 입력 → Naver Maps 지오코딩
              <span class="intro-step-sub">OSRM 엔진으로 실시간 최적 경로 계산 및 지도 표시</span>
            </div>
          </div>
          <div class="intro-arrow">▸</div>
          <div class="intro-step">
            <span class="intro-step-n">2</span>
            <div>
              <strong>날씨</strong> — 눈·비·흐림 조건 채팅 입력
              <span class="intro-step-sub">AI가 우천·적설 상황에 따라 추가 소요시간 산출</span>
            </div>
          </div>
          <div class="intro-arrow">▸</div>
          <div class="intro-step">
            <span class="intro-step-n">3</span>
            <div>
              <strong>층수</strong> — 출발·도착 층수 입력
              <span class="intro-step-sub">엘리베이터 대기 시간을 포함한 최종 예상 시간 제시</span>
            </div>
          </div>
        </div>
      </div>

      <button class="intro-cta" onclick="slideBy(1)">직접 체험하기 →</button>
    </div>
  </div>

  <!-- ═══ SCREEN 14 – Navigation Feature ═══ -->
  <div class="screen" id="sNavFeature">

    <div class="panel">
      <div class="panel-title">AI 스마트 네비게이션</div>
      <p class="desc" style="font-size:12px;line-height:1.6;flex-shrink:0">
        경로 계산 후 <strong>날씨·층수</strong>를 아래에 직접 입력하면
        AI가 추가 시간을 분석해 예상 시간에 반영합니다.
      </p>
      <div class="tags" style="margin-bottom:8px;flex-shrink:0">
        <span class="tag">경로 최적화</span>
        <span class="tag">날씨 연동</span>
        <span class="tag">예측 모델링</span>
      </div>
      <div class="chat-area" id="chat2">
        <div class="chat-msg ai">🗺️ 경로 계산 후 조건을 알려주세요!<br>예: "비가 오고 출발 3층 도착 15층"</div>
      </div>
      <div class="chat-input-row">
        <input class="chat-input" id="chatInput2" placeholder="날씨·층수 조건 입력..." onkeydown="if(event.key==='Enter')sendChat(2)">
        <button class="chat-send" onclick="sendChat(2)">↵</button>
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">경로 입력</div>
      <div class="panel-scroll">
        <div class="form-group">
          <label>출발지 주소</label>
          <div class="addr-input-wrap" onclick="openAddrModal('navFrom')">
            <input id="navFrom" placeholder="🔍  출발지 주소 검색" readonly style="cursor:pointer">
            <span class="addr-input-btn">검색</span>
          </div>
        </div>
        <div class="form-group">
          <label>도착지 주소</label>
          <div class="addr-input-wrap" onclick="openAddrModal('navTo')">
            <input id="navTo" placeholder="🔍  도착지 주소 검색" readonly style="cursor:pointer">
            <span class="addr-input-btn">검색</span>
          </div>
        </div>
      </div>
      <div class="panel-foot">
        <button class="btn" onclick="calcRoute()">경로 계산하기</button>
      </div>
    </div>

    <div class="panel result-panel" style="padding:0;overflow:hidden">
      <div class="map-wrap" id="mapWrap">
        <div id="kakaoMap"></div>
        <div id="mapPlaceholder" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--muted);font-size:13px;background:#07071a;z-index:500">
          <span style="font-size:44px;opacity:.3">🗺️</span>
          경로를 계산하면 지도가 표시됩니다
        </div>
        <div class="nav-card" id="navCard" style="display:none">
          <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">
            <div class="nav-time" id="navTimeEl">--분</div>
            <div id="navAlpha" style="font-size:13px;color:var(--yellow);font-weight:600"></div>
            <div style="font-size:12px;color:var(--muted)">예상 소요시간</div>
          </div>
          <div class="nav-sub">
            <div class="nav-sub-item">🚗 <span id="navDrive">-</span></div>
            <div class="nav-sub-item">📏 <span id="navDist">-</span></div>
            <div class="nav-sub-item">🛣️ <span id="navToll"></span></div>
            <div class="nav-sub-item">⛽ <span id="navFuel"></span></div>
            <div class="nav-sub-item">🛗 <span id="navElev">-</span></div>
            <div class="nav-sub-item"><span id="navWIcon">-</span> <span id="navWText">-</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
