/* =====================================================================
 * 치과기공사 국가시험 퀴즈 · 앱 로직
 *  - 구글 로그인 / 승인제 가입
 *  - 풀이 기록은 Supabase 에 저장 (js/cloud.js)
 *  - 오늘의 문제 자동 구성 (js/daily.js)
 * ===================================================================== */

const subjectMeta = [
  // 1교시
  { key: 'anatomy', name: '구강해부학 (1~12)', period: 1 },
  { key: 'anatomy_past', name: '구강해부학 국시기출 (19~25년)', period: 1 },
  { key: 'morphology', name: '치아형태학 (13~28)', period: 1 },
  { key: 'morphology_past', name: '치아형태학 국시기출 (19~25년)', period: 1 },
  { key: 'hygiene', name: '구강보건학 (29~40)', period: 1 },
  { key: 'hygiene_past', name: '구강보건학 국시기출 (19~25년)', period: 1 },
  { key: 'materials', name: '치과재료학 (41~75)', period: 1 },
  { key: 'materials_past', name: '치과재료학 국시기출 (19~25년)', period: 1 },
  { key: 'law', name: '의료관계법규 (76~95)', period: 1 },
  { key: 'law_past', name: '의료관계법규 국시기출 (19~25년)', period: 1 },

  // 2교시
  { key: 'crown_bridge', name: '관교의치기공학 (1~19)', period: 2 },
  { key: 'crown_bridge_past', name: '관교의치기공학 국시기출 (19~25년)', period: 2 },
  { key: 'porcelain', name: '도재기공학 (20~34)', period: 2 },
  { key: 'porcelain_past', name: '도재기공학 국시기출 (19~25년)', period: 2 },
  { key: 'complete_denture', name: '총의치기공학 (35~58)', period: 2 },
  { key: 'complete_denture_past', name: '총의치기공학 국시기출 (19~25년)', period: 2 },
  { key: 'partial_denture', name: '국소의치기공학 (59~82)', period: 2 },
  { key: 'partial_denture_past', name: '국소의치기공학 국시기출 (19~25년)', period: 2 },
  { key: 'restorative', name: '충전기공학 (83~96)', period: 2 },
  { key: 'restorative_past', name: '충전기공학 국시기출 (19~25년)', period: 2 },
  { key: 'orthodontics', name: '교정기공학 (97~110)', period: 2 },
  { key: 'orthodontics_past', name: '교정기공학 국시기출 (19~25년)', period: 2 }
];

const WHY_LABEL = { review: '복습', new: '새 문제', refresh: '재확인' };

// ---------------------------------------------------------------- 상태
let currentUser = null;          // profiles 행
let activeUserId = null;
let currentSubjectKey = null;
let currentMode = 'free';        // free | retry | daily
let currentSessionId = null;
let quizQuestions = [];
let currentIndex = 0;
let userAnswersRecord = [];
let isAnswerChecked = false;
let correctCount = 0;
let currentSessionWrongItems = [];

let sessionsCache = [];          // 서버에서 받은 회차 기록 + 이번 접속 중 만든 기록
let localSessions = [];
let dailyState = null;           // { day, items, solved, todayTotal }
let dailyLoading = false;
let dailyError = '';
let dailyRefreshSeq = 0;
let localDailySolved = {};       // 아직 서버에 안 올라간 오늘 푼 문제
let localDailyDay = '';
let qIndex = null;

// ---------------------------------------------------------------- 공통 도구
function $(id) { return document.getElementById(id); }

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

function toast(msg, ms) {
  let box = $('toast-box');
  if (!box) return;
  box.textContent = msg;
  box.style.display = 'block';
  clearTimeout(toast._t);
  toast._t = setTimeout(function () { box.style.display = 'none'; }, ms || 2600);
}

