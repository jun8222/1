/* NotebookLM 해설 점검 도구 - 공용 함수 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const DATA_DIR = path.join(ROOT, 'data');
const OVERLAY_DIR = path.join(DATA_DIR, 'overlay');
const TOOL_DIR = __dirname;

/** 앱(js/app.js)에 있는 과목 목록을 그대로 읽어 온다 (순서·이름 중복 관리 방지) */
function loadSubjectMeta() {
  const src = fs.readFileSync(path.join(ROOT, 'js', 'app.js'), 'utf8');
  const m = src.match(/const subjectMeta = (\[[\s\S]*?\n\]);/);
  if (!m) throw new Error('js/app.js 에서 subjectMeta 를 찾지 못했어요.');
  return new Function('return ' + m[1])();
}

/** 원본 문제 데이터(overlay 적용 전) */
function loadDb() {
  const win = {};
  fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.js')).sort().forEach(f => {
    new Function('window', fs.readFileSync(path.join(DATA_DIR, f), 'utf8'))(win);
  });
  return win.quizDatabase || {};
}

const hasCommon = q => Array.isArray(q.commonExplanations) && q.commonExplanations.length > 0;

/**
 * 과목별로 size 문제씩 묶는다. 공통해설이 비어 있는 문제를 맨 앞에 둔다.
 * 반환: [{id:'B001', key, name, items:[문제번호...], missing:n}]
 */
function buildBatches(db, meta, size) {
  const batches = [];
  let n = 0;
  meta.forEach(m => {
    const sub = db[m.key];
    if (!sub || !sub.questions) return;
    const qs = sub.questions.slice().sort((a, b) => {
      const am = hasCommon(a) ? 1 : 0, bm = hasCommon(b) ? 1 : 0;
      return (am - bm) || (a.id - b.id);
    });
    for (let i = 0; i < qs.length; i += size) {
      const chunk = qs.slice(i, i + size);
      n++;
      batches.push({
        id: 'B' + String(n).padStart(3, '0'),
        key: m.key,
        name: m.name,
        items: chunk.map(q => q.id),
        missing: chunk.filter(q => !hasCommon(q)).length
      });
    }
  });
  return batches;
}

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return fallback; }
}
function writeJson(file, obj) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

module.exports = { ROOT, DATA_DIR, OVERLAY_DIR, TOOL_DIR, loadSubjectMeta, loadDb, buildBatches, hasCommon, readJson, writeJson };
