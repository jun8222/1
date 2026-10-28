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
const cal = R.calendar(s, now, 17);
assert.strictEqual(cal.length, 17); assert.strictEqual(cal[16].length, 7);
const flat = [].concat(...cal);
assert.strictEqual(flat.find(c => c.day === '2026-10-28').n, 6);
assert.strictEqual(flat.find(c => c.day === '2026-10-28').lv, 1);
console.log('records tests passed');
// ---- 캐릭터
assert.strictEqual(R.avatarList().length, 36);
assert.strictEqual(R.avatarInfo('L3-2').style, 'lorelei');
assert.strictEqual(R.avatarInfo('L9-1'), null);
assert.strictEqual(R.avatarInfo(null), null);
assert.ok(/^https:\/\/api\.dicebear\.com\/9\.x\/thumbs\/svg\?seed=dental-thumbs-1-1&/.test(R.avatarUrl('L1-1')));
assert.ok(R.avatarUrl('L6-1').includes('fde68a'));
console.log('avatar tests passed');
