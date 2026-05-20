import { addChatMsg }  from './chat.js';
import { callClaude } from './claude.js';

function expenseSystem(p) {
  const total  = p.vals.reduce((a,b)=>a+b,0);
  const saving = p.income - total;
  const rate   = Math.round(saving/p.income*100);
  return `당신은 AI 생활비 분석 전문가입니다.

[현재 사용자 데이터]
이름: ${p.name} / 월 수입: ${(p.income/10000).toFixed(0)}만원
지출: ${p.cats.map((c,i)=>`${c} ${(p.vals[i]/10000).toFixed(0)}만원`).join(', ')}
총 지출: ${(total/10000).toFixed(0)}만원 / 저축: ${(saving/10000).toFixed(0)}만원 / 저축률: ${rate}%

지원 명령어 (시스템이 자동 처리):
• 감량 계획: "XX만원으로 감량 계획 짜줘" → 차트 비교 모드 전환
• 차트 변경: "원형/막대/꺾은선/점선으로 바꿔줘"
• 세부 조정: "[항목명] 더 줄여줘 / 유지해줘 / 조금만 줄여줘"
• 전체 조정: "더 공격적으로 / 완만하게 조정해줘"

응답 규칙: 사용자 데이터의 실제 수치를 활용해 구체적이고 실용적인 한국어 2-3문장으로 답변하세요.`;
}

const PEOPLE = [
  {
    name: '박위찬', income: 3000000,
    cats: ['식비','교통','쇼핑','문화·여가','통신','기타'],
    vals: [450000, 180000, 320000, 150000, 80000, 640000],
    tip: '쇼핑 지출이 전체의 17%로 높습니다. 월 20만원 예산 설정을 추천해요!',
  },
  {
    name: '배하은', income: 4000000,
    cats: ['식비','교통','쇼핑','문화·여가','통신','기타'],
    vals: [580000, 220000, 750000, 280000, 90000, 430000],
    tip: '쇼핑 지출이 총 지출의 32%입니다. 월 50만원 한도 카드 활용을 추천해요!',
  },
  {
    name: '장준수', income: 2800000,
    cats: ['식비','교통','쇼핑','문화·여가','통신','기타'],
    vals: [380000, 150000, 200000, 280000, 70000, 480000],
    tip: '문화·여가 지출 비중이 높은 편이나 전체 저축률은 양호합니다. 👍',
  },
];

const COLORS = ['#ff6b6b','#ffd93d','#7c6ff7','#4ecdc4','#ff9ff3','#a29bfe'];
const CHART_TYPES = [
  { key: 'bar',      label: '막대 차트' },
  { key: 'doughnut', label: '원형 차트' },
  { key: 'line',     label: '꺾은선 차트' },
  { key: 'dashline', label: '점선 꺾은선' },
];

let chartInst        = null;
let currentPersonIdx = -1;
let chartTypeIdx     = 0;
let reductionPlanState = null;

/* ─────────────────────────────────────────────────────────
   Chart.js local plugin: draws red fill + dashed arc over
   the "cut" portion of each donut segment.
   opts = { cuts: number[], vals: number[] }
───────────────────────────────────────────────────────── */
const cutArcPlugin = {
  id: 'cutArc',
  afterDatasetsDraw(chart, _args, opts) {
    if (!opts || !opts.cuts) return;
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);
    meta.data.forEach((arc, i) => {
      const cut = opts.cuts[i];
      if (!cut || cut <= 0) return;
      const cutRatio = cut / opts.vals[i];
      const span     = arc.endAngle - arc.startAngle;
      const cutStart = arc.endAngle - span * cutRatio;

      ctx.save();
      // Semi-transparent red fill over cut slice
      ctx.beginPath();
      ctx.moveTo(arc.x, arc.y);
      ctx.arc(arc.x, arc.y, arc.outerRadius, cutStart, arc.endAngle);
      ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, cutStart, true);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,107,107,0.38)';
      ctx.fill();
      // Red dashed boundary at midpoint radius
      ctx.strokeStyle = '#ff6b6b';
      ctx.lineWidth   = 2.5;
      ctx.setLineDash([5, 4]);
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.arc(arc.x, arc.y, (arc.outerRadius + arc.innerRadius) / 2, cutStart, arc.endAngle);
      ctx.stroke();
      ctx.restore();
    });
  }
};

