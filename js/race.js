// 헤더 레이스: 오늘 푼 문제 수만큼 캐릭터가 달림 (목표 150). 모든 화면에서 헤더 아래 고정.
(function () {
  var GOAL = 150, POLL = 120000;
  var rows = [], timer = null, started = false, lastOrder = null, runUntil = 0;
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function cu() { return typeof currentUser !== 'undefined' ? currentUser : null; }
  function joined() { var u = cu(); return !(u && u.race_join === false); }
  function folded() { return ls('raceFold') === '1'; }
  function today() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }

  function me() {
    var m = rows.filter(function (r) { return r.is_me; })[0];
    if (!m) { m = { k: 'me', name: cu() && cu().display_name, avatar: cu() && cu().avatar, n: 0, is_me: true }; rows.push(m); }
    return m;
  }
  function sorted() { return rows.slice().sort(function (a, b) { return (b.n - a.n) || (a.is_me ? 1 : b.is_me ? -1 : 0); }); }
  function myRank() { var s = sorted(); for (var i = 0; i < s.length; i++) if (s[i].is_me) return i + 1; return s.length; }
  function sprite(r, cls) {
    var url = r.avatar && window.RecordsCore ? RecordsCore.avatarUrl(r.avatar) : null;
    return url ? '<img class="' + cls + '" src="' + url + '" alt="">' : '<span class="' + cls + ' rc-anon">' + (r.is_me ? '🙂' : '👤') + '</span>';
  }

  function render() {
    var bar = $('race-bar'), chip = $('race-chip');
    if (!bar || !chip) return;
    if (!started || !joined()) { bar.style.display = 'none'; chip.style.display = 'none'; return; }
    me();
    var rank = myRank(), m = me();
    chip.innerHTML = sprite(m, 'rc-chip-img') + '<b>' + rank + '위</b>';
    chip.title = '오늘의 레이스 · 펼치기';
    if (folded()) { bar.style.display = 'none'; chip.style.display = ''; return; }
    chip.style.display = 'none'; bar.style.display = '';
    // 가까운 캐릭터끼리 겹치지 않게 최소 간격 확보 (앞에서 밀고, 결승선 넘으면 뒤에서 당김)
    var s = sorted().reverse(), html = '', GAP = 20, SZ = 22;
    var tr = bar.querySelector('.rc-track'), tw = (tr && tr.clientWidth) || Math.max(160, (bar.clientWidth || window.innerWidth) - 110);
    var xs = s.map(function (r) { return Math.min(r.n, GOAL) / GOAL * (tw - SZ); });
    for (var i = 1; i < xs.length; i++) xs[i] = Math.max(xs[i], xs[i - 1] + GAP);
    for (i = xs.length - 1; i >= 0; i--) xs[i] = Math.max(0, Math.min(xs[i], tw - SZ, i < xs.length - 1 ? xs[i + 1] - GAP : Infinity));
    s.forEach(function (r, j) {
      var run = r.is_me && Date.now() < runUntil;
      html += '<span class="rc-r' + (r.is_me ? ' me' : '') + (run ? ' run' : '') + (r.n >= GOAL ? ' done' : '') + '" style="left:' + xs[j].toFixed(1) + 'px;bottom:3px" title="' + esc((r.name || '익명') + ' · ' + r.n + '문제') + '">' +
        (run ? '<i class="rc-dust">💨</i>' : '') + sprite(r, 'rc-img') + (r.is_me ? '<em class="rc-tag">나 ' + r.n + '</em>' : '') + (r.n >= GOAL ? '<i class="rc-crown">👑</i>' : '') + '</span>';
    });
    bar.innerHTML = '<div class="rc-track">' + html + '<span class="rc-fin" title="오늘 목표 ' + GOAL + '문제">🏁</span></div>' +
      '<span class="rc-rank">' + rank + '/' + rows.length + '위</span><button type="button" class="rc-fold" onclick="Race.fold(true)" title="레이스 접기">▴</button>';
  }

  // 순위가 바뀌어 누군가를 앞질렀으면 알림 (같은 사람은 하루 한 번, 접힌 상태에선 안 띄움)
  function checkPass() {
    var order = sorted().map(function (r) { return r.k; }), mine = 'me';
    rows.forEach(function (r) { if (r.is_me) mine = r.k; });
    if (lastOrder && !folded()) {
      var before = lastOrder.slice(0, lastOrder.indexOf(mine)), now = order.slice(0, order.indexOf(mine));
      var passed = before.filter(function (k) { return now.indexOf(k) < 0; });
      if (passed.length) {
        var seen = {}; try { seen = JSON.parse(ls('racePassed') || '{}'); } catch (e) { seen = {}; }
        if (seen.d !== today()) seen = { d: today(), k: {} };
        var fresh = passed.filter(function (k) { return !seen.k[k]; });
        if (fresh.length) {
          fresh.forEach(function (k) { seen.k[k] = 1; }); ls('racePassed', JSON.stringify(seen));
          var who = rows.filter(function (r) { return r.k === fresh[0]; })[0];
          toastPass((who && who.name ? who.name + '님을' : '익명 참가자를') + ' 추월했어요! ' + myRank() + '위');
        }
      }
    }
    lastOrder = order;
  }
  function toastPass(msg) {
    var t = $('race-toast'); if (!t) return;
    t.textContent = '🏃 ' + msg; t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
    clearTimeout(toastPass._t); toastPass._t = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  async function refresh() {
    if (!started || !joined() || document.hidden) return;
    try {
      var data = await Cloud.getRace();
      var mine = rows.filter(function (r) { return r.is_me; })[0];
      rows = (data || []).map(function (r) { return { k: r.k, name: r.name, avatar: r.avatar, n: Number(r.n) || 0, is_me: !!r.is_me }; });
      var m = me(); if (mine && mine.n > m.n) m.n = mine.n;   // 아직 서버에 안 올라간 내 풀이 반영
      checkPass(); render();
    } catch (e) { /* 레이스는 실패해도 조용히 */ }
  }

  window.Race = {
    start: function () {
      if (started) return; started = true; lastOrder = null; rows = [];
      render(); refresh();
      timer = setInterval(refresh, POLL);
      document.addEventListener('visibilitychange', function () { if (!document.hidden) refresh(); });
      window.addEventListener('resize', function () { clearTimeout(Race._z); Race._z = setTimeout(render, 150); });
    },
    stop: function () { started = false; rows = []; lastOrder = null; clearInterval(timer); render(); },
    bump: function () {
      if (!started || !joined()) return;
      me().n += 1; runUntil = Date.now() + 700; checkPass(); render();
      clearTimeout(Race._r); Race._r = setTimeout(render, 750);
    },
    fold: function (on) { ls('raceFold', on ? '1' : '0'); render(); },
    refresh: function () { render(); refresh(); }
  };
})();