function pad2(n) { return String(n).padStart(2, '0'); }
function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
}
function todayStartMs() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
function fmtDate(iso) {
  return new Date(iso).toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function getQuestion(s, id) {
  if (!qIndex) {
    qIndex = {};
    const db = window.quizDatabase || {};
    Object.keys(db).forEach(function (k) {
      qIndex[k] = {};
      (db[k].questions || []).forEach(function (q) { qIndex[k][q.id] = q; });
    });
  }
  return (qIndex[s] && qIndex[s][id]) || null;
}

function cloneQuestion(q, s, why) {
  const c = JSON.parse(JSON.stringify(q));
  c._s = s;
  if (why) c._why = why;
  return c;
}

function subjectName(key) {
  const m = subjectMeta.find(function (x) { return x.key === key; });
  return m ? m.name : key;
}

function hideAllViews() {
  ['auth-view', 'subject-view', 'quiz-view', 'quiz-result-view', 'bottom-feedback-bar'].forEach(function (id) {
    $(id).style.display = 'none';
  });
}

function anyModalOpen() {
  return Array.prototype.some.call(document.querySelectorAll('.modal-overlay'), function (m) {
    return m.style.display === 'flex';
  });
}

function closeModal(id) { $(id).style.display = 'none'; }

// ---------------------------------------------------------------- 시작 / 인증
window.addEventListener('DOMContentLoaded', boot);

async function boot() {
  window.addEventListener('keydown', handleGlobalKeydown);

  if (!Cloud.isConfigured()) {
    showAuthView('setup');
    return;
  }
  try {
    await Cloud.init(onAuthChange, onSyncChange);
  } catch (e) {
    showAuthView('error', e.message);
    return;
  }
  await routeBySession();
}

/** 탭 전환 등으로 같은 사용자의 SIGNED_IN 이 반복 발생해도 화면을 건드리지 않도록 사용자 변경만 처리 */
async function onAuthChange(event, s) {
  const newId = s && s.user ? s.user.id : null;
  if (newId === activeUserId) return;
  await routeBySession();
}

function onSyncChange(info) {
  const chip = $('sync-chip');
  if (!chip) return;
  const map = {
    idle: '', syncing: '<i class="fa-solid fa-rotate fa-spin"></i> 저장 중',
    pending: '<i class="fa-solid fa-cloud-arrow-up"></i> 저장 대기 ' + info.pending + '건',
    error: '<i class="fa-solid fa-triangle-exclamation"></i> 저장 실패 ' + info.pending + '건 (재시도 중)',
    denied: '<i class="fa-solid fa-ban"></i> 저장 권한 없음'
  };
  const html = map[info.state] || '';
  chip.innerHTML = html;
  chip.className = 'sync-chip' + (info.state === 'error' || info.state === 'denied' ? ' is-error' : '');
  chip.style.display = html ? 'inline-flex' : 'none';
}

async function routeBySession() {
  const s = Cloud.getSession();
  if (!s) {
    activeUserId = null;
    currentUser = null;
    showAuthView('signin');
    return;
  }
  activeUserId = s.user.id;

  let profile;
  try {
    profile = await Cloud.getProfile();
  } catch (e) {
    showAuthView('error', e.message);
    return;
  }
  if (!profile) { showAuthView('noprofile'); return; }

  currentUser = profile;
  if (profile.status === 'approved') {
    await showMainView();
    Cloud.flush();
  } else if (profile.status === 'blocked') {
    showAuthView('blocked');
  } else {
    showAuthView('pending');
  }
}

function showAuthView(mode, msg) {
  hideAllViews();
  $('header-user-controls').style.display = 'none';
  $('auth-view').style.display = 'flex';

  const sub = $('auth-sub');
  const body = $('auth-body');
  const googleBtn = '<button class="google-btn" onclick="handleGoogleLogin()"><i class="fa-brands fa-google"></i> 구글 계정으로 시작하기</button>';
  const logoutBtn = '<button class="header-btn" style="margin-top:14px;" onclick="logout()"><i class="fa-solid fa-arrow-right-from-bracket"></i> 다른 계정으로 로그인</button>';

  if (mode === 'setup') {
    sub.textContent = '처음 한 번 클라우드 연결 설정이 필요해요.';
    body.innerHTML = '<div class="auth-note"><b>js/config.js</b> 파일에 Supabase 주소와 키를 입력해 주세요.<br>자세한 순서는 저장소의 <b>README.md</b> 에 있습니다.</div>';
  } else if (mode === 'signin') {
    sub.textContent = '구글 계정으로 로그인하면 풀이 기록이 어느 기기에서나 이어집니다.';
    body.innerHTML = googleBtn + '<div class="auth-hint">처음 로그인하면 관리자 승인 후 사용할 수 있어요.</div>';
  } else if (mode === 'pending') {
    sub.textContent = (currentUser && currentUser.display_name ? currentUser.display_name + '님, ' : '') + '관리자 승인을 기다리는 중이에요.';
    body.innerHTML =
      '<div class="auth-note">' + esc(currentUser ? currentUser.email : '') + ' 계정으로 가입 신청이 접수되었습니다.<br>승인되면 바로 학습을 시작할 수 있어요.</div>' +
      '<button class="continue-btn" style="margin-top:14px;" onclick="routeBySession()"><i class="fa-solid fa-rotate"></i> 승인 상태 다시 확인</button>' + logoutBtn;
  } else if (mode === 'blocked') {
    sub.textContent = '이 계정은 사용할 수 없습니다.';
    body.innerHTML = '<div class="auth-note">관리자에게 문의해 주세요.</div>' + logoutBtn;
  } else if (mode === 'noprofile') {
    sub.textContent = '계정 정보를 찾지 못했어요.';
    body.innerHTML = '<div class="auth-note">잠시 후 다시 로그인해 주세요. 계속되면 관리자에게 문의해 주세요.</div>' + logoutBtn;
  } else {
    sub.textContent = '연결 중 문제가 생겼어요.';
    body.innerHTML = '<div class="auth-note is-error">' + esc(msg || '알 수 없는 오류') + '</div>' +
      '<button class="continue-btn" style="margin-top:14px;" onclick="location.reload()">새로고침</button>';
  }
}

async function handleGoogleLogin() {
  try {
    await Cloud.signInWithGoogle();
  } catch (e) {
    toast(e.message, 4000);
  }
}

async function logout() {
  try { await Cloud.signOut(); } catch (e) { /* 이미 만료된 세션이면 무시 */ }
  activeUserId = null;
  currentUser = null;
  sessionsCache = [];
  localSessions = [];
  dailyState = null;
  showAuthView('signin');
}

// ---------------------------------------------------------------- 메인 화면
async function showMainView() {
  hideAllViews();
  $('subject-view').style.display = 'block';
  $('header-user-controls').style.display = 'flex';
  $('current-username').textContent = currentUser.display_name || currentUser.email || '내 계정';
  $('admin-btn').style.display = currentUser.role === 'admin' ? 'flex' : 'none';

  renderSubjectList();
  renderDailyCard();

  await Promise.all([refreshSessions(), refreshDaily(), updateAdminBadge()]);
}

function goHome() {
  if (!currentUser || currentUser.status !== 'approved') return;
  hideAllViews();
  $('subject-view').style.display = 'block';
  $('header-user-controls').style.display = 'flex';
  renderSubjectList();
  renderDailyCard();
  refreshSessions();
  refreshDaily();
}

async function refreshSessions() {
  try {
    const rows = await Cloud.listSessions(300);
    const seen = {};
    rows.forEach(function (r) { seen[r.id] = true; });
    sessionsCache = rows.concat(localSessions.filter(function (l) { return !seen[l.id]; }))
      .sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at); });
  } catch (e) {
    sessionsCache = localSessions.slice();
    toast('풀이 이력을 불러오지 못했어요: ' + e.message, 3500);
  }
  if ($('subject-view').style.display === 'block') {
    renderSubjectList();
    renderDailyCard();
  }
}

// ---------------------------------------------------------------- 오늘의 문제
function allowedSubjectKeys() {
  const all = subjectMeta.map(function (m) { return m.key; });
  const sel = (currentUser.daily_subjects || []).filter(function (k) { return all.indexOf(k) !== -1; });
  return sel.length ? sel : all;
}

function buildPool() {
  const db = window.quizDatabase || {};
  const pool = [];
  allowedSubjectKeys().forEach(function (k) {
    const sub = db[k];
    if (sub && sub.questions) sub.questions.forEach(function (q) { pool.push({ s: k, id: q.id }); });
  });
  return pool;
}

function dailySolvedMap(serverRows, day) {
  if (localDailyDay !== day) { localDailySolved = {}; localDailyDay = day; }
  const solved = {};
  serverRows.forEach(function (r) {
    if (r.source === 'daily') solved[r.subject_key + ':' + r.question_id] = true;
  });
  Object.keys(localDailySolved).forEach(function (k) { solved[k] = true; });
  return solved;
}

function itemExists(it) { return !!getQuestion(it.s, it.id); }