/* ─────────────────────────────────────────────────────────
   renderChart — single smart renderer.
   Default mode : one dataset, coloured by category.
   Comparison mode (reductionPlanState set):
     bar      → grouped current(red) + target(teal)
     line     → two overlapping lines
     doughnut → original donut + red-arc overlay for cuts
───────────────────────────────────────────────────────── */
function renderChart(p) {
  if (chartInst) { chartInst.destroy(); chartInst = null; }
  const targets = reductionPlanState ? reductionPlanState.targets : null;
  const type    = CHART_TYPES[chartTypeIdx].key;
  const ctx     = document.getElementById('expChart').getContext('2d');
  const scales  = {
    x: { ticks:{color:'#9999cc',font:{size:10}}, grid:{color:'#1e1e44'} },
    y: { ticks:{color:'#9999cc',font:{size:10},callback:v=>(v/10000)+'만'}, grid:{color:'#1e1e44'} }
  };

  if (type === 'doughnut') {
    const cuts = targets ? p.vals.map((v,i) => v - targets[i]) : null;
    chartInst = new Chart(ctx, {
      type: 'doughnut',
      data: { labels:p.cats, datasets:[{
        data: p.vals,
        backgroundColor: COLORS.map(c=>c+'aa'),
        borderColor: COLORS, borderWidth:2, hoverOffset:8
      }]},
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins: {
          legend:{ position:'right', labels:{color:'#ddddf5',font:{size:11},padding:10,usePointStyle:true} },
          tooltip:{ callbacks:{ label:c=>` ${c.label}: ${(c.raw/10000).toFixed(0)}만원` } },
          ...(cuts ? { cutArc:{ cuts, vals:p.vals } } : {})
        }
      },
      plugins: cuts ? [cutArcPlugin] : []
    });

  } else if (type === 'bar') {
    const datasets = targets
      ? [
          { label:'현재', data:p.vals,  backgroundColor:'rgba(255,107,107,.75)', borderColor:'#ff6b6b', borderWidth:1, borderRadius:4 },
          { label:'목표', data:targets, backgroundColor:'rgba(78,205,196,.75)',  borderColor:'#4ecdc4', borderWidth:1, borderRadius:4 }
        ]
      : [{ data:p.vals, backgroundColor:COLORS.map(c=>c+'bb'), borderColor:COLORS, borderWidth:2, borderRadius:6 }];
    chartInst = new Chart(ctx, {
      type:'bar', data:{ labels:p.cats, datasets },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{
        legend:{ display:!!targets, labels:{color:'#ddddf5',font:{size:11}} },
        tooltip:{ callbacks:{ label:c=>` ${targets?c.dataset.label+': ':''}${(c.raw/10000).toFixed(0)}만원` } }
      }, scales }
    });

  } else {
    // line / dashline — default: filled purple; comparison: two overlapping lines
    const isDash = type === 'dashline';
    const bd     = isDash ? [6,3] : [];
    const datasets = targets
      ? [
          { label:'현재', data:p.vals,  borderColor:'#ff6b6b', backgroundColor:'rgba(255,107,107,.10)', pointBackgroundColor:'#ff6b6b', pointBorderColor:'#fff', pointRadius:5, borderWidth:2.2, fill:false, tension:0.35, borderDash:bd },
          { label:'목표', data:targets, borderColor:'#4ecdc4', backgroundColor:'rgba(78,205,196,.10)',  pointBackgroundColor:'#4ecdc4', pointBorderColor:'#fff', pointRadius:5, borderWidth:2.2, fill:false, tension:0.35, borderDash:bd }
        ]
      : [{
          data:p.vals, borderColor:'#7c6ff7', backgroundColor:'rgba(124,111,247,0.15)',
          pointBackgroundColor:COLORS, pointBorderColor:'#fff',
          pointRadius:6, pointHoverRadius:8, borderWidth:2.5, fill:true, tension:0.35, borderDash:bd
        }];
    chartInst = new Chart(ctx, {
      type:'line', data:{ labels:p.cats, datasets },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{
        legend:{ display:!!targets, labels:{color:'#ddddf5',font:{size:11}} },
        tooltip:{ callbacks:{ label:c=>` ${targets?c.dataset.label+': ':''}${(c.raw/10000).toFixed(0)}만원` } }
      }, scales }
    });
  }
}

