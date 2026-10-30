/* 내 기록 탭: 스트릭 · 레벨 · 달력 · 레이더 · 뱃지 · 랭킹 · 활동 피드 · 친구 대결 */
(function () {
  var RC = window.RecordsCore;
  var histCache = null, histAt = 0;
  var currentDuelId = null;
  var lastDuelLink = '';

  // ---- 대결 링크로 들어온 경우: 로그인 과정에서 주소가 바뀌어도 잃지 않도록 먼저 저장
  try {
    var qp = new URLSearchParams(location.search).get('duel');
    if (qp && /^[0-9a-f-]{36}$/i.test(qp)) {
      localStorage.setItem('pendingDuel', qp);
      history.replaceState(null, '', location.pathname);
    }
  } catch (e) { /* 무시 */ }

  function ago(iso) {
    var m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
    if (m < 1) return '방금'; if (m < 60) return m + '분 전';
    var h = Math.round(m / 60); return h < 24 ? h + '시간 전' : Math.round(h / 24) + '일 전';
  }

  // ---------------------------------------------------------------- 본문
  window.renderRecords = async function () {
    var box = $('recordsContent');
    if (!box) return;
    if (!histCache) box.innerHTML = '<div class="empty-state"><p>기록을 불러오는 중…</p></div>';
    try {
      if (!histCache || Date.now() - histAt > 30000) { histCache = await Cloud.loadAttemptHistory(); histAt = Date.now(); }
    } catch (e) { box.innerHTML = '<div class="empty-state"><p>' + esc(e.message) + '</p></div>'; return; }

    var sum = RC.summarize(histCache, new Date());
    var lv = RC.levelInfo(sum.xp);

    // 오답 극복 / 과목 정복
    var cleared = 0, solvedBy = {};
    Object.keys(statsCache).forEach(function (k) {
      var st = statsCache[k]; if (st.lastCorrect && st.rights < st.tries) cleared++;
      var g = RC.groupOf(k.slice(0, k.indexOf(':'))); solvedBy[g] = (solvedBy[g] || 0) + 1;
    });
    var conquest = {}, totalBy = {};
    Object.keys(window.quizDatabase || {}).forEach(function (key) {
      var qs = (window.quizDatabase[key] || {}).questions || []; var g = RC.groupOf(key);
      totalBy[g] = (totalBy[g] || 0) + qs.length;
    });
    RC.GROUPS.forEach(function (g) {
      var o = sum.groups[g.key], acc = o && o.n ? o.ok / o.n : 0;
      if (totalBy[g.key] && (solvedBy[g.key] || 0) / totalBy[g.key] >= 0.9 && acc >= 0.8) conquest[g.key] = true;
    });
    if (!badgeExtra || Date.now() - badgeExtraAt > 60000) {
      try { badgeExtra = await Cloud.myBadgeStats(); badgeExtraAt = Date.now(); } catch (e) { badgeExtra = badgeExtra || {}; }
    }
    var periods = {};
    (typeof subjectMeta !== 'undefined' ? subjectMeta : []).forEach(function (m) { periods[RC.groupOf(m.key)] = m.period; });
    var gr = RC.groupRounds(histCache, window.subjectIdsBy ? window.subjectIdsBy() : {});
    var bs = RC.badges({ sum: sum, cleared: cleared, conquest: conquest, rows: histCache, gr: gr, periods: periods,
                         now: new Date(), dailyGoal: (currentUser && currentUser.daily_goal) || 30, extra: badgeExtra || {} });

    var html = '';
    // 1) 스트릭 + 레벨
    html += '<div class="rec-card rec-hero">' +
      '<div class="rec-streak"><div class="rec-flame' + (sum.streak ? '' : ' off') + '">🔥</div><div><div class="rec-big">' + sum.streak + '일</div>' +
        '<div class="rec-sub">' + (sum.todayDone ? '오늘도 풀었어요!' : (sum.streak ? '오늘 풀면 ' + (sum.streak + 1) + '일째' : '오늘 풀면 시작해요')) + ' · 최고 ' + sum.bestStreak + '일</div></div></div>' +
      '<div class="rec-me"><div class="rec-me-ch">' + (RC.avatarUrl(currentUser && currentUser.avatar) ? '<img src="' + RC.avatarUrl(currentUser.avatar) + '" alt="">' : '<span>' + lv.icon + '</span>') + '</div>' +
        '<button class="btn-action-sm btn-review-expl" onclick="openAvatarPicker()">🎭 캐릭터 바꾸기</button></div>' +
      '<div id="avatar-picker"></div>' +
      '<div class="rec-level"><div class="rec-lv-name">' + lv.icon + ' Lv.' + lv.level + ' ' + esc(lv.name) + '</div>' +
        '<div class="rec-bar"><div style="width:' + lv.pct + '%"></div></div>' +
        '<div class="rec-sub">' + lv.xp + ' XP' + (lv.next ? ' · ' + esc(lv.next) + '까지 ' + lv.toNext + ' XP' : ' · 최고 레벨!') + '</div>' +
        '<div class="rec-sub" style="opacity:.8">풀이 1점 + 정답 1점</div></div></div>';

    // 2) 달력
    var cal = RC.calendar(sum, new Date(), 17), dd = RC.daysToExam(new Date());
    html += '<div class="rec-card"><div class="rec-title">📅 학습 달력 <span class="rec-sub">' + (dd > 0 ? '<b class="rec-dday">🎯 시험까지 D-' + dd + '</b> · ' : dd === 0 ? '<b class="rec-dday">🎯 D-DAY 화이팅!</b> · ' : '최근 17주 · ') + sum.activeDays + '일 학습</span></div><div class="rec-cal fx' + streakFx + ' cfx' + colFx + (Date.now() - (window.__recEnterAt || 0) < 4000 ? ' cfx-play' : '') + '" id="rec-cal" style="--gc:' + stkColor(cal) + '">' +
      cal.map(function (col) {
        var full = col.every(function (c) { return c.n > 0 && !c.future; });   // 세로줄(7일) 모두 공부
        return '<div class="rec-col' + (full ? ' full' : '') + '">' + col.map(function (c, ri) {
          return '<span class="rec-cell lv' + c.lv + (c.future ? ' future' : '') + (c.today ? ' today' : '') + (c.exam ? ' exam' : '') + (c.stk ? ' stk' : '') + '" style="--r:' + ri + (c.stk ? ';--k:' + (c.stk - 1) : '') + '" title="' + c.day + (c.exam ? ' · 시험일 🎯' : c.future ? ' · 남은 날' : ' · ' + c.n + '문제') + '">' + (c.exam ? '🎯' : '<i></i>') + '</span>';
        }).join('') + '</div>';
      }).join('') + '</div>' +
      (sum.firstDay ? '<div class="rec-sub" style="margin-top:8px">📌 첫 학습일 ' + sum.firstDay.replace(/-/g, '.') + ' · 시작한 지 ' + (Math.round((new Date(RC.dayKey(new Date()) + 'T00:00:00') - new Date(sum.firstDay + 'T00:00:00')) / 86400000) + 1) + '일째</div>' : '') +
      '<div class="rec-legend">적음 <span class="rec-cell lv0"></span><span class="rec-cell lv1"></span><span class="rec-cell lv2"></span><span class="rec-cell lv3"></span><span class="rec-cell lv4"></span> 많음 <span class="rec-cell lv5" title="100문제 이상"><i></i></span><span class="rec-cell lv6" title="150문제 이상"><i></i></span><span class="rec-cell lv7" title="200문제 이상"><i></i></span></div>' +
      '<div class="rec-reset"><div id="reset-mine-warn" class="rec-reset-warn">풀이 기록·오답노트·달력·레벨이 모두 사라지고 되돌릴 수 없어요.</div><button id="reset-mine-btn" class="rec-reset-btn" onclick="resetMine()">🧹 기록 초기화</button></div></div>';

    html = html.replace('<div class="rec-reset">', '<div class="fx-pick">🔥 연속 효과 <select onchange="setStreakFx(this.value)">' +
      FX_NAMES.map(function (n, i) { return '<option value="' + i + '"' + (String(i) === String(streakFx) ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select> · 🌈 세로줄 완주 <select onchange="setColFx(this.value)">' +
      COL_FX_NAMES.map(function (n, i) { return '<option value="' + i + '"' + (String(i) === String(colFx) ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select> <button type="button" class="fx-replay" onclick="replayColFx()">▶ 다시 보기</button></div><div class="rec-reset">');

    // 3) 레이더
    var rItems = roundItems();
    html += '<div class="rec-card"><div class="rec-title">🕸 과목별 정답률 <span class="rec-sub">교재 + 국시기출 · 회차 기준</span></div>' +
      (rItems.some(function (i) { return i.prev !== null; }) ? '<div class="radar-legend"><span><i class="cur"></i>이번 회차</span><span><i class="prv"></i>지난 회차</span></div>' : '') +
      radarSvg(rItems) + roundCompare(rItems) + weakList(rItems) + '</div>';

    // 4) 뱃지
    lastBadges = bs;
    html += '<div class="rec-card" id="badge-card">' + badgeCardInner() + '</div>';

    // 5) 랭킹 · 피드 · 대결 (서버 기능: 자리 먼저 만들고 비동기로 채움)
    html += '<div class="rec-card"><div class="rec-title">🏆 랭킹 <span class="rec-sub">푼 문제 수 기준</span></div>' +
      '<div class="rank-seg">' + RANK_TABS.map(function (t) { return '<button data-p="' + t.k + '" class="' + (t.k === rankPeriod ? 'on' : '') + '" onclick="setRankPeriod(\'' + t.k + '\')">' + t.label + '</button>'; }).join('') + '</div>' +
      '<div id="rank-desc" class="rec-sub rank-desc">' + rankTab().desc + '</div>' +
      '<label class="rec-toggle"><input type="checkbox" id="rank-public-cb" onchange="toggleRankPublic(this.checked)"' + (currentUser && currentUser.rank_public ? ' checked' : '') + '> 내 이름을 랭킹·활동에 공개</label>' +
      '<div id="rank-box" class="rec-sub">불러오는 중…</div></div>';
    html += '<div class="rec-card"><div class="rec-title">👀 오늘의 활동 <span class="rec-sub">최근 24시간</span></div><div id="feed-box" class="rec-sub">불러오는 중…</div></div>';
    html += '<div class="rec-card"><div class="rec-title">⚔️ 친구 대결</div>' +
      '<div class="rec-sub" style="margin-bottom:10px">같은 10문제를 각자 풀고 점수를 비교해요. 링크를 친구에게 보내세요.</div>' +
      '<button class="btn-result btn-review" id="duel-create-btn" style="cursor:pointer" onclick="createDuelNow()">⚔️ 대결 만들기</button>' +
      '<div id="duel-new"></div><div id="duel-list" class="rec-sub" style="margin-top:12px">불러오는 중…</div></div>';

    box.innerHTML = html;
    if ($('rec-cal') && $('rec-cal').classList.contains('cfx-play')) scheduleColStop();
    loadRanking(); loadFeed(); loadDuelList();
  };

  // 과목(교재+국시기출)별 회차 정답률. 오답 다시 풀기 제외
  function roundItems() {
    var gr = RC.groupRounds(histCache || [], window.subjectIdsBy ? window.subjectIdsBy() : {});
    return RC.GROUPS.map(function (g) {
      var G = gr.groups[g.key];
      var cur = G && G.tries ? G.acc : null, last = G ? G.last : null;
      return { key: g.key, name: g.name, round: G ? G.round : 1, done: G ? G.done : 0, tries: G ? G.tries : 0,
               cur: cur, last: last, show: cur !== null ? cur : last, prev: (G && G.done && cur !== null) ? last : null, history: G ? G.prev : [] };
    });
  }
  function radarSvg(items) {
    var S = 300, c = S / 2, R = 88, n = items.length;
    function pt(idx, r) { var a = -Math.PI / 2 + idx * 2 * Math.PI / n; return [c + r * Math.cos(a), c + r * Math.sin(a)]; }
    function v(x) { return Math.max((x || 0) / 100, 0.02); }
    var svg = '<svg viewBox="0 0 ' + S + ' ' + S + '" class="rec-radar" role="img" aria-label="과목별 정답률 레이더 차트">';
    [0.5, 0.8, 1].forEach(function (lvl) {
      svg += '<polygon points="' + items.map(function (_, k) { return pt(k, R * lvl).join(','); }).join(' ') + '" fill="none" stroke="var(--border-color)" stroke-width="1"' + (lvl === 0.8 ? ' stroke-dasharray="3 3"' : '') + '/>';
    });
    items.forEach(function (_, k) { var p = pt(k, R); svg += '<line x1="' + c + '" y1="' + c + '" x2="' + p[0] + '" y2="' + p[1] + '" stroke="var(--border-color)"/>'; });
    if (items.some(function (it) { return it.prev !== null; })) {
      svg += '<polygon points="' + items.map(function (it, k) { return pt(k, R * v(it.prev !== null ? it.prev : it.show)).join(','); }).join(' ') + '" fill="none" stroke="#9aa3c0" stroke-width="1.6" stroke-dasharray="4 3"/>';
    }
    svg += '<polygon points="' + items.map(function (it, k) { return pt(k, R * v(it.show)).join(','); }).join(' ') + '" fill="rgba(79,172,254,.28)" stroke="#4facfe" stroke-width="2"/>';
    items.forEach(function (it, k) {
      var p = pt(k, R * v(it.show)), l = pt(k, R + 22);
      if (it.show !== null) svg += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3" fill="#4facfe"/>';
      var lift = it.round > 1 ? 6 : 0;
      svg += '<text x="' + l[0] + '" y="' + (l[1] - lift) + '" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="var(--text-sub)"' + (it.show === null ? ' opacity=".5"' : '') + '>' + esc(it.name) + '</text>';
      if (it.round > 1) svg += '<text x="' + l[0] + '" y="' + (l[1] + 7) + '" text-anchor="middle" dominant-baseline="middle" font-size="9" font-weight="700" fill="#e0a800">' + it.round + '회차</text>';
    });
    return svg + '</svg>';
  }

  function roundCompare(items) {
    var w = items.filter(function (i) { return i.done > 0; });
    if (!w.length) return '';
    return '<div class="rec-rounds"><b>회차 비교</b>' + w.map(function (i) {
      var hist = i.history.map(function (a, k) { return (k + 1) + '회차 ' + (a === null ? '-' : a + '%'); });
      if (hist.length > 2) hist = [hist[0], '…', hist[hist.length - 1]];   // 처음 · 직전만
      var line = hist.join(' → ') + ' → ' + i.round + '회차 ' + (i.cur === null ? '시작 전' : i.cur + '%');
      var d = i.cur !== null && i.last !== null ? i.cur - i.last : null;
      return '<div class="rr"><span class="rr-n">' + esc(i.name) + '</span><span class="rr-v">' + esc(line) +
        (d !== null ? ' <em class="' + (d >= 0 ? 'up' : 'dn') + '">' + (d >= 0 ? '▲' : '▼') + Math.abs(d) + '%p</em>' : '') + '</span></div>';
    }).join('') + '</div>';
  }

  function weakList(items) {
    var w = items.filter(function (i) { return i.show !== null && (i.cur === null || i.tries >= 5); })
      .sort(function (a, b) { return a.show - b.show; }).slice(0, 3);
    if (!w.length) return '<div class="rec-sub" style="text-align:center">과목별로 5문제 이상 풀면 약한 과목을 알려 드려요.</div>';
    return '<div class="rec-weak"><b>보강이 필요한 과목</b>' + w.map(function (i) {
      var r = i.cur !== null ? i.round : i.round - 1;
      return '<span>' + esc(i.name) + ' <b>' + i.show + '%</b> <small>(' + r + '회차' + (i.cur !== null ? ' · ' + i.tries + '회 풀이' : ' 완료') + ')</small></span>';
    }).join('') + '</div>';
  }

  // ---------------------------------------------------------------- 연속 효과 (학습 달력)
  var FX_NAMES = ['없음', '숨쉬는 빛', '흐르는 물결', '길이별 색', '네온 테두리', '오로라', '불티'];
  var streakFx = '1';
  try { var savedFx = localStorage.getItem('streakFx'); if (savedFx !== null && FX_NAMES[+savedFx]) streakFx = savedFx; } catch (e) { /* 무시 */ }
  function stkColor(cal) {
    var len = 0; cal.forEach(function (col) { col.forEach(function (c) { if (c.stkLen) len = c.stkLen; }); });
    return len >= 21 ? 'rgba(255, 210, 80, .9)' : len >= 14 ? 'rgba(45, 212, 191, .85)' : len >= 7 ? 'rgba(255, 80, 80, .85)' : 'rgba(255, 154, 60, .85)';
  }
  var COL_FX_NAMES = ['없음', '솟는 무지개'];
  var colFx = '1';
  try { var savedCol = localStorage.getItem('colFx'); if (savedCol !== null && COL_FX_NAMES[+savedCol]) colFx = savedCol; } catch (e) { /* 무시 */ }
  window.setColFx = function (v) {
    colFx = v; try { localStorage.setItem('colFx', v); } catch (e) { /* 무시 */ }
    var el = $('rec-cal'); if (el) { el.className = 'rec-cal fx' + streakFx + ' cfx' + v; if (v !== '0') window.replayColFx(); }
  };
  var colTimer = null;
  function scheduleColStop() {
    clearTimeout(colTimer);
    colTimer = setTimeout(function () { var el = $('rec-cal'); if (el) el.classList.remove('cfx-play'); }, 3000);
  }
  window.replayColFx = function () {
    var el = $('rec-cal'); if (!el) return;
    if (colFx === '0') { toast('세로줄 완주 효과를 먼저 골라 주세요.'); return; }
    if (!el.querySelector('.rec-col.full')) { toast('아직 7일을 다 채운 세로줄이 없어요.'); return; }
    el.classList.remove('cfx-play'); void el.offsetWidth; el.classList.add('cfx-play'); scheduleColStop();
  };
  window.setStreakFx = function (v) {
    streakFx = v; try { localStorage.setItem('streakFx', v); } catch (e) { /* 무시 */ }
    var el = $('rec-cal'); if (el) { var playing = el.classList.contains('cfx-play'); el.className = 'rec-cal fx' + v + ' cfx' + colFx + (playing ? ' cfx-play' : ''); }
  };

  // ---------------------------------------------------------------- 뱃지
  var badgeExtra = null, badgeExtraAt = 0, lastBadges = [], badgeCat = 'all';
  try { badgeCat = localStorage.getItem('badgeCat') || 'all'; } catch (e) { /* 무시 */ }
  function badgeCardInner() {
    var bs = lastBadges, gotN = bs.filter(function (b) { return b.got; }).length;
    var cats = [['all', '전체']].concat(RC.BADGE_CATS).filter(function (c) { return c[0] === 'all' || bs.some(function (b) { return b.cat === c[0]; }); });
    if (!cats.some(function (c) { return c[0] === badgeCat; })) badgeCat = 'all';
    var list = bs.filter(function (b) { return badgeCat === 'all' || b.cat === badgeCat; })
      .map(function (b, i) { return { b: b, i: i }; })
      .sort(function (x, y) { return (y.b.got - x.b.got) || (x.i - y.i); }).map(function (x) { return x.b; });
    return '<div class="rec-title">🎖 뱃지 <span class="rec-sub">' + gotN + ' / ' + bs.length + '</span></div>' +
      '<div class="badge-tabs">' + cats.map(function (c) {
        var n = bs.filter(function (b) { return (c[0] === 'all' || b.cat === c[0]) && b.got; }).length;
        return '<button type="button" class="' + (c[0] === badgeCat ? 'on' : '') + '" onclick="setBadgeCat(\'' + c[0] + '\')">' + c[1] + (n ? ' <small>' + n + '</small>' : '') + '</button>';
      }).join('') + '</div>' +
      '<div class="rec-badges">' + list.map(function (b) {
        return '<div class="rec-badge t' + b.tier + (b.got ? ' got' : '') + '" title="' + esc(b.desc) + '"><div class="bi">' + (b.got ? b.icon : '🔒') + '</div><div class="bn">' + esc(b.name) + '</div>' +
          (!b.got && b.prog ? '<div class="bp">' + esc(String(b.prog)) + '</div>' : '') + '<div class="bd">' + esc(b.desc) + (!b.got && b.prog ? '<br><b>지금 ' + esc(String(b.prog)) + '</b>' : '') + '</div></div>';
      }).join('') + '</div>';
  }
  // 말풍선이 화면 밖으로 나가지 않게 좌우 보정
  function fitTip(e) {
    var b = e.target && e.target.closest && e.target.closest('.rec-badge'); if (!b) return;
    var t = b.querySelector('.bd'); if (!t) return;
    t.style.marginLeft = '0px';
    requestAnimationFrame(function () {
      var r = t.getBoundingClientRect(), vw = document.documentElement.clientWidth, d = 0;
      if (r.right > vw - 8) d = vw - 8 - r.right; else if (r.left < 8) d = 8 - r.left;
      t.style.marginLeft = d + 'px';
    });
  }
  document.addEventListener('mouseover', fitTip); document.addEventListener('focusin', fitTip);
  window.setBadgeCat = function (c) {
    badgeCat = c; try { localStorage.setItem('badgeCat', c); } catch (e) { /* 무시 */ }
    var el = $('badge-card'); if (el) el.innerHTML = badgeCardInner();
  };

  // ---------------------------------------------------------------- 랭킹 · 피드
  var CHARS = ['🌱', '🔧', '🦷', '⚙️', '🏅', '👑'];
  function charHtml(avatar, level) {
    var emoji = CHARS[level - 1], url = RC.avatarUrl(avatar);
    if (!url) return '<span class="lane-ch">' + emoji + '</span>';
    return '<img class="lane-img" src="' + url + '" alt="" loading="lazy" onerror="this.outerHTML=\'<span class=&quot;lane-ch&quot;>' + emoji + '</span>\'">';
  }
  function podiumHtml(rows) {
    var order = [1, 0, 2], cls = ['p1', 'p2', 'p3'];
    return '<div class="rec-pod">' + order.map(function (i) {
      var r = rows[i];
      if (!r) return '<div class="pod-slot empty"><div class="pod-blk ' + cls[i] + '">' + (i + 1) + '</div></div>';
      var lv = RC.levelInfo(Number(r.total_xp));
      return '<div class="pod-slot' + (r.is_me ? ' me' : '') + '">' +
        '<div class="pod-ch">' + (i === 0 ? '<span class="pod-crown">👑</span>' : '') + charHtml(r.avatar, lv.level) + '</div>' +
        '<div class="pod-nm">' + esc(r.display_name || '-') + (r.is_me ? ' (나)' : '') + '</div>' +
        '<div class="pod-n">' + Number(r.attempts) + '문제 · ' + pctText(r) + '</div>' +
        '<div class="pod-blk ' + cls[i] + '" style="animation-delay:' + [0, .25, .45][i] + 's">' + (i + 1) + '</div></div>';
    }).join('') + '</div><div class="pod-base"></div>';
  }
  function pctText(r) { return r.attempts ? Math.round(r.rights / r.attempts * 100) + '%' : '-'; }

  // 이번 주 어워드 (재미 상): 조건을 못 채우면 주인공 없음
  function awardsOf(rows) {
    function best(list, score) { var w = null, ws = -1; list.forEach(function (r) { var v = score(r); if (v > ws) { ws = v; w = r; } }); return w; }
    var diligent = best(rows.filter(function (r) { return Number(r.active_days) >= 2; }), function (r) { return Number(r.active_days) * 10000 + Number(r.attempts); });
    var sharp = best(rows.filter(function (r) { return Number(r.attempts) >= 20; }), function (r) { return Number(r.rights) / Number(r.attempts) * 10000 + Number(r.attempts) / 1000; });
    var owl = best(rows.filter(function (r) { return Number(r.night_n) >= 5; }), function (r) { return Number(r.night_n); });
    return [
      { id: 'diligent', icon: '🔥', name: '개근왕', who: diligent, val: diligent ? diligent.active_days + '일 학습' : '', hint: '2일 이상 풀면 도전' },
      { id: 'sharp', icon: '🎯', name: '정확도왕', who: sharp, val: sharp ? pctText(sharp) : '', hint: '20문제 이상 풀면 도전' },
      { id: 'owl', icon: '🌙', name: '올빼미', who: owl, val: owl ? '밤 ' + owl.night_n + '문제' : '', hint: '새벽 0~5시 5문제↑' }
    ];
  }

  var RANK_TABS = [
    { k: 'day', label: '오늘', desc: '오늘 0시부터 · 매일 자정 초기화', empty: '오늘 기록이 아직 없어요.' },
    { k: 'two', label: '이틀', desc: '어제 + 오늘 · 이틀 연속으로 푼 사람만', empty: '어제와 오늘 이틀 연속으로 푼 사람이 아직 없어요.' },
    { k: 'week', label: '이번 주', desc: '월요일부터 · 매주 월요일 초기화', empty: '이번 주 기록이 아직 없어요.' }
  ];
  var rankPeriod = 'week';
  try { var savedP = localStorage.getItem('rankPeriod'); if (savedP === 'day' || savedP === 'two' || savedP === 'week') rankPeriod = savedP; } catch (e) { /* 무시 */ }
  function rankTab() { return RANK_TABS.filter(function (t) { return t.k === rankPeriod; })[0]; }
  window.setRankPeriod = function (p) {
    rankPeriod = p;
    try { localStorage.setItem('rankPeriod', p); } catch (e) { /* 무시 */ }
    document.querySelectorAll('.rank-seg button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-p') === p); });
    var d = $('rank-desc'); if (d) d.textContent = rankTab().desc;
    var el = $('rank-box'); if (el) el.textContent = '불러오는 중…';
    loadRanking();
  };

  var rankSeq = 0;
  async function loadRanking() {
    var el = $('rank-box'); if (!el) return;
    var seq = ++rankSeq, period = rankPeriod;
    try {
      var rows = await Cloud.getRanking(period);
      if (seq !== rankSeq) return;   // 탭을 빨리 바꾼 경우 이전 응답 무시
      if (!rows.length) { el.textContent = rankTab().empty; return; }
      var medal = ['🥇', '🥈', '🥉'];
      var maxN = Math.max.apply(null, rows.map(function (r) { return Number(r.attempts); })) || 1;
      var awards = period === 'week' ? awardsOf(rows) : [];
      var winnerOf = {};
      awards.forEach(function (a) { if (a.who) (winnerOf[a.who.user_id] = winnerOf[a.who.user_id] || []).push(a); });

      var html = !awards.length ? '' : '<div class="rec-awards">' + awards.map(function (a) {
        return '<div class="rec-award' + (a.who ? ' on' : '') + '"><div class="ai">' + a.icon + '</div><div class="an">' + a.name + '</div>' +
          (a.who ? '<div class="aw">' + esc(a.who.display_name || '-') + '</div><div class="av">' + esc(a.val) + '</div>' : '<div class="av">' + esc(a.hint) + '</div>') + '</div>';
      }).join('') + '</div>';

      html += podiumHtml(rows);
      html += '<div class="rec-sec">🏁 레이스</div>';
      html += '<div class="rec-race">' + rows.map(function (r, i) {
        var lv = RC.levelInfo(Number(r.total_xp)), f = Math.max(0.02, Number(r.attempts) / maxN);
        var chips = (winnerOf[r.user_id] || []).map(function (a) { return '<span class="lane-chip" title="' + a.name + '">' + a.icon + '</span>'; }).join('');
        return '<div class="rec-lane' + (r.is_me ? ' me' : '') + '">' +
          '<div class="lane-head"><span class="rk">' + (medal[i] || (i + 1)) + '</span>' +
            '<span class="nm">' + esc(r.display_name || '-') + (r.is_me ? ' <small>(나)</small>' : '') + '</span>' + chips +
            '<span class="ttl">Lv.' + lv.level + ' ' + esc(lv.name) + '</span></div>' +
          '<div class="lane-track"><div class="lane-run' + (i === 0 ? ' lead' : '') + '" style="--f:' + f.toFixed(3) + '">' + charHtml(r.avatar, lv.level) + '</div><span class="lane-flag">🏁</span></div>' +
          '<div class="lane-foot"><span><b>' + Number(r.attempts) + '</b>문제 · 정답 ' + Number(r.rights) + ' (' + pctText(r) + ')</span>' +
            (r.is_me ? '<span class="cheer-got">👏 ' + Number(r.cheers) + '</span>'
                     : '<button class="cheer-btn' + (r.cheered_by_me ? ' on' : '') + '" data-n="' + Number(r.cheers) + '" onclick="cheerUser(\'' + r.user_id + '\', this)">👏 ' + Number(r.cheers) + '</button>') +
          '</div></div>';
      }).join('') + '</div>';
      el.innerHTML = html;
    } catch (e) { el.textContent = '서버 설정(records.sql)을 실행하면 사용할 수 있어요.'; }
  }

  window.cheerUser = async function (id, btn) {
    btn.disabled = true;
    try {
      var on = await Cloud.toggleCheer(id);
      var n = Number(btn.getAttribute('data-n')) + (on ? 1 : -1);
      btn.setAttribute('data-n', Math.max(0, n)); btn.textContent = '👏 ' + Math.max(0, n);
      btn.classList.toggle('on', !!on);
      if (on) toast('응원했어요! 👏');
    } catch (e) { toast('응원하지 못했어요. 서버 설정(records.sql)을 다시 실행해 주세요.', 4000); }
    btn.disabled = false;
  };

  async function loadFeed() {
    var el = $('feed-box'); if (!el) return;
    try {
      var rows = (await Cloud.getActivity()).filter(function (r) { return r.is_me; });
      if (!rows.length) { el.textContent = '최근 24시간 활동이 없어요.'; return; }
      el.innerHTML = rows.map(function (r) {
        return '<div class="rec-feed">' + (r.is_me ? '<b>나</b>는 ' : '<b>' + esc(r.display_name || '-') + '</b>님은 ') + '' + esc(subjectName(r.subject_key)) + ' <b>' + Number(r.n) + '문제</b> 풀었어요 <small>' + ago(r.last_at) + '</small></div>';
      }).join('');
    } catch (e) { el.textContent = '서버 설정(records.sql)을 실행하면 사용할 수 있어요.'; }
  }

  // ---------------------------------------------------------------- 캐릭터 고르기
  var pickerKind = 'people';
  window.openAvatarPicker = function () {
    var box = $('avatar-picker'); if (!box) return;
    if (box.innerHTML) { box.innerHTML = ''; return; }
    drawAvatarPicker();
  };
  window.setAvatarKind = function (k) { pickerKind = k; drawAvatarPicker(); };
  function drawAvatarPicker() {
    var box = $('avatar-picker'); if (!box) return;
    var cur = currentUser && currentUser.avatar;
    var html = '<div class="avatar-panel"><div class="rec-sub" style="margin-bottom:8px">마음에 드는 캐릭터를 골라 보세요. 고른 캐릭터가 랭킹 레이스에서 달려요.</div>' +
      '<div class="avatar-tabs"><button class="' + (pickerKind === 'people' ? 'on' : '') + '" onclick="setAvatarKind(\'people\')">🧑 사람</button>' +
      '<button class="' + (pickerKind === 'monster' ? 'on' : '') + '" onclick="setAvatarKind(\'monster\')">👾 몬스터</button>' +
      '<button class="' + (!cur ? 'on' : '') + '" onclick="pickAvatar(null)">🦷 기본으로</button></div><div class="avatar-grid">';
    RC.avatarList(pickerKind).forEach(function (a) {
      html += '<button class="avatar-opt' + (cur === a.id ? ' sel' : '') + '" onclick="pickAvatar(\'' + a.id + '\')"><img src="' + RC.avatarUrl(a.id) + '" alt="" loading="lazy"></button>';
    });
    box.innerHTML = html + '</div><div class="rec-sub" style="margin-top:8px; font-size:.68rem">사람 캐릭터 원본: frozenen (CC0)</div></div>';
  }

  window.pickAvatar = async function (id) {
    try { currentUser = await Cloud.updateProfile({ avatar: id }); toast(id ? '캐릭터를 바꿨어요!' : '기본 캐릭터로 돌아왔어요.'); renderRecords(); }
    catch (e) { toast('저장하지 못했어요. 서버 설정(records.sql)을 다시 실행해 주세요.', 4000); }
  };

  var resetArmed = null;
  function disarmReset() {
    resetArmed = null;
    var x = $('reset-mine-btn'); if (x) { x.textContent = '🧹 기록 초기화'; x.classList.remove('armed'); }
    var w = $('reset-mine-warn'); if (w) w.classList.remove('show');
  }
  window.resetMine = async function () {
    var b = $('reset-mine-btn'); if (!b) return;
    if (!resetArmed) {
      b.textContent = '정말 삭제? 한 번 더 누르세요'; b.classList.add('armed');
      var w = $('reset-mine-warn'); if (w) w.classList.add('show');
      resetArmed = setTimeout(disarmReset, 4000);
      return;
    }
    clearTimeout(resetArmed); resetArmed = null; b.disabled = true;
    try {
      await Cloud.resetMyRecords();
      try { Object.keys(localStorage).forEach(function (k) { if (/^(noteClears|pending|quizResume|resume)/i.test(k) || k.indexOf(currentUser.id) >= 0) localStorage.removeItem(k); }); } catch (e) { /* 무시 */ }
      toast('기록을 초기화했어요.', 2000);
      setTimeout(function () { location.reload(); }, 800);
    } catch (e) { b.disabled = false; disarmReset(); toast('초기화하지 못했어요. 서버 설정(records.sql)을 다시 실행해 주세요.', 4000); }
  };

  window.toggleRankPublic = async function (on) {
    try { currentUser = await Cloud.updateProfile({ rank_public: !!on }); toast(on ? '랭킹·활동에 공개해요.' : '비공개로 바꿨어요.'); }
    catch (e) { toast('저장하지 못했어요. 서버 설정(records.sql)을 확인해 주세요.', 4000); var cb = $('rank-public-cb'); if (cb) cb.checked = !on; return; }
    loadRanking(); loadFeed();
  };

  // ---------------------------------------------------------------- 친구 대결
  function pickDuelItems(n) {
    var pool = [], db = window.quizDatabase || {};
    Object.keys(db).forEach(function (key) {
      if (key === 'review') return;
      ((db[key] || {}).questions || []).forEach(function (q) { if (q.flag !== '정답불일치') pool.push({ s: key, id: q.id }); });
    });
    return shuffleArray(pool).slice(0, n);
  }

  window.createDuelNow = async function () {
    var btn = $('duel-create-btn'); btn.disabled = true;
    try {
      var d = await Cloud.createDuel(pickDuelItems(10));
      lastDuelLink = location.origin + location.pathname + '?duel=' + d.id;
      $('duel-new').innerHTML = '<div class="rec-duel-new"><div class="rec-sub">대결이 만들어졌어요! 링크를 친구에게 보내세요.</div>' +
        '<input class="rec-link" readonly value="' + esc(lastDuelLink) + '" onclick="this.select()">' +
        '<div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">' +
        '<button class="btn-action-sm btn-review-expl" onclick="copyDuelLink()">🔗 링크 복사</button>' +
        '<button class="btn-action-sm btn-review-expl" onclick="startDuel(\'' + d.id + '\')">▶ 내가 먼저 풀기</button></div></div>';
      loadDuelList();
    } catch (e) { toast('대결을 만들지 못했어요. 서버 설정(records.sql)을 확인해 주세요.', 4000); }
    btn.disabled = false;
  };

  function duelLinkOf(id) { return location.origin + location.pathname + '?duel=' + id; }
  window.copyDuelLinkFor = function (id) { lastDuelLink = duelLinkOf(id); return copyDuelLink(); };

  window.cancelDuel = async function (id, players) {
    var msg = '이 대결을 취소할까요?\n링크는 쓸 수 없게 되고 점수판도 사라져요.' + (players > 0 ? '\n(이미 ' + players + '명이 참가했어요)' : '');
    if (!confirm(msg)) return;
    try {
      await Cloud.deleteDuel(id);
      var nb = $('duel-new'); if (nb && nb.innerHTML.indexOf(id) >= 0) nb.innerHTML = '';
      toast('대결을 취소했어요.'); loadDuelList();
    } catch (e) { toast('취소하지 못했어요. 서버 설정(records.sql)을 확인해 주세요.', 4000); }
  };

  window.copyDuelLink = async function () {
    var text = '치과기공사 퀴즈 대결 신청! 같은 10문제로 붙어봐요 ⚔️ ' + lastDuelLink;
    try { await navigator.clipboard.writeText(text); toast('링크를 복사했어요.'); return; } catch (e) { /* 아래 대체 방법 */ }
    try {   // 클립보드 권한이 없는 브라우저용
      var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = document.execCommand('copy'); document.body.removeChild(ta);
      if (ok) { toast('링크를 복사했어요.'); return; }
    } catch (e) { /* 무시 */ }
    var i = document.querySelector('.rec-link'); if (i) i.select();
    toast('링크를 길게 눌러 복사해 주세요.');
  };

  async function loadDuelList() {
    var el = $('duel-list'); if (!el) return;
    try {
      var rows = await Cloud.myDuels();
      if (!rows.length) { el.textContent = '아직 대결이 없어요. 만들어서 친구에게 보내 보세요!'; return; }
      el.innerHTML = rows.map(function (r) {
        var mine = r.my_correct === null || r.my_correct === undefined;
        return '<div class="rec-duel-row"><div><b>' + esc(r.creator_name || '-') + '님의 대결</b> <small>' + ago(r.created_at) + ' · ' + Number(r.players) + '명 참가</small>' +
          '<div>' + (mine ? '아직 풀지 않았어요' : '내 점수 <b>' + r.my_correct + '/' + r.total + '</b>') + '</div></div>' +
          '<div class="rec-duel-btns">' + (mine ? '<button class="btn-action-sm btn-review-expl" onclick="startDuel(\'' + r.id + '\')">풀기</button>'
                         : '<button class="btn-action-sm btn-review-expl" onclick="showDuelBoard(\'' + r.id + '\', this)">점수판</button>') +
            '<button class="btn-action-sm btn-review-expl" onclick="copyDuelLinkFor(\'' + r.id + '\')">🔗 링크</button>' +
            (r.is_mine ? '<button class="btn-action-sm btn-retry-wrong" onclick="cancelDuel(\'' + r.id + '\',' + Number(r.players) + ')">🗑 취소</button>' : '') + '</div></div>' +
          '<div class="rec-board" id="board-' + r.id + '"></div>';
      }).join('');
    } catch (e) { el.textContent = '서버 설정(records.sql)을 실행하면 사용할 수 있어요.'; }
  }

  function boardHtml(rows) {
    var medal = ['🥇', '🥈', '🥉'];
    return rows.map(function (r, i) {
      return '<div class="rec-rank-row' + (r.is_me ? ' me' : '') + '"><span class="rk">' + (medal[i] || (i + 1)) + '</span><span class="nm">' + esc(r.display_name || '-') + (r.is_me ? ' (나)' : '') +
        '</span><span class="sc"><b>' + r.correct + '</b>/' + r.total + '</span></div>';
    }).join('');
  }

  window.showDuelBoard = async function (id) {
    var el = $('board-' + id); if (!el) return;
    if (el.innerHTML) { el.innerHTML = ''; return; }
    try { el.innerHTML = boardHtml(await Cloud.duelBoard(id)); } catch (e) { toast(e.message, 3000); }
  };

  window.startDuel = async function (id) {
    try {
      if (await Cloud.myDuelResult(id)) { toast('이미 푼 대결이에요. 점수판을 확인해 보세요.'); switchTab('records'); return; }
      var d = await Cloud.getDuel(id);
      if (!d) { toast('대결을 찾을 수 없어요.'); return; }
      var list = [];
      (d.items || []).forEach(function (it) { var q = getQuestion(it.s, it.id); if (q) list.push(cloneQuestion(q, it.s)); });
      if (!list.length) { toast('대결 문제를 불러오지 못했어요.'); return; }
      currentDuelId = id;
      startQuiz('duel', list, 'duel');
    } catch (e) { toast(e.message, 4000); }
  };

  // 대결 종료 시 호출 (finishQuizSession)
  window.duelFinished = async function (correct, total) {
    var id = currentDuelId; currentDuelId = null;
    if (!id) return;
    try {
      await Cloud.saveDuelResult(id, correct, total);
      var rows = await Cloud.duelBoard(id);
      $('result-extra').innerHTML = '<div style="text-align:left"><b>⚔️ 대결 점수판</b>' + boardHtml(rows) +
        '<div class="rec-sub" style="margin-top:6px">친구가 풀면 점수판에 추가돼요. (기록 탭 → 친구 대결)</div></div>';
      histCache = null;
    } catch (e) { $('result-extra').textContent = '대결 결과를 저장하지 못했어요: ' + e.message; }
  };

  // 링크로 들어온 대결 이어서 진행 (로그인·승인 후)
  window.handlePendingDuel = async function () {
    var id = null;
    try { id = localStorage.getItem('pendingDuel'); localStorage.removeItem('pendingDuel'); } catch (e) { /* 무시 */ }
    if (!id) return;
    toast('친구 대결을 불러오는 중…');
    await startDuel(id);
  };
})();