async function refreshDaily() {
  if (!currentUser || currentUser.status !== 'approved') return;
  const seq = ++dailyRefreshSeq;
  dailyLoading = true;
  dailyError = '';
  renderDailyCard();

  try {
    await Promise.race([Cloud.flush(), sleep(3000)]);

    const day = todayStr();
    const startMs = todayStartMs();
    const results = await Promise.all([
      Cloud.getDailySet(day),
      Cloud.loadAttemptsSince(new Date(startMs).toISOString())
    ]);
    if (seq !== dailyRefreshSeq) return;

    const row = results[0];
    const todayRows = results[1];
    const solved = dailySolvedMap(todayRows, day);

    let items = row && Array.isArray(row.items) ? row.items.filter(itemExists) : null;
    if (!items) {
      const stats = await Cloud.loadQuestionStats();
      items = DailyPlanner.compose({ goal: currentUser.daily_goal, pool: buildPool(), stats: stats, todayStart: startMs });
      await Cloud.saveDailySet(day, currentUser.daily_goal, items);
    }
    if (seq !== dailyRefreshSeq) return;

    dailyState = { day: day, items: items, solved: solved, todayTotal: todayRows.length };
  } catch (e) {
    dailyError = e.message;
  } finally {
    if (seq === dailyRefreshSeq) {
      dailyLoading = false;
      if ($('subject-view').style.display === 'block') renderDailyCard();
    }
  }
}

/** 목표 문항 수를 바꾸거나 "더 풀기"를 눌렀을 때: 푼 문제는 유지하고 안 푼 자리만 조정 */
async function resizeDaily(newGoal) {
  if (!dailyState) return;
  const stats = await Cloud.loadQuestionStats();
  const items = DailyPlanner.resize(dailyState.items, dailyState.solved, newGoal, {
    pool: buildPool(), stats: stats, todayStart: todayStartMs()
  });
  await Cloud.saveDailySet(dailyState.day, newGoal, items);
  dailyState.items = items;
}

async function extendDaily(extra) {
  if (!dailyState || dailyLoading) return;
  try {
    await resizeDaily(dailyState.items.length + extra);
    toast('오늘의 문제를 ' + extra + '개 더 추가했어요.');
    renderDailyCard();
  } catch (e) {
    toast(e.message, 3500);
  }
}

function dailyCounts() {
  const items = dailyState.items;
  const total = items.length;
  let done = 0;
  const left = { review: 0, new: 0, refresh: 0 };
  items.forEach(function (it) {
    if (dailyState.solved[it.s + ':' + it.id]) done++;
    else left[it.why] = (left[it.why] || 0) + 1;
  });
  return { total: total, done: done, left: left, remaining: total - done };
}

function renderDailyCard() {
  const box = $('daily-card');
  if (!box) return;

  if (dailyLoading && !dailyState) {
    box.innerHTML = '<div class="daily-title"><i class="fa-solid fa-bullseye"></i> 오늘의 문제</div>' +
      '<div class="daily-sub"><i class="fa-solid fa-rotate fa-spin"></i> 오늘의 문제를 준비하는 중...</div>';
    return;
  }
  if (dailyError && !dailyState) {
    box.innerHTML = '<div class="daily-title"><i class="fa-solid fa-bullseye"></i> 오늘의 문제</div>' +
      '<div class="daily-sub" style="color:var(--error-orange);">불러오지 못했어요: ' + esc(dailyError) + '</div>' +
      '<div class="daily-actions"><button class="btn-action-sm btn-review-expl" onclick="refreshDaily()">다시 시도</button></div>';
    return;
  }
  if (!dailyState) { box.innerHTML = ''; return; }

  const c = dailyCounts();
  const pct = c.total ? Math.round((c.done / c.total) * 100) : 0;
  const complete = c.total > 0 && c.remaining === 0;
  const mix = [];
  if (c.left.review) mix.push('복습 ' + c.left.review);
  if (c.left.new) mix.push('새 문제 ' + c.left.new);
  if (c.left.refresh) mix.push('재확인 ' + c.left.refresh);

  const dailySessions = sessionsCache.filter(function (s) { return s.mode === 'daily'; }).slice(0, 7);
  let histHtml = '';
  if (dailySessions.length) {
    histHtml = dailySessions.map(renderHistoryItem).join('');
  } else {
    histHtml = '<div style="font-size:0.8rem; color:var(--text-sub); text-align:center; padding:8px;">아직 오늘의 문제 풀이 이력이 없습니다.</div>';
  }

  box.innerHTML =
    '<div class="daily-head">' +
      '<div class="daily-title"><i class="fa-solid fa-bullseye"></i> 오늘의 문제 ' +
        '<span class="daily-date">' + esc(dailyState.day) + '</span></div>' +
      '<div class="daily-head-btns">' +
        '<button class="card-more-btn" onclick="openSettingsModal()" title="목표·과목 설정"><i class="fa-solid fa-sliders"></i></button>' +
        '<button class="card-more-btn" onclick="toggleDailyHistory()" title="오늘의 문제 이력"><i class="fa-solid fa-clock-rotate-left"></i></button>' +
      '</div>' +
    '</div>' +
    '<div class="daily-progress-row">' +
      '<div class="daily-count"><b>' + c.done + '</b> / ' + c.total + '</div>' +
      '<div class="daily-bar"><div class="daily-bar-fill" style="width:' + pct + '%;"></div></div>' +
    '</div>' +
    (complete
      ? '<div class="daily-sub" style="color:var(--correct-green); font-weight:600;"><i class="fa-solid fa-circle-check"></i> 오늘의 목표를 달성했어요!</div>'
      : '<div class="daily-sub">남은 ' + c.remaining + '문제' + (mix.length ? ' · ' + mix.join(' · ') : '') + '</div>') +
    '<div class="daily-sub" style="margin-top:2px;">오늘 푼 문제 총 ' + (dailyState.todayTotal + Object.keys(localDailySolved).length) + '개 (자유 학습 포함)</div>' +
    '<div class="daily-actions">' +
      (c.total === 0
        ? '<span class="daily-sub">선택한 과목에 풀 문제가 없어요. 설정에서 과목을 확인해 주세요.</span>'
        : (complete
          ? '<button class="btn-start-badge" onclick="extendDaily(10)"><i class="fa-solid fa-plus"></i> 10문제 더 풀기</button>'
          : '<button class="btn-start-badge" onclick="startDailyQuiz()"><i class="fa-solid fa-play"></i> ' + (c.done > 0 ? '이어서 풀기' : '오늘의 문제 시작') + '</button>')) +
    '</div>' +
    '<div class="daily-history" id="daily-history" style="display:none;">' + histHtml + '</div>';
}

function toggleDailyHistory() {
  const el = $('daily-history');
  if (el) el.style.display = el.style.display === 'flex' ? 'none' : 'flex';
}

