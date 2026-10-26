#!/usr/bin/env node
/* Gemini 로 해설 점검을 자동 실행 (내 PC에서 실행)
 *   set GEMINI_API_KEY=발급받은키        (Windows)   /   export GEMINI_API_KEY=...  (Mac/Linux)
 *   node tools/gemini/run.js --list                  묶음·교재 연결 확인(호출 없음)
 *   node tools/gemini/run.js --only B001             한 묶음만 시험
 *   node tools/gemini/run.js --subject law           한 과목만
 *   node tools/gemini/run.js                         남은 묶음 전부 (끊겨도 다시 실행하면 이어서)
 * 옵션: --model gemini-2.5-pro  --pdf-dir 경로
 * 키는 환경변수로만 받고 파일에 저장하지 않습니다. */
const fs = require('fs');
const path = require('path');
const L = require('../notebooklm/lib');
const A = require('../notebooklm/apply');

const HERE = __dirname;
const OUT = path.join(L.TOOL_DIR, 'out');
const ANS = path.join(HERE, 'answers');
const CACHE = path.join(HERE, 'uploaded.json');      // 올린 파일 → Gemini 파일 주소(48시간 유효)
const BASE = process.env.GEMINI_BASE || 'https://generativelanguage.googleapis.com';

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const MODEL = opt('--model', process.env.GEMINI_MODEL || 'gemini-2.5-pro');
const KEY = process.env.GEMINI_API_KEY;
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function api(url, init, tries = 5) {
  for (let i = 0; i < tries; i++) {
    let res;
    try { res = await fetch(url, init); } catch (e) { if (i === tries - 1) throw e; await sleep(3000 * (i + 1)); continue; }
    if (res.ok) return res;
    if ([429, 500, 502, 503, 504].includes(res.status) && i < tries - 1) { await sleep(Math.min(60000, 5000 * 2 ** i)); continue; }
    throw new Error('Gemini 오류 ' + res.status + ': ' + (await res.text()).slice(0, 300));
  }
}

/** PDF 업로드(재개형 업로드) → ACTIVE 될 때까지 대기 → {uri, mime} */
async function upload(file) {
  const size = fs.statSync(file).size;
  console.log('  업로드 중: ' + path.basename(file) + ' (' + Math.round(size / 1048576) + 'MB)');
  const start = await api(BASE + '/upload/v1beta/files?key=' + KEY, {
    method: 'POST',
    headers: { 'X-Goog-Upload-Protocol': 'resumable', 'X-Goog-Upload-Command': 'start',
      'X-Goog-Upload-Header-Content-Length': String(size), 'X-Goog-Upload-Header-Content-Type': 'application/pdf', 'Content-Type': 'application/json' },
    body: JSON.stringify({ file: { display_name: path.basename(file) } })
  });
  const url = start.headers.get('x-goog-upload-url');
  if (!url) throw new Error('업로드 주소를 받지 못했어요.');
  const fin = await api(url, {
    method: 'POST', duplex: 'half',
    headers: { 'Content-Length': String(size), 'X-Goog-Upload-Offset': '0', 'X-Goog-Upload-Command': 'upload, finalize' },
    body: fs.createReadStream(file)
  });
  let f = (await fin.json()).file;
  for (let i = 0; i < 90 && f.state === 'PROCESSING'; i++) {
    await sleep(4000);
    f = await (await api(BASE + '/v1beta/' + f.name + '?key=' + KEY, {})).json();
  }
  if (f.state !== 'ACTIVE') throw new Error(path.basename(file) + ' 처리 실패(state=' + f.state + '). 용량이 크면 PDF를 줄이거나 나눠서 다시 시도하세요.');
  return { uri: f.uri, mime: 'application/pdf', at: Date.now() };
}

