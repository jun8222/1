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
  function badges(ctx) {
    var s = ctx.sum, out = [];
    function add(id, icon, name, desc, got, prog) { out.push({ id: id, icon: icon, name: name, desc: desc, got: !!got, prog: prog || '' }); }
    add('first', '🎯', '첫 걸음', '문제를 처음 풀었어요', s.total >= 1, Math.min(s.total, 1) + '/1');
    [100, 500, 1000, 3000].forEach(function (n) {
      add('t' + n, n >= 1000 ? '🏆' : '📚', n + '문제 돌파', '문제를 ' + n + '번 풀었어요', s.total >= n, Math.min(s.total, n) + '/' + n);
    });
    [3, 7, 14, 30].forEach(function (n) {
      add('s' + n, '🔥', n + '일 연속', n + '일 연속으로 풀었어요', s.bestStreak >= n, Math.min(s.bestStreak, n) + '/' + n);
    });
    add('day50', '⚡', '하루 50문제', '하루에 50문제를 풀었어요', s.bestDay >= 50, Math.min(s.bestDay, 50) + '/50');
    add('clear10', '💪', '오답 10개 극복', '틀렸던 문제 10개를 다시 맞혔어요', ctx.cleared >= 10, Math.min(ctx.cleared, 10) + '/10');
    add('clear50', '🛡️', '오답 50개 극복', '틀렸던 문제 50개를 다시 맞혔어요', ctx.cleared >= 50, Math.min(ctx.cleared, 50) + '/50');
    add('acc80', '🎓', '정답률 80%', '100문제 이상 풀고 정답률 80% 이상', s.total >= 100 && s.rights / s.total >= 0.8,
      s.total ? Math.round(s.rights / s.total * 100) + '%' : '0%');
    GROUPS.forEach(function (g) {
      add('c_' + g.key, '🏅', g.name + ' 정복', '문제의 90% 이상을 풀고 정답률 80% 이상', ctx.conquest && ctx.conquest[g.key], '');
    });
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
    var cols = [];
    for (var w = 0; w < weeks; w++) {
      var col = [];
      for (var d = 0; d < 7; d++) {
        var dt = addDays(start, w * 7 + d), k = dayKey(dt);
        var n = sum.days[k] ? sum.days[k].n : 0;
        col.push({ day: k, n: n, future: k > today, today: k === today, exam: !!ex && k === ex,
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

  return { avatarList: avatarList, avatarInfo: avatarInfo, avatarUrl: avatarUrl, GROUPS: GROUPS, LEVELS: LEVELS, groupOf: groupOf, dayKey: dayKey, summarize: summarize, levelInfo: levelInfo, badges: badges, radar: radar, calendar: calendar, daysToExam: daysToExam, EXAM_DATE: EXAM_DATE, groupRounds: groupRounds };
});
