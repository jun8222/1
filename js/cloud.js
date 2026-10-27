/* =====================================================================
 * 클라우드(Supabase) 연동 모듈
 *  - 구글 로그인 / 프로필
 *  - 풀이 기록 저장 (끊겨도 잃어버리지 않도록 로컬 대기열 + 자동 재전송)
 *  - 오늘의 문제, 오류 신고, 관리자 기능
 * ===================================================================== */
window.Cloud = (function () {
  'use strict';

  var client = null;
  var session = null;
  var authListener = null;
  var syncListener = null;

  var QUEUE_KEY = 'dq_pending_queue_v1';
  var flushing = false;
  var retryTimer = null;
  var failCount = 0;

  function cfg() { return window.APP_CONFIG || {}; }

  function isConfigured() {
    var c = cfg();
    return !!(c.SUPABASE_URL && c.SUPABASE_ANON_KEY &&
      c.SUPABASE_URL.indexOf('YOUR_') !== 0 && c.SUPABASE_ANON_KEY.indexOf('YOUR_') !== 0 &&
      window.supabase && window.supabase.createClient);
  }

  function uid() { return session && session.user ? session.user.id : null; }

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  function check(res, what) {
    if (res.error) {
      var e = new Error((what || '요청') + ' 실패: ' + res.error.message);
      e.cause = res.error;
      throw e;
    }
    return res.data;
  }

  // ------------------------------------------------------------ 초기화 / 인증
  async function init(onAuthChange, onSyncChange) {
    authListener = onAuthChange;
    syncListener = onSyncChange;
    client = window.supabase.createClient(cfg().SUPABASE_URL, cfg().SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'pkce' }
    });
    var res = await client.auth.getSession();
    session = res.data.session;

    // 콜백 안에서 바로 supabase 를 다시 부르면 교착될 수 있어 다음 틱으로 넘김
    client.auth.onAuthStateChange(function (event, s) {
      session = s;
      setTimeout(function () { if (authListener) authListener(event, s); }, 0);
    });

    window.addEventListener('online', function () { flush(); });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') flush();
    });
    return session;
  }

  function getSession() { return session; }

  async function signInWithGoogle() {
    var redirectTo = window.location.origin + window.location.pathname;
    var res = await client.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirectTo } });
    check(res, '구글 로그인');
  }

  async function signOut() {
    await client.auth.signOut();
  }

  // ------------------------------------------------------------ 프로필
  async function getProfile() {
    var id = uid();
    if (!id) return null;
    var res = await client.from('profiles').select('*').eq('id', id).maybeSingle();
    return check(res, '프로필 불러오기');
  }

  async function updateProfile(patch) {
    var id = uid();
    var res = await client.from('profiles').update(patch).eq('id', id).select().single();
    return check(res, '프로필 저장');
  }

  // ------------------------------------------------------------ 대기열 (오프라인/일시 오류 대비)
  function readQueue() {
    try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); } catch (e) { return []; }
  }
  function writeQueue(q) {
    try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); } catch (e) { /* 저장 공간 부족 등은 무시 */ }
  }
  function pendingCount() {
    var id = uid();
    return readQueue().filter(function (x) { return x.u === id; }).length;
  }
  function notifySync(state) {
    if (syncListener) syncListener({ state: state, pending: pendingCount() });
  }

  function enqueue(table, row) {
    var q = readQueue();
    q.push({ q: uuid(), u: uid(), t: table, r: row });
    writeQueue(q);
    notifySync('pending');
    flush();
  }

  /** 대기열 전송. 같은 client_id / session id 는 서버에서 무시되므로 여러 번 보내도 안전 */
  async function flush() {
    if (flushing || !client || !uid()) return;
    var me = uid();
    var all = readQueue();
    var mine = all.filter(function (x) { return x.u === me; });
    if (!mine.length) { notifySync('idle'); return; }

    flushing = true;
    notifySync('syncing');
    try {
      var attempts = mine.filter(function (x) { return x.t === 'attempts'; }).map(function (x) { return x.r; });
      var sessions = mine.filter(function (x) { return x.t === 'sessions'; }).map(function (x) { return x.r; });

      if (attempts.length) {
        check(await client.from('attempts').upsert(attempts, { onConflict: 'user_id,client_id', ignoreDuplicates: true }), '기록 저장');
      }
      if (sessions.length) {
        check(await client.from('sessions').upsert(sessions, { onConflict: 'id', ignoreDuplicates: true }), '회차 저장');
      }

      // 방금 보낸 항목만 id 로 제거 (전송 중에 새로 쌓인 항목은 남겨 둠)
      var sentIds = {};
      mine.forEach(function (m) { sentIds[m.q] = true; });
      writeQueue(readQueue().filter(function (x) { return !sentIds[x.q]; }));
      failCount = 0;
      notifySync('idle');
    } catch (e) {
      // 권한 오류(승인 취소/차단 등)는 재시도해도 소용없으므로 대기열에서 버림
      if (e.cause && e.cause.code === '42501') {
        var dropIds = {};
        mine.forEach(function (m) { dropIds[m.q] = true; });
        writeQueue(readQueue().filter(function (x) { return !dropIds[x.q]; }));
        notifySync('denied');
        return;
      }
      failCount++;
      console.warn('[sync]', e.message);
      notifySync(failCount >= 3 ? 'error' : 'pending');
      clearTimeout(retryTimer);
      retryTimer = setTimeout(flush, Math.min(60000, 5000 * failCount));
    } finally {
      flushing = false;
    }
  }

  // ------------------------------------------------------------ 풀이 기록
  function logAttempt(a) {
    enqueue('attempts', {
      client_id: uuid(),
      subject_key: a.subjectKey,
      question_id: a.questionId,
      picked: a.picked,
      correct: a.correct,
      source: a.source,
      session_id: a.sessionId || null,
      created_at: new Date().toISOString()
    });
  }

  function saveSession(s) {
    enqueue('sessions', {
      id: s.id,
      subject_key: s.subjectKey,
      mode: s.mode,
      total: s.total,
      correct: s.correct,
      wrong_items: s.wrongItems,
      created_at: new Date().toISOString()
    });
  }

  async function listSessions(limit) {
    var res = await client.from('sessions').select('*').eq('user_id', uid())
      .order('created_at', { ascending: false }).limit(limit || 300);
    return check(res, '회차 기록 불러오기');
  }

  /** 문항별 누적 통계 → { 'subject:id': {tries, rights, lastAt(ms), lastCorrect} } */
  async function loadQuestionStats() {
    var out = {};
    var from = 0, size = 1000;
    for (;;) {
      var res = await client.from('question_stats')
        .select('subject_key,question_id,tries,rights,last_at,last_correct')
        .eq('user_id', uid())
        .order('subject_key').order('question_id')
        .range(from, from + size - 1);
      var rows = check(res, '문항 통계 불러오기');
      rows.forEach(function (r) {
        out[r.subject_key + ':' + r.question_id] = {
          tries: Number(r.tries), rights: Number(r.rights),
          lastAt: new Date(r.last_at).getTime(), lastCorrect: r.last_correct
        };
      });
      if (rows.length < size) break;
      from += size;
    }
    return out;
  }

  /** 오답노트/복습완료에서 지운 문항 → { 'subject:id': clearedAtMs } (테이블이 없으면 null) */
  async function loadNoteClears() {
    var res = await client.from('note_clears').select('subject_key,question_id,cleared_at').eq('user_id', uid()).limit(5000);
    if (res.error) return null;
    var out = {};
    (res.data || []).forEach(function (r) { out[r.subject_key + ':' + r.question_id] = new Date(r.cleared_at).getTime(); });
    return out;
  }

  async function saveNoteClears(list) {
    if (!list.length) return;
    var at = new Date().toISOString();
    var rows = list.map(function (k) {
      var i = k.indexOf(':');
      return { user_id: uid(), subject_key: k.slice(0, i), question_id: parseInt(k.slice(i + 1), 10), cleared_at: at };
    });
    check(await client.from('note_clears').upsert(rows, { onConflict: 'user_id,subject_key,question_id' }), '노트 지우기');
  }

  /** 오늘 푼 기록 → [{subject_key, question_id, source, correct}] */
  async function loadAttemptsSince(isoStart) {
    var rows = [];
    var from = 0, size = 1000;
    for (;;) {
      var res = await client.from('attempts')
        .select('subject_key,question_id,source,correct')
        .eq('user_id', uid()).gte('created_at', isoStart)
        .order('id').range(from, from + size - 1);
      var part = check(res, '오늘 기록 불러오기');
      rows = rows.concat(part);
      if (part.length < size) break;
      from += size;
    }
    return rows;
  }

  // ------------------------------------------------------------ 오늘의 문제
  async function getDailySet(day) {
    var res = await client.from('daily_sets').select('*').eq('user_id', uid()).eq('day', day).maybeSingle();
    return check(res, '오늘의 문제 불러오기');
  }

  async function saveDailySet(day, goal, items) {
    var res = await client.from('daily_sets').upsert(
      { user_id: uid(), day: day, goal: goal, items: items, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,day' }
    ).select().single();
    return check(res, '오늘의 문제 저장');
  }

  // ------------------------------------------------------------ 오류 신고
  async function createReport(r) {
    var res = await client.from('reports').insert({
      reporter_name: r.reporterName,
      subject_key: r.subjectKey,
      question_id: r.questionId,
      question_text: r.questionText,
      content: r.content
    });
    check(res, '신고 접수');
  }

  async function listReports() {
    var res = await client.from('reports').select('*').order('created_at', { ascending: false }).limit(300);
    return check(res, '신고 목록 불러오기');
  }

  async function setReportStatus(id, status) {
    check(await client.from('reports').update({ status: status }).eq('id', id), '신고 상태 변경');
  }

  async function deleteReport(id) {
    check(await client.from('reports').delete().eq('id', id), '신고 삭제');
  }

  // ------------------------------------------------------------ 관리자
  async function adminListMembers() {
    return check(await client.rpc('admin_list_members'), '회원 목록 불러오기');
  }
  async function adminSetMember(target, role, status) {
    check(await client.rpc('admin_set_member', { target: target, new_role: role, new_status: status }), '회원 변경');
  }
  async function adminResetMember(target) {
    check(await client.rpc('admin_reset_member', { target: target }), '기록 초기화');
  }

  return {
    isConfigured: isConfigured, init: init, getSession: getSession, uid: uid,
    signInWithGoogle: signInWithGoogle, signOut: signOut,
    getProfile: getProfile, updateProfile: updateProfile,
    logAttempt: logAttempt, saveSession: saveSession, flush: flush, pendingCount: pendingCount,
    listSessions: listSessions, loadQuestionStats: loadQuestionStats, loadNoteClears: loadNoteClears, saveNoteClears: saveNoteClears, loadAttemptsSince: loadAttemptsSince,
    getDailySet: getDailySet, saveDailySet: saveDailySet,
    createReport: createReport, listReports: listReports, setReportStatus: setReportStatus, deleteReport: deleteReport,
    adminListMembers: adminListMembers, adminSetMember: adminSetMember, adminResetMember: adminResetMember,
    newId: uuid
  };
})();
