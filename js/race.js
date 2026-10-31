// 헤더 레이스
//  - 경쟁 모드: 오늘 푼 문제 수로 참가자 모두 결승선 150을 향해 달림, 추월 알림
//  - 솔로 모드: 결승선 = 내 목표, 어제의 나(고스트)·페이스메이커(🐢)와 달림
//  - 경쟁 모드여도 오늘 참가자가 나뿐이면 솔로처럼 보여줌
(function () {
  var POLL = 120000, PACE_FROM = 7, PACE_TO = 23;   // 페이스: 07시 출발 → 23시 목표 도착
  var rows = [], ghost = null, timer = null, started = false, lastOrder = null, runUntil = 0, prevMe = null;
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function cu() { return typeof currentUser !== 'undefined' ? currentUser : null; }
  function joined() { var u = cu(); return !!(u && u.race_join === true); }   // 경쟁 레이스 참여 (기본 꺼짐)
  function folded() { return ls('raceFold') === '1'; }
  function cfg() {
    var u = cu() || {};
    return { mode: u.race_mode === 'solo' ? 'solo' : 'compete', goal: Math.max(10, Math.min(500, Number(u.race_goal) || 80)),
             ghost: u.race_ghost !== false, pace: u.race_pace !== false };
  }
  function today() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function onceToday(key) {   // 하루 한 번만 true
    var seen = {}; try { seen = JSON.parse(ls('raceOnce') || '{}'); } catch (e) { seen = {}; }
    if (seen.d !== today()) seen = { d: today(), k: {} };
    if (seen.k[key]) return false;
    seen.k[key] = 1; ls('raceOnce', JSON.stringify(seen)); return true;
  }

  function me() {
    var m = rows.filter(function (r) { return r.is_me; })[0];
    if (!m) { var u = cu() || {}; m = { k: 'me', name: u.display_name, avatar: u.avatar, n: 0, is_me: true }; rows.push(m); }
    return m;
  }
  function others() { return rows.filter(function (r) { return !r.is_me; }); }
  function solo() { return !joined() || cfg().mode === 'solo' || !others().length; }
  function sorted() { return rows.slice().sort(function (a, b) { return (b.n - a.n) || (a.is_me ? 1 : b.is_me ? -1 : 0); }); }
  function myRank() { var s = sorted(); for (var i = 0; i < s.length; i++) if (s[i].is_me) return i + 1; return s.length; }
  function paceNow(goal) {
    var d = new Date(), h = d.getHours() + d.getMinutes() / 60;
    return Math.round(goal * Math.max(0, Math.min(1, (h - PACE_FROM) / (PACE_TO - PACE_FROM))));
  }
  function sprite(r, cls) {
    var url = r.avatar && window.RecordsCore ? RecordsCore.avatarUrl(r.avatar) : null;
    return url ? '<img class="' + cls + '" src="' + url + '" alt="">' : '<span class="' + cls + ' rc-anon">' + (r.is_me ? '🙂' : '👤') + '</span>';
  }
  function badge() {
    var m = me(), c = cfg();
    if (!solo()) return { cls: 'cmp', txt: '⚔️ ' + myRank() + '위', tip: '경쟁 모드 · 눌러서 모드 바꾸기' };
    var auto = c.mode === 'solo' ? '' : !joined() ? ' (경쟁 레이스에 참여하지 않아 솔로로 보여요)' : ' (오늘 참가자가 나뿐이라 솔로로 보여요)';
    if (c.pace && m.n < c.goal) {
      var d = m.n - paceNow(c.goal);
      if (d < 0) return { cls: 'solo behind', txt: '🏃 ' + d, tip: '페이스메이커보다 ' + (-d) + '문제 뒤' + auto };
    }
    return { cls: 'solo', txt: (m.n >= c.goal ? '🎉 ' : '🏃 ') + Math.min(999, Math.round(m.n / c.goal * 100)) + '%', tip: '솔로 모드 · 목표 ' + c.goal + '문제' + auto };
  }

  function render() {
    var bar = $('race-bar'), chip = $('race-chip');
    if (!bar || !chip) return;
    if (!started) { bar.style.display = 'none'; chip.style.display = 'none'; closePanel(); return; }
    var m = me(), b = badge();
    chip.innerHTML = sprite(m, 'rc-chip-img') + '<b>' + b.txt.replace(/^\S+ /, '') + '</b>';
    chip.className = 'race-chip ' + b.cls; chip.title = '레이스 펼치기';
    if (folded()) { bar.style.display = 'none'; chip.style.display = ''; return; }
    chip.style.display = 'none'; bar.style.display = '';
    var tr = bar.querySelector('.rc-track'), tw = (tr && tr.clientWidth) || Math.max(140, (bar.clientWidth || window.innerWidth) - 120), SZ = 22;
    var html = '', run = Date.now() < runUntil;
    function runner(r, x, extra) {
      var isRun = r.is_me && run;
      return '<span class="rc-r' + (r.is_me ? ' me' : '') + (isRun ? ' run' : '') + (extra || '') + '" style="left:' + x.toFixed(1) + 'px" title="' + esc((r.name || '익명') + ' · ' + r.n + '문제') + '">' +
        (isRun ? '<i class="rc-dust">💨</i>' : '') + sprite(r, 'rc-img') + (r.tag ? '<em class="rc-tag">' + r.tag + '</em>' : '') + (r.crown ? '<i class="rc-crown">👑</i>' : '') + '</span>';
    }
    var goal;
    if (solo()) {
      var c = cfg(); goal = c.goal;
      var pos = function (n) { return Math.min(n, goal) / goal * (tw - SZ); };
      [0.25, 0.5, 0.75].forEach(function (f) { html += '<i class="rc-tick" style="left:' + (f * (tw - SZ) + SZ / 2).toFixed(1) + 'px"></i>'; });
      if (c.ghost && ghost !== null) html += '<span class="rc-r ghost" style="left:' + pos(ghost).toFixed(1) + 'px" title="어제의 나 · 어제 이 시각까지 ' + ghost + '문제">' + sprite({ avatar: m.avatar, is_me: true }, 'rc-img') + '</span>';
      if (c.pace && m.n < goal) { var p = paceNow(goal); html += '<span class="rc-pace" style="left:' + pos(p).toFixed(1) + 'px" title="페이스메이커 · 23시까지 목표를 끝내려면 지금 ' + p + '문제">🐢</span>'; }
      html += runner({ name: m.name, avatar: m.avatar, n: m.n, is_me: true, tag: '나 ' + m.n + '/' + goal, crown: m.n >= goal }, pos(m.n));
    } else {
      goal = null;   // 경쟁: 문제 수 기준 결승선 없음. 1등이 결승선 바로 앞, 나머지는 1등 대비 비율
      var s = sorted().reverse(), GAP = 20, top = Math.max(1, s.length ? s[s.length - 1].n : 1), END = tw - SZ - 6;
      var xs = s.map(function (r) { return r.n / top * END; });
      for (var i = 1; i < xs.length; i++) xs[i] = Math.max(xs[i], xs[i - 1] + GAP);
      for (i = xs.length - 1; i >= 0; i--) xs[i] = Math.max(0, Math.min(xs[i], tw - SZ, i < xs.length - 1 ? xs[i + 1] - GAP : Infinity));
      s.forEach(function (r, j) { html += runner({ name: r.name, avatar: r.avatar, n: r.n, is_me: r.is_me, tag: r.is_me ? '나 ' + r.n : '', crown: false }, xs[j]); });
    }
    bar.innerHTML = '<div class="rc-track">' + html + (goal ? '<span class="rc-fin" title="결승선 ' + goal + '문제">🏁<b>' + goal + '</b></span>' : '<span class="rc-fin" title="결승선 · 가장 많이 푼 사람이 가장 가까이">🏁</span>') + '</div>' +
      '<button type="button" class="rc-mode ' + b.cls + '" onclick="Race.panel(event)" title="' + esc(b.tip) + '">' + b.txt + '</button>' +
'';
  }

  // ---------------------------------------------------------------- 알림
  function toast(msg) {
    var t = $('race-toast'); if (!t || folded()) return;
    t.textContent = msg; t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  function checkEvents() {
    var m = me(), before = prevMe, now = m.n;
    if (solo()) {
      var c = cfg();
      if (before !== null && now > before) {
        if (before < c.goal && now >= c.goal && onceToday('goal')) toast('🎉 오늘 목표 ' + c.goal + '문제 달성!');
        else if (c.ghost && ghost !== null && ghost > 0 && before <= ghost && now > ghost && onceToday('ghost')) toast('👻 어제의 나를 추월했어요!');
        else if (c.pace) { var p = paceNow(c.goal); if (before < p && now >= p && now < c.goal && onceToday('pace')) toast('🐢 페이스메이커를 따라잡았어요!'); }
      }
      lastOrder = null;
    } else {
      var order = sorted().map(function (r) { return r.k; }), mine = m.k;
      if (lastOrder) {
        var ahead = lastOrder.slice(0, lastOrder.indexOf(mine)), nowAhead = order.slice(0, order.indexOf(mine));
        var passed = ahead.filter(function (k) { return nowAhead.indexOf(k) < 0 && onceToday('p:' + k); });
        if (passed.length) {
          var who = rows.filter(function (r) { return r.k === passed[0]; })[0];
          toast('🏃 ' + (who && who.name ? who.name + '님을' : '익명 참가자를') + ' 추월했어요! ' + myRank() + '위');
        }
      }
      lastOrder = order;
    }
    prevMe = now;
  }

  async function refresh() {
    if (!started || document.hidden) return;
    try {
      var data = await Cloud.getRace();
      var mine = rows.filter(function (r) { return r.is_me; })[0];
      rows = (data || []).map(function (r) { return { k: r.k, name: r.name, avatar: r.avatar, n: Number(r.n) || 0, is_me: !!r.is_me }; });
      var m = me(); if (mine && mine.n > m.n) m.n = mine.n;   // 아직 서버에 안 올라간 내 풀이 반영
      if (cfg().ghost && Cloud.getRaceGhost) ghost = await Cloud.getRaceGhost();
      if (prevMe === null) prevMe = m.n;
      checkEvents(); render();
      var pn = $('race-panel'); if (pn) pn.innerHTML = panelHtml();
    } catch (e) { /* 레이스는 실패해도 조용히 */ }
  }

  // ---------------------------------------------------------------- 모드 설정 창
  function closePanel() { var p = $('race-panel'); if (p) p.remove(); document.removeEventListener('click', outside, true); }
  function outside(e) { var p = $('race-panel'); if (p && !p.contains(e.target) && !(e.target.closest && e.target.closest('.rc-mode'))) closePanel(); }
  function listHtml() {
    me();
    var s = sorted();
    return '<div class="rp-t">오늘 참가자 ' + s.length + '명 · 푼 문제 수</div><ol class="rp-list">' + s.map(function (r, i) {
      return '<li class="' + (r.is_me ? 'me' : '') + '"><span class="rk">' + (i < 3 ? ['🥇', '🥈', '🥉'][i] : (i + 1)) + '</span>' + sprite(r, 'rp-img') +
        '<span class="nm">' + esc(r.is_me ? (r.name || '나') + ' (나)' : (r.name || '익명')) + '</span><b>' + r.n + '</b></li>';
    }).join('') + '</ol>';
  }
  function panelHtml() {
    var c = cfg(), goals = [50, 80, 100, 150, 200], custom = goals.indexOf(c.goal) < 0;
    return '<div class="rp-t">🏁 레이스 모드<button type="button" class="rp-fold" onclick="Race.fold(true)">▴ 레이스 접기</button></div>' +
      '<div class="rp-seg"><button type="button" class="' + (c.mode === 'compete' && joined() ? 'on' : '') + '"' + (joined() ? ' onclick="Race.set({race_mode:\'compete\'})"' : ' disabled title="기록 탭에서 \'헤더 경쟁 레이스 참여\'를 켜면 쓸 수 있어요"') + '>⚔️ 경쟁</button>' +
      '<button type="button" class="' + (c.mode === 'solo' || !joined() ? 'on' : '') + '" onclick="Race.set({race_mode:\'solo\'})">🏃 솔로</button></div>' +
      (joined() ? '' : '<div class="rp-d">경쟁은 기록 탭에서 \'헤더 경쟁 레이스 참여\'를 켜면 쓸 수 있어요.</div>') +
      (c.mode === 'solo' || !joined() ? '<div class="rp-d">내 목표까지 혼자 달려요.</div>' : '') +
      (c.mode !== 'solo' && joined() ? listHtml() :
      '<div class="rp-t">솔로 목표 문제 수</div><div class="rp-goals">' +
      goals.map(function (g) { return '<button type="button" class="' + (g === c.goal ? 'on' : '') + '" onclick="Race.set({race_goal:' + g + '})">' + g + '</button>'; }).join('') +
      '<input type="number" min="10" max="500" inputmode="numeric" placeholder="직접" value="' + (custom ? c.goal : '') + '" class="' + (custom ? 'on' : '') + '" onchange="Race.set({race_goal:+this.value})"></div>' +
      '<label class="rp-cb"><input type="checkbox"' + (c.ghost ? ' checked' : '') + ' onchange="Race.set({race_ghost:this.checked})"> 👻 어제의 나 함께 달리기</label>' +
      '<label class="rp-cb"><input type="checkbox"' + (c.pace ? ' checked' : '') + ' onchange="Race.set({race_pace:this.checked})"> 🐢 페이스메이커 (07~23시)</label>');
  }

  window.Race = {
    start: function () {
      if (started) return; started = true; lastOrder = null; prevMe = null; rows = [];
      render(); refresh();
      timer = setInterval(refresh, POLL);
      document.addEventListener('visibilitychange', function () { if (!document.hidden) refresh(); });
      window.addEventListener('resize', function () { clearTimeout(Race._z); Race._z = setTimeout(render, 150); });
    },
    stop: function () { started = false; rows = []; ghost = null; lastOrder = null; prevMe = null; clearInterval(timer); render(); },
    bump: function () {
      if (!started) return;
      me().n += 1; runUntil = Date.now() + 700; checkEvents(); render();
      var pn = $('race-panel'); if (pn) pn.innerHTML = panelHtml();
      clearTimeout(Race._r); Race._r = setTimeout(render, 750);
    },
    fold: function (on) { ls('raceFold', on ? '1' : '0'); closePanel(); render(); },
    refresh: function () { render(); refresh(); },
    panel: function (e) {
      if (e) e.stopPropagation();
      if ($('race-panel')) { closePanel(); return; }
      var p = document.createElement('div'); p.id = 'race-panel'; p.className = 'race-panel'; p.innerHTML = panelHtml();
      document.body.appendChild(p);
      setTimeout(function () { document.addEventListener('click', outside, true); }, 0);
    },
    set: async function (patch) {
      if (patch.race_goal !== undefined && !(patch.race_goal >= 10 && patch.race_goal <= 500)) { toast('목표는 10~500문제 사이로 정해 주세요.'); return; }
      var u = cu(); if (u) Object.keys(patch).forEach(function (k) { u[k] = patch[k]; });
      lastOrder = null; prevMe = me().n;
      var p = $('race-panel'); if (p) p.innerHTML = panelHtml();
      render();
      try { var saved = await Cloud.updateProfile(patch); if (saved && u) Object.keys(patch).forEach(function (k) { u[k] = saved[k]; }); }
      catch (e) { if (window.toast) window.toast('레이스 설정을 저장하지 못했어요.'); }
      if (patch.race_ghost) refresh();
    }
  };
})();
