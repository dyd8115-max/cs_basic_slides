export const html = `
  <!-- ═══ SCREEN 5 – Medical AI Concepts ═══ -->
  <div class="screen intro-type" id="sMed1">
    <div class="sec-concept-screen">
      <div class="sec-concept-split">

        <div class="sec-concept-left">
          <div>
            <div class="sec-eyebrow med-eyebrow">AI 활용 분야 — 의료</div>
            <h1 class="sec-title">AI 기반<br>의료 기술</h1>
            <p class="sec-left-desc">환자 데이터 분석, 영상 판독, 수술 보조, 신약 개발 등 의료 전반에 AI가 활용되고 있습니다.</p>
          </div>

          <div class="sec-flow-vert">
            <div class="sec-fv-node">
              <span class="sec-fv-icon">🏥</span>
              <div>
                <div class="sec-fv-label">데이터 수집</div>
                <div class="sec-fv-sub">의료 기록 · CT/MRI · 유전자</div>
              </div>
            </div>
            <div class="sec-fv-arrow">↓</div>
            <div class="sec-fv-node">
              <span class="sec-fv-icon">🧠</span>
              <div>
                <div class="sec-fv-label">AI 분석</div>
                <div class="sec-fv-sub">영상 판독 · 패턴 인식</div>
              </div>
            </div>
            <div class="sec-fv-arrow">↓</div>
            <div class="sec-fv-node med-fv-highlight">
              <span class="sec-fv-icon">💊</span>
              <div>
                <div class="sec-fv-label">맞춤 치료</div>
                <div class="sec-fv-sub">진단 · 수술 보조 · 신약 개발</div>
              </div>
            </div>
          </div>

          <div class="sec-trend-pill">
            🔮 <strong>미래</strong>: VR + 촉각 피드백으로 <strong>가상 수술 실시간 보조</strong>
          </div>
        </div>

        <div class="sec-concept-right">
          <div class="sec-table-title">의료 AI 핵심 기술</div>
          <table class="sec-tech-table">
            <thead>
              <tr>
                <th>기술</th>
                <th>의료에서의 역할</th>
              </tr>
            </thead>
            <tbody>
              <tr class="med-tr-cv">
                <td><span class="sec-tc-tag">컴퓨터 비전</span></td>
                <td>수술 영상 분석, 병변 탐지, 혈관·신경 실시간 표시</td>
              </tr>
              <tr class="med-tr-sim">
                <td><span class="sec-tc-tag">컴퓨터 시뮬레이션</span></td>
                <td>환자 몸 디지털 구현 → 수술 전 미리 실험·최적 경로 계산</td>
              </tr>
              <tr class="med-tr-ds">
                <td><span class="sec-tc-tag">데이터 과학</span></td>
                <td>의료 기록·유전자·생체 신호 통합 → 질병 예측, 맞춤 치료</td>
              </tr>
              <tr class="med-tr-dt">
                <td><span class="sec-tc-tag">디지털 트윈</span></td>
                <td>CT/MRI로 3D 모델 생성, 수술 전 시뮬레이션 및 실시간 보조</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      <button class="intro-cta" onclick="slideBy(1)">실제 사례 →</button>
    </div>
  </div>

  <!-- ═══ SCREEN 6 – Medical AI Cases ═══ -->
  <div class="screen intro-type" id="sMed2">
    <div class="sec-cases-screen">
      <div class="sec-cases-header">
        <div class="sec-eyebrow med-eyebrow">실제 사례</div>
        <h1 class="sec-title">화이자 코로나 백신 개발</h1>
      </div>

      <div class="sec-cases-body">
        <div class="sec-cases-left">
          <div class="sec-cases-section-title">📋 배경</div>
          <div class="sec-ueba-list">
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">🧬</span>
              <div class="sec-ueba-title">mRNA 백신 — 동일 단백질을 만드는 서열 조합이 수조 개 이상 존재</div>
            </div>
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">🎯</span>
              <div class="sec-ueba-title">가장 효율적이고 안전한 서열을 찾는 게 핵심 과제</div>
            </div>
          </div>

          <div class="sec-cases-section-title" style="margin-top:14px">🤖 AI의 역할</div>
          <div class="med-role-list">
            <div class="med-role-row">
              <span class="med-role-step">최적 서열 계산</span>
              <span class="med-role-desc">수조 개 조합 중 단백질 생산 효율 최고 서열 도출</span>
            </div>
            <div class="med-role-row">
              <span class="med-role-step">딥러닝 필터링</span>
              <span class="med-role-desc">항체 생성량 예측 + 독성 발생 확률 점수화</span>
            </div>
            <div class="med-role-row">
              <span class="med-role-step">시행착오 감소</span>
              <span class="med-role-desc">실험실 수만 번 배양 대신 가상으로 최적 서열 사전 선별</span>
            </div>
          </div>
        </div>

        <div class="sec-cases-right">
          <div class="sec-cases-section-title">✅ 결과 & 의미</div>
          <div class="med-result-card">
            <div class="med-result-badge">⏱️ 수년 → 단 몇 주</div>
            <div class="med-result-desc">보통 수년이 걸리는 물질 확정 단계를 단 몇 주 만에 완료</div>
          </div>
          <div class="sec-ueba-list" style="margin-top:10px">
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">🚀</span>
              <div class="sec-ueba-title">팬데믹 대응 속도 혁신</div>
            </div>
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">💰</span>
              <div class="sec-ueba-title">신약 개발 비용·시간 대폭 절감</div>
            </div>
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">🔬</span>
              <div class="sec-ueba-title">AI가 실험실을 대체하는 시대의 시작</div>
            </div>
          </div>
        </div>
      </div>

      <button class="intro-cta" onclick="slideBy(1)">프로젝트 소개 보기 →</button>
    </div>
  </div>
`;
