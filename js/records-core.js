/* 내 기록 계산 (스트릭·레벨·뱃지·과목 레이더) — 순수 함수. 브라우저(window.RecordsCore)와 node 양쪽에서 사용 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RecordsCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var GROUPS = [
    { key: 'anatomy', name: '구강해부학' }, { key: 'morphology', name: '치아형태학' },
    { key: 'hygiene', name: '구강보건학' }, { key: 'materials', name: '치기공재료학' },
    { key: 'law', name: '의료관계법규' }, { key: 'crown_bridge', name: '관교의치' },
    { key: 'porcelain', name: '도재' }, { key: 'complete_denture', name: '총의치' },
    { key: 'partial_denture', name: '국소의치' }, { key: 'restorative', name: '충전' },
    { key: 'orthodontics', name: '교정' }
  ];
  function groupOf(key) { return String(key || '').replace(/_past$/, ''); }

  var LEVELS = [
    { min: 0, name: '견습생', icon: '🌱' },
    { min: 100, name: '수습 기공사', icon: '🔧' },
    { min: 300, name: '기공사', icon: '🦷' },
    { min: 700, name: '숙련 기공사', icon: '⚙️' },
    { min: 1500, name: '수석 기공사', icon: '🏅' },
    { min: 3000, name: '명장', icon: '👑' }
  ];

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function dayKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function addDays(d, n) { var x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); return x; }

  /** rows: [{created_at, subject_key, correct}] */
  function summarize(rows, now) {
    now = now || new Date();
    var days = {}, groups = {}, total = 0, rights = 0;
    rows.forEach(function (r) {
      total++; if (r.correct) rights++;
      var k = dayKey(new Date(r.created_at));
      var d = days[k] || (days[k] = { n: 0, ok: 0 });
      d.n++; if (r.correct) d.ok++;
      var g = groupOf(r.subject_key);
      var o = groups[g] || (groups[g] = { n: 0, ok: 0 });
      o.n++; if (r.correct) o.ok++;
    });

    var today = dayKey(now);
    // 현재 스트릭: 오늘 풀었으면 오늘부터, 아직이면 어제부터 거꾸로 센다
    var cur = 0, cursor = days[today] ? now : addDays(now, -1);
    while (days[dayKey(cursor)]) { cur++; cursor = addDays(cursor, -1); }
    // 최고 스트릭
    var keys = Object.keys(days).sort(), best = 0, run = 0, prev = null;
    keys.forEach(function (k) {
      var parts = k.split('-'), dt = new Date(+parts[0], +parts[1] - 1, +parts[2]);
      if (prev && dayKey(addDays(prev, 1)) === k) run++; else run = 1;
      if (run > best) best = run;
      prev = dt;
    });
    var bestDay = 0;
    keys.forEach(function (k) { if (days[k].n > bestDay) bestDay = days[k].n; });

    return {
      total: total, rights: rights, days: days, groups: groups,
      streak: cur, bestStreak: best, activeDays: keys.length, bestDay: bestDay,
      todayCount: days[today] ? days[today].n : 0, todayDone: !!days[today],
      xp: total + rights,
      firstDay: keys.length ? keys[0] : null
    };
  }

  function levelInfo(xp) {
    var idx = 0;
    LEVELS.forEach(function (l, i) { if (xp >= l.min) idx = i; });
    var cur = LEVELS[idx], next = LEVELS[idx + 1] || null;
    return {
      level: idx + 1, name: cur.name, icon: cur.icon, xp: xp,
      next: next ? next.name : null, toNext: next ? next.min - xp : 0,
      pct: next ? Math.round((xp - cur.min) / (next.min - cur.min) * 100) : 100
    };
  }

  /**
   * ctx: { sum, cleared(오답 극복 문항 수), conquest: {groupKey: true} }
   */
  // 뱃지. cat: exam(시험 대비) steady(꾸준함) amount(양) round(회독) skill(실력) fun(재미·함께), tier: 1 동 · 2 은 · 3 금
  var BADGE_CATS = [['exam', '시험 대비'], ['steady', '꾸준함'], ['amount', '양'], ['round', '회독'], ['skill', '실력'], ['fun', '재미']];
  function badges(ctx) {
    var s = ctx.sum, out = [], rows = ctx.rows || [], gr = ctx.gr || { sets: {}, groups: {} };
    var now = ctx.now || new Date(), exam = ctx.exam || EXAM_DATE, extra = ctx.extra || {};
    function add(cat, tier, id, icon, name, desc, got, cur, goal) {
      out.push({ id: id, cat: cat, tier: tier, icon: icon, name: name, desc: desc, got: !!got,
                 prog: goal ? Math.min(cur, goal) + '/' + goal : (cur || '') });
    }
    function cnt(arr, f) { var n = 0; arr.forEach(function (x) { if (f(x)) n++; }); return n; }

    // ---- 시험 대비 (D-day 기준)
    var ex = parseKey(exam), today = dayKey(now);
    function dk(n) { return dayKey(addDays(ex, -n)); }   // D-n
    function activeIn(from, to) { var n = 0; for (var d = from; d >= to; d--) if (s.days[dk(d)]) n++; return n; }
    var firstDay = Object.keys(s.days).sort()[0];
    add('exam', 1, 'x_start', '🚀', 'D-28 출발', '시험 4주 전(D-28)까지 공부를 시작했어요', firstDay && firstDay <= dk(28), firstDay && firstDay <= dk(28) ? 1 : 0, 1);
    [[28, 22, '1주차'], [21, 15, '2주차'], [14, 8, '3주차']].forEach(function (w, i) {
      add('exam', 2, 'x_w' + (i + 1), '📆', w[2] + ' 완주', 'D-' + w[0] + '~D-' + w[1] + ' 중 5일 이상 공부했어요', activeIn(w[0], w[1]) >= 5, activeIn(w[0], w[1]), 5);
    });
    add('exam', 3, 'x_last', '🏁', '마지막 주 매일', 'D-7~D-1 하루도 빠지지 않았어요', activeIn(7, 1) >= 7, activeIn(7, 1), 7);
    add('exam', 2, 'x_eve', '🌙', '시험 전날까지', '시험 전날(D-1)에도 공부했어요', !!s.days[dk(1)], s.days[dk(1)] ? 1 : 0, 1);

    // ---- 꾸준함
    [[3, 1], [7, 1], [14, 2], [21, 2], [28, 3]].forEach(function (x) {
      add('steady', x[1], 's' + x[0], '🔥', x[0] + '일 연속', x[0] + '일 연속으로 풀었어요', s.bestStreak >= x[0], s.bestStreak, x[0]);
    });
    [[10, 1], [20, 2]].forEach(function (x) {
      add('steady', x[1], 'ad' + x[0], '📅', '누적 ' + x[0] + '일', '공부한 날이 모두 ' + x[0] + '일이에요', s.activeDays >= x[0], s.activeDays, x[0]);
    });

    // ---- 양
    add('amount', 1, 'first', '🎯', '첫 걸음', '문제를 처음 풀었어요', s.total >= 1, s.total, 1);
    [[100, 1], [500, 1], [1000, 2], [2090, 2], [3000, 3], [5000, 3]].forEach(function (x) {
      add('amount', x[1], 't' + x[0], x[0] >= 1000 ? '🏆' : '📚', x[0].toLocaleString() + '문제 돌파', '문제를 ' + x[0].toLocaleString() + '번 풀었어요' + (x[0] === 2090 ? ' (전체 문제 수만큼)' : ''), s.total >= x[0], s.total, x[0]);
    });
    [[50, 1, '⚡'], [100, 2, '🌟'], [150, 3, '🌈'], [200, 3, '🌌']].forEach(function (x) {
      add('amount', x[1], 'day' + x[0], x[2], '하루 ' + x[0] + '문제', '하루에 ' + x[0] + '문제를 풀었어요', s.bestDay >= x[0], s.bestDay, x[0]);
    });
    var goal = ctx.dailyGoal || 30, dailyBy = {};
    rows.forEach(function (r) { if (r.source === 'daily') { var k = dayKey(new Date(r.created_at)); dailyBy[k] = (dailyBy[k] || 0) + 1; } });
    var dailyDone = cnt(Object.keys(dailyBy), function (k) { return dailyBy[k] >= goal; });
    [[7, 1], [20, 2]].forEach(function (x) {
      add('amount', x[1], 'daily' + x[0], '🗓️', '오늘의 문제 ' + x[0] + '번', '오늘의 문제를 ' + x[0] + '번 끝까지 풀었어요', dailyDone >= x[0], dailyDone, x[0]);
    });

    // ---- 회독
    var G = Object.keys(gr.groups).map(function (k) { return gr.groups[k]; }).filter(function (g) { return g.sets.length; });
    var S = Object.keys(gr.sets).map(function (k) { return gr.sets[k]; }).filter(function (o) { return o.total; });
    var periods = ctx.periods || {};
    function setDone(o) { return o.prev.length > 0 || o.waiting; }
    var maxDone = Math.max.apply(null, [0].concat(G.map(function (g) { return g.done; })));
    add('round', 1, 'r_first', '📖', '첫 1회독', '한 과목을 처음 1회독했어요', maxDone >= 1, maxDone >= 1 ? 1 : 0, 1);
    [1, 2].forEach(function (p) {
      var gs = G.filter(function (g) { return periods[g.key] === p; });
      var d = cnt(gs, function (g) { return g.done >= 1; });
      add('round', 2, 'r_p' + p, p === 1 ? '1️⃣' : '2️⃣', p + '교시 완주', p + '교시 모든 과목을 1회독했어요', gs.length && d === gs.length, d, gs.length);
    });
    var all1 = cnt(G, function (g) { return g.done >= 1; }), all2 = cnt(G, function (g) { return g.done >= 2; });
    add('round', 3, 'r_all1', '🎓', '전 과목 1회독', '모든 과목을 1회독했어요 (시험 전 목표!)', G.length && all1 === G.length, all1, G.length);
    add('round', 3, 'r_all2', '👑', '전 과목 2회독', '모든 과목을 2회독했어요', G.length && all2 === G.length, all2, G.length);
    add('round', 2, 'r_3', '🔁', '한 과목 3회독', '한 과목을 3번 돌렸어요', maxDone >= 3, maxDone, 3);
    var past = S.filter(function (o) { return /_past$/.test(o.key); }), mock = S.filter(function (o) { return !/_past$/.test(o.key); });
    add('round', 2, 'r_past', '📜', '국시기출 마스터', '모든 국시기출 모음을 1회독했어요', past.length && cnt(past, setDone) === past.length, cnt(past, setDone), past.length);
    add('round', 2, 'r_mock', '📝', '모의고사 마스터', '모든 모의고사 모음을 1회독했어요', mock.length && cnt(mock, setDone) === mock.length, cnt(mock, setDone), mock.length);
    var bestUp = 0;
    G.forEach(function (g) {
      var seq = g.prev.slice(); if (g.acc !== null && g.tries >= 10) seq.push(g.acc);
      for (var i = 1; i < seq.length; i++) if (seq[i] !== null && seq[i - 1] !== null) bestUp = Math.max(bestUp, seq[i] - seq[i - 1]);
    });
    add('round', 2, 'r_up10', '📈', '실력 상승', '지난 회차보다 정답률이 10%p 올랐어요', bestUp >= 10, bestUp + '%p', 0);
    add('round', 3, 'r_up20', '🚀', '실력 급상승', '지난 회차보다 정답률이 20%p 올랐어요', bestUp >= 20, bestUp + '%p', 0);

    // ---- 실력
    add('skill', 1, 'acc80', '🎓', '정답률 80%', '100문제 이상 풀고 정답률 80% 이상', s.total >= 100 && s.rights / s.total >= 0.8, s.total ? Math.round(s.rights / s.total * 100) + '%' : '0%', 0);
    add('skill', 3, 'acc90', '💎', '정답률 90%', '300문제 이상 풀고 정답률 90% 이상', s.total >= 300 && s.rights / s.total >= 0.9, s.total ? Math.round(s.rights / s.total * 100) + '%' : '0%', 0);
    var run = 0, bestRun = 0;
    rows.forEach(function (r) { if (r.correct) { run++; if (run > bestRun) bestRun = run; } else run = 0; });
    add('skill', 1, 'run10', '✨', '연속 정답 10', '10문제를 연속으로 맞혔어요', bestRun >= 10, bestRun, 10);
    add('skill', 2, 'run30', '🎇', '연속 정답 30', '30문제를 연속으로 맞혔어요', bestRun >= 30, bestRun, 30);
    var sess = {};
    rows.forEach(function (r) { if (!r.session_id) return; var o = sess[r.session_id] || (sess[r.session_id] = { n: 0, ok: 0 }); o.n++; if (r.correct) o.ok++; });
    var perfect = cnt(Object.keys(sess), function (k) { return sess[k].n >= 10 && sess[k].ok === sess[k].n; });
    add('skill', 2, 'perfect', '💯', '만점 회차', '10문제 이상 푼 회차를 모두 맞혔어요', perfect >= 1, perfect >= 1 ? 1 : 0, 1);
    [[10, 1, '💪'], [50, 1, '🛡️'], [100, 2, '🏋️'], [300, 3, '🦾']].forEach(function (x) {
      add('skill', x[1], 'clear' + x[0], x[2], '오답 ' + x[0] + '개 극복', '틀렸던 문제 ' + x[0] + '개를 다시 맞혔어요', ctx.cleared >= x[0], ctx.cleared, x[0]);
    });
    var win = {}, weakEver = {}, escaped = false;
    rows.forEach(function (r) {
      if (r.source === 'retry') return;
      var w = win[r.subject_key] || (win[r.subject_key] = []); w.push(r.correct ? 1 : 0); if (w.length > 30) w.shift();
      var ok = w.reduce(function (a, b) { return a + b; }, 0), weak = w.length >= 20 && ok / w.length < 0.7;
      if (weak) weakEver[r.subject_key] = true; else if (weakEver[r.subject_key] && w.length >= 20) escaped = true;
    });
    add('skill', 2, 'unweak', '🌱', '취약 탈출', '취약했던 모음에서 취약을 벗어났어요', escaped, escaped ? 1 : 0, 1);
    GROUPS.forEach(function (g) {
      add('skill', 2, 'c_' + g.key, '🏅', g.name + ' 정복', '문제의 90% 이상을 풀고 정답률 80% 이상', ctx.conquest && ctx.conquest[g.key], '', 0);
    });

    // ---- 재미 · 함께
    var night = cnt(rows, function (r) { return new Date(r.created_at).getHours() < 5; });
    add('fun', 2, 'owl', '🦉', '올빼미', '새벽 0~5시에 50문제를 풀었어요', night >= 50, night, 50);
    var dk2 = cnt(rows, function (r) { return r.picked === -1; });
    add('fun', 1, 'honest', '🙋', '정직왕', '"모르시겠어요?"를 20번 눌렀어요', dk2 >= 20, dk2, 20);
    add('fun', 1, 'report', '🚩', '첫 신고', '문제 오류를 처음 신고했어요', (extra.reports_sent || 0) >= 1, extra.reports_sent || 0, 1);
    add('fun', 1, 'duel1', '⚔️', '첫 대결', '친구 대결에 처음 참가했어요', (extra.duels_played || 0) >= 1, extra.duels_played || 0, 1);
    add('fun', 2, 'win1', '🥊', '대결 승리', '친구 대결에서 이겼어요', (extra.duel_wins || 0) >= 1, extra.duel_wins || 0, 1);
    add('fun', 2, 'cheer10', '👏', '응원 10개', '응원을 10개 받았어요', (extra.cheers_got || 0) >= 10, extra.cheers_got || 0, 10);

    // 시험이 끝나면 못 받은 시험 대비 뱃지는 숨김
    if (today > exam) out = out.filter(function (b) { return b.cat !== 'exam' || b.got; });
    return out;
  }


  /** 레이더 차트용: 그룹별 정답률(0~1)·시도 */
  function radar(sum) {
    return GROUPS.map(function (g) {
      var o = sum.groups[g.key];
      return { key: g.key, name: g.name, n: o ? o.n : 0, acc: o && o.n ? o.ok / o.n : 0 };
    });
  }

  // ---- 회독: 같은 과목의 문제 모음(교재·국시기출)을 모두 한 번씩 풀어야 함께 다음 회차로 넘어감.
  //      먼저 끝낸 모음은 짝꿍이 끝날 때까지 "기다리는 중" — 그동안 푼 기록은 회차에 넣지 않음. 오답 다시 풀기(retry)는 제외.
  /** rows: 시간순 [{subject_key, question_id, correct, source}], idsBy: {모음키: [문항id...]}
   *  → { sets: {모음키: {...}}, groups: {과목키: {...}} } */
  function groupRounds(rows, idsBy) {
    var sets = {}, groups = {};
    Object.keys(idsBy).forEach(function (k) {
      var valid = {}; idsBy[k].forEach(function (id) { valid[id] = true; });
      var g = groupOf(k);
      sets[k] = { key: k, group: g, total: idsBy[k].length, valid: valid, seen: {}, solved: 0, tries: 0, rights: 0, waiting: false, prev: [] };
      var G = groups[g] || (groups[g] = { key: g, sets: [], done: 0, prev: [] });
      if (idsBy[k].length) G.sets.push(k);
    });
    function finish(G) {
      var t = 0, r = 0;
      G.sets.forEach(function (k) { var o = sets[k]; t += o.tries; r += o.rights; o.prev.push(o.tries ? Math.round(o.rights / o.tries * 100) : null); });
      G.prev.push(t ? Math.round(r / t * 100) : null); G.done++;
      G.sets.forEach(function (k) { var o = sets[k]; o.seen = {}; o.solved = 0; o.tries = 0; o.rights = 0; o.waiting = false; });
    }
    rows.forEach(function (r) {
      if (r.source === 'retry') return;
      var o = sets[r.subject_key]; if (!o || !o.total || !o.valid[r.question_id] || o.waiting) return;
      o.tries++; if (r.correct) o.rights++;
      if (!o.seen[r.question_id]) { o.seen[r.question_id] = true; o.solved++; }
      if (o.solved >= o.total) {
        o.waiting = true;
        var G = groups[o.group];
        if (G.sets.every(function (k) { return sets[k].waiting; })) finish(G);
      }
    });
    Object.keys(sets).forEach(function (k) {
      var o = sets[k], G = groups[o.group]; delete o.valid;
      o.round = G.done + 1; o.done = G.done;
      o.pct = o.total ? Math.round(o.solved / o.total * 100) : 0;
      o.acc = o.tries ? Math.round(o.rights / o.tries * 100) : null;
      o.partners = G.sets.filter(function (x) { return x !== k; });
    });
    Object.keys(groups).forEach(function (g) {
      var G = groups[g], t = 0, r = 0, tot = 0, sol = 0;
      G.sets.forEach(function (k) { var o = sets[k]; t += o.tries; r += o.rights; tot += o.total; sol += o.solved; });
      G.round = G.done + 1; G.tries = t; G.total = tot; G.solved = sol;
      G.pct = tot ? Math.round(sol / tot * 100) : 0;
      G.acc = t ? Math.round(r / t * 100) : null;
      G.last = G.prev.length ? G.prev[G.prev.length - 1] : null;
    });
    return { sets: sets, groups: groups };
  }

  // ---- 시험일 (전체 사용자 공통)
  var EXAM_DATE = '2026-11-28';
  function parseKey(k) { var p = k.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  /** 오늘 기준 시험까지 남은 날 (당일 0, 지나면 음수) */
  function daysToExam(now, exam) {
    now = now || new Date();
    var a = parseKey(dayKey(now)), b = parseKey(exam || EXAM_DATE);
    return Math.round((b - a) / 86400000);
  }

  /** 달력: 맨 오른쪽 아래 칸 = 시험일(시험 전) 또는 오늘(시험 후). 7일씩 한 줄, 거꾸로 채움 */
  function calendar(sum, now, weeks, exam) {
    now = now || new Date(); weeks = weeks || 17;
    var today = dayKey(now), ex = exam === undefined ? EXAM_DATE : exam;
    var end = (ex && daysToExam(now, ex) >= 0) ? parseKey(ex) : parseKey(today);
    var start = addDays(end, -(weeks * 7 - 1));
    // 지금 이어지고 있는 연속 기록 (오늘 풀었으면 오늘까지, 아니면 어제까지)
    var stk = {}, run = [], cur = sum.days[today] ? parseKey(today) : addDays(parseKey(today), -1);
    while (sum.days[dayKey(cur)]) { run.unshift(dayKey(cur)); cur = addDays(cur, -1); }
    if (run.length >= 2) run.forEach(function (k, i) { stk[k] = i + 1; });
    var cols = [];
    for (var w = 0; w < weeks; w++) {
      var col = [];
      for (var d = 0; d < 7; d++) {
        var dt = addDays(start, w * 7 + d), k = dayKey(dt);
        var n = sum.days[k] ? sum.days[k].n : 0;
        col.push({ day: k, n: n, future: k > today, today: k === today, exam: !!ex && k === ex, stk: stk[k] || 0, stkLen: run.length >= 2 ? run.length : 0,
                   lv: n === 0 ? 0 : n < 10 ? 1 : n < 30 ? 2 : n < 60 ? 3 : n < 100 ? 4 : n < 150 ? 5 : n < 200 ? 6 : 7 });
      }
      cols.push(col);
    }
    return cols;
  }

  // ---- 캐릭터 (잠금 없이 자유 선택): 도트 사람 48종(P01~P48, CC0 12종 + 색 변형) + 도트 몬스터 24종(M01~M24)
  var PEOPLE = 48, MONSTERS = 24;
  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function avatarList(kind) {
    var out = [], i;
    if (!kind || kind === 'people') for (i = 1; i <= PEOPLE; i++) out.push({ id: 'P' + pad2(i), kind: 'people' });
    if (!kind || kind === 'monster') for (i = 1; i <= MONSTERS; i++) out.push({ id: 'M' + pad2(i), kind: 'monster' });
    return out;
  }
  function avatarInfo(id) {
    var m = /^([PM])(\d{2})$/.exec(id || '');
    if (!m) return null;
    var n = parseInt(m[2], 10), max = m[1] === 'P' ? PEOPLE : MONSTERS;
    if (n < 1 || n > max) return null;
    return { id: id, kind: m[1] === 'P' ? 'people' : 'monster', file: m[1].toLowerCase() + m[2] + '.png' };
  }
  function avatarUrl(id) {
    var a = avatarInfo(id);
    return a ? './assets/avatars/' + a.file + '?v=2' : null;
  }

  return { avatarList: avatarList, avatarInfo: avatarInfo, avatarUrl: avatarUrl, GROUPS: GROUPS, LEVELS: LEVELS, groupOf: groupOf, dayKey: dayKey, summarize: summarize, levelInfo: levelInfo, badges: badges, radar: radar, calendar: calendar, daysToExam: daysToExam, EXAM_DATE: EXAM_DATE, groupRounds: groupRounds, BADGE_CATS: BADGE_CATS };
});
