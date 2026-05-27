export const html = `
  <!-- ═══ SCREEN 3 – Security AI Concepts ═══ -->
  <div class="screen intro-type" id="sSec1">
    <div class="sec-concept-screen">

      <div class="sec-concept-split">

        <!-- 왼쪽: 기초 설명 + 플로우 -->
        <div class="sec-concept-left">
          <div>
            <div class="sec-eyebrow">AI 활용 분야 — 보안</div>
            <h1 class="sec-title">AI 기반<br>사이버 보안</h1>
            <p class="sec-left-desc">대량의 로그·패킷·행동 데이터를 실시간으로 분석해 공격을 탐지하고 자동으로 차단·대응합니다.</p>
          </div>

          <div class="sec-flow-vert">
            <div class="sec-fv-node">
              <span class="sec-fv-icon">📡</span>
              <div>
                <div class="sec-fv-label">데이터 수집</div>
                <div class="sec-fv-sub">로그 · 패킷 · 행동</div>
              </div>
            </div>
            <div class="sec-fv-arrow">↓</div>
            <div class="sec-fv-node">
              <span class="sec-fv-icon">🧠</span>
              <div>
                <div class="sec-fv-label">AI 분석</div>
                <div class="sec-fv-sub">패턴 인식 · 이상 탐지</div>
              </div>
            </div>
            <div class="sec-fv-arrow">↓</div>
            <div class="sec-fv-node sec-fv-highlight">
              <span class="sec-fv-icon">⚡</span>
              <div>
                <div class="sec-fv-label">자동 대응</div>
                <div class="sec-fv-sub">차단 · 격리 · 경고</div>
              </div>
            </div>
          </div>

          <div class="sec-trend-pill">
            📈 <strong>XDR + SOAR</strong> 통합 구조로 발전 &nbsp;·&nbsp; <span class="sec-trend-warn">⚠️ AI vs AI 시대</span>
          </div>
        </div>

        <!-- 오른쪽: 기술 표 -->
        <div class="sec-concept-right">
          <div class="sec-table-title">AI 보안 핵심 기술</div>
          <table class="sec-tech-table">
            <thead>
              <tr>
                <th>기술</th>
                <th>역할</th>
                <th>탐지 · 처리 대상</th>
              </tr>
            </thead>
            <tbody>
              <tr class="sec-tr-ids">
                <td><span class="sec-tc-tag">IDS</span></td>
                <td>침입 탐지 시스템</td>
                <td>DDoS · 포트스캔 · 비정상 패킷</td>
              </tr>
              <tr class="sec-tr-ueba">
                <td><span class="sec-tc-tag">UEBA</span></td>
                <td>사용자 행동 분석</td>
                <td>내부자 위협 · 계정 탈취</td>
              </tr>
              <tr class="sec-tr-edr">
                <td><span class="sec-tc-tag">EDR</span></td>
                <td>엔드포인트 탐지</td>
                <td>랜섬웨어 · 악성파일 격리</td>
              </tr>
              <tr class="sec-tr-xdr">
                <td><span class="sec-tc-tag">XDR</span></td>
                <td>통합 위협 분석</td>
                <td>이메일 · 서버 · 클라우드 전체</td>
              </tr>
              <tr class="sec-tr-sandbox">
                <td><span class="sec-tc-tag">Sandbox</span></td>
                <td>격리 환경 분석</td>
                <td>악성 행동 파악 (감염 없이)</td>
              </tr>
              <tr class="sec-tr-soar">
                <td><span class="sec-tc-tag">SOAR</span></td>
                <td>자동 대응 플랫폼</td>
                <td>계정 잠금 · IP 차단 · 경고 자동화</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <button class="intro-cta" onclick="slideBy(1)">실제 사례 →</button>
    </div>
  </div>

  <!-- ═══ SCREEN 4 – Security AI Cases ═══ -->
  <div class="screen intro-type" id="sSec2">
    <div class="sec-cases-screen">
      <div class="sec-cases-header">
        <div class="sec-eyebrow">실제 사례</div>
        <h1 class="sec-title">누가 어떻게 쓰고 있나</h1>
      </div>

      <div class="sec-cases-body">
        <div class="sec-cases-left">
          <div class="sec-cases-section-title">🏢 기업 도입 현황</div>
          <div class="sec-company-list">
            <div class="sec-company-row">
              <span class="sec-company-name">Cisco</span>
              <span class="sec-company-tag sec-tag-ids">IDS</span>
            </div>
            <div class="sec-company-row">
              <span class="sec-company-name">Palo Alto</span>
              <span class="sec-company-tag sec-tag-soar">IDS + SOAR</span>
              <span class="sec-company-desc">Cortex XSOAR</span>
            </div>
            <div class="sec-company-row">
              <span class="sec-company-name">CrowdStrike</span>
              <span class="sec-company-tag sec-tag-edr">EDR</span>
            </div>
            <div class="sec-company-row">
              <span class="sec-company-name">SentinelOne</span>
              <span class="sec-company-tag sec-tag-edr">EDR</span>
            </div>
            <div class="sec-company-row">
              <span class="sec-company-name">Microsoft</span>
              <span class="sec-company-tag sec-tag-xdr">XDR</span>
            </div>
          </div>

          <div class="sec-cases-section-title" style="margin-top:16px">👤 UEBA 실제 상황</div>
          <div class="sec-ueba-list">
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">🌙</span>
              <div class="sec-ueba-title">새벽 3시 관리자 로그인 → 즉시 경보</div>
            </div>
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">📁</span>
              <div class="sec-ueba-title">파일 수백 개 갑자기 다운로드 → 내부자 위협</div>
            </div>
          </div>
        </div>

        <div class="sec-cases-right">
          <div class="sec-cases-section-title">⚔️ AI 공격 사례</div>
          <div class="sec-attack-list">
            <div class="sec-attack-item">
              <div class="sec-attack-head">
                <span class="sec-attack-icon">📧</span>
                <span class="sec-attack-title">AI 피싱 메일</span>
              </div>
              <div class="sec-attack-desc">자연스러운 피싱 메일을 AI가 자동 생성 → 스팸 필터 우회</div>
            </div>
            <div class="sec-attack-item">
              <div class="sec-attack-head">
                <span class="sec-attack-icon">🦠</span>
                <span class="sec-attack-title">악성코드 자동 생성</span>
              </div>
              <div class="sec-attack-desc">AI가 취약점 탐색 → 맞춤 악성코드 자동 제작</div>
            </div>
            <div class="sec-attack-item">
              <div class="sec-attack-head">
                <span class="sec-attack-icon">🎭</span>
                <span class="sec-attack-title">딥페이크 사기</span>
              </div>
              <div class="sec-attack-desc">임원 음성·영상 합성 → 송금 지시 — 실제 피해 다수</div>
            </div>
            <div class="sec-attack-conclusion">
              <span class="sec-attack-vs">AI 공격 vs AI 방어</span> — 보안의 다음 전쟁터
            </div>
          </div>
        </div>
      </div>

      <button class="intro-cta" onclick="slideBy(1)">의료 AI 살펴보기 →</button>
    </div>
  </div>
`;