function startDailyQuiz() {
  if (!dailyState) return;
  const list = [];
  dailyState.items.forEach(function (it) {
    if (dailyState.solved[it.s + ':' + it.id]) return;
    const q = getQuestion(it.s, it.id);
    if (q) list.push(cloneQuestion(q, it.s, it.why));
  });
  if (!list.length) { toast('오늘 풀 문제를 모두 풀었어요!'); return; }
  startQuiz('daily', list, 'daily');
}

// ---------------------------------------------------------------- 내 설정
function openSettingsModal() {
  $('set-name').value = currentUser.display_name || '';
  $('set-goal').value = currentUser.daily_goal;

  const sel = currentUser.daily_subjects || [];
  const allChecked = sel.length === 0;
  $('set-all-subjects').checked = allChecked;

  let html = '';
  [1, 2].forEach(function (period) {
    html += '<div class="set-period">' + period + '교시</div><div class="set-subject-grid">';
    subjectMeta.filter(function (m) { return m.period === period; }).forEach(function (m) {
      const on = allChecked || sel.indexOf(m.key) !== -1;
      html += '<label class="set-subject-item"><input type="checkbox" class="set-subject-cb" value="' + m.key + '"' + (on ? ' checked' : '') + '> <span>' + esc(m.name) + '</span></label>';
    });
    html += '</div>';
  });
  $('set-subject-list').innerHTML = html;
  $('settings-modal').style.display = 'flex';
}

function toggleAllSubjects(checked) {
  document.querySelectorAll('.set-subject-cb').forEach(function (cb) { cb.checked = checked; });
}

async function saveSettings() {
  const name = $('set-name').value.trim();
  let goal = parseInt($('set-goal').value, 10);
  if (!name) { toast('이름을 입력해 주세요.'); return; }
  if (!(goal >= 5 && goal <= 200)) { toast('하루 목표는 5~200 사이로 입력해 주세요.'); return; }

  const checked = Array.prototype.map.call(document.querySelectorAll('.set-subject-cb:checked'), function (cb) { return cb.value; });
  if (!checked.length) { toast('과목을 하나 이상 선택해 주세요.'); return; }
  const subjects = checked.length === subjectMeta.length ? [] : checked;

  const goalChanged = goal !== currentUser.daily_goal;
  const subjectsChanged = JSON.stringify((currentUser.daily_subjects || []).slice().sort()) !== JSON.stringify(subjects.slice().sort());

  try {
    currentUser = await Cloud.updateProfile({ display_name: name, daily_goal: goal, daily_subjects: subjects });
    $('current-username').textContent = currentUser.display_name;
    closeModal('settings-modal');
    toast('설정을 저장했어요.');
    if (goalChanged && dailyState && !subjectsChanged) {
      await resizeDaily(goal);
      renderDailyCard();
    } else if (subjectsChanged) {
      // 과목이 바뀌면 안 푼 문제를 새 과목 기준으로 다시 구성 (푼 문제는 유지)
      await rebuildUnsolved(goal);
      renderDailyCard();
    }
  } catch (e) {
    toast(e.message, 4000);
  }
}

async function rebuildUnsolved(goal) {
  if (!dailyState) return;
  const solvedItems = dailyState.items.filter(function (it) { return dailyState.solved[it.s + ':' + it.id]; });
  const stats = await Cloud.loadQuestionStats();
  const exclude = {};
  solvedItems.forEach(function (it) { exclude[it.s + ':' + it.id] = true; });
  const extra = DailyPlanner.compose({
    goal: Math.max(0, goal - solvedItems.length), pool: buildPool(), stats: stats, exclude: exclude, todayStart: todayStartMs()
  });
  const items = solvedItems.concat(extra);
  await Cloud.saveDailySet(dailyState.day, goal, items);
  dailyState.items = items;
}

// ---------------------------------------------------------------- 오류 신고
function openReportModal() {
  const q = quizQuestions[currentIndex];
  $('report-question-preview').value = q ? q.question : '';
  $('report-content').value = '';
  $('report-modal').style.display = 'flex';
}

async function submitReport() {
  const content = $('report-content').value.trim();
  if (!content) { toast('내용을 입력해 주세요.'); return; }
  const q = quizQuestions[currentIndex];
  if (!q) return;
  try {
    await Cloud.createReport({
      reporterName: currentUser.display_name || currentUser.email || '',
      subjectKey: q._s || currentSubjectKey,
      questionId: q.id,
      questionText: q.question,
      content: content
    });
    closeModal('report-modal');
    toast('오류 검토 요청이 접수되었습니다.');
  } catch (e) {
    toast(e.message, 4000);
  }
}

async function openReportListModal() {
  const container = $('report-list-container');
  container.innerHTML = '<div style="color:var(--text-sub); text-align:center; padding:32px 0;"><i class="fa-solid fa-rotate fa-spin"></i> 불러오는 중...</div>';
  $('report-list-modal').style.display = 'flex';
  $('report-modal-title').textContent = currentUser.role === 'admin' ? '접수된 오류 검토 리스트' : '내가 보낸 오류 검토 요청';

  try {
    const reports = await Cloud.listReports();
    if (!reports.length) {
      container.innerHTML = '<div style="color:var(--text-sub); text-align:center; padding:32px 0;">접수된 검토 요청이 없습니다.</div>';
      return;
    }
    const isAdmin = currentUser.role === 'admin';
    container.innerHTML = reports.map(function (r) {
      const resolved = r.status === 'resolved';
      return '<div class="report-item' + (resolved ? ' is-resolved' : '') + '">' +
        '<div class="report-meta">' + esc(fmtDate(r.created_at)) + ' • 작성자: ' + esc(r.reporter_name || '-') +
          ' • ' + esc(subjectName(r.subject_key)) + ' ' + esc(r.question_id) + '번 ' +
          '<span class="status-pill ' + (resolved ? 'ok' : 'open') + '">' + (resolved ? '처리 완료' : '접수') + '</span></div>' +
        '<div class="report-q">[문제] ' + esc(r.question_text) + '</div>' +
        '<div class="report-content">' + esc(r.content) + '</div>' +
        (isAdmin
          ? '<div class="report-actions">' +
              '<button class="btn-action-sm btn-review-expl" onclick="toggleReportStatus(' + Number(r.id) + ', \'' + (resolved ? 'open' : 'resolved') + '\')">' + (resolved ? '다시 열기' : '처리 완료로 표시') + '</button>' +
              '<button class="btn-action-sm btn-retry-wrong" onclick="removeReport(' + Number(r.id) + ')">삭제</button>' +
            '</div>'
          : '') +
        '</div>';
    }).join('');
  } catch (e) {
    container.innerHTML = '<div style="color:var(--error-orange); text-align:center; padding:32px 0;">' + esc(e.message) + '</div>';
  }
}

