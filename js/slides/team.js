export const html = `
  <!-- ═══ SCREEN 1 – Team ═══ -->
  <div class="screen intro-type" id="s1">
    <div class="team-screen">
      <div class="team-screen-header">
        <div class="ts-label">팀원 소개</div>
        <h1 class="ts-title">함께 만든 사람들</h1>
        <p class="ts-sub">각자의 전문성을 모아 AI 서비스를 완성했습니다</p>
      </div>

      <div class="team-roles-wrap">
        <div class="ts-role-group ts-presenter">
          <div class="ts-role-badge">발표</div>
          <div class="ts-members-row">
            <div class="ts-member-card">
              <div class="ts-avatar" style="--c:#ff6b6b">박</div>
              <div class="ts-name">박위찬</div>
            </div>
          </div>
        </div>
        <div class="ts-role-divider"></div>
        <div class="ts-role-group ts-ppt">
          <div class="ts-role-badge">PPT 제작</div>
          <div class="ts-members-row">
            <div class="ts-member-card">
              <div class="ts-avatar" style="--c:#7c6ff7">이</div>
              <div class="ts-name">이용균</div>
            </div>
            <div class="ts-member-card">
              <div class="ts-avatar" style="--c:#a29bfe">장</div>
              <div class="ts-name">장준수</div>
            </div>
          </div>
        </div>
        <div class="ts-role-divider"></div>
        <div class="ts-role-group ts-research">
          <div class="ts-role-badge">자료 조사</div>
          <div class="ts-members-row">
            <div class="ts-member-card">
              <div class="ts-avatar" style="--c:#4ecdc4">김</div>
              <div class="ts-name">김지훈</div>
            </div>
            <div class="ts-member-card">
              <div class="ts-avatar" style="--c:#00cec9">배</div>
              <div class="ts-name">배하은</div>
            </div>
            <div class="ts-member-card">
              <div class="ts-avatar" style="--c:#55efc4">김</div>
              <div class="ts-name">김주란</div>
            </div>
            <div class="ts-member-card">
              <div class="ts-avatar" style="--c:#81ecec">정</div>
              <div class="ts-name">정윤재</div>
            </div>
          </div>
        </div>
      </div>

      <button class="intro-cta" onclick="slideBy(1)">차례 보기 →</button>
    </div>
  </div>
`;
