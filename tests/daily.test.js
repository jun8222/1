// 실행: node tests/daily.test.js
const assert = require('assert');
const { compose, resize, keyOf } = require('../js/daily.js');

// 재현 가능한 난수
function seeded(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

const subjects = ['anatomy', 'law', 'materials'];
const pool = [];
subjects.forEach(s => { for (let id = 1; id <= 20; id++) pool.push({ s, id }); });

const DAY = 86400000;
const now = Date.UTC(2026, 9, 26, 5, 0, 0);
const todayStart = now - 5 * 3600 * 1000;

function stat(tries, rights, lastAt, lastCorrect) { return { tries, rights, lastAt, lastCorrect }; }

let passed = 0;
function test(name, fn) { fn(); passed++; console.log('  ok  ' + name); }

test('기록이 없으면 목표 수만큼 새 문제를 중복 없이 뽑는다', () => {
  const r = compose({ goal: 15, pool, stats: {}, todayStart, rng: seeded(1) });
  assert.strictEqual(r.length, 15);
  assert.strictEqual(new Set(r.map(x => keyOf(x.s, x.id))).size, 15);
  assert(r.every(x => x.why === 'new'));
});

test('새 문제는 과목을 골고루 섞는다 (한 과목 쏠림 없음)', () => {
  const r = compose({ goal: 15, pool, stats: {}, todayStart, rng: seeded(2) });
  const cnt = {};
  r.forEach(x => cnt[x.s] = (cnt[x.s] || 0) + 1);
  subjects.forEach(s => assert.strictEqual(cnt[s], 5));
});

test('어제 틀린 문제는 복습으로 들어오고 상한(40%)을 넘지 않는다', () => {
  const stats = {};
  for (let id = 1; id <= 10; id++) stats[keyOf('anatomy', id)] = stat(1, 0, now - DAY, false);
  const r = compose({ goal: 10, pool, stats, todayStart, rng: seeded(3) });
  const review = r.filter(x => x.why === 'review');
  assert.strictEqual(review.length, 4);
  assert.strictEqual(r.length, 10);
});

test('많이 틀린 문제가 복습에서 먼저 뽑힌다', () => {
  const stats = {
    [keyOf('law', 1)]: stat(1, 0, now - 2 * DAY, false),
    [keyOf('law', 2)]: stat(4, 1, now - 2 * DAY, false),   // 3번 오답
    [keyOf('law', 3)]: stat(2, 0, now - 2 * DAY, false)    // 2번 오답
  };
  const r = compose({ goal: 5, pool, stats, todayStart, rng: seeded(4) });   // 복습 상한 2
  const review = r.filter(x => x.why === 'review').map(x => x.id).sort();
  assert.deepStrictEqual(review, [2, 3]);
});

test('오늘 이미 푼 문제는 어떤 후보에도 들어가지 않는다', () => {
  const stats = {};
  pool.forEach(q => { stats[keyOf(q.s, q.id)] = stat(1, 0, todayStart + 1000, false); });
  const r = compose({ goal: 10, pool, stats, todayStart, rng: seeded(5) });
  assert.strictEqual(r.length, 0);
});

test('새 문제가 바닥나면 남은 오답 → 오래된 정답 순으로 채운다', () => {
  const small = pool.filter(q => q.s === 'law').slice(0, 10);
  const stats = {};
  small.forEach((q, i) => {
    stats[keyOf(q.s, q.id)] = i < 3
      ? stat(1, 0, now - DAY, false)                       // 오답 3
      : stat(1, 1, now - (30 - i) * DAY, true);            // 정답 7 (i 작을수록 더 오래됨)
  });
  const r = compose({ goal: 8, pool: small, stats, todayStart, rng: seeded(6) });
  assert.strictEqual(r.length, 8);
  assert.strictEqual(r.filter(x => x.why === 'review').length, 3);
  const refresh = r.filter(x => x.why === 'refresh').map(x => x.id).sort((a, b) => a - b);
  assert.deepStrictEqual(refresh, [4, 5, 6, 7, 8]);        // 가장 오래된 정답 5개
});

test('문제가 목표보다 적으면 있는 만큼만 반환한다', () => {
  const r = compose({ goal: 50, pool: pool.slice(0, 7), stats: {}, todayStart, rng: seeded(7) });
  assert.strictEqual(r.length, 7);
});

test('exclude 에 있는 문제는 제외된다', () => {
  const exclude = {};
  pool.filter(q => q.s !== 'materials').forEach(q => exclude[keyOf(q.s, q.id)] = true);
  const r = compose({ goal: 10, pool, stats: {}, exclude, todayStart, rng: seeded(8) });
  assert(r.every(x => x.s === 'materials'));
});

test('같은 seed면 같은 결과 (재현성)', () => {
  const a = compose({ goal: 12, pool, stats: {}, todayStart, rng: seeded(9) });
  const b = compose({ goal: 12, pool, stats: {}, todayStart, rng: seeded(9) });
  assert.deepStrictEqual(a, b);
});

test('resize: 목표를 늘리면 푼 문제와 안 푼 문제는 유지하고 새 문제만 추가', () => {
  const items = compose({ goal: 10, pool, stats: {}, todayStart, rng: seeded(10) });
  const solved = {};
  items.slice(0, 4).forEach(it => solved[keyOf(it.s, it.id)] = true);
  const out = resize(items, solved, 16, { pool, stats: {}, todayStart, rng: seeded(11) });
  assert.strictEqual(out.length, 16);
  assert.strictEqual(new Set(out.map(x => keyOf(x.s, x.id))).size, 16);
  items.forEach(it => assert(out.some(o => o.s === it.s && o.id === it.id)));
});

test('resize: 목표를 줄이면 푼 문제는 남기고 안 푼 문제만 줄인다', () => {
  const items = compose({ goal: 10, pool, stats: {}, todayStart, rng: seeded(12) });
  const solved = {};
  items.slice(0, 4).forEach(it => solved[keyOf(it.s, it.id)] = true);
  const out = resize(items, solved, 6, { pool, stats: {}, todayStart });
  assert.strictEqual(out.length, 6);
  Object.keys(solved).forEach(k => assert(out.some(o => keyOf(o.s, o.id) === k)));
});

test('resize: 이미 푼 개수가 새 목표 이상이면 푼 문제만 남는다', () => {
  const items = compose({ goal: 10, pool, stats: {}, todayStart, rng: seeded(13) });
  const solved = {};
  items.slice(0, 8).forEach(it => solved[keyOf(it.s, it.id)] = true);
  const out = resize(items, solved, 5, { pool, stats: {}, todayStart });
  assert.strictEqual(out.length, 8);
});

console.log(`\n${passed}개 테스트 통과`);