async function toggleReportStatus(id, status) {
  try { await Cloud.setReportStatus(id, status); openReportListModal(); }
  catch (e) { toast(e.message, 4000); }
}

async function removeReport(id) {
  if (!confirm('이 신고를 삭제할까요?')) return;
  try { await Cloud.deleteReport(id); openReportListModal(); }
  catch (e) { toast(e.message, 4000); }
}

// ---------------------------------------------------------------- 회원 관리 (관리자)
async function updateAdminBadge() {
  if (!currentUser || currentUser.role !== 'admin') return;
  try {
    const members = await Cloud.adminListMembers();
    const pending = members.filter(function (m) { return m.status === 'pending'; }).length;
    $('admin-pending-badge').textContent = pending ? pending : '';
    $('admin-pending-badge').style.display = pending ? 'inline-block' : 'none';
  } catch (e) { /* 배지는 부가 정보라 실패해도 조용히 넘어감 */ }
}

const STATUS_LABEL = { pending: '승인 대기', approved: '승인됨', blocked: '차단됨' };

async function openAdminModal() {
  const container = $('admin-user-list');
  container.innerHTML = '<div style="color:var(--text-sub); text-align:center; padding:32px 0;"><i class="fa-solid fa-rotate fa-spin"></i> 불러오는 중...</div>';
  $('admin-modal').style.display = 'flex';

  try {
    const members = await Cloud.adminListMembers();
    let html = '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
      '<th>회원</th><th>상태</th><th>풀이</th><th>마지막 활동</th><th>관리</th></tr></thead><tbody>';

    members.forEach(function (m) {
      const me = m.id === currentUser.id;
      const rate = Number(m.total_attempts) ? Math.round(Number(m.correct_attempts) / Number(m.total_attempts) * 100) + '%' : '-';
      const btns = [];
      if (!me) {
        if (m.status !== 'approved') btns.push('<button class="btn-action-sm btn-review-expl" onclick="adminAction(\'' + m.id + '\',\'' + m.role + '\',\'approved\')">승인</button>');
        if (m.status !== 'blocked') btns.push('<button class="btn-action-sm btn-retry-wrong" onclick="adminAction(\'' + m.id + '\',\'' + m.role + '\',\'blocked\')">차단</button>');
        if (m.status === 'approved' && m.role !== 'admin') btns.push('<button class="btn-action-sm btn-review-expl" onclick="adminAction(\'' + m.id + '\',\'admin\',\'approved\')">관리자로</button>');
        if (m.role === 'admin') btns.push('<button class="btn-action-sm btn-review-expl" onclick="adminAction(\'' + m.id + '\',\'user\',\'' + m.status + '\')">일반으로</button>');
        btns.push('<button class="btn-action-sm btn-retry-wrong" onclick="adminReset(\'' + m.id + '\')">기록 초기화</button>');
      }
      html += '<tr>' +
        '<td><strong>' + esc(m.display_name || '-') + '</strong>' + (m.role === 'admin' ? ' <span class="status-pill ok">관리자</span>' : '') +
          '<br><span style="color:var(--text-sub); font-size:0.75rem;">' + esc(m.email || '') + '</span></td>' +
        '<td><span class="status-pill ' + (m.status === 'approved' ? 'ok' : (m.status === 'blocked' ? 'bad' : 'open')) + '">' + STATUS_LABEL[m.status] + '</span></td>' +
        '<td>' + Number(m.total_attempts) + '문제<br><span style="color:var(--text-sub); font-size:0.75rem;">정답률 ' + rate + '</span></td>' +
        '<td>' + (m.last_active ? esc(fmtDate(m.last_active)) : '-') + '</td>' +
        '<td><div class="admin-btn-col">' + (me ? '<span style="color:var(--text-sub); font-size:0.75rem;">나</span>' : btns.join('')) + '</div></td>' +
        '</tr>';
    });
    html += '</tbody></table></div>';
    container.innerHTML = html;
    updateAdminBadge();
  } catch (e) {
    container.innerHTML = '<div style="color:var(--error-orange); text-align:center; padding:32px 0;">' + esc(e.message) + '</div>';
  }
}

async function adminAction(id, role, status) {
  try { await Cloud.adminSetMember(id, role, status); toast('변경했어요.'); openAdminModal(); }
  catch (e) { toast(e.message, 4000); }
}

async function adminReset(id) {
  if (!confirm('이 회원의 풀이 기록(문항 기록·회차·오늘의 문제)을 모두 삭제합니다. 되돌릴 수 없어요. 계속할까요?')) return;
  try { await Cloud.adminResetMember(id); toast('기록을 초기화했어요.'); openAdminModal(); }
  catch (e) { toast(e.message, 4000); }
}

// ---------------------------------------------------------------- 과목 목록
function renderHistoryItem(rec) {
  const wrong = rec.wrong_items || [];
  const hasWrong = wrong.length > 0;
  const modeTag = rec.mode === 'retry' ? ' <span class="status-pill open">오답 복습</span>' : '';
  return '<div class="history-card-item">' +
    '<div>' +
      '<div class="history-meta-text">' + esc(fmtDate(rec.created_at)) + modeTag + '</div>' +
      '<div style="font-size:0.85rem; font-weight:600;">정답: ' + rec.correct + ' / ' + rec.total + ' ' +
        (hasWrong
          ? '<span style="color:var(--error-orange); font-size:0.75rem;">(오답 ' + wrong.length + ')</span>'
          : '<span style="color:var(--correct-green); font-size:0.75rem;">(만점)</span>') +
      '</div>' +
    '</div>' +
    '<div class="history-action-btns">' +
      (hasWrong
        ? '<button class="btn-action-sm btn-review-expl" onclick="reviewHistoryExplanation(\'' + rec.id + '\')">오답 문제 해설</button>' +
          '<button class="btn-action-sm btn-retry-wrong" onclick="retryHistoryWrong(\'' + rec.id + '\')">오답 다시풀기</button>'
        : '<span style="font-size:0.75rem; color:var(--correct-green); padding:5px 8px;">오답 없음</span>') +
    '</div>' +
  '</div>';
}

