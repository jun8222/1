const assert = require('assert');
const R = require('../js/records-core.js');
const now = new Date(2026, 9, 28, 14, 0);          // 2026-10-28
function at(dOffset, h) { return new Date(2026, 9, 28 + dOffset, h || 10).toISOString(); }
const rows = [];
function add(off, n, ok, key) { for (let i = 0; i < n; i++) rows.push({ created_at: at(off, 10), subject_key: key || 'anatomy_past', correct: i < ok }); }
add(-5, 3, 3); add(-3, 2, 1); add(-2, 4, 2); add(-1, 5, 5); add(0, 6, 3, 'law');
const s = R.summarize(rows, now);
assert.strictEqual(s.total, 20);
assert.strictEqual(s.rights, 14);
assert.strictEqual(s.streak, 4, '오늘·어제·그제·3일전 연속');
assert.strictEqual(s.bestStreak, 4);
assert.strictEqual(s.todayCount, 6);
assert.strictEqual(s.groups.anatomy.n, 14);
assert.strictEqual(s.xp, 34);
// 오늘 아직 안 풀었어도 어제까지 이어지면 스트릭 유지
const s2 = R.summarize(rows.filter(r => r.created_at !== at(0, 10)), now);
assert.strictEqual(s2.streak, 3);
assert.strictEqual(s2.todayDone, false);
// 하루 건너뛰면 끊김
const s3 = R.summarize(rows.filter(r => !(r.created_at === at(0, 10) || r.created_at === at(-1, 10))), now);
assert.strictEqual(s3.streak, 0);
assert.strictEqual(R.levelInfo(0).name, '견습생');
assert.strictEqual(R.levelInfo(100).name, '수습 기공사');
assert.strictEqual(R.levelInfo(5000).name, '명장');
assert.strictEqual(R.levelInfo(5000).pct, 100);
assert.strictEqual(R.levelInfo(200).toNext, 100);
const b = R.badges({ sum: s, cleared: 12, conquest: { law: true } });
const got = b.filter(x => x.got).map(x => x.id);
assert.ok(got.includes('first') && got.includes('s3') && got.includes('clear10') && got.includes('c_law'));
assert.ok(!got.includes('s7') && !got.includes('t100') && !got.includes('c_anatomy'));
const rd = R.radar(s);
assert.strictEqual(rd.length, 11);
assert.strictEqual(rd.find(x => x.key === 'law').acc, 0.5);
const cal = R.calendar(s, now, 17, null);
assert.strictEqual(cal.length, 17); assert.strictEqual(cal[16].length, 7);
const flat = [].concat(...cal);
assert.strictEqual(flat.length, 119);
assert.strictEqual(flat[118].day, R.dayKey(now));   // 맨 오른쪽 아래 = 오늘
assert.ok(flat.every(c => !c.future));
assert.strictEqual(flat.find(c => c.day === '2026-10-28').n, 6);
assert.strictEqual(flat.find(c => c.day === '2026-10-28').lv, 1);
assert.strictEqual(s.firstDay, Object.keys(s.days).sort()[0]);
assert.strictEqual(R.summarize([], now).firstDay, null);
// 시험일 달력
const ex = R.dayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 29));
const calE = [].concat(...R.calendar(s, now, 17, ex));
assert.strictEqual(calE[118].day, ex); assert.ok(calE[118].exam);
assert.strictEqual(calE.filter(c => c.future).length, 29);
assert.ok(calE[118 - 29].today);
const past = R.dayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3));
assert.strictEqual([].concat(...R.calendar(s, now, 17, past))[118].day, R.dayKey(now));   // 시험 지나면 오늘이 끝
assert.strictEqual(R.daysToExam(new Date(2026, 9, 30, 15), '2026-11-28'), 29);
assert.strictEqual(R.daysToExam(new Date(2026, 10, 28, 23), '2026-11-28'), 0);
const lvOf = n => [].concat(...R.calendar({ days: { [R.dayKey(now)]: { n: n } } }, now, 17, null))[118].lv;
assert.deepStrictEqual([0, 9, 29, 59, 99, 100, 149, 150, 199, 200, 300].map(lvOf), [0, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7]);
// 회독
const A = (q, c) => ({ subject_key: 'x', question_id: q, correct: c });
let rr = R.rounds([A(1, 1), A(2, 0), A(2, 1)], { x: [1, 2, 3] }).x;
assert.deepStrictEqual([rr.round, rr.done, rr.solved, rr.pct, rr.acc], [1, 0, 2, 67, 67]);
rr = R.rounds([A(1, 1), A(2, 0), A(3, 1), A(9, 0), A(1, 1)], { x: [1, 2, 3] }).x;   // 9는 없는 문항 → 무시
assert.deepStrictEqual([rr.round, rr.done, rr.solved, rr.acc, rr.prev], [2, 1, 1, 100, [67]]);
assert.ok(rr.seen[1] && !rr.seen[2]);
rr = R.rounds([A(1, 0), A(2, 0), A(1, 1), A(2, 1)], { x: [1, 2] }).x;
assert.deepStrictEqual([rr.round, rr.done, rr.acc, rr.prev], [3, 2, null, [0, 100]]);
rr = R.rounds([A(1, 1), Object.assign(A(2, 1), { source: 'retry' })], { x: [1, 2] }).x;
assert.deepStrictEqual([rr.round, rr.solved, rr.tries], [1, 1, 1]);   // retry 제외
console.log('records tests passed');
// ---- 캐릭터 (잠금 없음)
assert.strictEqual(R.avatarList().length, 72);
assert.strictEqual(R.avatarList('people').length, 48);
assert.strictEqual(R.avatarList('monster').length, 24);
assert.strictEqual(R.avatarInfo('M24').kind, 'monster');
assert.strictEqual(R.avatarInfo('P49'), null);
assert.strictEqual(R.avatarInfo('M25'), null);
assert.strictEqual(R.avatarInfo('P00'), null);
assert.strictEqual(R.avatarInfo(null), null);
assert.ok(R.avatarUrl('P07').startsWith('./assets/avatars/p07.png'));
assert.ok(R.avatarUrl('M03').startsWith('./assets/avatars/m03.png'));
console.log('avatar tests passed');
