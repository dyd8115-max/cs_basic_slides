export const html = `
  <!-- ═══ SCREEN 9 – 음악 AI Concepts ═══ -->
  <div class="screen intro-type" id="sSuno1">
    <div class="sec-concept-screen">
      <div class="sec-concept-split">

        <div class="sec-concept-left">
          <div>
            <div class="sec-eyebrow">AI 활용 분야 — 음악</div>
            <h1 class="sec-title">Suno AI</h1>
            <p class="sec-left-desc">텍스트 프롬프트 입력만으로 작사 · 작곡 · 편곡 · 보컬 생성까지 몇 분 만에 완성하는 AI 음악 생성 플랫폼입니다.</p>
          </div>

          <div class="sec-flow-vert">
            <div class="sec-fv-node">
              <span class="sec-fv-icon">💬</span>
              <div>
                <div class="sec-fv-label">텍스트 입력</div>
                <div class="sec-fv-sub">프롬프트 기반 음악 제작</div>
              </div>
            </div>
            <div class="sec-fv-arrow">↓</div>
            <div class="sec-fv-node">
              <span class="sec-fv-icon">🎛️</span>
              <div>
                <div class="sec-fv-label">AI 생성</div>
                <div class="sec-fv-sub">멜로디 · 화성 · 보컬 합성</div>
              </div>
            </div>
            <div class="sec-fv-arrow">↓</div>
            <div class="sec-fv-node sec-fv-highlight">
              <span class="sec-fv-icon">🎵</span>
              <div>
                <div class="sec-fv-label">완성</div>
                <div class="sec-fv-sub">음악 파일 · 편곡 결과</div>
              </div>
            </div>
          </div>

          <div class="sec-trend-pill">
            🎧 <strong>Suno AI</strong>는 음악 창작의 진입장벽을 낮추고, <strong>아이디어를 빠르게 현실화</strong>합니다.
          </div>
        </div>

        <div class="sec-concept-right">
          <div class="sec-table-title">기술 발전</div>
          <table class="sec-tech-table">
            <thead>
              <tr>
                <th>세대</th>
                <th>기술</th>
                <th>특징</th>
              </tr>
            </thead>
            <tbody>
              <tr class="trans-tr-rbmt">
                <td><span class="sec-tc-tag">RNN / LSTM</span></td>
                <td>순차 처리 기반</td>
                <td>긴 곡 정보 손실 · 단순 멜로디</td>
              </tr>
              <tr class="trans-tr-smt">
                <td><span class="sec-tc-tag">Transformer</span></td>
                <td>Self-Attention</td>
                <td>문맥 전체 이해 · 고품질 생성</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button class="intro-cta" onclick="slideBy(1)">실제 사례 →</button>
    </div>
  </div>

  <!-- ═══ SCREEN 10 – 음악 AI Cases ═══ -->
  <div class="screen intro-type" id="sSuno2">
    <div class="sec-cases-screen">
      <div class="sec-cases-header">
        <div class="sec-eyebrow">생성 과정 · 활용 · 미래</div>
        <h1 class="sec-title">AI 음악 기술</h1>
      </div>

      <div class="sec-cases-body">
        <div>
          <div class="sec-cases-section-title">음악 생성 과정</div>
          <div class="sec-flow-bar">
            <div class="sec-flow-node">
              <div class="sec-flow-label">텍스트 입력</div>
            </div>
            <div class="sec-flow-arrow">→</div>
            <div class="sec-flow-node">
              <div class="sec-flow-label">LLM</div>
            </div>
            <div class="sec-flow-arrow">→</div>
            <div class="sec-flow-node">
              <div class="sec-flow-label">Diffusion</div>
            </div>
            <div class="sec-flow-arrow">→</div>
            <div class="sec-flow-node">
              <div class="sec-flow-label">완성</div>
            </div>
          </div>

          <div class="sec-cases-section-title" style="margin-top:18px">활용 사례</div>
          <div class="sec-ueba-list">
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">🎬</span>
              <div class="sec-ueba-title">유튜브 BGM 제작</div>
            </div>
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">🎧</span>
              <div class="sec-ueba-title">개인 음악 제작</div>
            </div>
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">💻</span>
              <div class="sec-ueba-title">Copilot 연동</div>
            </div>
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">⚠️</span>
              <div class="sec-ueba-title">저작권 논란</div>
            </div>
          </div>
        </div>

        <div>
          <div class="sec-cases-section-title">미래 전망</div>
          <div class="sec-future-outlook">
            AI는 인간 작곡가를 대체하기보다 아이디어를 만들고 협업하는 창작 파트너로 발전할 전망입니다.
          </div>
        </div>
      </div>

      <button class="intro-cta" onclick="slideBy(1)">다른 분야 살펴보기 →</button>
    </div>
  </div>
`;