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
assert.strictEqual(R.levelInfo(300).name, '수습 기공사');
assert.strictEqual(R.levelInfo(299).level, 1);
assert.strictEqual(R.LEVELS.length, 10);
assert.strictEqual(R.levelInfo(9000).name, '명장');
assert.strictEqual(R.levelInfo(12000).pct, 100);
assert.strictEqual(R.levelInfo(200).toNext, 100);
assert.strictEqual(R.levelInfo(5000).name, '수석 기공사');
const b = R.badges({ sum: s, cleared: 12, conquest: { law: true }, now: now });
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
// 회독 (과목 단위로 맞춤)
const T2 = (k, q, c, src) => ({ subject_key: k, question_id: q, correct: c, source: src || 'free' });
const ids = { m: [1, 2], m_past: [1, 2, 3] };
let gr = R.groupRounds([T2('m', 1, 1), T2('m', 2, 0)], ids);
assert.ok(gr.sets.m.waiting); assert.strictEqual(gr.groups.m.round, 1);          // 교재만 끝 → 기다림
gr = R.groupRounds([T2('m', 1, 1), T2('m', 2, 0), T2('m', 1, 1), T2('m_past', 1, 1)], ids);
assert.strictEqual(gr.sets.m.tries, 2);                                          // 기다리는 동안 푼 건 제외
gr = R.groupRounds([T2('m', 1, 1), T2('m', 2, 0), T2('m_past', 1, 1), T2('m_past', 2, 1), T2('m_past', 3, 0, 'retry'), T2('m_past', 3, 1), T2('m', 2, 1)], ids);
assert.deepStrictEqual([gr.groups.m.round, gr.groups.m.done, gr.groups.m.prev, gr.groups.m.acc], [2, 1, [80], 100]);
assert.deepStrictEqual([gr.sets.m.solved, gr.sets.m_past.solved, gr.sets.m.prev, gr.sets.m_past.prev], [1, 0, [50], [100]]);
assert.ok(!gr.sets.m.waiting && gr.sets.m.seen[2] && !gr.sets.m.seen[1]);
assert.deepStrictEqual(gr.sets.m.partners, ['m_past']);
// 새 뱃지
{
  const mk = (y, m, d, n, opt) => Array.from({ length: n }, (_, i) => Object.assign({ created_at: new Date(y, m, d, 10, 0, i).toISOString(), subject_key: 'law', question_id: i + 1, correct: true, source: 'free', session_id: 's' + d + m }, opt || {}));
  const rows = [].concat(mk(2026, 9, 31, 12), mk(2026, 10, 1, 5), mk(2026, 10, 2, 5), mk(2026, 10, 3, 5), mk(2026, 10, 4, 5));
  const now2 = new Date(2026, 10, 5, 12), s2 = R.summarize(rows, now2);
  const bb = R.badges({ sum: s2, cleared: 0, rows, now: now2, extra: { duels_played: 2, duel_wins: 1, cheers_got: 10, reports_sent: 1 } });
  const g2 = id => bb.find(x => x.id === id);
  assert.ok(g2('x_start').got && g2('x_w1').got && !g2('x_w2').got);
  assert.ok(g2('run10').got && g2('perfect').got && g2('win1').got && g2('cheer10').got && g2('report').got);
  assert.ok(BADGE_IDS_UNIQUE(bb));
  const after = R.badges({ sum: s2, cleared: 0, rows, now: new Date(2026, 10, 29) });
  assert.ok(after.filter(x => x.cat === 'exam').every(x => x.got));   // 시험 후 못 받은 시험 뱃지 숨김
}
function BADGE_IDS_UNIQUE(list) { return new Set(list.map(x => x.id)).size === list.length; }
{ // 연속 기록 표시
  const now3 = new Date(2026, 10, 5, 12), rows3 = [3, 4].map(d => ({ created_at: new Date(2026, 10, d, 9).toISOString(), subject_key: 'law', correct: true }));
  const c3 = [].concat(...R.calendar(R.summarize(rows3, now3), now3, 17, null));
  assert.deepStrictEqual(c3.filter(c => c.stk).map(c => [c.day, c.stk, c.stkLen]), [['2026-11-03', 1, 2], ['2026-11-04', 2, 2]]);
}
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
