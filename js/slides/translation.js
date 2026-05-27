export const html = `
  <!-- ═══ SCREEN 7 – Translation AI Concepts ═══ -->
  <div class="screen intro-type" id="sTrans1">
    <div class="sec-concept-screen">
      <div class="sec-concept-split">

        <div class="sec-concept-left">
          <div>
            <div class="sec-eyebrow trans-eyebrow">AI 활용 분야 — 🌐 번역</div>
            <h1 class="sec-title">AI 기반<br>번역 기술</h1>
            <p class="sec-left-desc">단순 단어 치환이 아닌 문맥·문법·화자의 의도까지 분석하여 자연스럽게 언어를 변환하는 기술입니다.</p>
          </div>

          <div class="sec-flow-vert">
            <div class="sec-fv-node">
              <span class="sec-fv-icon">📝</span>
              <div>
                <div class="sec-fv-label">원문 분석</div>
                <div class="sec-fv-sub">문법 · 문맥 · 의도</div>
              </div>
            </div>
            <div class="sec-fv-arrow">↓</div>
            <div class="sec-fv-node">
              <span class="sec-fv-icon">🧠</span>
              <div>
                <div class="sec-fv-label">AI 학습</div>
                <div class="sec-fv-sub">패턴 인식 · 의미 이해</div>
              </div>
            </div>
            <div class="sec-fv-arrow">↓</div>
            <div class="sec-fv-node trans-fv-highlight">
              <span class="sec-fv-icon">✨</span>
              <div>
                <div class="sec-fv-label">자연스러운 번역</div>
                <div class="sec-fv-sub">문화 · 뉘앙스 · 표현</div>
              </div>
            </div>
          </div>

          <div class="sec-trend-pill">
            📈 <strong>Transformer 기반 LLM</strong>이 번역 품질 혁신 &nbsp;·&nbsp; <span class="sec-trend-warn">🌐 다국어 동시 지원</span>
          </div>
        </div>

        <div class="sec-concept-right">
          <div class="sec-table-title">AI 번역 발전 과정</div>
          <table class="sec-tech-table">
            <thead>
              <tr>
                <th>세대</th>
                <th>기술명</th>
                <th>특징</th>
              </tr>
            </thead>
            <tbody>
              <tr class="trans-tr-rbmt">
                <td><span class="sec-tc-tag">1세대</span></td>
                <td><strong>RBMT</strong><br>규칙 기반 번역</td>
                <td>사람이 문법 규칙 정의</td>
              </tr>
              <tr class="trans-tr-smt">
                <td><span class="sec-tc-tag">2세대</span></td>
                <td><strong>SMT</strong><br>통계 기반 번역</td>
                <td>데이터 확률 분석</td>
              </tr>
              <tr class="trans-tr-nmt">
                <td><span class="sec-tc-tag">3세대</span></td>
                <td><strong>NMT</strong><br>신경망 번역</td>
                <td>Sequence-to-Sequence</td>
              </tr>
              <tr class="trans-tr-transformer">
                <td><span class="sec-tc-tag">4세대</span></td>
                <td><strong>Transformer</strong><br>현재 주류</td>
                <td>Attention 메커니즘 · 병렬 처리</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <button class="intro-cta" onclick="slideBy(1)">실제 사례 →</button>
    </div>
  </div>

  <!-- ═══ SCREEN 8 – Translation AI Cases ═══ -->
  <div class="screen intro-type" id="sTrans2">
    <div class="sec-cases-screen">
      <div class="sec-cases-header">
        <div class="sec-eyebrow trans-eyebrow">실제 활용 사례</div>
        <h1 class="sec-title">AI 번역 서비스 현황</h1>
      </div>

      <div class="sec-cases-body">
        <div class="sec-cases-left">
          <div class="sec-cases-section-title">🌍 주요 서비스</div>
          <div class="sec-company-list">
            <div class="sec-company-row">
              <span class="sec-company-name">파파고</span>
              <span class="sec-company-tag trans-tag-realtime">실시간 통역</span>
              <span class="sec-company-desc">한국 최고 수준</span>
            </div>
            <div class="sec-company-row">
              <span class="sec-company-name">Google Translate</span>
              <span class="sec-company-tag trans-tag-multilang">100+ 언어</span>
              <span class="sec-company-desc">가장 광범위</span>
            </div>
            <div class="sec-company-row">
              <span class="sec-company-name">DeepL</span>
              <span class="sec-company-tag trans-tag-quality">고품질</span>
              <span class="sec-company-desc">정확도 최고</span>
            </div>
            <div class="sec-company-row">
              <span class="sec-company-name">YouTube 자동 자막</span>
              <span class="sec-company-tag trans-tag-auto">자동 생성</span>
              <span class="sec-company-desc">실시간 영상</span>
            </div>
          </div>

          <div class="sec-cases-section-title" style="margin-top:16px">📊 핵심 기술</div>
          <div class="sec-ueba-list">
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">🎯</span>
              <div class="sec-ueba-title">Attention Mechanism — 문맥에 맞는 단어 선택</div>
            </div>
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">🌐</span>
              <div class="sec-ueba-title">Transfer Learning — 비슷한 언어쌍에서 학습 활용</div>
            </div>
            <div class="sec-ueba-item">
              <span class="sec-ueba-icon">📈</span>
              <div class="sec-ueba-title">Back-translation — 품질 검증</div>
            </div>
          </div>
        </div>

        <div class="sec-cases-right">
          <div class="sec-cases-section-title">⚖️ 장점 vs 한계</div>
          <div style="display: flex; gap: 16px;">
            <div class="sec-pros-section">
              <div class="sec-pros-header">✓ 장점</div>
              <div class="sec-pros-items">
                <div class="sec-pros-item">
                  <span class="sec-pros-icon">⚡</span>
                  <div>
                    <strong>빠른 처리</strong>
                    <div class="sec-pros-desc">실시간 번역 가능</div>
                  </div>
                </div>
                <div class="sec-pros-item">
                  <span class="sec-pros-icon">💰</span>
                  <div>
                    <strong>저비용</strong>
                    <div class="sec-pros-desc">대량 번역 자동화</div>
                  </div>
                </div>
                <div class="sec-pros-item">
                  <span class="sec-pros-icon">🌍</span>
                  <div>
                    <strong>다국어 지원</strong>
                    <div class="sec-pros-desc">수백 개 언어쌍</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="sec-cons-section">
              <div class="sec-cons-header">✕ 한계</div>
              <div class="sec-cons-items">
                <div class="sec-cons-item">
                  <span class="sec-cons-icon">🎭</span>
                  <div>
                    <strong>문화 표현</strong>
                    <div class="sec-cons-desc">맥락 오역 가능성</div>
                  </div>
                </div>
                <div class="sec-cons-item">
                  <span class="sec-cons-icon">🔐</span>
                  <div>
                    <strong>개인정보 문제</strong>
                    <div class="sec-cons-desc">데이터 보안 이슈</div>
                  </div>
                </div>
                <div class="sec-cons-item">
                  <span class="sec-cons-icon">🤖</span>
                  <div>
                    <strong>인간성 부족</strong>
                    <div class="sec-cons-desc">문학 · 시 번역 미흡</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="sec-future-outlook">
            <span class="sec-future-icon">🔮</span>
            <strong>미래 방향</strong><br>
            협업 도구 형태로 발전 — 인간 번역가를 완전히 대체하기보다 생산성 증대
          </div>
        </div>
      </div>

      <button class="intro-cta" onclick="slideBy(1)">다른 분야 살펴보기 →</button>
    </div>
  </div>
`;
