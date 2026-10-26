/* =====================================================================
 * 오늘의 문제 자동 구성 (1단계: 규칙 기반)
 *
 * 우선순위
 *   1) 복습   : 마지막에 틀린 문제 (어제 이전에 푼 것). 목표의 최대 40%
 *   2) 새 문제: 아직 한 번도 안 푼 문제 (과목을 골고루 섞어서)
 *   3) 복습 추가: 1)에서 자리가 모자라 남은 오답
 *   4) 재확인 : 맞혔지만 가장 오래전에 푼 문제
 *
 * 2단계에서 AI 약점 분석이 붙으면 이 함수의 후보 점수만 바꾸면 됩니다.
 * 브라우저(window.DailyPlanner)와 node(require) 양쪽에서 쓸 수 있습니다.
 * ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DailyPlanner = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var REVIEW_RATIO = 0.4;

  function keyOf(s, id) { return s + ':' + id; }

  function shuffle(arr, rng) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /** 과목별로 섞은 뒤 과목을 번갈아 가며 하나씩 뽑음 (한 과목 쏠림 방지) */
  function roundRobin(items, rng) {
    var groups = {};
    items.forEach(function (it) { (groups[it.s] = groups[it.s] || []).push(it); });
    var lists = shuffle(Object.keys(groups), rng).map(function (k) { return shuffle(groups[k], rng); });
    var out = [];
    var more = true;
    while (more) {
      more = false;
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].length) { out.push(lists[i].shift()); more = true; }
      }
    }
    return out;
  }

  /**
   * @param {Object}   p
   * @param {number}   p.goal        목표 문항 수
   * @param {Array}    p.pool        후보 전체 [{s, id}]  (선택한 과목의 모든 문제)
   * @param {Object}   p.stats       { 's:id': {tries, rights, lastAt(ms), lastCorrect} }
   * @param {Object=}  p.exclude     { 's:id': true }  이미 오늘 세트에 있거나 제외할 문제
   * @param {number}   p.todayStart  오늘 00:00 (ms) - 오늘 푼 문제는 복습 후보에서 제외
   * @param {Function=} p.rng        난수 함수 (테스트용)
   * @returns {Array} [{s, id, why: 'review'|'new'|'refresh'}]
   */
  function compose(p) {
    var goal = Math.max(0, p.goal | 0);
    var rng = p.rng || Math.random;
    var stats = p.stats || {};
    var exclude = p.exclude || {};
    var todayStart = p.todayStart || 0;

    var picked = {};
    var result = [];
    function take(list, why, limit) {
      for (var i = 0; i < list.length && result.length < goal && limit > 0; i++) {
        var k = keyOf(list[i].s, list[i].id);
        if (picked[k] || exclude[k]) continue;
        picked[k] = true;
        result.push({ s: list[i].s, id: list[i].id, why: why });
        limit--;
      }
    }

    var wrongDue = [], fresh = [], rightOld = [];
    p.pool.forEach(function (q) {
      var k = keyOf(q.s, q.id);
      if (exclude[k]) return;
      var st = stats[k];
      if (!st) { fresh.push(q); return; }
      if (st.lastAt >= todayStart) return;          // 오늘 이미 푼 문제는 건드리지 않음
      if (st.lastCorrect === false) {
        wrongDue.push({ s: q.s, id: q.id, miss: st.tries - st.rights, lastAt: st.lastAt });
      } else {
        rightOld.push({ s: q.s, id: q.id, lastAt: st.lastAt });
      }
    });

    // 많이 틀린 것 먼저, 같으면 오래 방치된 것 먼저
    wrongDue.sort(function (a, b) { return (b.miss - a.miss) || (a.lastAt - b.lastAt); });
    rightOld.sort(function (a, b) { return a.lastAt - b.lastAt; });

    var reviewCap = Math.ceil(goal * REVIEW_RATIO);
    take(wrongDue, 'review', reviewCap);
    take(roundRobin(fresh, rng), 'new', goal);
    take(wrongDue, 'review', goal);
    take(rightOld, 'refresh', goal);

    return shuffle(result, rng);
  }

  /**
   * 목표 문항 수가 바뀌었을 때: 오늘 이미 푼 문제는 그대로 두고 안 푼 자리만 늘리거나 줄임
   * @returns {Array} 새 items
   */
  function resize(items, solvedKeys, newGoal, composeArgs) {
    var kept = items.filter(function (it) { return solvedKeys[keyOf(it.s, it.id)]; });
    var unsolved = items.filter(function (it) { return !solvedKeys[keyOf(it.s, it.id)]; });
    var need = newGoal - kept.length;
    if (need <= 0) return kept;
    if (unsolved.length >= need) return kept.concat(unsolved.slice(0, need));

    var exclude = {};
    items.forEach(function (it) { exclude[keyOf(it.s, it.id)] = true; });
    var extra = compose({
      goal: need - unsolved.length,
      pool: composeArgs.pool,
      stats: composeArgs.stats,
      exclude: exclude,
      todayStart: composeArgs.todayStart,
      rng: composeArgs.rng
    });
    return kept.concat(unsolved, extra);
  }

  return { compose: compose, resize: resize, keyOf: keyOf, REVIEW_RATIO: REVIEW_RATIO };
});