function renderSubjectList() {
  const p1Container = $('subject-list-period-1');
  const p2Container = $('subject-list-period-2');
  const periodVal = $('period-filter').value;
  const searchVal = $('subject-search').value.trim().toLowerCase();
  const db = window.quizDatabase || {};

  p1Container.innerHTML = '';
  p2Container.innerHTML = '';

  $('section-period-1').style.display = (periodVal === 'all' || periodVal === '1') ? 'block' : 'none';
  $('section-period-2').style.display = (periodVal === 'all' || periodVal === '2') ? 'block' : 'none';

  // 열려 있던 이력 패널은 다시 그린 뒤에도 유지
  const openPanels = {};
  document.querySelectorAll('.history-dropdown-panel').forEach(function (p) {
    if (p.style.display === 'flex') openPanels[p.id] = true;
  });

  subjectMeta.forEach(function (meta) {
    if (periodVal !== 'all' && meta.period !== parseInt(periodVal, 10)) return;
    if (searchVal && !meta.name.toLowerCase().includes(searchVal)) return;

    const subData = db[meta.key];
    const count = subData && subData.questions ? subData.questions.length : 0;

    const subjectHistories = sessionsCache.filter(function (h) { return h.subject_key === meta.key; });
    const latest = subjectHistories.length ? subjectHistories[0] : null;

    const wrapper = document.createElement('div');
    wrapper.className = 'subject-card-wrapper';

    const wrongBadge = latest && (latest.wrong_items || []).length
      ? '<div class="recent-wrong-badge" title="최근 회차 오답"><i class="fa-solid fa-triangle-exclamation"></i> ' + latest.wrong_items.length + '</div>'
      : '';

    const card = document.createElement('div');
    card.className = 'subject-card';
    card.onclick = function () { toggleSubjectDropdown(meta.key); };
    card.innerHTML =
      '<div class="subject-card-left">' +
        '<div class="card-icon-box"><i class="fa-regular fa-clone"></i></div>' +
        '<div class="subject-title-area">' +
          '<div class="subject-info-title">' + esc(meta.name) + '</div>' +
          '<div class="subject-info-sub">' + count + ' 문항</div>' +
        '</div>' +
      '</div>' +
      '<div class="subject-card-right">' + wrongBadge +
        '<button class="btn-start-badge" onclick="event.stopPropagation(); startQuiz(\'' + meta.key + '\')" title="전체 ' + count + '문제 바로 풀기"><i class="fa-solid fa-play"></i> 학습 시작</button>' +
        '<button class="card-more-btn" onclick="event.stopPropagation(); toggleSubjectDropdown(\'' + meta.key + '\')" title="회차별 이력 열기"><i class="fa-solid fa-ellipsis"></i></button>' +
      '</div>';

    const panel = document.createElement('div');
    panel.className = 'history-dropdown-panel';
    panel.id = 'history-panel-' + meta.key;
    if (openPanels[panel.id]) panel.style.display = 'flex';
    panel.innerHTML = subjectHistories.length
      ? subjectHistories.slice(0, 20).map(renderHistoryItem).join('')
      : '<div style="font-size:0.8rem; color:var(--text-sub); text-align:center; padding:8px;">풀이 이력이 없습니다.</div>';

    wrapper.appendChild(card);
    wrapper.appendChild(panel);
    (meta.period === 1 ? p1Container : p2Container).appendChild(wrapper);
  });
}

function filterSubjects() { renderSubjectList(); }

function toggleSubjectDropdown(key) {
  const panel = $('history-panel-' + key);
  if (panel) panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
}

function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---------------------------------------------------------------- 문제 풀이
/**
 * @param key  과목 key (섞인 문제 세트는 'daily')
 * @param specificQuestions  지정 문제 목록 (각 문제에 _s=과목 key 가 있어야 함)
 * @param mode 'free' | 'retry' | 'daily'
 */
function startQuiz(key, specificQuestions, mode) {
  const db = window.quizDatabase || {};
  mode = mode || 'free';

  let baseQuestions;
  if (specificQuestions) {
    baseQuestions = specificQuestions.map(function (item) {
      const c = JSON.parse(JSON.stringify(item));
      c._s = c._s || key;
      return c;
    });
  } else {
    const sub = db[key];
    if (!sub || !sub.questions || !sub.questions.length) { toast('문항 데이터를 불러올 수 없습니다.'); return; }
    baseQuestions = sub.questions.map(function (q) { return cloneQuestion(q, key); });
  }
  if (!baseQuestions.length) { toast('풀 문제가 없습니다.'); return; }

  currentSubjectKey = key;
  currentMode = mode;
  currentSessionId = Cloud.newId();

  const shuffleQuestions = $('toggle-shuffle-questions').checked;
  const shuffleOptions = $('toggle-shuffle-options').checked;

  if (shuffleQuestions && mode !== 'daily') baseQuestions = shuffleArray(baseQuestions);

  if (shuffleOptions) {
    baseQuestions.forEach(function (q) {
      const originalAnswerIndex = q.answer;
      const mapped = q.options.map(function (optText, idx) {
        const optNum = idx + 1;
        return {
          text: optText,
          originalNum: optNum,
          expl: (q.optionExplanations && q.optionExplanations[optNum]) ? q.optionExplanations[optNum] : ''
        };
      });
      const shuffled = shuffleArray(mapped);

      const newOptions = [];
      const newExplMap = {};
      const orig = [];
      let newAnswer = 1;
      shuffled.forEach(function (item, newIdx) {
        const newNum = newIdx + 1;
        newOptions.push(item.text);
        orig.push(item.originalNum);
        if (item.expl) newExplMap[newNum] = item.expl;
        if (item.originalNum === originalAnswerIndex) newAnswer = newNum;
      });
      q.options = newOptions;
      q.answer = newAnswer;
      q.optionExplanations = newExplMap;
      q._orig = orig;      // 화면 번호 → 원본 보기 번호 (기록은 원본 기준으로 저장)
    });
  }

  quizQuestions = baseQuestions;
  currentIndex = 0;
  userAnswersRecord = new Array(quizQuestions.length).fill(null);
  correctCount = 0;
  isAnswerChecked = false;

  hideAllViews();
  $('quiz-view').style.display = 'block';

  initProgressBar();
  renderCurrentQuestion();
}

function initProgressBar() {
  const bar = $('segmented-bar');
  bar.innerHTML = '';
  quizQuestions.forEach(function (_, idx) {
    const seg = document.createElement('div');
    seg.className = 'progress-segment';
    seg.id = 'seg-' + idx;
    bar.appendChild(seg);
  });
  $('quiz-badge-correct').innerText = '0';
  $('quiz-badge-total').innerText = quizQuestions.length;
}

function quizHeaderText(q) {
  const base = q._s ? subjectName(q._s) : '';
  if (currentMode === 'daily') return '오늘의 문제 • ' + base + (q._why ? ' • ' + WHY_LABEL[q._why] : '');
  if (currentMode === 'retry') return '오답 복습 • ' + base;
  return base;
}

