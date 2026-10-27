#!/usr/bin/env node
/* 사용: node tools/notebooklm/export.js [--size 15]
 * 과목별 점검 묶음(txt)을 tools/notebooklm/out/ 에 만든다.
 * 각 txt 를 통째로 복사해서 해당 과목 교재가 등록된 NotebookLM 채팅에 붙여넣으면 된다. */
const fs = require('fs');
const path = require('path');
const L = require('./lib');

const args = process.argv.slice(2);
const sizeIdx = args.indexOf('--size');
const SIZE = sizeIdx >= 0 ? parseInt(args[sizeIdx + 1], 10) : 15;
if (!(SIZE >= 3 && SIZE <= 50)) { console.error('--size 는 3~50 사이로 입력하세요.'); process.exit(1); }

const db = L.loadDb();
const meta = L.loadSubjectMeta();
const batches = L.buildBatches(db, meta, SIZE);
const OUT = path.join(L.TOOL_DIR, 'out');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const flat = s => String(s == null ? '' : s).replace(/\s*\n\s*/g, ' / ').trim();

function questionBlock(q) {
  const lines = [];
  lines.push('[#' + q.id + '] ' + flat(q.question));
  if (q.contextBox) lines.push('<보기> ' + flat(q.contextBox));
  q.options.forEach((o, i) => lines.push((i + 1) + ') ' + flat(o)));
  lines.push('정답: ' + q.answer);
  const ex = q.optionExplanations || {};
  const exLine = [1, 2, 3, 4, 5].map(k => k + ': ' + (ex[k] ? flat(ex[k]) : '(없음)')).join(' | ');
  lines.push('현재 보기해설 → ' + exLine);
  lines.push('현재 공통해설 → ' + (L.hasCommon(q) ? q.commonExplanations.map(flat).join(' / ') : '(없음)'));
  return lines.join('\n');
}

function prompt(b, n) {
  return [
    '너는 치과기공사 국가시험 해설 검수자다. 이 노트북에 등록된 소스(교재)만 근거로 아래 ' + n + '문제(' + b.name + ')를 점검하라.',
    '',
    '규칙',
    '1. 정답이 소스와 다르면 answerDisagree 에 제안만 하라. 정답을 임의로 바꾸지 마라.',
    '2. 각 보기 해설이 소스와 맞는지 확인하라. 틀렸거나 부실한 보기만 fix.optionExplanations 에 고친 문장으로 써라. (1~2문장, 정답 보기는 왜 맞는지, 오답 보기는 왜 틀린지)',
    '3. 공통해설은 시험 직전에 볼 핵심 개념 2~4줄이다. "(없음)"이거나 부실하면 fix.commonExplanations 에 새로 써라. 바꿀 때는 줄 전체를 다시 써라.',
    '4. 소스에서 근거를 못 찾으면 추측하지 말고 unverified 에 번호만 넣어라.',
    '5. 모든 문제 번호는 ok / fix / unverified 중 정확히 한 곳에만 들어간다. 고칠 게 없으면 ok.',
    '6. 각주 번호([1] 같은 표시), 마크다운 꾸밈, 인사말 없이 아래 JSON 코드블록 하나만 출력하라.',
    '',
    '출력 형식',
    '{"batch":"' + b.id + '","ok":[번호],"fix":[{"id":번호,"optionExplanations":{"보기번호":"고친 해설"},"commonExplanations":["핵심 1","핵심 2"],"basis":"교재명 장/쪽"}],"unverified":[번호],"answerDisagree":[{"id":번호,"suggested":보기번호,"reason":"근거"}]}',
    ''
  ].join('\n');
}

batches.forEach(b => {
  const qs = b.items.map(id => db[b.key].questions.find(q => q.id === id));
  const text = prompt(b, qs.length) + '\n──────── 문제 ────────\n\n' + qs.map(questionBlock).join('\n\n') + '\n';
  const idxInSubject = batches.filter(x => x.key === b.key).findIndex(x => x.id === b.id) + 1;
  const fname = b.id + '_' + b.name.replace(/[\s()~\/]+/g, '_').replace(/_+$/, '') + '_' + String(idxInSubject).padStart(2, '0') + '.txt';
  fs.writeFileSync(path.join(OUT, fname), text, 'utf8');
  b.file = fname;
});

L.writeJson(path.join(L.TOOL_DIR, 'manifest.json'), { size: SIZE, batches: batches.map(b => ({ id: b.id, key: b.key, name: b.name, items: b.items, missing: b.missing })) });

// 진행표
const bySubject = {};
batches.forEach(b => { (bySubject[b.key] = bySubject[b.key] || []).push(b); });
let md = '# NotebookLM 해설 점검 진행표\n\n한 묶음 = 최대 ' + SIZE + '문제. 과목별 노트북에 넣으세요. (공통해설이 비어 있는 문제가 각 과목 맨 앞 묶음에 모여 있어요)\n\n';
meta.forEach(m => {
  const bs = bySubject[m.key];
  if (!bs) return;
  const miss = bs.reduce((s, b) => s + b.missing, 0);
  md += '## ' + m.name + ' — ' + bs.reduce((s, b) => s + b.items.length, 0) + '문제, ' + bs.length + '묶음' + (miss ? ' (공통해설 비어 있음 ' + miss + ')' : '') + '\n';
  bs.forEach(b => { md += '- [ ] ' + b.id + ' · ' + b.items.length + '문제' + (b.missing ? ' · 빈 공통해설 ' + b.missing : '') + ' · ' + b.file + '\n'; });
  md += '\n';
});
fs.writeFileSync(path.join(OUT, '00_진행표.md'), md, 'utf8');

const total = batches.reduce((s, b) => s + b.items.length, 0);
console.log('묶음 ' + batches.length + '개 / 문제 ' + total + '개 → ' + OUT);
