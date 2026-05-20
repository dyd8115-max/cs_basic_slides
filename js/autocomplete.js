const AC_FALLBACK = [
  { text:'서울특별시 강남구 역삼동 123',          sub:'', zip:'06234', sido:'서울특별시', sigugun:'강남구' },
  { text:'서울특별시 강남구 테헤란로 152',         sub:'강남구 삼성동 159', zip:'06236', sido:'서울특별시', sigugun:'강남구' },
  { text:'서울특별시 서초구 반포대로 45',          sub:'서초구 반포동 1-1', zip:'06629', sido:'서울특별시', sigugun:'서초구' },
  { text:'서울특별시 서초구 잠원로 68',            sub:'서초구 잠원동 60-1', zip:'06511', sido:'서울특별시', sigugun:'서초구' },
  { text:'서울특별시 송파구 올림픽로 240',         sub:'송파구 잠실동 40-1', zip:'05510', sido:'서울특별시', sigugun:'송파구' },
  { text:'서울특별시 성동구 뚝섬로 273',           sub:'성동구 성수동2가 289', zip:'04796', sido:'서울특별시', sigugun:'성동구' },
  { text:'서울특별시 노원구 상계동 726',           sub:'', zip:'01702', sido:'서울특별시', sigugun:'노원구' },
  { text:'경기도 성남시 분당구 불정로 6',          sub:'분당구 정자동 178-1', zip:'13561', sido:'경기도', sigugun:'성남시 분당구' },
  { text:'경기도 수원시 영통구 매탄로 167',        sub:'영통구 망포동 321', zip:'16506', sido:'경기도', sigugun:'수원시 영통구' },
];

const coordCache  = {};
let _modalTarget  = null;
let _modalTimer   = null;
let _currentQuery = '';
let _currentPage  = 1;
let _totalCount   = 0;
const PAGE_SIZE   = 10;

/* ── HTML 이스케이프 (XSS 방지) ── */
function escHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ── 검색어 하이라이트 (HTML 이스케이프 후 적용) ── */
function highlight(rawStr, rawQ) {
  const str = escHtml(rawStr);
  if (!rawQ || !str) return str;
  const terms = rawQ.trim().split(/\s+/).filter(t => t.length >= 1);
  let result = str;
  for (const term of terms) {
    const safe = escHtml(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(`(${safe})`, 'gi'), '<mark>$1</mark>');
  }
  return result;
}

/* ── Geocoding 응답 파싱 (addressElements 포함) ── */
function parseGeocodeResponse(data) {
  if (data.status !== 'OK' || !data.addresses?.length) return null;
  return data.addresses.map(a => {
    const elems = {};
    (a.addressElements || []).forEach(el => {
      (el.types || []).forEach(t => { elems[t] = el.longName || ''; });
    });
    return {
      text:     a.roadAddress || a.jibunAddress,
      sub:      a.roadAddress && a.jibunAddress !== a.roadAddress ? a.jibunAddress : '',
      lat:      parseFloat(a.y),
      lng:      parseFloat(a.x),
      zip:      elems.POSTAL_CODE   || '',
      sido:     elems.SIDO          || '',
      sigugun:  elems.SIGUGUN       || '',
      building: elems.BUILDING_NAME || '',
    };
  }).filter(a => a.text);
}