async function getFiles(subjectKey, cfg, cache) {
  const base = subjectKey.replace(/_past$/, '');
  const names = cfg.subjects[base];
  if (!names) throw new Error('sources.json 에 "' + base + '" 교재가 없어요.');
  const out = [];
  for (const n of names) {
    const full = path.isAbsolute(n) ? n : path.join(opt('--pdf-dir', cfg.pdfDir), n);
    if (!fs.existsSync(full)) throw new Error('PDF 를 찾지 못했어요: ' + full);
    const k = full + '|' + fs.statSync(full).size;
    const c = cache[k];
    if (c && Date.now() - c.at < 44 * 3600 * 1000) { out.push(c); continue; }
    cache[k] = await upload(full);
    L.writeJson(CACHE, cache);
    out.push(cache[k]);
  }
  return out;
}

function promptFor(batch) {
  const f = fs.readdirSync(OUT).find(x => x.startsWith(batch.id + '_'));
  if (!f) throw new Error(batch.id + ' 묶음 파일이 없어요. export.js 를 먼저 실행하세요.');
  return fs.readFileSync(path.join(OUT, f), 'utf8')
    .replace(/이 노트북에 등록된 소스\(교재\)만/g, '첨부된 교재 PDF 만')
    .replace(/소스에서 근거를/g, '첨부 교재에서 근거를').replace(/소스와/g, '교재와');
}

async function ask(files, prompt) {
  const body = {
    contents: [{ role: 'user', parts: files.map(f => ({ file_data: { mime_type: f.mime, file_uri: f.uri } })).concat([{ text: prompt }]) }],
    generationConfig: { temperature: 0.1, responseMimeType: 'application/json' }
  };
  const res = await api(BASE + '/v1beta/models/' + MODEL + ':generateContent?key=' + KEY, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
  });
  const j = await res.json();
  const cand = j.candidates && j.candidates[0];
  if (!cand || !cand.content) throw new Error('응답이 비었어요: ' + JSON.stringify(j).slice(0, 300));
  return cand.content.parts.map(p => p.text || '').join('');
}

(async () => {
  const manifest = L.readJson(path.join(L.TOOL_DIR, 'manifest.json'), null);
  if (!manifest) throw new Error('먼저 node tools/notebooklm/export.js 를 실행하세요.');
  const cfg = L.readJson(path.join(HERE, 'sources.json'));
  const progress = L.readJson(path.join(L.TOOL_DIR, 'progress.json'), {});
  const only = opt('--only'), subj = opt('--subject');
  let todo = manifest.batches.filter(b => !progress[b.id] && (!only || b.id === only) && (!subj || b.key === subj || b.key === subj + '_past'));
  if (only) todo = manifest.batches.filter(b => b.id === only);

  if (args.includes('--list')) {
    todo.forEach(b => console.log(b.id + '  ' + b.name + '  ' + b.items.length + '문제  교재: ' + (cfg.subjects[b.key.replace(/_past$/, '')] || ['(없음!)']).join(', ')));
    console.log('대상 묶음 ' + todo.length + '개');
    return;
  }
  if (!KEY) throw new Error('GEMINI_API_KEY 환경변수가 없어요.');
  fs.mkdirSync(ANS, { recursive: true });
  const cache = L.readJson(CACHE, {});
  let done = 0, failed = [];
  for (const b of todo) {
    console.log('[' + b.id + '] ' + b.name + ' (' + (++done) + '/' + todo.length + ')');
    try {
      const files = await getFiles(b.key, cfg, cache);
      const text = await ask(files, promptFor(b));
      const file = path.join(ANS, b.id + '.txt');
      fs.writeFileSync(file, text);
      if (!A.applyFile(file)) failed.push(b.id + '(검증 실패 — answers/' + b.id + '.txt 확인)');
    } catch (e) { console.log('  ✖ ' + e.message); failed.push(b.id + '(' + e.message.slice(0, 60) + ')'); }
  }
  console.log('\n끝. 실패 ' + failed.length + '건' + (failed.length ? ': ' + failed.join(' / ') : ''));
  console.log('진행 현황: node tools/notebooklm/apply.js --status');
})().catch(e => { console.error('✖ ' + e.message); process.exit(1); });