function renderCurrentQuestion() {
  const q = quizQuestions[currentIndex];
  $('quiz-card-header').textContent = quizHeaderText(q);
  $('quiz-question-text').innerText = (currentIndex + 1) + '. ' + q.question;

  const optContainer = $('quiz-options-container');
  optContainer.innerHTML = '';

  q.options.forEach(function (optText, idx) {
    const optNum = idx + 1;
    const btn = document.createElement('div');
    btn.className = 'option-btn';
    btn.onclick = function () { selectAnswer(optNum); };

    const individualExpl = (q.optionExplanations && q.optionExplanations[optNum]) ? q.optionExplanations[optNum] : '';
    btn.innerHTML =
      '<div class="option-top-row">' +
        '<span class="option-idx" id="opt-icon-' + optNum + '">' + optNum + '</span>' +
        '<span>' + optText + '</span>' +
      '</div>' +
      '<div class="option-explanation-inline" id="opt-expl-' + optNum + '">' + individualExpl + '</div>';
    optContainer.appendChild(btn);
  });

  $('prev-btn').disabled = (currentIndex === 0);

  const previousAnswer = userAnswersRecord[currentIndex];
  if (previousAnswer !== null) {
    restoreQuestionState(previousAnswer);
  } else {
    isAnswerChecked = false;
    $('bottom-feedback-bar').style.display = 'none';
    const banner = $('status-msg-banner');
    banner.className = 'status-msg-banner';
    banner.style.display = 'none';
    $('common-explanation-box').style.display = 'none';
  }
}

function selectAnswer(userPick) {
  if (isAnswerChecked) return;
  isAnswerChecked = true;

  const q = quizQuestions[currentIndex];
  userAnswersRecord[currentIndex] = userPick;

  // 풀 때마다 즉시 기록 (중간에 나가도 남음)
  const correct = userPick === q.answer;
  const picked = userPick > 0 ? (q._orig ? q._orig[userPick - 1] : userPick) : -1;
  Cloud.logAttempt({
    subjectKey: q._s || currentSubjectKey,
    questionId: q.id,
    picked: picked,
    correct: correct,
    source: currentMode,
    sessionId: currentSessionId
  });
  if (currentMode === 'daily') {
    if (localDailyDay !== todayStr()) { localDailySolved = {}; localDailyDay = todayStr(); }
    localDailySolved[(q._s || currentSubjectKey) + ':' + q.id] = true;
    if (dailyState) dailyState.solved[(q._s || currentSubjectKey) + ':' + q.id] = true;
  }

  restoreQuestionState(userPick);
  updateProgressStats();
  $('bottom-feedback-bar').style.display = 'flex';
}

