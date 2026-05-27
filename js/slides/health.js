export const html = `
  <!-- ═══ SCREEN 9 – Health Intro ═══ -->
  <div class="screen intro-type" id="sHealthIntro">
    <div class="intro-screen">
      <div class="intro-num">01</div>

      <div class="intro-head">
        <div class="intro-icon-wrap">🏥</div>
        <h1 class="intro-title">AI 건강 증상 분석기</h1>
        <p class="intro-sub">증상을 선택하면 AI가 가능한 질병과 치료법을 분석해드립니다</p>
      </div>

      <div class="intro-cards">
        <div class="intro-card">
          <div class="intro-card-icon">🩺</div>
          <div class="intro-card-label">Symptom Analysis</div>
          <div class="intro-card-desc">증상 조합 기반 질병 추론</div>
        </div>
        <div class="intro-card highlight">
          <div class="intro-card-icon">💊</div>
          <div class="intro-card-label">Treatment Guide</div>
          <div class="intro-card-desc">질병별 맞춤 치료법 안내</div>
        </div>
        <div class="intro-card">
          <div class="intro-card-icon">⚠️</div>
          <div class="intro-card-label">Risk Detection</div>
          <div class="intro-card-desc">즉시 진료 필요 경고 감지</div>
        </div>
      </div>

      <div class="intro-flow">
        <div class="intro-flow-title">AI 활용 흐름</div>
        <div class="intro-steps">
          <div class="intro-step">
            <span class="intro-step-n">1</span>
            <div>
              <strong>증상 선택</strong> — 콤보박스에서 해당 증상 체크
              <span class="intro-step-sub">기침·두통·발열 등 16가지 증상 다중 선택 가능</span>
            </div>
          </div>
          <div class="intro-arrow">▸</div>
          <div class="intro-step">
            <span class="intro-step-n">2</span>
            <div>
              <strong>AI 분석</strong> — 증상 조합으로 질병 추론
              <span class="intro-step-sub">가능성 높은 질병 3가지를 순위별로 제시</span>
            </div>
          </div>
          <div class="intro-arrow">▸</div>
          <div class="intro-step">
            <span class="intro-step-n">3</span>
            <div>
              <strong>치료법 안내</strong> — 질병별 맞춤 관리법
              <span class="intro-step-sub">자가 치료법 + 병원 방문 권장 시점 제시</span>
            </div>
          </div>
        </div>
      </div>

      <button class="intro-cta" onclick="slideBy(1)">직접 체험하기 →</button>
    </div>
  </div>

  <!-- ═══ SCREEN 10 – Health Feature ═══ -->
  <div class="screen" id="sHealthFeature">

    <div class="panel">
      <div class="panel-title">AI 건강 증상 분석기</div>
      <p class="desc" style="font-size:12px;line-height:1.6;flex-shrink:0">
        증상을 선택하거나 직접 입력하면 AI가 가능한 질병과 치료법을 분석해드립니다.
        <strong>의료 전문가의 진단을 대체하지 않습니다.</strong>
      </p>
      <div class="tags" style="margin-bottom:8px;flex-shrink:0">
        <span class="tag">증상 분석</span>
        <span class="tag">질병 추론</span>
        <span class="tag">치료법 안내</span>
      </div>
      <div class="chat-area" id="chat0">
        <div class="chat-msg ai">🏥 증상을 선택하고 분석하거나, 증상을 직접 설명해보세요!<br>예: "3일째 고열에 목이 많이 아파요"</div>
      </div>
      <div class="chat-input-row">
        <input class="chat-input" id="chatInput0" placeholder="증상을 직접 설명하세요..." onkeydown="if(event.key==='Enter')sendChat(0)">
        <button class="chat-send" onclick="sendChat(0)">↵</button>
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">증상 선택</div>
      <div class="panel-scroll">
        <div style="font-size:11px;color:var(--muted);margin-bottom:10px">해당하는 증상을 모두 선택하세요 (다중 선택 가능)</div>
        <div class="symptom-grid" id="symptomGrid"></div>
        <div style="margin-top:14px">
          <div style="font-size:11px;color:var(--muted);margin-bottom:6px">추가 증상 직접 입력 (선택사항)</div>
          <textarea id="symptomExtra" class="symptom-extra"
            placeholder="예: 3일째 지속되는 고열, 목이 붓고 삼키기 힘듦..."></textarea>
        </div>
      </div>
      <div class="panel-foot">
        <button class="btn" onclick="analyzeSymptoms()">AI 분석하기</button>
      </div>
    </div>

    <div class="panel result-panel">
      <div class="panel-title">분석 결과</div>
      <div id="healthResult" class="health-result">
        <div class="empty">
          <div class="empty-icon">🏥</div>
          증상을 선택하고<br>AI 분석하기를 눌러주세요
        </div>
      </div>
    </div>
  </div>
`;
