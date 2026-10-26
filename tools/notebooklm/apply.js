#!/usr/bin/env node
/* 사용
 *   node tools/notebooklm/apply.js <NotebookLM 답변을 저장한 파일>   답변 검증 후 data/overlay/ 에 반영
 *   node tools/notebooklm/apply.js --status                         진행 현황
 *   node tools/notebooklm/apply.js <파일> --dry                     검증만 (저장 안 함)
 * 원본 data/*.js 는 건드리지 않고 data/overlay/<과목>.json 에만 쌓는다. 되돌리려면 그 파일을 지우면 된다. */
const fs = require('fs');
const path = require('path');
const L = require('./lib');

const PROGRESS = path.join(L.TOOL_DIR, 'progress.json');
const REVIEW = path.join(L.TOOL_DIR, 'review.json');
const MANIFEST = path.join(L.TOOL_DIR, 'manifest.json');

const MAX_OPT = 400, MAX_COMMON_LINE = 400, MAX_COMMON_LINES = 6;

/** 답변 텍스트에서 JSON 한 덩어리를 꺼낸다 (코드펜스·앞뒤 설명 허용) */
function extractJson(text) {
  let t = String(text).replace(/\r/g, '').replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  t = t.replace(/```(?:json)?/gi, '');
  const a = t.indexOf('{');
  if (a < 0) throw new Error('JSON 을 찾지 못했어요 ({ 가 없음).');
  let depth = 0, inStr = false, esc = false;
  for (let i = a; i < t.length; i++) {
    const c = t[i];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return JSON.parse(t.slice(a, i + 1)); }
  }
  throw new Error('JSON 이 중간에 끊겼어요 (답변이 잘렸을 수 있어요). 묶음을 더 작게 나눠 다시 요청해 주세요.');
}

/** 문장 정리: 각주 번호·HTML·마크다운 꾸밈 제거 */
function clean(s, stats) {
  let t = String(s == null ? '' : s);
  const before = t;
  t = t.replace(/\[\s*\d+(?:\s*[,\-–~]\s*\d+)*\s*\]/g, '');
  if (t !== before) stats.citations++;
  const b2 = t;
  t = t.replace(/<[^>]*>/g, '');
  if (t !== b2) stats.html++;
  t = t.replace(/\*\*|__|`/g, '').replace(/\s*\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
  return t;
}

function validate(res, batch, db) {
  const errors = [], warns = [];
  const stats = { citations: 0, html: 0 };
  const ids = new Set(batch.items);
  const q = id => db[batch.key].questions.find(x => x.id === id);

  const asIds = (arr, name) => {
    if (arr === undefined) return [];
    if (!Array.isArray(arr)) { errors.push(name + ' 는 배열이어야 해요.'); return []; }
    return arr.map(Number).filter(n => Number.isInteger(n));
  };
  const ok = asIds(res.ok, 'ok');
  const unverified = asIds(res.unverified, 'unverified');
  const fixList = Array.isArray(res.fix) ? res.fix : [];
  if (res.fix !== undefined && !Array.isArray(res.fix)) errors.push('fix 는 배열이어야 해요.');
  const fixIds = fixList.map(f => Number(f && f.id));

  const seen = {};
  [['ok', ok], ['fix', fixIds], ['unverified', unverified]].forEach(([n, arr]) => arr.forEach(id => {
    if (!ids.has(id)) errors.push(n + ' 에 이 묶음에 없는 번호 #' + id);
    if (seen[id]) errors.push('#' + id + ' 가 ' + seen[id] + ' 와 ' + n + ' 에 중복');
    seen[id] = n;
  }));
  const missing = batch.items.filter(id => !seen[id]);
  if (missing.length) errors.push('답변에 빠진 번호: ' + missing.map(i => '#' + i).join(', ') + ' (다시 요청해 주세요)');

  const fixes = [];
  fixList.forEach(f => {
    if (!f || !ids.has(Number(f.id))) return;
    const id = Number(f.id), orig = q(id), out = { id };
    if (f.optionExplanations !== undefined) {
      if (typeof f.optionExplanations !== 'object' || Array.isArray(f.optionExplanations)) { errors.push('#' + id + ' optionExplanations 형식 오류'); return; }
      out.optionExplanations = {};
      Object.keys(f.optionExplanations).forEach(k => {
        const n = Number(k);
        if (!(n >= 1 && n <= orig.options.length)) { errors.push('#' + id + ' 보기번호 ' + k + ' 가 범위 밖'); return; }
        const txt = clean(f.optionExplanations[k], stats);
        if (!txt) { warns.push('#' + id + ' 보기 ' + n + ' 해설이 비어 있어 건너뜀'); return; }
        if (txt.length > MAX_OPT) { errors.push('#' + id + ' 보기 ' + n + ' 해설이 너무 길어요(' + txt.length + '자)'); return; }
        out.optionExplanations[n] = txt;
      });
    }
    if (f.commonExplanations !== undefined) {
      if (!Array.isArray(f.commonExplanations)) { errors.push('#' + id + ' commonExplanations 는 배열이어야 해요.'); return; }
      const lines = f.commonExplanations.map(x => clean(x, stats)).filter(Boolean);
      if (!lines.length) warns.push('#' + id + ' 공통해설이 비어 있어 건너뜀');
      else if (lines.length > MAX_COMMON_LINES || lines.some(x => x.length > MAX_COMMON_LINE)) errors.push('#' + id + ' 공통해설이 너무 길어요(' + MAX_COMMON_LINES + '줄/줄당 ' + MAX_COMMON_LINE + '자 이내)');
      else out.commonExplanations = lines;
    }
    if (!out.optionExplanations || !Object.keys(out.optionExplanations).length) delete out.optionExplanations;
    if (!out.optionExplanations && !out.commonExplanations) { warns.push('#' + id + ' fix 인데 바꿀 내용이 없어 건너뜀'); return; }
    // 실제로 달라진 게 없으면 알려 준다
    const sameOpt = !out.optionExplanations || Object.keys(out.optionExplanations).every(k => (orig.optionExplanations || {})[k] === out.optionExplanations[k]);
    const sameCom = !out.commonExplanations || JSON.stringify(out.commonExplanations) === JSON.stringify(orig.commonExplanations || []);
    if (sameOpt && sameCom) { warns.push('#' + id + ' 기존과 동일해서 건너뜀'); return; }
    if (f.basis) out.basis = clean(f.basis, stats).slice(0, 200);
    fixes.push(out);
  });

  const disagree = [];
  (Array.isArray(res.answerDisagree) ? res.answerDisagree : []).forEach(d => {
    const id = Number(d && d.id), sug = Number(d && d.suggested);
    if (!ids.has(id)) { errors.push('answerDisagree 에 이 묶음에 없는 번호 #' + id); return; }
    const orig = q(id);
    if (sug === orig.answer) { warns.push('#' + id + ' answerDisagree 제안이 현재 정답과 같아 무시'); return; }
    disagree.push({ id, current: orig.answer, suggested: sug, reason: clean(d.reason, stats).slice(0, 300) });
  });

  // 공통해설이 여전히 없는 문제
  const stillNoCommon = batch.items.filter(id => {
    const orig = q(id), f = fixes.find(x => x.id === id);
    return !(f && f.commonExplanations) && !L.hasCommon(orig);
  });
  if (stillNoCommon.length) warns.push('공통해설이 여전히 없는 문제: ' + stillNoCommon.map(i => '#' + i).join(', '));
  if (stats.citations) warns.push('각주 번호([n]) 표시가 ' + stats.citations + '곳 있어 자동 제거했어요.');
  if (stats.html) warns.push('HTML 태그가 ' + stats.html + '곳 있어 자동 제거했어요.');

  return { errors, warns, fixes, ok: ok.filter(id => ids.has(id)), unverified: unverified.filter(id => ids.has(id)), disagree, stillNoCommon };
}

function apply(file, dry) {
  const manifest = L.readJson(MANIFEST, null);
  if (!manifest) throw new Error('manifest.json 이 없어요. 먼저 export.js 를 실행하세요.');
  const res = extractJson(fs.readFileSync(file, 'utf8'));
  const batch = manifest.batches.find(b => b.id === String(res.batch || '').trim());
  if (!batch) throw new Error('답변의 "batch" 값(' + res.batch + ')을 찾지 못했어요. 예: "B001"');

  const db = L.loadDb();
  const v = validate(res, batch, db);
  console.log('[' + batch.id + '] ' + batch.name + ' — 문제 ' + batch.items.length + '개');
  console.log('  이상 없음 ' + v.ok.length + ' · 수정 ' + v.fixes.length + ' · 근거 못 찾음 ' + v.unverified.length + ' · 정답 이견 ' + v.disagree.length);
  v.warns.forEach(w => console.log('  ⚠ ' + w));
  if (v.errors.length) {
    v.errors.forEach(e => console.log('  ✖ ' + e));
    console.log('→ 오류가 있어 아무것도 저장하지 않았어요.');
    return false;
  }
  if (dry) { console.log('→ 검증만 했어요(저장 안 함).'); return true; }

  // overlay 저장
  const ovFile = path.join(L.OVERLAY_DIR, batch.key + '.json');
  const ov = L.readJson(ovFile, {});
  const today = new Date().toISOString().slice(0, 10);
  v.fixes.forEach(f => {
    const cur = ov[f.id] || {};
    const next = { batch: batch.id, at: today };
    if (f.optionExplanations) next.optionExplanations = Object.assign({}, cur.optionExplanations || {}, f.optionExplanations);
    else if (cur.optionExplanations) next.optionExplanations = cur.optionExplanations;
    if (f.commonExplanations) next.commonExplanations = f.commonExplanations;
    else if (cur.commonExplanations) next.commonExplanations = cur.commonExplanations;
    if (f.basis) next.basis = f.basis;
    ov[f.id] = next;
  });
  if (v.fixes.length) L.writeJson(ovFile, ov);

  const indexFile = path.join(L.OVERLAY_DIR, 'index.json');
  const index = L.readJson(indexFile, { subjects: [] });
  if (v.fixes.length && index.subjects.indexOf(batch.key) < 0) {
    index.subjects.push(batch.key);
    const order = L.loadSubjectMeta().map(m => m.key);
    index.subjects.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    L.writeJson(indexFile, index);
  }

  // 검토 목록(근거 못 찾음 / 정답 이견) 누적
  const rv = L.readJson(REVIEW, { unverified: {}, answerDisagree: {} });
  const keyOf = id => batch.key + '#' + id;
  batch.items.forEach(id => { delete rv.unverified[keyOf(id)]; delete rv.answerDisagree[keyOf(id)]; });
  v.unverified.forEach(id => { rv.unverified[keyOf(id)] = batch.id; });
  v.disagree.forEach(d => { rv.answerDisagree[keyOf(d.id)] = { batch: batch.id, current: d.current, suggested: d.suggested, reason: d.reason }; });
  L.writeJson(REVIEW, rv);

  const pg = L.readJson(PROGRESS, {});
  pg[batch.id] = { at: today, ok: v.ok.length, fixed: v.fixes.length, unverified: v.unverified.length, disagree: v.disagree.length, stillNoCommon: v.stillNoCommon.length };
  L.writeJson(PROGRESS, pg);
  console.log('→ 반영했어요: data/overlay/' + batch.key + '.json');
  return true;
}

function status() {
  const manifest = L.readJson(MANIFEST, null);
  if (!manifest) { console.log('manifest.json 이 없어요. export.js 를 먼저 실행하세요.'); return; }
  const pg = L.readJson(PROGRESS, {});
  const rv = L.readJson(REVIEW, { unverified: {}, answerDisagree: {} });
  const done = manifest.batches.filter(b => pg[b.id]);
  const nq = a => a.reduce((s, b) => s + b.items.length, 0);
  console.log('진행: ' + done.length + ' / ' + manifest.batches.length + ' 묶음 (문제 ' + nq(done) + ' / ' + nq(manifest.batches) + ')');
  const keys = [...new Set(manifest.batches.map(b => b.key))];
  keys.forEach(k => {
    const bs = manifest.batches.filter(b => b.key === k), d = bs.filter(b => pg[b.id]).length;
    console.log('  ' + (d === bs.length ? '✔' : d ? '…' : ' ') + ' ' + bs[0].name + '  ' + d + '/' + bs.length);
  });
  const next = manifest.batches.find(b => !pg[b.id]);
  if (next) console.log('다음 묶음: ' + next.id + ' (' + next.name + ')');
  console.log('근거 못 찾음 ' + Object.keys(rv.unverified).length + '문제 · 정답 이견 ' + Object.keys(rv.answerDisagree).length + '문제');
  const left = manifest.batches.filter(b => !pg[b.id]).reduce((s, b) => s + b.missing, 0);
  console.log('아직 점검 안 된 묶음 안의 빈 공통해설: ' + left + '문제');
}

if (require.main === module) {
  const args = process.argv.slice(2);
  try {
    if (args.includes('--status')) status();
    else if (args[0]) { const okk = apply(args[0], args.includes('--dry')); process.exit(okk ? 0 : 1); }
    else { console.log('사용: node tools/notebooklm/apply.js <답변파일> [--dry] | --status'); process.exit(1); }
  } catch (e) { console.error('✖ ' + e.message); process.exit(1); }
}
module.exports = { extractJson, validate, clean, applyFile: f => apply(f, false) };