function restoreQuestionState(userPick) {
  isAnswerChecked = true;
  const q = quizQuestions[currentIndex];
  const isCorrect = (userPick === q.answer);
  const optButtons = document.querySelectorAll('.option-btn');
  const segment = $('seg-' + currentIndex);
  const banner = $('status-msg-banner');

  optButtons.forEach(function (btn) { btn.classList.add('disabled'); });

  q.options.forEach(function (_, idx) {
    const explElem = $('opt-expl-' + (idx + 1));
    if (explElem && explElem.innerText.trim() !== '') explElem.style.display = 'block';
  });

  const commonExplText = (q.commonExplanations && q.commonExplanations.length > 0) ? q.commonExplanations.join('<br>') : '';
  if (commonExplText) {
    $('common-explanation-text').innerHTML = commonExplText;
    $('common-explanation-box').style.display = 'block';
  }

  if (isCorrect) {
    if (segment) { segment.classList.remove('failed'); segment.classList.add('passed'); }
    optButtons[userPick - 1].classList.add('correct-choice');
    $('opt-icon-' + userPick).innerHTML = '<i class="fa-solid fa-check"></i>';
    banner.innerText = '잘하고 있어요!';
    banner.className = 'status-msg-banner correct';
  } else {
    if (segment) { segment.classList.remove('passed'); segment.classList.add('failed'); }
    if (userPick > 0 && userPick <= optButtons.length) {
      optButtons[userPick - 1].classList.add('wrong-choice');
      $('opt-icon-' + userPick).innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
    optButtons[q.answer - 1].classList.add('correct-highlight');
    banner.innerText = '걱정하지 마세요, 아직 배우고 있잖아요!';
    banner.className = 'status-msg-banner wrong';
  }

  $('bottom-feedback-bar').style.display = 'flex';
}

function updateProgressStats() {
  let count = 0;
  userAnswersRecord.forEach(function (ans, idx) {
    if (ans !== null && ans === quizQuestions[idx].answer) count++;
  });
  correctCount = count;
  $('quiz-badge-correct').innerText = correctCount;
}

function handleDontKnow() {
  if (isAnswerChecked) return;
  selectAnswer(-1);
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    renderCurrentQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function nextQuestion() {
  if (currentIndex < quizQuestions.length - 1) {
    currentIndex++;
    renderCurrentQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    finishQuizSession();
  }
}

function finishQuizSession() {
  $('bottom-feedback-bar').style.display = 'none';
  $('quiz-view').style.display = 'none';

  currentSessionWrongItems = [];
  quizQuestions.forEach(function (q, idx) {
    const userAns = userAnswersRecord[idx];
    if (userAns === null || userAns !== q.answer) currentSessionWrongItems.push(Object.assign({}, q));
  });

  const wrongItems = currentSessionWrongItems.map(function (q) { return { s: q._s || currentSubjectKey, id: q.id }; });
  const rec = {
    id: currentSessionId,
    subjectKey: currentSubjectKey,
    mode: currentMode,
    total: quizQuestions.length,
    correct: correctCount,
    wrongItems: wrongItems
  };
  Cloud.saveSession(rec);
  const localRec = {
    id: rec.id, subject_key: rec.subjectKey, mode: rec.mode, total: rec.total,
    correct: rec.correct, wrong_items: rec.wrongItems, created_at: new Date().toISOString()
  };
  localSessions.unshift(localRec);
  sessionsCache.unshift(localRec);

  let extra = '';
  let continueDaily = false;
  if (currentMode === 'daily' && dailyState) {
    const c = dailyCounts();
    if (c.remaining === 0) {
      extra = '<br><span style="color:var(--correct-green); font-weight:700;"><i class="fa-solid fa-circle-check"></i> 오늘의 목표를 달성했어요!</span>';
    } else {
      extra = '<br><span style="color:var(--text-sub);">오늘 목표까지 ' + c.remaining + '문제 남았어요.</span>';
      continueDaily = true;
    }
  }

  $('result-summary-stats-text').innerHTML =
    '총 ' + quizQuestions.length + '문항 중 <strong style="color:var(--correct-green);">' + correctCount + '문항</strong> 정답<br>' +
    '<span style="color:var(--error-orange); font-weight:600;">오답 ' + currentSessionWrongItems.length + '문항</span>' + extra;

  const retryBtn = $('result-retry-wrong-btn');
  if (currentSessionWrongItems.length > 0) {
    retryBtn.innerText = '오답 ' + currentSessionWrongItems.length + '문제 다시 풀기';
    retryBtn.style.display = 'inline-block';
  } else {
    retryBtn.style.display = 'none';
  }
  $('result-continue-daily-btn').style.display = continueDaily ? 'inline-block' : 'none';

  const wrongSection = $('wrong-review-section');
  const wrongContainer = $('wrong-items-container');
  if (currentSessionWrongItems.length > 0) {
    wrongSection.style.display = 'block';
    wrongContainer.innerHTML = '';
    currentSessionWrongItems.forEach(function (q, idx) {
      const itemBox = document.createElement('div');
      itemBox.className = 'wrong-item-box';

      let optionsHtml = '';
      q.options.forEach(function (opt, optIdx) {
        const optNum = optIdx + 1;
        const isAns = (optNum === q.answer);
        const expl = (q.optionExplanations && q.optionExplanations[optNum]) ? q.optionExplanations[optNum] : '';
        optionsHtml +=
          '<div class="wrong-item-optline ' + (isAns ? 'is-answer' : '') + '">' +
            optNum + '. ' + opt + ' ' + (isAns ? '<i class="fa-solid fa-check" style="margin-left:4px;"></i>' : '') +
            (expl ? '<div style="font-size:0.75rem; color:#94a3b8; margin-top:2px; margin-left:14px;">↳ ' + expl + '</div>' : '') +
          '</div>';
      });
      const commonExpl = (q.commonExplanations && q.commonExplanations.length > 0) ? q.commonExplanations.join('<br>') : '';
      itemBox.innerHTML =
        '<div class="wrong-item-qtitle">[오답 ' + (idx + 1) + '] ' + esc(q.question) + '</div>' +
        '<div class="wrong-item-optlist">' + optionsHtml + '</div>' +
        (commonExpl ? '<div class="wrong-item-expl"><strong>[핵심 TIP]</strong> ' + commonExpl + '</div>' : '');
      wrongContainer.appendChild(itemBox);
    });
  } else {
    wrongSection.style.display = 'none';
  }

  $('quiz-result-view').style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function retryWrongQuestions() {
  if (!currentSessionWrongItems.length) return;
  const list = [];
  currentSessionWrongItems.forEach(function (w) {
    const s = w._s || currentSubjectKey;
    const orig = getQuestion(s, w.id);
    if (orig) list.push(cloneQuestion(orig, s));
  });
  startQuiz(currentSubjectKey, list, 'retry');
}

function continueDailyFromResult() {
  $('quiz-result-view').style.display = 'none';
  startDailyQuiz();
}

function handleGlobalKeydown(e) {
  if ($('quiz-view').style.display !== 'block') return;
  if (anyModalOpen()) return;
  const tag = (e.target && e.target.tagName) || '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

  if (!isAnswerChecked) {
    if (['1', '2', '3', '4', '5'].indexOf(e.key) !== -1) {
      const pick = parseInt(e.key, 10);
      const q = quizQuestions[currentIndex];
      if (q && pick <= q.options.length) selectAnswer(pick);
    }
  } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
    e.preventDefault();
    nextQuestion();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prevQuestion();
  }
}

// ---------------------------------------------------------------- 이력에서 오답 복습
function wrongQuestionsOf(rec) {
  const list = [];
  (rec.wrong_items || []).forEach(function (w) {
    const q = getQuestion(w.s, w.id);
    if (q) list.push(cloneQuestion(q, w.s));
  });
  return list;
}

function retryHistoryWrong(sessionId) {
  const rec = sessionsCache.find(function (h) { return h.id === sessionId; });
  if (!rec) return;
  const list = wrongQuestionsOf(rec);
  if (!list.length) { toast('이 회차에는 오답 문제가 없습니다.'); return; }
  startQuiz(rec.subject_key, list, 'retry');
}

function reviewHistoryExplanation(sessionId) {
  const rec = sessionsCache.find(function (h) { return h.id === sessionId; });
  if (!rec) return;
  const wrongQuestions = wrongQuestionsOf(rec);
  if (!wrongQuestions.length) { toast('이 회차에는 오답 문제가 없습니다.'); return; }

  const title = rec.subject_key === 'daily' ? '오늘의 문제' : subjectName(rec.subject_key);
  $('expl-modal-title').innerText = title + ' - 오답 문제 해설 (' + wrongQuestions.length + '문항)';
  const container = $('expl-modal-content');
  container.innerHTML = '';

  wrongQuestions.forEach(function (q, idx) {
    const itemDiv = document.createElement('div');
    itemDiv.style.cssText = 'background:var(--card-inner); border:1px solid var(--border-color); border-radius:10px; padding:14px; margin-bottom:12px;';

    let optionsHtml = '';
    q.options.forEach(function (opt, optIdx) {
      const optNum = optIdx + 1;
      const isAns = (optNum === q.answer);
      const expl = (q.optionExplanations && q.optionExplanations[optNum]) ? q.optionExplanations[optNum] : '';
      optionsHtml +=
        '<div style="margin-top:5px; font-size:0.85rem; color:' + (isAns ? 'var(--correct-green)' : 'var(--text-sub)') + '; font-weight:' + (isAns ? '700' : '400') + ';">' +
          optNum + '. ' + opt + ' ' + (isAns ? '✓ (정답)' : '') +
          (expl ? '<div style="font-size:0.75rem; color:#cbd5e1; margin-left:12px; margin-top:2px;">↳ ' + expl + '</div>' : '') +
        '</div>';
    });
    const commonExpl = (q.commonExplanations && q.commonExplanations.length > 0) ? q.commonExplanations.join('<br>') : '';
    itemDiv.innerHTML =
      '<div style="font-weight:700; margin-bottom:6px; font-size:0.92rem; color:#f87171;">[오답 ' + (idx + 1) + '] ' + esc(q.question) + '</div>' +
      '<div style="margin-bottom:8px;">' + optionsHtml + '</div>' +
      (commonExpl ? '<div style="background:rgba(96,165,250,0.1); border-left:3px solid #60a5fa; padding:6px 10px; font-size:0.78rem; color:#93c5fd;"><strong>[핵심 TIP]</strong> ' + commonExpl + '</div>' : '');
    container.appendChild(itemDiv);
  });

  $('explanation-modal').style.display = 'flex';
}