function updateReductionStats(p) {
  if (!reductionPlanState) return;
  const saved   = reductionPlanState.targets.reduce((s,t,i) => s+(p.vals[i]-t), 0);
  const statsEl = document.getElementById('reductionStats');
  if (statsEl)
    statsEl.innerHTML = `쇼핑·여가·식비 위주 절감 → 총 <span style="color:var(--green);font-weight:700">${(saved/10000).toFixed(0)}만원</span> 절약 가능 (저축률 +${Math.round(saved/p.income*100)}%p)`;
}

/* ── Person selection ── */
export function pickPerson(idx) {
  document.querySelectorAll('.person-card').forEach((c,i) => c.classList.toggle('on', i === idx));
  currentPersonIdx = idx;
  const p = PEOPLE[idx];
  document.getElementById('expTitle').textContent = `${p.name}님의 생활비 분석`;
  document.getElementById('expEmpty').style.display = 'none';
  const cont = document.getElementById('expContent');
  cont.style.display = 'flex';

  const total  = p.vals.reduce((a,b)=>a+b,0);
  const saving = p.income - total;
  const rate   = Math.round(saving / p.income * 100);

  document.getElementById('statRow').innerHTML = `
    <div class="stat"><div class="stat-label">월 수입</div><div class="stat-val" style="color:var(--green)">${(p.income/10000).toFixed(0)}만원</div></div>
    <div class="stat"><div class="stat-label">총 지출</div><div class="stat-val" style="color:var(--red)">${(total/10000).toFixed(0)}만원</div></div>
    <div class="stat"><div class="stat-label">저축</div><div class="stat-val" style="color:var(--yellow)">${(saving/10000).toFixed(0)}만원</div></div>
    <div class="stat"><div class="stat-label">저축률</div><div class="stat-val" style="color:var(--primary)">${rate}%</div></div>
  `;

  if (chartInst) { chartInst.destroy(); chartInst = null; }
  reductionPlanState = null;
  renderChart(p);

  let tipEl = document.getElementById('expTip');
  if (!tipEl) {
    tipEl = document.createElement('div');
    tipEl.id = 'expTip';
    tipEl.style.cssText = 'margin-top:10px;padding:10px 12px;background:var(--primary-dim);border:1px solid var(--primary);border-radius:8px;font-size:12px;flex-shrink:0';
    cont.appendChild(tipEl);
  }
  tipEl.textContent = '💡 AI 절약 팁: ' + p.tip;

  // AI analysis — text only, no separate canvas
  let aiEl = document.getElementById('expAI');
  if (!aiEl) {
    aiEl = document.createElement('div');
    aiEl.id = 'expAI';
    cont.appendChild(aiEl);
  }
  aiEl.className = 'ai-analysis';
  aiEl.innerHTML = `
    <div class="ai-analysis-head"><div class="ai-pulse"></div>AI 감량 계획</div>
    <div id="reductionStats" style="padding:8px 14px;font-size:11px;color:var(--muted)">
      💬 감량 목표를 채팅으로 입력하면 차트가 비교 모드로 전환됩니다
    </div>
  `;
}

