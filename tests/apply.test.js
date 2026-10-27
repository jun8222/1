const assert = require('assert');
const fs = require('fs'), path = require('path'), os = require('os');
const { extractJson, validate } = require('../tools/notebooklm/apply');
const L = require('../tools/notebooklm/lib');
const db = L.loadDb();
const manifest = L.readJson(path.join(L.TOOL_DIR, 'manifest.json'));
const b = manifest.batches[0], ids = b.items;
let n = 0; const t = (name, fn) => { fn(); n++; console.log('ok', name); };

t('코드펜스·앞뒤 설명 허용', () => {
  const r = extractJson('네, 결과입니다.\n```json\n{"batch":"B001","ok":[1]}\n```\n끝');
  assert.strictEqual(r.batch, 'B001');
});
t('따옴표 정규화', () => assert.strictEqual(extractJson('{“batch”:“B001”}').batch, 'B001'));
t('끊긴 JSON 오류', () => assert.throws(() => extractJson('{"batch":"B001","ok":[1,')));
t('빠진 번호/중복/범위밖 검출', () => {
  const v = validate({ batch: b.id, ok: [ids[0], ids[0]], fix: [], unverified: [99999] }, b, db);
  assert(v.errors.length >= 3);
});
t('정상 + 각주/HTML 제거', () => {
  const q = db[b.key].questions.find(x => x.id === ids[0]);
  const res = { batch: b.id, ok: ids.slice(1), fix: [{ id: ids[0], optionExplanations: { 1: '틀린 이유입니다.[1, 2] <b>강조</b>' }, commonExplanations: ['핵심 1[3]', '핵심 2'] }] };
  const v = validate(res, b, db);
  assert.deepStrictEqual(v.errors, []);
  assert.strictEqual(v.fixes[0].optionExplanations[1], '틀린 이유입니다. 강조');
  assert.deepStrictEqual(v.fixes[0].commonExplanations, ['핵심 1', '핵심 2']);
});
t('보기번호 범위 밖 거부', () => {
  const res = { batch: b.id, ok: ids.slice(1), fix: [{ id: ids[0], optionExplanations: { 9: 'x' } }] };
  assert(validate(res, b, db).errors.length === 1);
});
t('정답 이견: 현재 정답과 같으면 무시', () => {
  const q = db[b.key].questions.find(x => x.id === ids[0]);
  const v = validate({ batch: b.id, ok: ids, answerDisagree: [{ id: ids[0], suggested: q.answer, reason: 'x' }] }, b, db);
  assert.strictEqual(v.disagree.length, 0);
});
console.log(n + ' tests passed');
