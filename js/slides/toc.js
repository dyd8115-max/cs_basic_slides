export const html = `
  <!-- ═══ SCREEN 2 – Table of Contents ═══ -->
  <div class="screen intro-type" id="s2">
    <div class="toc-screen">
      <div class="toc-screen-header">
        <div class="toc-eyebrow">발표 순서</div>
        <h1 class="toc-main-title">차 례</h1>
      </div>

      <div class="toc-card-grid">
        <div class="toc-card toc-c2" onclick="go(1)">
          <div class="toc-card-num">01</div>
          <div class="toc-card-body">
            <div class="toc-card-title">AI 보안 기술</div>
            <div class="toc-card-desc">IDS · UEBA · EDR · XDR · 실제 기업 사례</div>
          </div>
          <div class="toc-card-tag">2 slides</div>
        </div>
        <div class="toc-card toc-c3" onclick="go(2)">
          <div class="toc-card-num">02</div>
          <div class="toc-card-body">
            <div class="toc-card-title">AI 의료 기술</div>
            <div class="toc-card-desc">컴퓨터 비전 · 디지털 트윈 · 화이자 백신 사례</div>
          </div>
          <div class="toc-card-tag">2 slides</div>
        </div>
        <div class="toc-card toc-c1" onclick="go(3)">
          <div class="toc-card-num">03</div>
          <div class="toc-card-body">
            <div class="toc-card-title">프로젝트 소개</div>
            <div class="toc-card-desc">서비스 개요 · 공통 AI 기술 스택 · 아키텍처</div>
          </div>
          <div class="toc-card-tag">2 slides</div>
        </div>
        <div class="toc-card toc-c4" onclick="go(4)">
          <div class="toc-card-num">04</div>
          <div class="toc-card-body">
            <div class="toc-card-title">AI 건강 증상 분석기</div>
            <div class="toc-card-desc">증상 선택 → AI 질병 추론 · 치료법 안내</div>
          </div>
          <div class="toc-card-tag">2 slides</div>
        </div>
        <div class="toc-card toc-c5" onclick="go(5)">
          <div class="toc-card-num">05</div>
          <div class="toc-card-body">
            <div class="toc-card-title">AI 생활비 분석기</div>
            <div class="toc-card-desc">지출 데이터 시각화 · AI 절약 계획 생성</div>
          </div>
          <div class="toc-card-tag">2 slides</div>
        </div>
        <div class="toc-card toc-c6" onclick="go(6)">
          <div class="toc-card-num">06</div>
          <div class="toc-card-body">
            <div class="toc-card-title">AI 스마트 네비게이션</div>
            <div class="toc-card-desc">경로 계산 · 날씨·층수 조건 AI 반영</div>
          </div>
          <div class="toc-card-tag">2 slides</div>
        </div>
        <div class="toc-card toc-c1" onclick="go(7)">
          <div class="toc-card-num">07</div>
          <div class="toc-card-body">
            <div class="toc-card-title">AI 분석 & Ollama</div>
            <div class="toc-card-desc">AI 장단점 · 비용 문제 · 로컬 LLM 선택 이유</div>
          </div>
          <div class="toc-card-tag">2 slides</div>
        </div>
        <div class="toc-card toc-c2 toc-last" onclick="go(8)">
          <div class="toc-card-num">08</div>
          <div class="toc-card-body">
            <div class="toc-card-title">마무리</div>
            <div class="toc-card-desc">배운 점 · 소감 · Q&A</div>
          </div>
          <div class="toc-card-tag">1 slide</div>
        </div>
      </div>

      <button class="intro-cta" onclick="go(1)">발표 시작 →</button>
    </div>
  </div>
`;
