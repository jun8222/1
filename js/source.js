// 근거 표시: "<교재>_파트N.pdf p.X" → 종이책 쪽수("<교재> p.Y")로 변환
// 파트는 100쪽씩 분할 → 통합쪽 = (N-1)*100 + X.  종이책 쪽 = 통합쪽 - 오프셋(총의치 8, 재료학 10)
(function (root) {
  var OFFSET = { '총의치기공학': 8, '치기공재료학': 10 };

  function formatSource(src) {
    if (!src) return src;
    var s = String(src).trim();
    if (/^출처\s*외/.test(s)) return s;
    s = s.replace(/(의료기사 등에 관한 법률|의료법)\(법률\)\([^)]*\)\([^)]*\)\.pdf/g, '$1');

    var re = /([가-힣]+)_파트\s*(\d+)\.pdf|파트\s*(\d+)(?:\.pdf)?|\(([^)]*)\)|p\.\s*(\d+)(?:\s*[~\-–]\s*(\d+))?|(\d+)(?:\s*[~\-–]\s*(\d+))?/g;
    var m, name = null, part = 1, lastPage = false, sawPart = false;
    var order = [], pages = {}, notes = [];
    function add(a, b) {
      if (!name) return;
      var off = OFFSET[name] || 0;
      var x = (part - 1) * 100 + a - off, y = b ? (part - 1) * 100 + b - off : null;
      if (x < 1) x = 1;
      var t = y && y > x ? 'p.' + x + '~' + y : 'p.' + x;
      if (pages[name].indexOf(t) < 0) pages[name].push(t);
    }
    while ((m = re.exec(s))) {
      if (m[1]) {
        name = m[1]; part = parseInt(m[2], 10); sawPart = true; lastPage = false;
        if (!pages[name]) { pages[name] = []; order.push(name); }
      } else if (m[3]) { part = parseInt(m[3], 10); lastPage = false; }
      else if (m[4] !== undefined) { notes.push(m[4]); lastPage = false; }
      else if (m[5]) { add(parseInt(m[5], 10), m[6] ? parseInt(m[6], 10) : 0); lastPage = true; }
      else if (m[7] && lastPage) { add(parseInt(m[7], 10), m[8] ? parseInt(m[8], 10) : 0); }
    }
    if (!sawPart) return s;
    order.forEach(function (n) { pages[n].sort(function (a, b) { return parseInt(a.slice(2), 10) - parseInt(b.slice(2), 10); }); });
    var out = order.map(function (n) { return n + (pages[n].length ? ' ' + pages[n].join(', ') : ''); }).join(' / ');
    return out + (notes.length ? ' (' + notes.join(', ') + ')' : '');
  }

  root.formatSource = formatSource;
  if (typeof module !== 'undefined' && module.exports) module.exports = { formatSource: formatSource };
})(typeof window !== 'undefined' ? window : globalThis);