/* ── Chart type change — returns action summary for Claude ── */
function changeExpenseChartType(typeKey) {
  const idx = CHART_TYPES.findIndex(t => t.key === typeKey);
  if (idx < 0) return null;
  chartTypeIdx = idx;
  if (currentPersonIdx >= 0) renderChart(PEOPLE[currentPersonIdx]);
  return `차트를 ${CHART_TYPES[idx].label}로 변경 완료`;
}

/* ── Reduction plan generation — returns action summary for Claude ── */
function generateReductionPlan(targetSave, p) {
  const total = p.vals.reduce((a,b) => a+b, 0);
  if (targetSave >= total) return `오류: 입력 금액(${(targetSave/10000).toFixed(0)}만원)이 총 지출(${(total/10000).toFixed(0)}만원) 이상임 — 더 작은 금액을 요청할 것`;

  function tierRatio(cat) {
    if (/쇼핑/.test(cat))      return 0.62;
    if (/여가/.test(cat))      return 0.55;
    if (/식비/.test(cat))      return 0.48;
    if (/기타/.test(cat))      return 0.30;
    if (/교통|통신/.test(cat)) return 0.08;
    return 0.15;
  }
  const maxCuts = p.vals.map((v,i) => Math.floor(v * tierRatio(p.cats[i])));
  const cuts    = new Array(p.cats.length).fill(0);
  let need = targetSave;

  for (const pat of [/쇼핑/, /여가/, /식비/, /기타/, /.*/]) {
    if (need <= 0) break;
    const idxs = p.cats.map((c,i) => pat.test(c) && cuts[i] === 0 ? i : -1).filter(i => i >= 0);
    const cap  = idxs.reduce((s,i) => s+maxCuts[i], 0);
    if (!cap) continue;
    const take = Math.min(need, cap);
    let taken  = 0;
    for (const i of idxs) { const share = Math.round(take*maxCuts[i]/cap); cuts[i]=share; taken+=share; }
    if (taken < take && idxs.length) cuts[idxs[0]] += take - taken;
    need -= take;
  }

  const targets      = p.vals.map((v,i) => Math.max(0, v - cuts[i]));
  const originalCuts = [...cuts];
  reductionPlanState = { p, targets:[...targets], originalCuts, targetSave };

  let aiEl = document.getElementById('expAI');
  if (!aiEl) {
    aiEl = document.createElement('div');
    aiEl.id = 'expAI';
    document.getElementById('expContent').appendChild(aiEl);
  }
  const actualSave = cuts.reduce((s,c) => s+c, 0);
  aiEl.className = 'ai-analysis';
  aiEl.innerHTML = `
    <div class="ai-analysis-head"><div class="ai-pulse"></div>AI 감량 계획 — ${(targetSave/10000).toFixed(0)}만원 절약 목표</div>
    <div id="reductionStats" style="padding:8px 14px;font-size:11px;color:var(--muted)">
      쇼핑·여가·식비 위주 절감 → 총 <span style="color:var(--green);font-weight:700">${(actualSave/10000).toFixed(0)}만원</span> 절약 가능
      (저축률 +${Math.round(actualSave/p.income*100)}%p)
    </div>
  `;
  renderChart(p);
  return `감량 계획 생성 완료 — 목표 ${(targetSave/10000).toFixed(0)}만원 절약 / 실제 절감 가능: ${(actualSave/10000).toFixed(0)}만원 / 쇼핑·여가·식비 순으로 집중 절감`;
}