/* ── 공통 Geocoding 호출 ── */
async function geocodeQuery(q, page = 1, count = PAGE_SIZE) {
  if (window.BACKEND_URL) {
    try {
      const url  = `${window.BACKEND_URL}/api/geocode?query=${encodeURIComponent(q)}&count=${count}&page=${page}`;
      const res  = await fetch(url);
      if (res.ok) {
        const json  = await res.json();
        const items = parseGeocodeResponse(json);
        if (items) return { items, total: json.meta?.totalCount || items.length };
      }
    } catch { /* fall through */ }
  }

  if (window.NCP_API_KEY_ID && window.NCP_API_SECRET) {
    try {
      const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(q)}&count=${count}&page=${page}`;
      const res = await fetch(url, {
        headers: {
          'x-ncp-apigw-api-key-id': window.NCP_API_KEY_ID,
          'x-ncp-apigw-api-key':    window.NCP_API_SECRET,
          'Accept': 'application/json',
        }
      });
      if (res.ok) {
        const json  = await res.json();
        const items = parseGeocodeResponse(json);
        if (items) return { items, total: json.meta?.totalCount || items.length };
      }
    } catch { /* fall through */ }
  }

  if (window.naver && naver.maps && naver.maps.Service) {
    return new Promise(resolve => {
      naver.maps.Service.geocode({ query: q }, (status, response) => {
        if (status !== naver.maps.Service.Status.OK || !response.v2.addresses.length) {
          resolve(_fallback(q));
          return;
        }
        const items = response.v2.addresses.slice(0, count).map(r => ({
          text: r.roadAddress || r.jibunAddress || '',
          sub:  r.roadAddress && r.jibunAddress !== r.roadAddress ? r.jibunAddress : '',
          lat:  parseFloat(r.y),
          lng:  parseFloat(r.x),
          zip: '', sido: '', sigugun: '', building: '',
        })).filter(a => a.text);
        resolve({ items, total: items.length });
      });
    });
  }

  return _fallback(q);
}

function _fallback(q) {
  const items = !q
    ? AC_FALLBACK.slice(0, 5)
    : AC_FALLBACK.filter(a => a.text.toLowerCase().includes(q.toLowerCase())).slice(0, 5);
  return { items, total: items.length };
}

/* ════════════════════════════════════════════════════
   주소 검색 모달
════════════════════════════════════════════════════ */

export function openAddrModal(inputId) {
  _modalTarget  = inputId;
  _currentPage  = 1;
  _currentQuery = '';
  _totalCount   = 0;
  const overlay = document.getElementById('addrModal');
  overlay.classList.add('open');
  const inp = document.getElementById('addrModalInput');
  inp.value = '';
  _setModalResults(_hintHTML());
  const current = document.getElementById(inputId)?.value.trim();
  if (current) {
    inp.value = current;
    addrModalSearch(current);
  }
  setTimeout(() => inp.focus(), 50);
}

export function closeAddrModal() {
  const overlay = document.getElementById('addrModal');
  if (overlay) overlay.classList.remove('open');
}

export function addrModalSearch(q) {
  clearTimeout(_modalTimer);
  if (!q.trim()) { _setModalResults(_hintHTML()); return; }
  _currentPage  = 1;
  _currentQuery = q.trim();
  _modalTimer   = setTimeout(() => _runSearch(_currentQuery, 1, false), 300);
}

export function addrLoadMore() {
  _currentPage++;
  _runSearch(_currentQuery, _currentPage, true);
}

function _hintHTML() {
  return `<div class="addr-modal-hint">
    <div class="addr-hint-icon">🔍</div>
    <div class="addr-hint-text">도로명, 건물명, 지번을 입력하세요</div>
    <div class="addr-hint-sub">예: 강남구 테헤란로 152 · 신반포자이 · 정자동 178-1</div>
  </div>`;
}

function _setModalResults(html) {
  const el = document.getElementById('addrModalResults');
  if (el) el.innerHTML = html;
}

async function _runSearch(q, page, append) {
  const el = document.getElementById('addrModalResults');
  if (!el) return;

  if (!append) {
    _setModalResults(`<div class="addr-modal-loading">
      <div class="spinner" style="width:22px;height:22px;border-width:2px"></div>
      <span>검색 중...</span>
    </div>`);
  } else {
    const btn = document.getElementById('addrLoadMoreBtn');
    if (btn) { btn.disabled = true; btn.textContent = '불러오는 중...'; }
  }

  const { items, total } = await geocodeQuery(q, page, PAGE_SIZE);
  _totalCount = total;

  if (!items || !items.length) {
    if (!append) {
      _setModalResults(`<div class="addr-modal-no-result">
        <div style="font-size:30px;margin-bottom:8px">😔</div>
        <div style="font-weight:600">"${escHtml(q)}" 검색 결과 없음</div>
        <div class="addr-hint-sub" style="margin-top:6px">더 구체적인 주소로 다시 시도해 보세요</div>
      </div>`);
    }
    return;
  }

  const itemsHTML = items.map((item, i) => _itemHTML(item, q, (page - 1) * PAGE_SIZE + i)).join('');
  const shown     = (page - 1) * PAGE_SIZE + items.length;
  const remaining = Math.max(0, total - shown);
  const moreHTML  = remaining > 0
    ? `<button id="addrLoadMoreBtn" class="addr-load-more" onclick="addrLoadMore()">
         더 보기 (${remaining}건 더)
       </button>`
    : '';

  if (append) {
    const existingMore = document.getElementById('addrLoadMoreBtn');
    if (existingMore) existingMore.remove();
    el.insertAdjacentHTML('beforeend', itemsHTML + moreHTML);
  } else {
    el.innerHTML = `<div class="addr-result-count">총 ${total}건 중 ${shown}건 표시</div>`
      + itemsHTML + moreHTML;
  }

  el.onclick = (e) => {
    const row = e.target.closest('.addr-result-item');
    if (!row) return;
    _pickAddrResult(
      decodeURIComponent(row.dataset.text),
      row.dataset.lat ? parseFloat(row.dataset.lat) : null,
      row.dataset.lng ? parseFloat(row.dataset.lng) : null,
    );
  };
}

function _itemHTML(item, q, idx) {
  const road     = item.text.includes(item.building) ? item.text : item.text;
  const region   = [item.sido, item.sigugun].filter(Boolean).join(' ');
  const isRoad   = !!item.sub;

  return `
    <div class="addr-result-item" data-i="${idx}"
         data-text="${encodeURIComponent(item.text)}"
         data-lat="${item.lat ?? ''}"
         data-lng="${item.lng ?? ''}">
      <div class="addr-result-icon">📍</div>
      <div class="addr-result-body">
        <div class="addr-result-top">
          <span class="addr-type-badge ${isRoad ? 'road' : 'jibun'}">${isRoad ? '도로명' : '지번'}</span>
          <div class="addr-result-road">${highlight(road, q)}</div>
        </div>
        ${item.sub ? `<div class="addr-result-jibun">지번 │ ${highlight(item.sub, q)}</div>` : ''}
        <div class="addr-result-meta">
          ${region ? `<span class="addr-meta-region">🏙 ${escHtml(region)}</span>` : ''}
          ${item.zip ? `<span class="addr-meta-zip">${escHtml(item.zip)}</span>` : ''}
        </div>
      </div>
      <div class="addr-result-arrow">›</div>
    </div>`;
}

function _pickAddrResult(text, lat, lng) {
  if (_modalTarget) {
    const input = document.getElementById(_modalTarget);
    if (input) input.value = text;
    if (lat && lng) coordCache[_modalTarget] = { lat, lng };
  }
  closeAddrModal();
}

export function getCachedCoords(inputId) {
  return coordCache[inputId] || null;
}

/* 인라인 드롭다운 — 호환성 유지 */
export function acSearch()  {}
export function acPick()    {}
export function acHide()    {}