function adjustCategoryReduction(catIdx, multiplier, p) {
  if (!reductionPlanState) return null;
  const newTargets = [...reductionPlanState.targets];
  const v = p.vals[catIdx];
  if (multiplier === 0) {
    newTargets[catIdx] = v;
  } else {
    const baseCut = reductionPlanState.originalCuts[catIdx];
    newTargets[catIdx] = Math.max(Math.round(v*0.1), v - Math.min(Math.round(baseCut*multiplier), Math.round(v*0.9)));
  }
  reductionPlanState.targets = newTargets;
  renderChart(p);
  updateReductionStats(p);
  const newSaved = p.vals.reduce((s,v2,i) => s+(v2-newTargets[i]), 0);
  return multiplier === 0
    ? `'${p.cats[catIdx]}' 항목 절감 제외 완료 — 전체 절감액: ${(newSaved/10000).toFixed(0)}만원`
    : `'${p.cats[catIdx]}' 목표 ${(newTargets[catIdx]/10000).toFixed(0)}만원으로 조정 완료 — 전체 절감액: ${(newSaved/10000).toFixed(0)}만원`;
}

function adjustAllReductions(multiplier, p) {
  if (!reductionPlanState) return null;
  const { originalCuts } = reductionPlanState;
  const newTargets = p.vals.map((v,i) => {
    const newCut = Math.min(Math.round(originalCuts[i]*multiplier), Math.round(v*0.9));
    return Math.max(0, v - newCut);
  });
  reductionPlanState.targets = newTargets;
  renderChart(p);
  updateReductionStats(p);
  const newSaved = p.vals.reduce((s,v,i) => s+(v-newTargets[i]), 0);
  return `${multiplier>1?'공격적':'완만한'} 전체 조정 완료 — 전체 절감액: ${(newSaved/10000).toFixed(0)}만원`;
}

/* ── Chat handler ── */
export async function handleExpenseChat(msg, idx) {
  if (currentPersonIdx < 0) {
    addChatMsg(idx, '좌측에서 사용자를 먼저 선택해 주세요.', 'ai');
    return;
  }
  const p = PEOPLE[currentPersonIdx];
  let actionDone = null;

  // 감량 목표 금액 — 반드시 먼저 체크 ("만원"의 "원"이 원형 패턴에 매칭되는 버그 방지)
  const amtMatch = msg.match(/(\d+)\s*만\s*원/);
  if (amtMatch && /감량|절약|줄|계획|짜|목표|맞춰|이하|이내/i.test(msg)) {
    actionDone = generateReductionPlan(parseInt(amtMatch[1]) * 10000, p);
  }
  // 차트 형태 변경
  else if (/원형|원그래프|도넛|doughnut|파이|pie/i.test(msg)) { actionDone = changeExpenseChartType('doughnut'); }
  else if (/점선|dash/i.test(msg))               { actionDone = changeExpenseChartType('dashline'); }
  else if (/꺽은?선|라인|선형/i.test(msg))         { actionDone = changeExpenseChartType('line'); }
  else if (/막대|bar/i.test(msg))                 { actionDone = changeExpenseChartType('bar'); }
  // 세부 조정 (감량 계획 있을 때)
  else if (reductionPlanState) {
    for (let ci = 0; ci < p.cats.length; ci++) {
      if (msg.includes(p.cats[ci])) {
        if (/더 줄|많이|최대|집중|강하게|없애/i.test(msg))            { actionDone = adjustCategoryReduction(ci, 1.6, p); break; }
        if (/유지|그대로|어쩔 수 없|줄이지|건드|고정|빼지/i.test(msg)) { actionDone = adjustCategoryReduction(ci, 0,   p); break; }
        if (/조금|약간|살짝/i.test(msg))                              { actionDone = adjustCategoryReduction(ci, 1.2, p); break; }
      }
    }
    if (!actionDone) {
      if (/더 공격|과감|강하게|더 줄여/i.test(msg)) actionDone = adjustAllReductions(1.3, p);
      else if (/완만|부드|약하게|적게|덜 줄/i.test(msg)) actionDone = adjustAllReductions(0.7, p);
      else if (/다시|초기화|새로|리셋/i.test(msg))   actionDone = generateReductionPlan(reductionPlanState.targetSave, p);
    }
  }

  const reply = await callClaude(idx, msg, expenseSystem(p), actionDone);
  addChatMsg(idx, reply || '질문을 다시 입력해주세요.', 'ai');
}
