/* IEB IT Paper 2 (Theory) cram site — app.js
   Plain JS, no build step. Reads globals from data/*.js (see CONTRACT.md):
   P2_PAPERS (pushed by papers-a/b/c.js), P2_TOPICS, P2_GLOSSARY, P2_DRILLS, P2_PLAN.
   Any of them may be missing or partial; views show empty states. */

/* ======================================================================
   EXAM DATE/TIME — edit if your time differs (SAST = UTC+02:00)
   ====================================================================== */
const EXAM_AT = "2026-10-22T09:00:00+02:00";

(function () {
  "use strict";

  const EXAM_DATE = new Date(EXAM_AT);
  const BASE_TITLE = "IEB IT Paper 2 · Theory";
  const SECTIONS = ["A: Definitions", "B: System Technologies", "C: Communication Technologies", "D: Social Implications", "E: Data & Solution Development"];
  const TECHNIQUE = "Exam technique";
  const SEC_KEYS = ["A", "B", "C", "D", "E", "X"];
  const SEC_SHORT = { A: "Definitions", B: "Systems", C: "Comms", D: "Social", E: "Data & Dev", X: "Technique" };
  const SESSION_ORDER = { November: 0, May: 1, Prelim: 2 };
  const SESSION_SHORT = { November: "Nov", May: "May", Prelim: "Prelim" };
  const DRILL_TYPES = ["short", "mcq", "scenario"];
  const TYPE_LABEL = { short: "Short answer", mcq: "MCQ", scenario: "Scenario" };
  const PAPER_FILES = ["data/papers-a.js", "data/papers-b.js", "data/papers-c.js"];
  const ALL_FILES = PAPER_FILES.concat(["data/topics.js", "data/glossary.js", "data/drills.js", "data/plan.js"]);

  /* ---------------- Utils (function declarations: hoisted) ---------------- */
  function list(x) { return Array.isArray(x) ? x : []; }
  function norm(s) { return String(s == null ? "" : s).trim().toLowerCase(); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function slug(s) { return norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "x"; }
  function pct(n, d) { return d ? Math.round((n / d) * 100) : 0; }
  function pad(n) { return String(n).padStart(2, "0"); }
  function safeUrl(u) { return /^https?:\/\//i.test(String(u || "")) ? String(u) : null; }
  function enc(s) { return encodeURIComponent(String(s)); }
  function plural(n, w) { return n + " " + w + (n === 1 ? "" : "s"); }
  function sum(a, f) { return a.reduce(function (t, x) { return t + (Number(f(x)) || 0); }, 0); }
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function firstLine(s) {
    const l = String(s || "").split("\n")[0].replace(/^\s*[-*•]\s+/, "");
    return l.length > 140 ? l.slice(0, 137) + "…" : l;
  }

  /* Section keys: "B: System Technologies" -> "B"; "Exam technique" -> "X" */
  function secKey(name) {
    const s = String(name || "").trim();
    const m = /^(?:section\s*)?([A-E])\s*[:.\-–]/i.exec(s);
    if (m) return m[1].toUpperCase();
    const n = norm(s);
    if (!n) return "";
    if (/^[a-e]$/.test(n)) return n.toUpperCase();
    if (n.indexOf("technique") >= 0) return "X";
    if (/defin/.test(n)) return "A";
    if (/system/.test(n)) return "B";
    if (/communic|internet|network/.test(n)) return "C";
    if (/social/.test(n)) return "D";
    if (/data|solution|database|program|algorithm/.test(n)) return "E";
    return "";
  }
  function secCls(k) { return "s-" + String(k || "x").toLowerCase(); }
  function secRest(name) { const s = String(name || ""); return s.replace(/^(?:section\s*)?[A-E]\s*[:.\-–]\s*/i, "") || s; }
  function secPill(name, short) {
    if (!name) return "";
    const k = secKey(name);
    const label = short && SEC_SHORT[k] ? SEC_SHORT[k] : secRest(name);
    return '<span class="sec-pill ' + secCls(k) + '">' + (k && k !== "X" ? "<b>" + k + "</b>" : "") + esc(label) + "</span>";
  }
  function sectionRank(name) { const i = SEC_KEYS.indexOf(secKey(name)); return i < 0 ? 99 : i; }
  function sessKey(s) {
    const n = norm(s);
    if (/nov/.test(n)) return "November";
    if (/may|june/.test(n)) return "May";
    if (/prelim|sept|trial/.test(n)) return "Prelim";
    return String(s || "");
  }
  function sessRank(s) { const k = sessKey(s); return k in SESSION_ORDER ? SESSION_ORDER[k] : 9; }

  /* ---------------- Data (tolerates missing / partial globals) ---------------- */
  const missing = new Set(list(window.P2_MISSING).map(String));
  function arr(name, files) {
    const v = window[name];
    const ok = Array.isArray(v) ? v.filter(function (x) { return x && typeof x === "object"; }) : [];
    if (!ok.length) files.forEach(function (f) { missing.add(f); });
    return ok;
  }
  const PAPERS = arr("P2_PAPERS", PAPER_FILES);
  const TOPICS = arr("P2_TOPICS", ["data/topics.js"]);
  const GLOSSARY = arr("P2_GLOSSARY", ["data/glossary.js"]);
  const DRILLS = arr("P2_DRILLS", ["data/drills.js"]);
  let PLAN = window.P2_PLAN;
  if (!PLAN || typeof PLAN !== "object" || Array.isArray(PLAN)) { missing.add("data/plan.js"); PLAN = {}; }

  function topicSection(t) { return t.section || (t.id === "exam-technique" ? TECHNIQUE : ""); }
  const topicById = new Map();
  const topicByKey = new Map(); // normalised id/title -> topic
  TOPICS.forEach(function (t) {
    if (!t.id) return;
    topicById.set(t.id, t);
    topicByKey.set(norm(t.id), t);
    if (t.title) topicByKey.set(norm(t.title), t);
  });
  function resolveTag(tag) { return topicByKey.get(norm(tag)) || null; }
  /* Compact topic name for tags: drop a trailing "(...)", and cut at ":" if still long. */
  function shortTitle(t) {
    let s = String(t.title || t.id || "").replace(/\s*\([^)]*\)\s*$/, "").trim();
    if (s.length > 30 && s.indexOf(":") > 3) s = s.slice(0, s.indexOf(":")).trim();
    if (s.length > 30 && s.indexOf(",") > 3) s = s.slice(0, s.indexOf(",")).trim();
    return s || String(t.title || t.id || "");
  }
  function topicOrder(a, b) {
    return (Number(b.priority) || 0) - (Number(a.priority) || 0) || sectionRank(topicSection(a)) - sectionRank(topicSection(b)) || String(a.title).localeCompare(String(b.title));
  }

  const sortedPapers = PAPERS.slice().sort(function (a, b) {
    return (Number(b.year) || 0) - (Number(a.year) || 0) || sessRank(a.session) - sessRank(b.session) || String(a.id).localeCompare(String(b.id));
  });
  const paperById = new Map();
  sortedPapers.forEach(function (p) { if (p.id != null && !paperById.has(String(p.id))) paperById.set(String(p.id), p); });

  // Flat list of all questions with their paper + section.
  const QUESTIONS = [];
  sortedPapers.forEach(function (p) {
    list(p.sections).forEach(function (s) {
      list(s.questions).forEach(function (q) {
        if (q && typeof q === "object") QUESTIONS.push({ paper: p, section: s, q: q });
      });
    });
  });
  function questionsForTopic(t) {
    return QUESTIONS.filter(function (x) {
      return list(x.q.tags).some(function (tag) { const r = resolveTag(tag); return r && r.id === t.id; });
    });
  }
  function drillsForTopic(id) { return DRILLS.filter(function (d) { return d.topic === id; }); }

  /* Glossary entries, with stable ids, and "examined before" enriched from Q1 answers */
  function normTerm(s) { return norm(s).replace(/[^a-z0-9]+/g, " ").trim(); }
  function termVariants(term) {
    const full = String(term || "");
    const out = new Set();
    const add = function (x) { const n = normTerm(x); if (n) { out.add(n); out.add(n.replace(/ /g, "")); } };
    add(full);
    add(full.replace(/\([^)]*\)/g, ""));
    const re = /\(([^)]+)\)/g; let m;
    while ((m = re.exec(full))) { if (!/also|accept|e\.g|eg /i.test(m[1])) add(m[1]); }
    full.replace(/\([^)]*\)/g, "").split(/\s*\/\s*|\s+or\s+|;\s*/i).forEach(add);
    return out;
  }
  const TERMS = [];
  const termById = new Map();
  GLOSSARY.forEach(function (g) {
    if (!g.term) return;
    let id = "g-" + slug(g.term), n = 2;
    while (termById.has(id)) id = "g-" + slug(g.term) + "-" + (n++);
    const t = topicById.get(g.topic) || resolveTag(g.topic);
    const e = {
      id: id, term: String(g.term), def: String(g.def || ""), topicId: t ? t.id : String(g.topic || ""), topic: t || null,
      years: list(g.years).map(Number).filter(Boolean), sec: t ? secKey(topicSection(t)) : "", asked: []
    };
    TERMS.push(e); termById.set(id, e);
  });
  (function enrichFromPapers() {
    if (!TERMS.length) return;
    const byKey = new Map();
    TERMS.forEach(function (e) { termVariants(e.term).forEach(function (k) { if (!byKey.has(k)) byKey.set(k, e); }); });
    QUESTIONS.forEach(function (x) {
      if (secKey(x.section.name) !== "A") return;
      const ans = firstLine(x.q.answer);
      let hit = null;
      termVariants(ans).forEach(function (k) { if (!hit && byKey.has(k)) hit = byKey.get(k); });
      if (!hit) return;
      hit.asked.push(x);
      const y = Number(x.paper.year);
      if (y && hit.years.indexOf(y) < 0) hit.years.push(y);
    });
  })();
  TERMS.forEach(function (e) { e.years.sort(function (a, b) { return a - b; }); e.examined = e.years.length > 0; });
  TERMS.sort(function (a, b) { return a.term.localeCompare(b.term, "en", { sensitivity: "base" }); });
  function termsForTopic(id) { return TERMS.filter(function (e) { return e.topicId === id; }); }

  /* ---------------- Storage (always try/catch, memory fallback) ---------------- */
  const mem = {};
  function load(key, fallback) {
    try {
      const raw = window.localStorage.getItem("p2:" + key);
      if (raw != null) return JSON.parse(raw);
    } catch (e) { /* storage blocked or bad JSON */ }
    return Object.prototype.hasOwnProperty.call(mem, key) ? mem[key] : fallback;
  }
  function save(key, val) {
    mem[key] = val;
    try { window.localStorage.setItem("p2:" + key, JSON.stringify(val)); } catch (e) { /* ignore */ }
  }
  function loadSet(key) { return new Set(list(load(key, []))); }
  function saveSet(key, set) { save(key, Array.from(set)); }
  function loadObj(key) { const v = load(key, {}); return v && typeof v === "object" && !Array.isArray(v) ? v : {}; }

  /* ---------------- Labels / small HTML helpers ---------------- */
  function paperLabel(p) { return ((p.year || "") + " " + (p.session || "")).trim(); }
  function paperShort(p) { const k = sessKey(p.session); return ((p.year || "") + " " + (SESSION_SHORT[k] || p.session || "")).trim(); }
  function qHref(p, q) { return "#/papers/" + enc(p.id) + "?q=" + enc(q.num); }
  function qId(num) { return "q-" + slug(num); }

  const ICON = {
    check: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 5 5L20 7"/></svg>',
    chev: '<svg class="ico chev" aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
    search: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    print: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/></svg>',
    arrow: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    zap: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
    shuffle: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
    x: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    grid: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    bulb: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
    eye: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    repeat: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></svg>',
    defs: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="m3 19 5-14 5 14M5 14h6"/><path d="M15 9h6M15 14h6M15 19h6"/></svg>'
  };

  function prioHtml(p) {
    const n = Math.max(1, Math.min(3, Number(p) || 1));
    const label = n === 3 ? "High" : n === 2 ? "Medium" : "Low";
    return '<span class="prio-wrap" data-p="' + n + '" title="Priority ' + n + ' of 3">' +
      '<span class="prio" data-p="' + n + '" aria-hidden="true"><i></i><i></i><i></i></span>' +
      '<span class="prio-label">' + label + '<span class="sr-only"> priority</span></span></span>';
  }
  function emptyHtml(title, body) {
    return '<div class="empty"><strong>' + esc(title) + "</strong>" + (body ? esc(body) : "") + "</div>";
  }
  function missingNotice(files) {
    const m = files.filter(function (f) { return missing.has(f); });
    if (!m.length) return "";
    return '<div class="notice" role="note"><span aria-hidden="true">⚠</span><span>Content not loaded yet: ' +
      m.map(function (f) { return "<code>" + esc(f) + "</code>"; }).join(", ") +
      ". Parts that depend on it are empty for now.</span></div>";
  }
  function sectionLegend() {
    return '<div class="sec-legend" role="list" aria-label="Section colours">' +
      SECTIONS.map(function (s) { return '<span role="listitem">' + secPill(s) + "</span>"; }).join("") + "</div>";
  }
  function yearsBadge(years) {
    if (!years.length) return "";
    return '<span class="exam-badge" title="Examined in ' + esc(years.join(", ")) + '">' + ICON.check + esc(years.join(" · ")) + "</span>";
  }

  /* ---------------- Rich text: plain text with \n, "- " bullets, "1. " lists, **bold**, `code` ---------------- */
  function inline(s) {
    let h = esc(s);
    h = h.replace(/`([^`]+)`/g, "<code>$1</code>");
    h = h.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");
    h = h.replace(/(^|[\s(])_([^_\s][^_]*?)_(?=[\s.,;:)!?]|$)/g, "$1<em>$2</em>");
    return h;
  }
  function richText(text, cls) {
    const lines = String(text == null ? "" : text).replace(/\r\n?/g, "\n").split("\n");
    let out = "", para = [], listType = null, items = [], fence = null;
    function flushPara() { if (para.length) { out += "<p>" + para.map(inline).join("<br>") + "</p>"; para = []; } }
    function flushList() {
      if (!listType) return;
      out += "<" + listType + ">" + items.map(function (it) {
        return "<li>" + it.html + (it.sub.length ? "<ul>" + it.sub.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul>" : "") + "</li>";
      }).join("") + "</" + listType + ">";
      listType = null; items = [];
    }
    lines.forEach(function (raw) {
      if (fence !== null) {
        if (/^\s*```/.test(raw)) { out += '<pre class="plain">' + esc(fence.join("\n")) + "</pre>"; fence = null; }
        else fence.push(raw);
        return;
      }
      if (/^\s*```/.test(raw)) { flushPara(); flushList(); fence = []; return; }
      const line = raw.replace(/\s+$/, "");
      if (!line.trim()) { flushPara(); flushList(); return; }
      let m = /^(\s*)[-*•–]\s+(.*)$/.exec(line);
      if (m) {
        flushPara();
        if (m[1].length >= 2 && listType && items.length) { items[items.length - 1].sub.push(inline(m[2])); return; }
        if (listType !== "ul") { flushList(); listType = "ul"; }
        items.push({ html: inline(m[2]), sub: [] });
        return;
      }
      m = /^\s*(\d{1,2})[.)]\s+(.*)$/.exec(line);
      if (m) {
        flushPara();
        if (listType !== "ol") { flushList(); listType = "ol"; }
        items.push({ html: inline(m[2]), sub: [] });
        return;
      }
      if (listType && /^\s{2,}/.test(raw) && items.length) { items[items.length - 1].html += " " + inline(line.trim()); return; }
      flushList();
      para.push(line.trim());
    });
    if (fence !== null) out += '<pre class="plain">' + esc(fence.join("\n")) + "</pre>";
    flushPara(); flushList();
    return '<div class="rich' + (cls ? " " + cls : "") + '">' + out + "</div>";
  }
  /* Single-line answers like "- Composition" -> "Composition" */
  function shortAnswer(text) {
    const lines = String(text || "").split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
    if (lines.length !== 1) return null;
    return lines[0].replace(/^[-*•–]\s+/, "");
  }

  /* ---------------- Toast ---------------- */
  let toastTimer = null;
  function toast(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }

  /* Reveal sections: <button data-reveal aria-expanded aria-controls> + panel[hidden] */
  let revealSeq = 0;
  function revealBtn(label, panelId, extraClass, openLabel) {
    return '<button type="button" class="btn btn-sm reveal-btn ' + (extraClass || "") + '" data-reveal aria-expanded="false" aria-controls="' +
      panelId + '"' + (openLabel ? ' data-open-label="' + esc(openLabel) + '" data-closed-label="' + esc(label) + '"' : "") +
      "><span>" + esc(label) + "</span>" + ICON.chev + "</button>";
  }
  function setReveal(btn, open) {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (panel) panel.hidden = !open;
    const ol = btn.getAttribute("data-open-label"), cl = btn.getAttribute("data-closed-label");
    const sp = btn.querySelector("span");
    if (ol && cl && sp) sp.textContent = open ? ol : cl;
  }

  /* ---------------- Progress ---------------- */
  function planKey(item, i) { return i + "|" + (item.time || "") + "|" + (item.task || ""); }
  function progress() {
    const revised = loadSet("revised");
    const plan = loadSet("plan");
    const res = loadObj("drills");
    const dres = loadObj("defs");
    const tonight = list(PLAN.tonight);
    const topicsDone = TOPICS.filter(function (t) { return revised.has(t.id); }).length;
    const planDone = tonight.filter(function (it, i) { return plan.has(planKey(it, i)); }).length;
    const drillsGot = DRILLS.filter(function (d) { return res[d.id] === "got"; }).length;
    const termsGot = TERMS.filter(function (e) { return dres[e.id] === "got"; }).length;
    const parts = [];
    if (TOPICS.length) parts.push(topicsDone / TOPICS.length);
    if (TERMS.length) parts.push(termsGot / TERMS.length);
    if (DRILLS.length) parts.push(drillsGot / DRILLS.length);
    if (tonight.length) parts.push(planDone / tonight.length);
    const overall = parts.length ? Math.round((parts.reduce(function (a, b) { return a + b; }, 0) / parts.length) * 100) : 0;
    return { topicsDone: topicsDone, planDone: planDone, drillsGot: drillsGot, termsGot: termsGot, tonight: tonight.length, overall: overall };
  }
  function progressCardInner() {
    const p = progress();
    const r = 32, c = 2 * Math.PI * r;
    const off = c * (1 - p.overall / 100);
    function item(label, n, d, cls) {
      return '<div class="progress-item"><div class="pi-head"><span>' + esc(label) + "</span><span>" + n + "/" + d +
        '</span></div><div class="meter ' + (cls || "") + '" role="progressbar" aria-label="' + esc(label) + '" aria-valuemin="0" aria-valuemax="' + d +
        '" aria-valuenow="' + n + '"><span style="width:' + pct(n, d) + '%"></span></div></div>';
    }
    return '<div class="card-head"><h2>Your progress</h2><span class="muted tiny">saved on this device</span></div>' +
      '<div class="overall"><svg class="ring" viewBox="0 0 80 80" role="img" aria-label="Overall ' + p.overall + ' percent">' +
      '<circle class="ring-bg" cx="40" cy="40" r="' + r + '"/>' +
      '<circle class="ring-fg" cx="40" cy="40" r="' + r + '" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"/>' +
      '<text x="40" y="46" text-anchor="middle">' + p.overall + "%</text></svg>" +
      '<div><strong>Overall readiness</strong><p class="muted small" style="margin:2px 0 0">Average of topics revised, definitions and drills nailed, and tonight\'s plan.</p></div></div>' +
      '<div class="progress-row">' +
      item("Topics revised", p.topicsDone, TOPICS.length) +
      item("Definitions nailed", p.termsGot, TERMS.length, "sec s-a") +
      item("Drills nailed", p.drillsGot, DRILLS.length, "good") +
      item("Tonight's plan", p.planDone, p.tonight) +
      "</div>";
  }
  function refreshProgress() {
    const el = document.getElementById("progress-card");
    if (el) el.innerHTML = progressCardInner();
  }

  /* ---------------- Countdown ---------------- */
  function timeLeft() {
    const ms = EXAM_DATE.getTime() - Date.now();
    if (!isFinite(ms) || ms <= 0) return null;
    const s = Math.floor(ms / 1000);
    return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60, total: s };
  }
  const DONE_MSG = "It's exam time. Breathe, read the whole paper, bank the Section A definitions. You've got this.";
  function tick() {
    const t = timeLeft();
    const pill = document.getElementById("tminus");
    if (pill) {
      if (!t) pill.textContent = "";
      else if (t.d >= 2) pill.textContent = "T−" + t.d + "d " + t.h + "h";
      else pill.textContent = "T−" + (t.d * 24 + t.h) + ":" + pad(t.m) + ":" + pad(t.s);
      pill.title = "Time until the exam starts";
    }
    const cd = document.getElementById("countdown");
    if (cd) {
      if (!t) {
        cd.outerHTML = '<p class="hero-done" id="countdown-done">' + esc(DONE_MSG) + "</p>";
      } else {
        ["d", "h", "m", "s"].forEach(function (k) {
          const el = cd.querySelector('[data-cd="' + k + '"]');
          if (el) el.textContent = k === "d" ? String(t.d) : pad(t[k]);
        });
      }
    }
  }
  function examLabel() {
    try {
      return EXAM_DATE.toLocaleString("en-ZA", {
        weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
        hour12: false, timeZone: "Africa/Johannesburg"
      }) + " SAST";
    } catch (e) { return EXAM_AT; }
  }

  /* ======================================================================
     VIEWS
     ====================================================================== */

  /* ---------------- Home ---------------- */
  function viewHome() {
    const t = timeLeft();
    const tonight = list(PLAN.tonight);
    const planSet = loadSet("plan");
    const revised = loadSet("revised");
    const nowMins = new Date().getHours() * 60 + new Date().getMinutes();
    let nowIdx = -1;
    tonight.forEach(function (it, i) {
      const m = /^(\d{1,2}):(\d{2})/.exec(it.time || "");
      if (m && Number(m[1]) * 60 + Number(m[2]) <= nowMins) nowIdx = i;
    });
    let h = missingNotice(ALL_FILES);

    const curIdx = nowIdx >= 0 ? nowIdx : 0;
    const cur = tonight[curIdx], nxt = tonight[curIdx + 1];
    const showDays = !t || t.d > 0;

    h += '<section class="hero" aria-labelledby="hero-h"><div class="hero-main">' +
      '<div class="eyebrow"><span class="live-dot" aria-hidden="true"></span>Exam war-room · Theory</div>' +
      '<h1 id="hero-h">' + (t ? "IT Paper 2 starts in" : "IT Paper 2 is today") + "</h1>" +
      '<p class="hero-sub">Definitions · System tech · Comms tech · Social implications · Data &amp; solution development · 150 marks</p>' +
      (t
        ? '<div class="countdown" id="countdown" role="timer" aria-label="Time until the exam" style="--cd-cols:' + (showDays ? 4 : 3) + '">' +
          (showDays ? cdCell("d", String(t.d), "days") : "") + cdCell("h", pad(t.h), "hours") + cdCell("m", pad(t.m), "min") + cdCell("s", pad(t.s), "sec", "sec") + "</div>"
        : '<p class="hero-done">' + esc(DONE_MSG) + "</p>") +
      '<div class="hero-meta"><span>' + esc(examLabel()) + '</span><span>Edit if your time differs: <code>EXAM_AT</code> in app.js</span></div>' +
      '<div class="btn-row hero-actions"><a class="btn btn-primary" href="#/definitions/drill">' + ICON.defs + "Drill definitions</a>" +
      '<a class="btn btn-hero" href="#/heatmap">' + ICON.grid + "Exam heatmap</a></div>" +
      '</div><div class="hero-side">';
    if (cur && t) {
      h += '<div class="hs-block"><div class="hs-label"><span>' + (nowIdx >= 0 ? "On now" : "First up") + '</span><a href="#tonight-h" data-jump="tonight-h">Plan ↓</a></div>' +
        '<div class="hs-now"><span class="hs-time">' + esc(cur.time || "") + '</span><span class="hs-task">' + esc(cur.task || "") + "</span></div>" +
        (nxt ? '<div class="hs-next"><span class="hs-time">' + esc(nxt.time || "") + "</span><span>Then: " + esc(nxt.task || "") + "</span></div>" : "") + "</div>";
    }
    h += '<div class="hero-stats">' +
      heroStat(PAPERS.length, "papers", "#/papers") + heroStat(QUESTIONS.length, "Qs", "#/papers") + heroStat(TOPICS.length, "topics", "#/topics") +
      heroStat(TERMS.length, "terms", "#/definitions") + heroStat(DRILLS.length, "drills", "#/drills") +
      "</div></div></section>";

    h += '<div class="home-grid"><div class="stack">';

    // Tonight
    h += '<section class="card" aria-labelledby="tonight-h"><div class="card-head"><h2 id="tonight-h">Tonight\'s plan</h2>' +
      '<span class="muted tiny mono" id="plan-count">' + tonight.filter(function (it, i) { return planSet.has(planKey(it, i)); }).length + "/" + tonight.length + " done</span></div>";
    if (!tonight.length) h += emptyHtml("No plan loaded yet", " The schedule comes from data/plan.js.");
    else {
      h += '<ol class="timeline">';
      tonight.forEach(function (it, i) {
        const key = planKey(it, i);
        const done = planSet.has(key);
        h += '<li class="' + (done ? "done" : "") + '"><label class="check"><input type="checkbox" data-plan="' + esc(key) + '"' + (done ? " checked" : "") + ">" +
          '<span class="check-body"><span class="tl-time">' + esc(it.time || "") + "</span>" +
          (it.mins ? '<span class="tl-mins">' + esc(it.mins) + " min</span>" : "") +
          (i === nowIdx && t ? '<span class="tl-now">NOW</span>' : "") +
          '<span class="check-text">' + esc(it.task || "") + "</span></span></label></li>";
      });
      h += "</ol>";
    }
    h += "</section>";

    // Mark stats
    const stats = list(PLAN.markStats).filter(function (s) { return s && s.area; });
    h += '<section class="card" aria-labelledby="marks-h"><div class="card-head"><h2 id="marks-h">Where the marks are</h2><span class="muted tiny">avg marks per paper · share of total</span></div>';
    if (!stats.length) h += emptyHtml("No mark stats yet", " These come from data/plan.js.");
    else {
      const total = sum(stats, function (s) { return s.avg; });
      const max = Math.max.apply(null, stats.map(function (s) { return Number(s.avg) || 0; }).concat([1]));
      h += '<div class="stack-bar" aria-hidden="true">' + stats.map(function (s) {
        const v = Number(s.avg) || 0;
        return '<span class="' + secCls(secKey(s.area)) + '" style="flex:' + v + '" title="' + esc(s.area + ": " + v + " (" + pct(v, total) + "%)") + '"></span>';
      }).join("") + "</div>";
      h += '<div class="bars" role="list">';
      stats.forEach(function (s) {
        const v = Number(s.avg) || 0;
        h += '<div class="bar-row ' + secCls(secKey(s.area)) + '" role="listitem"><span class="bar-label" title="' + esc(s.area) + '">' + esc(s.area) + "</span>" +
          '<span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:' + Math.max(2, (v / max) * 100).toFixed(1) + '%"></span></span>' +
          '<span class="bar-val">' + pct(v, total) + "% <small>" + esc(v) + "</small></span></div>";
      });
      h += "</div>";
    }
    h += "</section></div><div class=\"stack\">";

    // Progress
    h += '<section class="card" id="progress-card" aria-label="Your progress">' + progressCardInner() + "</section>";

    // Section A trainer
    const dres = loadObj("defs");
    const nExam = TERMS.filter(function (e) { return e.examined; }).length;
    const nGot = TERMS.filter(function (e) { return dres[e.id] === "got"; }).length;
    const nMiss = TERMS.filter(function (e) { return dres[e.id] === "missed"; }).length;
    h += '<section class="card trainer-card s-a" aria-labelledby="tr-h"><div class="card-head"><h2 id="tr-h">Section A trainer</h2><a class="card-link" href="#/definitions">Glossary →</a></div>' +
      '<p class="muted small">Q1 gives you a description; you name the term. Fast, guaranteed marks if you know them cold.</p>';
    if (!TERMS.length) h += emptyHtml("No glossary loaded yet", " Terms come from data/glossary.js.");
    else {
      h += '<div class="mini-stats">' + miniStat(TERMS.length, "terms") + miniStat(nExam, "examined before") +
        miniStat(nGot, "nailed", "good") + miniStat(nMiss, "to re-drill", "bad") + "</div>" +
        '<div class="btn-row"><a class="btn btn-primary" href="#/definitions/drill">' + ICON.zap + "Drill 20 definitions</a>" +
        (nMiss ? '<a class="btn" href="#/definitions/drill?missed">' + ICON.repeat + "Re-drill missed (" + nMiss + ")</a>" : "") + "</div>";
    }
    h += "</section></div></div>";

    // Top priority topics (full width)
    const top = TOPICS.filter(function (x) { return Number(x.priority) === 3; })
      .sort(function (a, b) { return sectionRank(topicSection(a)) - sectionRank(topicSection(b)); });
    h += '<section class="card section-gap" aria-labelledby="top-h"><div class="card-head"><h2 id="top-h">Top priority topics</h2>' +
      '<a class="card-link" href="#/topics">All topics →</a></div>' +
      '<p class="muted small">Examined almost every year. Make sure every one of these is solid.</p>';
    if (!top.length) h += emptyHtml("Nothing here yet", " Priority-3 topics from data/topics.js appear here.");
    else {
      h += '<ul class="topic-mini two">';
      top.forEach(function (x) {
        h += '<li><a class="' + secCls(secKey(topicSection(x))) + '" href="#/topics/' + enc(x.id) + '">' + secPill(topicSection(x), true) + '<span class="tm-title">' + esc(x.title) + "</span>" +
          (revised.has(x.id) ? '<span class="tm-done">✓ revised</span>' : '<span class="muted" aria-hidden="true">→</span>') + "</a></li>";
      });
      h += "</ul>";
    }
    h += "</section>";
    return { html: h };
  }
  function cdCell(k, v, lbl, cls) {
    return '<div class="cd-cell ' + (cls || "") + '"><span class="cd-num" data-cd="' + k + '">' + esc(v) + '</span><span class="cd-lbl">' + lbl + "</span></div>";
  }
  function heroStat(n, lbl, href) {
    return '<a class="hero-stat" href="' + href + '"><strong>' + n + "</strong><span>" + lbl + "</span></a>";
  }
  function miniStat(n, lbl, cls) {
    return '<div class="mini-stat ' + (cls || "") + '"><strong>' + n + "</strong><span>" + esc(lbl) + "</span></div>";
  }

  /* ---------------- Topics ---------------- */
  const topicFilter = { section: "all", prio: "all", status: "all", q: "" };
  function topicSections() {
    return SECTIONS.concat([TECHNIQUE]).filter(function (s) {
      return TOPICS.some(function (t) { return secKey(topicSection(t)) === secKey(s); });
    });
  }
  function viewTopics() {
    const secs = topicSections();
    let h = '<div class="page-head"><div class="eyebrow">Revise</div><h1>Topics</h1>' +
      "<p>Everything Paper 2 tests, ranked by priority. Open a topic for the key facts, comparison tables, mark-losers, its definitions and every past-paper question on it.</p></div>";
    h += missingNotice(["data/topics.js"]);
    h += '<div class="toolbar">' +
      '<div class="field-wrap">' + ICON.search + '<label class="sr-only" for="topic-q">Filter topics</label>' +
      '<input class="field" id="topic-q" type="search" placeholder="Filter topics…" autocomplete="off" value="' + esc(topicFilter.q) + '"></div>' +
      '<div><div class="filter-label" id="fl-sec">Section</div><div class="chips" role="group" aria-labelledby="fl-sec">' +
      chip("section", "all", "All", TOPICS.length) +
      secs.map(function (s) {
        const k = secKey(s);
        return chip("section", k, (k !== "X" ? k + " · " : "") + (SEC_SHORT[k] || s), TOPICS.filter(function (t) { return secKey(topicSection(t)) === k; }).length, secCls(k));
      }).join("") +
      "</div></div>" +
      '<div class="filter-row"><div><div class="filter-label" id="fl-pri">Priority</div><div class="chips" role="group" aria-labelledby="fl-pri">' +
      chip("prio", "all", "Any") + chip("prio", "3", "High") + chip("prio", "2", "Medium") + chip("prio", "1", "Low") + "</div></div>" +
      '<div><div class="filter-label" id="fl-st">Status</div><div class="chips" role="group" aria-labelledby="fl-st">' +
      chip("status", "all", "All") + chip("status", "todo", "Not revised") + chip("status", "done", "Revised") + "</div></div></div>" +
      "</div>";
    h += '<div id="topic-results" aria-live="polite"></div>';
    return {
      html: h,
      after: function () {
        renderTopicResults();
        const q = document.getElementById("topic-q");
        q.addEventListener("input", function () { topicFilter.q = q.value; renderTopicResults(); });
      }
    };
  }
  function chip(group, val, label, count, cls) {
    const on = String(topicFilter[group]) === String(val);
    return '<button type="button" class="chip ' + (cls ? "chip-sec " + cls : "") + '" data-tf="' + group + '" data-val="' + esc(val) + '" aria-pressed="' + on + '">' + esc(label) +
      (count != null ? ' <span class="count">' + count + "</span>" : "") + "</button>";
  }
  function renderTopicResults() {
    const el = document.getElementById("topic-results");
    if (!el) return;
    const revised = loadSet("revised");
    const terms = norm(topicFilter.q).split(/\s+/).filter(Boolean);
    const rows = TOPICS.filter(function (t) {
      if (topicFilter.section !== "all" && secKey(topicSection(t)) !== topicFilter.section) return false;
      if (topicFilter.prio !== "all" && String(t.priority) !== topicFilter.prio) return false;
      if (topicFilter.status === "done" && !revised.has(t.id)) return false;
      if (topicFilter.status === "todo" && revised.has(t.id)) return false;
      if (terms.length) {
        const hay = norm([t.title, t.summary, t.section, t.id].concat(list(t.points)).join(" "));
        if (!terms.every(function (w) { return hay.indexOf(w) >= 0; })) return false;
      }
      return true;
    }).sort(topicOrder);
    if (!rows.length) {
      el.innerHTML = TOPICS.length ? emptyHtml("No topics match", " Try clearing a filter.") : emptyHtml("No topics loaded yet", " They come from data/topics.js.");
      return;
    }
    let h = '<p class="muted small">' + plural(rows.length, "topic") + "</p><div class=\"topic-grid\">";
    rows.forEach(function (t) {
      const done = revised.has(t.id);
      const nq = questionsForTopic(t).length;
      const nt = termsForTopic(t.id).length;
      const nd = drillsForTopic(t.id).length;
      h += '<a class="topic-card ' + secCls(secKey(topicSection(t))) + (done ? " revised" : "") + '" data-p="' + esc(t.priority) + '" href="#/topics/' + enc(t.id) + '">' +
        '<div class="tc-top">' + secPill(topicSection(t), true) + prioHtml(t.priority) + "</div>" +
        "<h3>" + esc(t.title) + "</h3><p>" + esc(t.summary || "") + "</p>" +
        '<div class="tc-foot">' +
        (done ? '<span class="revised-badge">✓ Revised</span>' : "") +
        (list(t.years).length ? '<span class="tag">' + list(t.years).length + "× examined</span>" : "") +
        (nq ? '<span class="tag">' + plural(nq, "question") + "</span>" : "") +
        (nt ? '<span class="tag">' + plural(nt, "term") + "</span>" : "") +
        (nd ? '<span class="tag">' + plural(nd, "drill") + "</span>" : "") +
        "</div></a>";
    });
    el.innerHTML = h + "</div>";
  }

  function compareTable(c) {
    if (!c || typeof c !== "object") return "";
    const rows = list(c.rows).filter(Array.isArray);
    if (!rows.length) return "";
    const heads = [c.a, c.b, c.c].filter(function (x) { return x != null && x !== ""; });
    const ncols = Math.max(heads.length, Math.max.apply(null, rows.map(function (r) { return r.length - 1; })));
    const title = c.title || heads.join(" vs ");
    let h = '<figure class="cmp"><figcaption>' + esc(title) + '</figcaption><div class="table-wrap" tabindex="0" role="region" aria-label="' + esc(title) + ' comparison">' +
      '<table class="ctable' + (ncols >= 3 ? " wide" : "") + '"><thead><tr><th scope="col"><span class="sr-only">Aspect</span></th>';
    for (let i = 0; i < ncols; i++) h += '<th scope="col">' + esc(heads[i] || "") + "</th>";
    h += "</tr></thead><tbody>";
    rows.forEach(function (r) {
      h += '<tr><th scope="row">' + inline(r[0] == null ? "" : r[0]) + "</th>";
      for (let i = 1; i <= ncols; i++) h += "<td>" + inline(r[i] == null ? "" : r[i]) + "</td>";
      h += "</tr>";
    });
    return h + "</tbody></table></div></figure>";
  }
  function firstPaperOfYear(y) { return sortedPapers.find(function (p) { return Number(p.year) === Number(y); }) || null; }

  function viewTopic(id) {
    const t = topicById.get(id);
    if (!t) return notFound("That topic doesn't exist (yet).", "#/topics", "Back to topics");
    const revised = loadSet("revised");
    const done = revised.has(t.id);
    const qs = questionsForTopic(t);
    const ds = drillsForTopic(t.id);
    const ts = termsForTopic(t.id).slice().sort(function (a, b) { return b.years.length - a.years.length || a.term.localeCompare(b.term); });
    const sec = topicSection(t);
    const k = secKey(sec);

    let h = '<div class="' + secCls(k) + '"><nav class="crumbs" aria-label="Breadcrumb"><a href="#/topics">Topics</a> / ' + esc(sec || "") + "</nav>";
    h += '<div class="topic-header"><div><h1>' + esc(t.title) + '</h1><div class="meta">' + secPill(sec) + prioHtml(t.priority) + "</div></div>" +
      '<button type="button" class="btn toggle-revised" id="toggle-revised" aria-pressed="' + done + '">' + ICON.check + "<span>" + (done ? "Revised" : "Mark as revised") + "</span></button></div>";
    if (t.summary) h += '<p class="lead">' + inline(t.summary) + "</p>";

    const years = list(t.years).slice().sort();
    if (years.length) {
      h += '<div class="years-row"><span class="filter-label">Examined in</span><div class="chips">' + years.map(function (y) {
        const p = firstPaperOfYear(y);
        return p ? '<a class="badge badge-year" href="#/papers/' + enc(p.id) + '">' + esc(y) + "</a>" : '<span class="badge badge-year">' + esc(y) + "</span>";
      }).join("") + "</div></div>";
    }

    h += '<div class="grid-2 section-gap">';
    h += '<section class="card"><h2>Key points</h2>' + (list(t.points).length
      ? '<ul class="points">' + list(t.points).map(function (p) { return "<li>" + inline(p) + "</li>"; }).join("") + "</ul>"
      : '<p class="muted">No key points listed.</p>') + "</section>";
    h += '<section class="card"><h2>Pitfalls that lose marks</h2>' + (list(t.pitfalls).length
      ? '<ul class="pitfalls">' + list(t.pitfalls).map(function (p) { return "<li>" + inline(p) + "</li>"; }).join("") + "</ul>"
      : '<p class="muted">None listed.</p>') + "</section>";
    h += "</div>";

    const cmps = list(t.compare).map(compareTable).filter(Boolean);
    if (cmps.length) {
      h += '<section class="card section-gap"><div class="card-head"><h2>Compare</h2><span class="muted tiny">favourite "differentiate between" questions</span></div><div class="cmp-grid">' + cmps.join("") + "</div></section>";
    }

    h += '<section class="card section-gap"><div class="card-head"><h2>Definitions</h2><span class="muted tiny mono">' + ts.length + "</span></div>";
    if (!ts.length) h += '<p class="muted">' + (GLOSSARY.length ? "No glossary terms linked to this topic." : "Glossary not loaded yet (data/glossary.js).") + "</p>";
    else {
      h += '<dl class="gloss-mini">' + ts.map(function (e) {
        return '<div><dt><a href="#/definitions?term=' + enc(e.id) + '">' + esc(e.term) + "</a>" + yearsBadge(e.years) + "</dt><dd>" + inline(e.def) + "</dd></div>";
      }).join("") + "</dl>" +
        '<div class="btn-row" style="margin-top:12px"><a class="btn btn-primary" href="#/definitions/drill?topic=' + enc(t.id) + '">' + ICON.defs + "Drill these " + plural(ts.length, "term") + "</a></div>";
    }
    h += "</section>";

    h += '<section class="card section-gap"><div class="card-head"><h2>Past-paper questions</h2><span class="muted tiny mono">' + qs.length + "</span></div>";
    if (!qs.length) h += '<p class="muted">No tagged past-paper questions for this topic.</p>';
    else {
      h += '<ul class="qlink-list">' + qs.map(function (x) {
        return '<li><a href="' + qHref(x.paper, x.q) + '"><span class="ql-ref">' + esc(paperShort(x.paper)) + " · " + esc(x.q.num) + '</span><span class="ql-text">' + esc(x.q.asked || "") +
          '</span><span class="badge badge-marks">' + esc(x.q.marks || 0) + "</span></a></li>";
      }).join("") + "</ul>";
    }
    h += "</section>";

    h += '<section class="card section-gap"><div class="card-head"><h2>Drills</h2><span class="muted tiny mono">' + ds.length + "</span></div>";
    if (!ds.length) h += '<p class="muted">No drills for this topic yet.</p>';
    else {
      const res = loadObj("drills");
      h += '<ul class="qlink-list">' + ds.map(function (d) {
        const r = res[d.id];
        return '<li><a href="#/drills?d=' + enc(d.id) + '"><span class="ql-ref">' + esc(TYPE_LABEL[d.type] || d.type || "") +
          (r ? ' <span class="result-dot ' + r + '" title="' + r + '"></span>' : "") + '</span><span class="ql-text">' + esc(firstLine(d.prompt)) + "</span></a></li>";
      }).join("") + "</ul>" +
        '<div class="btn-row" style="margin-top:12px"><a class="btn" href="#/drills?topic=' + enc(t.id) + '">' + ICON.zap + "Drill this topic (" + ds.length + ")</a></div>";
    }
    h += "</section>";

    const ordered = TOPICS.slice().sort(topicOrder);
    const i = ordered.indexOf(t);
    const prev = ordered[i - 1], next = ordered[i + 1];
    h += '<nav class="pager" aria-label="More topics">' +
      (prev ? '<a class="pager-link" href="#/topics/' + enc(prev.id) + '"><span class="muted tiny">← Previous</span><strong>' + esc(prev.title) + "</strong></a>" : "<span></span>") +
      (next ? '<a class="pager-link next" href="#/topics/' + enc(next.id) + '"><span class="muted tiny">Next →</span><strong>' + esc(next.title) + "</strong></a>" : "<span></span>") +
      "</nav></div>";

    return {
      html: h,
      title: t.title,
      after: function () {
        const b = document.getElementById("toggle-revised");
        b.addEventListener("click", function () {
          const set = loadSet("revised");
          const on = !set.has(t.id);
          if (on) set.add(t.id); else set.delete(t.id);
          saveSet("revised", set);
          b.setAttribute("aria-pressed", String(on));
          b.querySelector("span").textContent = on ? "Revised" : "Mark as revised";
          toast(on ? "Marked as revised" : "Unmarked");
        });
      }
    };
  }

  /* ---------------- Definitions (Section A trainer) ---------------- */
  const gl = { q: "", sec: "all", show: "all", sort: "az", cover: false };
  const dd = { scope: "smart", sec: "all", topic: "all", size: "20", deck: [], i: 0, session: {}, revealed: false, typed: "" };
  function defResults() { return loadObj("defs"); }
  function defTabs(active) {
    return '<nav class="tabs no-print" aria-label="Definitions views"><a href="#/definitions"' + (active === "list" ? ' aria-current="page"' : "") + ">Glossary</a>" +
      '<a href="#/definitions/drill"' + (active === "drill" ? ' aria-current="page"' : "") + ">Definitions drill</a></nav>";
  }
  function termSections() {
    return SECTIONS.concat([TECHNIQUE]).filter(function (s) { const k = secKey(s); return TERMS.some(function (e) { return e.sec === k; }); });
  }
  function defsHead(active) {
    const res = defResults();
    const nExam = TERMS.filter(function (e) { return e.examined; }).length;
    const nGot = TERMS.filter(function (e) { return res[e.id] === "got"; }).length;
    const nMiss = TERMS.filter(function (e) { return res[e.id] === "missed"; }).length;
    return '<div class="page-head compact-m s-a' + (active === "drill" ? " is-drill" : "") + '"><div class="eyebrow eyebrow-sec">Section A trainer</div><h1>Definitions</h1>' +
      "<p>Question 1 reads you a description and you write the term. Learn them here, then drill them: the ones examined before come first.</p></div>" +
      missingNotice(["data/glossary.js"]) +
      '<div class="defs-bar">' + defTabs(active) +
      '<div class="defs-strip s-a">' + miniStat(TERMS.length, "terms") + miniStat(nExam, "examined") + miniStat(nGot, "nailed", "good") + miniStat(nMiss, "missed", "bad") + "</div></div>";
  }

  function viewDefinitions(params) {
    if (params.term) { gl.q = ""; gl.sec = "all"; gl.show = "all"; }
    if (params.examined) gl.show = "examined";
    let h = defsHead("list");
    if (!TERMS.length) return { html: h + emptyHtml("No glossary loaded yet", " Terms come from data/glossary.js."), title: "Definitions" };
    const res = defResults();
    const secs = termSections();
    h += '<div class="toolbar">' +
      '<div class="field-wrap">' + ICON.search + '<label class="sr-only" for="gl-q">Search terms and definitions</label>' +
      '<input class="field" id="gl-q" type="search" placeholder="Search terms and definitions…" autocomplete="off" value="' + esc(gl.q) + '"></div>' +
      (secs.length > 1 ? '<div><div class="filter-label" id="gl-sec">Section</div><div class="chips" role="group" aria-labelledby="gl-sec">' +
        glChip("sec", "all", "All", TERMS.length) +
        secs.map(function (s) { const k = secKey(s); return glChip("sec", k, (k !== "X" ? k + " · " : "") + SEC_SHORT[k], TERMS.filter(function (e) { return e.sec === k; }).length, secCls(k)); }).join("") +
        "</div></div>" : "") +
      '<div class="filter-row"><div><div class="filter-label" id="gl-show">Show</div><div class="chips" role="group" aria-labelledby="gl-show">' +
      glChip("show", "all", "All") + glChip("show", "examined", "Examined before", TERMS.filter(function (e) { return e.examined; }).length) +
      glChip("show", "missed", "Missed", TERMS.filter(function (e) { return res[e.id] === "missed"; }).length) +
      glChip("show", "new", "Not drilled", TERMS.filter(function (e) { return !res[e.id]; }).length) + "</div></div>" +
      '<div><div class="filter-label" id="gl-sort">Sort</div><div class="chips" role="group" aria-labelledby="gl-sort">' +
      glChip("sort", "az", "A–Z") + glChip("sort", "exam", "Most examined") + "</div></div>" +
      '<div><div class="filter-label" id="gl-cov">Self-test</div><div class="chips"><button type="button" class="chip" data-gcover aria-pressed="' + gl.cover + '">' + ICON.eye + "Hide terms</button></div></div>" +
      "</div></div>";
    h += '<div id="gloss-results" aria-live="polite"></div>';
    return {
      html: h,
      title: "Definitions",
      after: function () {
        renderGlossList();
        const q = document.getElementById("gl-q");
        q.addEventListener("input", function () { gl.q = q.value; renderGlossList(); });
        if (params.term) {
          const el = document.getElementById(params.term);
          if (el) {
            setTimeout(function () {
              const bar = document.querySelector(".topbar");
              const offset = (bar ? bar.getBoundingClientRect().height : 56) + 16;
              window.scrollTo(0, Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset));
              el.classList.add("flash", "peek");
            }, 0);
            return true;
          }
        }
      }
    };
  }
  function glChip(group, val, label, count, cls) {
    return '<button type="button" class="chip ' + (cls ? "chip-sec " + cls : "") + '" data-gf="' + group + '" data-val="' + esc(val) + '" aria-pressed="' + (String(gl[group]) === String(val)) + '">' + esc(label) +
      (count != null ? ' <span class="count">' + count + "</span>" : "") + "</button>";
  }
  function renderGlossList() {
    const el = document.getElementById("gloss-results");
    if (!el) return;
    const res = defResults();
    const words = norm(gl.q).split(/\s+/).filter(Boolean);
    let rows = TERMS.filter(function (e) {
      if (gl.sec !== "all" && e.sec !== gl.sec) return false;
      if (gl.show === "examined" && !e.examined) return false;
      if (gl.show === "missed" && res[e.id] !== "missed") return false;
      if (gl.show === "new" && res[e.id]) return false;
      if (words.length) {
        const hay = norm(e.term + " " + e.def + " " + (e.topic ? e.topic.title : e.topicId) + " " + e.years.join(" "));
        if (!words.every(function (w) { return hay.indexOf(w) >= 0; })) return false;
      }
      return true;
    });
    if (gl.sort === "exam") rows = rows.slice().sort(function (a, b) { return b.years.length - a.years.length || a.term.localeCompare(b.term); });
    if (!rows.length) { el.innerHTML = emptyHtml("No terms match", " Try clearing a filter."); return; }
    const letters = gl.sort === "az" && !words.length && rows.length > 24;
    let h = '<div class="gl-head"><p class="muted small">' + plural(rows.length, "term") + (gl.cover ? " · tap a card to reveal its term" : "") + "</p>" +
      '<a class="btn btn-sm btn-primary" href="#/definitions/drill">' + ICON.zap + "Drill these</a></div>";
    h += '<ul class="gloss-list' + (gl.cover ? " cover" : "") + '">';
    let last = "";
    rows.forEach(function (e) {
      const L = e.term.charAt(0).toUpperCase();
      if (letters && L !== last) { h += '<li class="gl-letter" aria-hidden="true">' + esc(/[A-Z]/.test(L) ? L : "#") + "</li>"; last = L; }
      const r = res[e.id];
      h += '<li class="gl-item ' + secCls(e.sec) + '" id="' + esc(e.id) + '"' + (gl.cover ? ' data-peek tabindex="0" role="button" aria-label="Reveal term for: ' + esc(firstLine(e.def)) + '"' : "") + ">" +
        '<div class="gl-term"><span class="gl-term-text">' + esc(e.term) + "</span>" +
        (r ? '<span class="result-dot ' + r + '" title="Last drill: ' + (r === "got" ? "got it" : "missed") + '"></span>' : "") + "</div>" +
        '<p class="gl-def">' + inline(e.def) + "</p>" +
        '<div class="gl-meta">' +
        (e.topic ? '<a class="tag tag-topic" href="#/topics/' + enc(e.topic.id) + '" title="' + esc(e.topic.title) + '">' + esc(shortTitle(e.topic)) + "</a>" : "") +
        yearsBadge(e.years) +
        e.asked.slice(0, 3).map(function (x) { return '<a class="tag" href="' + qHref(x.paper, x.q) + '">' + esc(paperShort(x.paper)) + " Q" + esc(x.q.num) + "</a>"; }).join("") +
        "</div></li>";
    });
    el.innerHTML = h + "</ul>";
  }

  function buildDefDeck() {
    const res = defResults();
    let pool = TERMS.filter(function (e) {
      if (dd.topic !== "all" && e.topicId !== dd.topic) return false;
      if (dd.sec !== "all" && e.sec !== dd.sec) return false;
      if (dd.scope === "examined" && !e.examined) return false;
      if (dd.scope === "missed" && res[e.id] !== "missed") return false;
      return true;
    });
    if (dd.scope === "smart") {
      // Missed-before first, then examined-before (most-examined first), then the rest; random inside each band.
      pool = pool.map(function (e) {
        return { e: e, s: (res[e.id] === "missed" ? 100 : 0) + (res[e.id] === "got" ? -50 : 0) + e.years.length * 10 + Math.random() * 9 };
      }).sort(function (a, b) { return b.s - a.s; }).map(function (x) { return x.e; });
    } else shuffle(pool);
    const n = dd.size === "all" ? pool.length : Number(dd.size) || 20;
    dd.deck = pool.slice(0, n).map(function (e) { return e.id; });
    dd.i = 0; dd.session = {}; dd.revealed = false; dd.typed = "";
  }
  function viewDefDrill(params) {
    if (params.topic) { dd.topic = params.topic; dd.sec = "all"; dd.scope = "all"; dd.size = "all"; }
    else dd.topic = "all";
    if (params.missed) { dd.scope = "missed"; dd.size = "all"; }
    if (params.examined) dd.scope = "examined";
    buildDefDeck();
    let h = defsHead("drill");
    if (!TERMS.length) return { html: h + emptyHtml("No glossary loaded yet", " Terms come from data/glossary.js."), title: "Definitions drill" };
    const res = defResults();
    const secs = termSections();
    const topicT = dd.topic !== "all" ? topicById.get(dd.topic) : null;
    if (topicT) {
      h += '<div class="notice" role="note"><span>Drilling terms for <strong>' + esc(topicT.title) + '</strong>.</span> <a href="#/definitions/drill">All terms →</a></div>';
    }
    const wide = !window.matchMedia || window.matchMedia("(min-width: 700px)").matches;
    h += '<div class="drill-filters dd-filters no-print"><details class="dd-opts"' + (wide ? " open" : "") + '><summary><span class="dd-sum-label">Deck options</span><span class="dd-sum" id="dd-sum">' + esc(ddSummary()) + "</span>" + ICON.chev + "</summary>" +
      '<div class="grid" style="gap:10px">';
    h += '<div class="filter-row"><div><div class="filter-label" id="dd-scope">Deck</div><div class="chips" role="group" aria-labelledby="dd-scope">' +
      ddChip("scope", "smart", "Smart: examined first") + ddChip("scope", "examined", "Examined before", TERMS.filter(function (e) { return e.examined; }).length) +
      ddChip("scope", "missed", "Missed", TERMS.filter(function (e) { return res[e.id] === "missed"; }).length) + ddChip("scope", "all", "Random") + "</div></div>" +
      '<div><div class="filter-label" id="dd-size">Cards</div><div class="chips" role="group" aria-labelledby="dd-size">' +
      ddChip("size", "10", "10") + ddChip("size", "20", "20") + ddChip("size", "50", "50") + ddChip("size", "all", "All") + "</div></div></div>" +
      (secs.length > 1 && !topicT ? '<div><div class="filter-label" id="dd-sec">Section</div><div class="chips" role="group" aria-labelledby="dd-sec">' + ddChip("sec", "all", "All") +
        secs.map(function (s) { const k = secKey(s); return ddChip("sec", k, (k !== "X" ? k + " · " : "") + SEC_SHORT[k], null, secCls(k)); }).join("") + "</div></div>" : "") +
      '</div></details><div class="btn-row"><button type="button" class="btn btn-sm" data-ddact="newdeck">' + ICON.shuffle + "New deck</button>" +
      '<button type="button" class="btn btn-sm btn-ghost" id="dd-reset">Reset saved results</button></div></div>';
    h += '<div class="drill-shell" id="def-stage"></div>';
    return {
      html: h,
      title: "Definitions drill",
      after: function () {
        renderDefStage(false);
        const rs = document.getElementById("dd-reset");
        if (rs) rs.addEventListener("click", function () {
          if (!window.confirm("Clear your saved got/missed results for all definitions?")) return;
          save("defs", {});
          route();
          toast("Definition results cleared");
        });
      }
    };
  }
  function ddChip(group, val, label, count, cls) {
    return '<button type="button" class="chip ' + (cls ? "chip-sec " + cls : "") + '" data-ddf="' + group + '" data-val="' + esc(val) + '" aria-pressed="' + (String(dd[group]) === String(val)) + '">' + esc(label) +
      (count != null ? ' <span class="count">' + count + "</span>" : "") + "</button>";
  }
  function ddSummary() {
    const scope = { smart: "Smart order", examined: "Examined before", missed: "Missed", all: "Random" }[dd.scope] || dd.scope;
    return scope + " · " + (dd.size === "all" ? "all cards" : dd.size + " cards") + (dd.sec !== "all" ? " · Section " + dd.sec : "");
  }
  function termMatch(typed, term) {
    const t = normTerm(typed);
    if (!t) return null;
    const tt = t.replace(/ /g, "");
    let ok = false;
    termVariants(term).forEach(function (v) {
      if (ok || !v) return;
      const vv = v.replace(/ /g, "");
      const tol = vv.length > 9 ? 2 : vv.length > 4 ? 1 : 0;
      if (vv === tt || lev(vv, tt) <= tol) ok = true;
    });
    return ok;
  }
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 3) return 99;
    const m = a.length, n = b.length;
    let prev = []; for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[n];
  }
  function currentTerm() { return termById.get(dd.deck[dd.i]) || null; }
  function renderDefStage(focus) {
    const el = document.getElementById("def-stage");
    if (!el) return;
    document.querySelectorAll("[data-ddf]").forEach(function (b) { b.setAttribute("aria-pressed", String(String(dd[b.getAttribute("data-ddf")]) === b.getAttribute("data-val"))); });
    const saved = defResults();
    const cm = document.querySelector('[data-ddf="scope"][data-val="missed"] .count');
    if (cm) cm.textContent = TERMS.filter(function (e) { return saved[e.id] === "missed"; }).length;
    const sumEl = document.getElementById("dd-sum");
    if (sumEl) sumEl.textContent = ddSummary();
    const total = dd.deck.length;
    const got = Object.keys(dd.session).filter(function (k) { return dd.session[k] === "got"; }).length;
    const missedN = Object.keys(dd.session).length - got;

    if (!total) {
      el.innerHTML = emptyHtml(dd.scope === "missed" ? "Nothing missed. Nice." : "No terms match", dd.scope === "missed" ? " Every term you've drilled is marked as got it." : " Try another deck or section.");
      return;
    }
    if (dd.i >= total) {
      const missedIds = dd.deck.filter(function (id) { return dd.session[id] === "missed"; });
      let h = '<section class="flashcard summary s-a" aria-labelledby="dsum-h"><div class="fc-top"><span class="fc-type">Round done</span></div>' +
        '<h2 id="dsum-h" tabindex="-1" class="score-big">' + got + '<span class="muted">/' + total + "</span></h2>" +
        '<p class="muted">' + pct(got, total) + "% nailed." + (missedIds.length ? " Read the missed ones once more, then re-drill them while they're fresh." : " Clean sweep. Deal a new deck.") + "</p>";
      if (missedIds.length) {
        h += '<div><div class="filter-label">Missed this round</div><dl class="gloss-mini">' + missedIds.map(function (id) {
          const e = termById.get(id);
          return e ? "<div><dt>" + esc(e.term) + yearsBadge(e.years) + "</dt><dd>" + inline(e.def) + "</dd></div>" : "";
        }).join("") + "</dl></div>";
      }
      h += '<div class="fc-actions">' + (missedIds.length ? '<button type="button" class="btn btn-primary" data-ddact="redrill">' + ICON.repeat + "Re-drill missed (" + missedIds.length + ")</button>" : "") +
        '<button type="button" class="btn' + (missedIds.length ? "" : " btn-primary") + '" data-ddact="newdeck">' + ICON.shuffle + "New deck</button></div></section>";
      el.innerHTML = h;
      if (focus) { const hd = document.getElementById("dsum-h"); if (hd) hd.focus(); }
      return;
    }

    const e = currentTerm();
    const prev = saved[e.id];
    let h = '<div class="drill-bar"><span class="drill-count">' + (dd.i + 1) + " / " + total + "</span>" +
      '<div class="meter sec s-a" role="progressbar" aria-label="Deck progress" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + dd.i + '"><span style="width:' + pct(dd.i, total) + '%"></span></div>' +
      '<span class="drill-count"><span style="color:var(--good)">✓ ' + got + '</span> &nbsp;<span style="color:var(--bad)">✗ ' + missedN + "</span></span></div>";
    h += '<section class="flashcard defcard s-a" aria-labelledby="def-prompt">' +
      '<div class="fc-top"><span class="fc-type">Name the term</span>' +
      (e.topic ? '<a class="tag tag-topic" href="#/topics/' + enc(e.topic.id) + '" title="' + esc(e.topic.title) + '">' + esc(shortTitle(e.topic)) + "</a>" : "") +
      yearsBadge(e.years) +
      (prev ? '<span class="tag" title="Last time"><span class="result-dot ' + prev + '"></span>&nbsp;last: ' + (prev === "got" ? "got it" : "missed") + "</span>" : "") +
      "</div>" +
      '<p class="fc-prompt def-prompt" id="def-prompt">' + inline(e.def) + "</p>";
    if (!dd.revealed) {
      h += '<form class="term-form" data-defform autocomplete="off"><label class="sr-only" for="term-input">Your answer (optional)</label>' +
        '<input class="field term-input" id="term-input" type="text" placeholder="Type the term, or just think it…" spellcheck="false" autocapitalize="off" value="' + esc(dd.typed) + '">' +
        '<button type="submit" class="btn btn-primary">' + ICON.eye + "Reveal</button></form>";
    } else {
      const m = termMatch(dd.typed, e.term);
      h += '<div class="fc-answer" id="fc-answer"><h4>The term</h4><p class="term-big">' + esc(e.term) + "</p>" +
        (m === null ? "" : '<p class="match ' + (m ? "good" : "bad") + '">' + (m ? ICON.check : ICON.x) + "You wrote “" + esc(dd.typed) + "”" + (m ? ": looks right." : ": doesn't match. Be honest below.") + "</p>") +
        (e.asked.length ? '<p class="muted small" style="margin:8px 0 0">Asked in ' + e.asked.map(function (x) { return '<a href="' + qHref(x.paper, x.q) + '">' + esc(paperShort(x.paper)) + " Q" + esc(x.q.num) + "</a>"; }).join(", ") + "</p>" : "") +
        "</div>" +
        '<div class="fc-actions"><button type="button" class="btn btn-good" data-ddact="got" id="dd-got">' + ICON.check + 'Got it</button><button type="button" class="btn btn-bad" data-ddact="missed">' + ICON.x + "Missed it</button></div>";
    }
    h += "</section>";
    h += '<p class="kbd-hints no-print"><kbd>Enter</kbd> reveal · <kbd>G</kbd> got it · <kbd>M</kbd> missed</p>';
    el.innerHTML = h;
    if (focus) {
      const coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
      const target = dd.revealed ? el.querySelector("#dd-got") : (coarse ? el.querySelector(".term-form .btn") : el.querySelector("#term-input"));
      if (target) target.focus({ preventScroll: true });
    }
  }
  function defAction(act) {
    const e = currentTerm();
    if (act === "reveal" && e && !dd.revealed) {
      const inp = document.getElementById("term-input");
      dd.typed = inp ? inp.value : "";
      dd.revealed = true; renderDefStage(true); return;
    }
    if ((act === "got" || act === "missed") && e && dd.revealed) {
      dd.session[e.id] = act;
      const res = defResults(); res[e.id] = act; save("defs", res);
      dd.i++; dd.revealed = false; dd.typed = "";
      renderDefStage(true); refreshDefsStrip(); return;
    }
    if (act === "redrill") {
      dd.deck = shuffle(dd.deck.filter(function (id) { return dd.session[id] === "missed"; }));
      dd.i = 0; dd.session = {}; dd.revealed = false; dd.typed = "";
      renderDefStage(true); return;
    }
    if (act === "newdeck") { buildDefDeck(); renderDefStage(true); toast("New deck dealt"); }
  }
  function refreshDefsStrip() {
    const strip = document.querySelector(".defs-strip");
    if (!strip) return;
    const res = defResults();
    const vals = [TERMS.length, TERMS.filter(function (e) { return e.examined; }).length,
      TERMS.filter(function (e) { return res[e.id] === "got"; }).length, TERMS.filter(function (e) { return res[e.id] === "missed"; }).length];
    strip.querySelectorAll(".mini-stat strong").forEach(function (s, i) { s.textContent = vals[i]; });
  }

  /* ---------------- Past papers ---------------- */
  function papersTabs(active) {
    return '<nav class="tabs no-print" aria-label="Past papers views"><a href="#/papers"' + (active === "list" ? ' aria-current="page"' : "") + ">Papers</a>" +
      '<a href="#/heatmap"' + (active === "heat" ? ' aria-current="page"' : "") + ">Topic heatmap</a></nav>";
  }
  function sectionMarks(p, k) {
    let m = 0;
    list(p.sections).forEach(function (s) { if (secKey(s.name) === k) m += sum(list(s.questions), function (q) { return q.marks; }); });
    return m;
  }
  function memoBadge(p) {
    return p.hasMemo === false ? '<span class="memo-badge" title="No official memo for this paper: the answers are our own model answers">No official memo · model answers</span>' : "";
  }
  function viewPapers() {
    let h = '<div class="page-head"><div class="eyebrow">Practise</div><h1>Past papers</h1>' +
      "<p>Every question summarised in plain words, with a model answer written to hit the memo's marking points. Answer it yourself first, then reveal.</p></div>";
    h += papersTabs("list") + missingNotice(PAPER_FILES);
    if (!sortedPapers.length) return { html: h + emptyHtml("No papers loaded yet", " They come from data/papers-a.js, papers-b.js and papers-c.js.") };
    h += sectionLegend();
    h += '<div class="paper-grid">';
    sortedPapers.forEach(function (p) {
      const nq = sum(list(p.sections), function (s) { return list(s.questions).length; });
      const segs = ["A", "B", "C", "D", "E"].map(function (k) { return { k: k, m: sectionMarks(p, k) }; }).filter(function (x) { return x.m; });
      h += '<a class="paper-card" href="#/papers/' + enc(p.id) + '"><div class="pc-top"><span class="paper-year">' + esc(p.year || "") + '</span><span class="paper-session">' + esc(p.session || "") + "</span></div>" +
        "<p>" + esc(p.scenario || "") + "</p>" +
        '<div class="paper-stats"><span class="badge badge-marks">' + esc(p.total || "?") + " marks</span>" +
        '<span class="tag">' + plural(nq, "question") + "</span>" + memoBadge(p) +
        "</div>" +
        (segs.length ? '<div class="sec-split" aria-hidden="true">' + segs.map(function (x) {
          return '<span class="' + secCls(x.k) + '" style="flex:' + x.m + '"></span>';
        }).join("") + "</div>" +
          '<div class="sec-split-legend">' + segs.map(function (x) { return '<span class="' + secCls(x.k) + '"><i></i>' + x.k + " " + x.m + "</span>"; }).join("") + "</div>" : "") +
        "</a>";
    });
    return { html: h + "</div>" };
  }

  function viewPaper(id, params) {
    const p = paperById.get(id);
    if (!p) return notFound("That paper isn't in the data.", "#/papers", "All papers");
    const sections = list(p.sections);
    let h = '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/papers">Past papers</a> / ' + esc(paperLabel(p)) + "</nav>";
    h += '<div class="page-head paper-head"><div class="eyebrow">' + esc(p.session || "") + " " + esc(p.year || "") + "</div><h1>" + esc(paperLabel(p)) + "</h1>" +
      "<p>" + esc(p.scenario || "") + "</p></div>";
    h += '<div class="paper-toolbar no-print"><div class="chips">' +
      '<span class="badge badge-marks">' + esc(p.total || "?") + " marks</span>" + memoBadge(p) +
      sections.map(function (s, i) {
        const k = secKey(s.name);
        return '<a class="chip chip-sec ' + secCls(k) + '" href="#sec-' + i + '" data-jump="sec-' + i + '"><i class="dot" aria-hidden="true"></i>' + esc(k || s.name || "?") + " · " + esc(SEC_SHORT[k] || secRest(s.name)) +
          ' <span class="count">' + sum(list(s.questions), function (q) { return q.marks; }) + "</span></a>";
      }).join("") +
      '</div><button type="button" class="btn btn-sm" id="toggle-all" aria-pressed="false">Reveal all answers</button></div>' +
      '<p class="try-first">Cover the answer and write yours first: one fact per mark, tied to the scenario. Then reveal and compare.</p>';

    if (!sections.length) h += emptyHtml("No questions in this paper yet", "");
    sections.forEach(function (s, si) {
      const qs = list(s.questions);
      const k = secKey(s.name);
      h += '<section class="section-block ' + secCls(k) + '" id="sec-' + si + '" aria-labelledby="sec-h-' + si + '"><div class="section-title">' +
        '<h2 id="sec-h-' + si + '">' + (k && k !== "X" ? '<span class="sec-letter" aria-hidden="true">' + k + "</span>" : "") + '<span class="sr-only">Section ' + esc(k) + ": </span>" + esc(secRest(s.name) || "Section") + "</h2>" +
        '<span class="badge badge-year">' + plural(qs.length, "question") + '</span><span class="badge badge-marks">' + sum(qs, function (q) { return q.marks; }) + " marks</span></div>";
      if (k === "A") h += defQuestions(qs);
      else {
        h += '<div class="stack">';
        qs.forEach(function (q) { h += questionCard(q); });
        h += "</div>";
      }
      if (!qs.length) h += emptyHtml("No questions in this section", "");
      h += "</section>";
    });

    const others = sortedPapers.filter(function (x) { return x !== p; });
    if (others.length) {
      h += '<div class="section-gap no-print"><div class="filter-label">Other papers</div><div class="chips">' +
        others.map(function (x) { return '<a class="chip" href="#/papers/' + enc(x.id) + '">' + esc(paperLabel(x)) + "</a>"; }).join("") + "</div></div>";
    }

    return {
      html: h,
      title: paperLabel(p),
      after: function (view) {
        const tog = document.getElementById("toggle-all");
        tog.addEventListener("click", function () {
          const open = tog.getAttribute("aria-pressed") !== "true";
          tog.setAttribute("aria-pressed", String(open));
          tog.textContent = open ? "Hide all answers" : "Reveal all answers";
          view.querySelectorAll("[data-reveal]").forEach(function (b) { setReveal(b, open); });
        });
        if (params.q) {
          const el = document.getElementById(qId(params.q));
          if (el) {
            setTimeout(function () {
              const bar = document.querySelector(".topbar");
              const offset = (bar ? bar.getBoundingClientRect().height : 56) + 12;
              window.scrollTo(0, Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset));
              el.classList.add("flash");
            }, 0);
            return true;
          }
        }
      }
    };
  }
  function questionCard(q) {
    const base = "r" + (++revealSeq);
    const marks = Number(q.marks) || 0;
    return '<article class="card question" id="' + qId(q.num) + '" aria-labelledby="' + base + '-h">' +
      '<div class="q-head"><span class="q-num" id="' + base + '-h">' + esc(q.num) + '</span><div class="q-tags">' + list(q.tags).map(tagHtml).join("") + "</div>" +
      '<span class="badge badge-marks">' + marks + " mark" + (marks === 1 ? "" : "s") + "</span></div>" +
      richText(q.asked || "", "q-asked") +
      '<div class="reveal-row">' + (q.answer ? revealBtn("Reveal answer", base + "-a", "reveal-main", "Hide answer") : '<span class="muted small">No model answer yet.</span>') + "</div>" +
      (q.answer ? '<div class="reveal-panel answer-panel" id="' + base + '-a" hidden><h4>Model answer' + (marks > 1 ? '<span class="aim">' + marks + " marks = " + marks + " ticks: one clear point each</span>" : "") + "</h4>" +
        richText(q.answer) +
        (q.tip ? '<div class="tip-row">' + revealBtn("Examiner tip", base + "-t", "btn-ghost tip-btn") + "</div>" +
          '<div class="tip-panel" id="' + base + '-t" hidden>' + ICON.bulb + richText(q.tip) + "</div>" : "") +
        "</div>" : "") +
      "</article>";
  }
  function defQuestions(qs) {
    if (!qs.length) return "";
    return '<div class="card defq-card"><ol class="defq">' + qs.map(function (q) {
      const base = "r" + (++revealSeq);
      const sa = shortAnswer(q.answer);
      const marks = Number(q.marks) || 0;
      return '<li id="' + qId(q.num) + '"><span class="q-num">' + esc(q.num) + "</span>" +
        '<div class="defq-body"><div class="defq-asked">' + inline(q.asked || "") + (marks > 1 ? ' <span class="badge badge-marks">' + marks + "</span>" : "") + "</div>" +
        '<div class="defq-ans" id="' + base + '-a" hidden>' + (sa != null ? '<p class="defq-term">' + inline(sa) + "</p>" : richText(q.answer || "")) +
        (q.tip ? '<p class="defq-tip">' + ICON.bulb + "<span>" + inline(q.tip) + "</span></p>" : "") + "</div></div>" +
        (q.answer ? revealBtn("Show", base + "-a", "defq-btn", "Hide") : "") + "</li>";
    }).join("") + "</ol></div>";
  }
  function tagHtml(tag) {
    const t = resolveTag(tag);
    if (t) return '<a class="tag tag-topic" href="#/topics/' + enc(t.id) + '" title="Topic: ' + esc(t.title) + '">' + esc(shortTitle(t)) + "</a>";
    return '<span class="tag">' + esc(tag) + "</span>";
  }

  /* Heatmap: topic × paper (or year) */
  const heatFilter = { scope: "all", metric: "q", cols: "paper" };
  function viewHeatmap() {
    let h = '<div class="page-head"><div class="eyebrow">Spot the pattern</div><h1>What gets examined</h1>' +
      "<p>Each cell counts the questions (or marks) on that topic in that paper. Darker = more. Rows at the top come up almost every year: hit those hardest tonight.</p></div>";
    h += papersTabs("heat") + missingNotice(PAPER_FILES.concat(["data/topics.js"]));

    const byYear = heatFilter.cols === "year";
    const colMap = new Map(); // key -> {key, year, sess, label, sub}
    function colFor(year, sess) {
      const y = Number(year) || 0;
      const sk = byYear ? "" : sessKey(sess);
      const key = y + "|" + sk;
      if (!colMap.has(key)) colMap.set(key, { key: key, year: y, sess: sk, label: y ? String(y) : "?", sub: byYear ? "" : (SESSION_SHORT[sk] || sk || "") });
      return colMap.get(key);
    }
    sortedPapers.forEach(function (p) { colFor(p.year, p.session); });

    const rows = new Map();
    function row(key, init) { if (!rows.has(key)) rows.set(key, init); return rows.get(key); }
    TOPICS.forEach(function (t) {
      row("t:" + t.id, { label: shortTitle(t), full: t.title, href: "#/topics/" + enc(t.id), topic: t, sec: secKey(topicSection(t)), cells: {} });
    });
    QUESTIONS.forEach(function (x) {
      const qs = secKey(x.section.name);
      if (heatFilter.scope !== "all" && qs !== heatFilter.scope) return;
      const col = colFor(x.paper.year, x.paper.session);
      const seen = new Set();
      list(x.q.tags).forEach(function (tag) {
        const t = resolveTag(tag);
        const key = t ? "t:" + t.id : "g:" + norm(tag);
        if (seen.has(key)) return;
        seen.add(key);
        const r = row(key, { label: String(tag), href: null, topic: null, sec: qs, cells: {} });
        const c = r.cells[col.key] || (r.cells[col.key] = { n: 0, marks: 0, refs: [] });
        c.n++; c.marks += Number(x.q.marks) || 0; c.refs.push(x);
      });
    });
    // Topic years with no loaded paper column: add a year column for the dot.
    const showDots = function (r) { return r.topic && (heatFilter.scope === "all" || r.sec === heatFilter.scope); };
    rows.forEach(function (r) {
      if (!showDots(r)) return;
      list(r.topic.years).forEach(function (y) {
        y = Number(y);
        if (!y) return;
        const any = Array.from(colMap.values()).some(function (c) { return c.year === y; });
        if (!any) colFor(y, "");
      });
    });
    const cols = Array.from(colMap.values()).sort(function (a, b) {
      const o = { May: 0, Prelim: 1, November: 2, "": 3 };
      return a.year - b.year || (o[a.sess] != null ? o[a.sess] : 4) - (o[b.sess] != null ? o[b.sess] : 4);
    });
    if (!cols.length) return { html: h + emptyHtml("Nothing to chart yet", " Needs papers or topic years.") };

    let all = Array.from(rows.values());
    all.forEach(function (r) {
      r.qTotal = 0; r.mTotal = 0;
      const ys = new Set();
      Object.keys(r.cells).forEach(function (k) { r.qTotal += r.cells[k].n; r.mTotal += r.cells[k].marks; ys.add(Number(k.split("|")[0])); });
      r.dotCols = {};
      if (showDots(r)) list(r.topic.years).forEach(function (y) {
        y = Number(y);
        ys.add(y);
        // put the dot in this year's first column that has no hit
        const hit = cols.some(function (c) { return c.year === y && r.cells[c.key]; });
        if (!hit) { const c = cols.filter(function (c2) { return c2.year === y; }).pop(); if (c) r.dotCols[c.key] = true; }
      });
      r.yearCount = ys.size;
    });
    all = all.filter(function (r) { return r.qTotal || (showDots(r) && r.yearCount); })
      .sort(function (a, b) { return b.yearCount - a.yearCount || (heatFilter.metric === "m" ? b.mTotal - a.mTotal : b.qTotal - a.qTotal) || a.label.localeCompare(b.label); });

    h += '<div class="heat-controls no-print"><div class="chips" role="group" aria-label="Paper section to count">' +
      heatChip("all", "All sections") + ["A", "B", "C", "D", "E"].map(function (k) { return heatChip(k, k + " · " + SEC_SHORT[k], secCls(k)); }).join("") + "</div>" +
      '<div class="chips" role="group" aria-label="Count and columns">' + metricChip("q", "Questions") + metricChip("m", "Marks") +
      '<span class="chip-sep" aria-hidden="true"></span>' + colsChip("paper", "Per paper") + colsChip("year", "Per year") + "</div></div>";
    const val = function (c) { return heatFilter.metric === "m" ? c.marks : c.n; };
    let maxV = 1;
    all.forEach(function (r) { Object.keys(r.cells).forEach(function (k) { maxV = Math.max(maxV, val(r.cells[k])); }); });
    if (!all.length) return { html: h + emptyHtml("No rows for this filter", "") };
    const scopeCls = heatFilter.scope !== "all" ? " " + secCls(heatFilter.scope) + " heat-sec" : "";

    h += '<div class="heat-legend' + scopeCls + '"><span><span class="sw" style="background:var(--surface-2);border:1px solid var(--line)"></span>not asked</span>' +
      '<span class="ramp"><span>fewer ' + (heatFilter.metric === "m" ? "marks" : "questions") + '</span><span class="sw h1"></span><span class="sw h2"></span><span class="sw h3"></span><span class="sw h4"></span><span>more (max ' + maxV + ")</span></span>" +
      '<span><b class="dot-key">•</b> examined (per topic notes, paper not loaded)</span></div>';

    h += '<div class="heat-wrap' + scopeCls + '" tabindex="0" role="region" aria-label="Topic frequency heatmap, scrolls sideways"><table class="heat"><caption class="sr-only">' + (heatFilter.metric === "m" ? "Marks" : "Number of questions") + " per topic per " + (byYear ? "year" : "paper") + '</caption><thead><tr><th scope="col">Topic</th>' +
      cols.map(function (c) { return '<th scope="col"><span class="hy">' + esc(c.label) + "</span>" + (c.sub ? '<span class="hs">' + esc(c.sub) + "</span>" : "") + "</th>"; }).join("") +
      '<th scope="col" title="Years examined"><span class="hy">Yrs</span></th></tr></thead><tbody>';
    all.forEach(function (r) {
      h += '<tr><th scope="row" class="' + secCls(r.sec) + '"><i class="row-dot" aria-hidden="true"></i>' + (r.href ? '<a href="' + r.href + '" title="' + esc(r.full || r.label) + '">' + esc(r.label) + "</a>" : '<span class="muted">' + esc(r.label) + "</span>") + "</th>";
      cols.forEach(function (col) {
        const c = r.cells[col.key];
        const colName = col.label + (col.sub ? " " + col.sub : "");
        if (c) {
          const v = val(c);
          const lvl = Math.max(1, Math.min(4, Math.ceil((v / maxV) * 4)));
          const first = c.refs[0];
          const tip = colName + ": " + plural(c.n, "question") + ", " + c.marks + " marks (" + c.refs.map(function (x) { return (byYear ? (SESSION_SHORT[sessKey(x.paper.session)] || "") + " " : "") + "Q" + x.q.num; }).join(", ") + ")";
          h += '<td class="h' + lvl + '" title="' + esc(tip) + '"><a class="heat-link" href="' + qHref(first.paper, first.q) + '" aria-label="' + esc(r.label + ", " + tip) + '">' + v + "</a></td>";
        } else if (r.dotCols && r.dotCols[col.key]) {
          h += '<td class="dot" title="' + esc(colName) + ': examined (no loaded question tagged)"><span aria-hidden="true">•</span><span class="sr-only">examined</span></td>';
        } else {
          h += '<td><span class="sr-only">none</span></td>';
        }
      });
      h += '<td class="total">' + r.yearCount + "</td></tr>";
    });
    h += "</tbody></table></div>";
    h += '<p class="muted tiny" style="margin-top:10px">Tap a number to jump to that question. A section filter counts only questions from that section of the paper (e.g. A shows which topics Q1 definitions come from). Grey rows are raw tags that aren\'t a topic page.</p>';
    return { html: h, title: "Topic heatmap" };
  }
  function metricChip(val, label) {
    return '<button type="button" class="chip" data-metric="' + val + '" aria-pressed="' + (heatFilter.metric === val) + '">' + esc(label) + "</button>";
  }
  function colsChip(val, label) {
    return '<button type="button" class="chip" data-hcols="' + val + '" aria-pressed="' + (heatFilter.cols === val) + '">' + esc(label) + "</button>";
  }
  function heatChip(val, label, cls) {
    return '<button type="button" class="chip ' + (cls ? "chip-sec " + cls : "") + '" data-heat="' + val + '" aria-pressed="' + (heatFilter.scope === val) + '">' + esc(label) + "</button>";
  }

  /* ---------------- Drills ---------------- */
  const drill = { topic: "all", type: "all", mode: "all", deck: [], i: 0, session: {}, revealed: false, picked: null, single: null };
  function drillResults() { return loadObj("drills"); }
  function buildDeck() {
    const res = drillResults();
    const ds = DRILLS.filter(function (d) {
      if (drill.single) return d.id === drill.single;
      if (drill.topic !== "all" && d.topic !== drill.topic) return false;
      if (drill.type !== "all" && d.type !== drill.type) return false;
      if (drill.mode === "missed" && res[d.id] !== "missed") return false;
      if (drill.mode === "new" && res[d.id]) return false;
      return true;
    });
    drill.deck = ds.map(function (d) { return d.id; });
    drill.i = 0; drill.session = {}; drill.revealed = false; drill.picked = null;
  }
  function viewDrills(params) {
    drill.single = params.d || null;
    if (params.topic) { drill.topic = params.topic; drill.type = "all"; drill.mode = "all"; }
    if (params.missed) { drill.mode = "missed"; }
    buildDeck();

    const res = drillResults();
    const topicsWithDrills = TOPICS.filter(function (t) { return drillsForTopic(t.id).length; });
    const nMissed = DRILLS.filter(function (d) { return res[d.id] === "missed"; }).length;
    const nNew = DRILLS.filter(function (d) { return !res[d.id]; }).length;

    let h = '<div class="page-head compact-m"><div class="eyebrow">Active recall</div><h1>Drills</h1>' +
      "<p>Answer in your head (or on paper) first, then reveal and be honest. Missed ones come back for another round. For Q1 terms use the <a href=\"#/definitions/drill\">Definitions drill</a>.</p></div>";
    h += missingNotice(["data/drills.js"]);
    if (!DRILLS.length) return { html: h + emptyHtml("No drills loaded yet", " They come from data/drills.js.") };

    if (drill.single) {
      h += '<div class="notice" role="note"><span>Showing one drill.</span> <a href="#/drills">Show all drills →</a></div>';
    } else {
      h += '<div class="drill-filters no-print"><div class="grid" style="gap:10px">' +
        '<div><label class="filter-label" for="drill-topic">Topic</label><select class="field" id="drill-topic"><option value="all">All topics (' + DRILLS.length + ")</option>" +
        topicsWithDrills.map(function (t) { return '<option value="' + esc(t.id) + '"' + (drill.topic === t.id ? " selected" : "") + ">" + esc(t.title) + " (" + drillsForTopic(t.id).length + ")</option>"; }).join("") +
        "</select></div>" +
        '<div class="filter-row"><div><div class="filter-label" id="dl-type">Type</div><div class="chips" role="group" aria-labelledby="dl-type">' +
        dchip("type", "all", "All") + DRILL_TYPES.filter(function (ty) { return DRILLS.some(function (d) { return d.type === ty; }); }).map(function (ty) { return dchip("type", ty, TYPE_LABEL[ty]); }).join("") + "</div></div>" +
        '<div><div class="filter-label" id="dl-mode">Which</div><div class="chips" role="group" aria-labelledby="dl-mode">' +
        dchip("mode", "all", "All") + dchip("mode", "missed", "Missed before", nMissed) + dchip("mode", "new", "Not tried", nNew) + "</div></div></div>" +
        '</div><div class="btn-row"><button type="button" class="btn btn-sm" id="drill-shuffle">' + ICON.shuffle + "Shuffle</button>" +
        '<button type="button" class="btn btn-sm btn-ghost" id="drill-reset">Reset saved results</button></div></div>';
    }
    h += '<div class="drill-shell" id="drill-stage"></div>';
    return {
      html: h,
      after: function () {
        renderDrillStage(false);
        const sel = document.getElementById("drill-topic");
        if (sel) sel.addEventListener("change", function () { drill.topic = sel.value; buildDeck(); renderDrillStage(false); });
        const sh = document.getElementById("drill-shuffle");
        if (sh) sh.addEventListener("click", function () {
          shuffle(drill.deck);
          drill.i = 0; drill.session = {}; drill.revealed = false; drill.picked = null;
          renderDrillStage(false);
          toast("Deck shuffled");
        });
        const rs = document.getElementById("drill-reset");
        if (rs) rs.addEventListener("click", function () {
          if (!window.confirm("Clear your saved got/missed results for all drills?")) return;
          save("drills", {});
          route();
          toast("Drill results cleared");
        });
      }
    };
  }
  function dchip(group, val, label, count) {
    return '<button type="button" class="chip" data-df="' + group + '" data-val="' + esc(val) + '" aria-pressed="' + (drill[group] === val) + '">' + esc(label) +
      (count != null ? ' <span class="count">' + count + "</span>" : "") + "</button>";
  }
  function currentDrill() {
    const id = drill.deck[drill.i];
    return DRILLS.find(function (d) { return d.id === id; }) || null;
  }
  function mcqCorrectIndex(d) {
    const opts = list(d.options);
    let idx = opts.findIndex(function (o) { return norm(o) === norm(d.answer); });
    const a = String(d.answer || "").trim();
    if (idx < 0 && /^[a-h]$/i.test(a)) idx = a.toUpperCase().charCodeAt(0) - 65;
    if (idx < 0 && /^\d+$/.test(a)) idx = Number(a) - 1;
    if (idx < 0) idx = opts.findIndex(function (o) { return norm(a).indexOf(norm(o)) === 0 && norm(o).length > 2; });
    return idx >= 0 && idx < opts.length ? idx : -1;
  }
  function renderDrillStage(focus) {
    const el = document.getElementById("drill-stage");
    if (!el) return;
    document.querySelectorAll("[data-df]").forEach(function (b) { b.setAttribute("aria-pressed", String(drill[b.getAttribute("data-df")] === b.getAttribute("data-val"))); });
    const saved = drillResults();
    const cMissed = document.querySelector('[data-df="mode"][data-val="missed"] .count');
    const cNew = document.querySelector('[data-df="mode"][data-val="new"] .count');
    if (cMissed) cMissed.textContent = DRILLS.filter(function (x) { return saved[x.id] === "missed"; }).length;
    if (cNew) cNew.textContent = DRILLS.filter(function (x) { return !saved[x.id]; }).length;
    const total = drill.deck.length;
    const got = Object.keys(drill.session).filter(function (k) { return drill.session[k] === "got"; }).length;
    const missedN = Object.keys(drill.session).length - got;

    if (!total) {
      el.innerHTML = emptyHtml(drill.mode === "missed" ? "Nothing missed. Nice." : "No drills match these filters", drill.mode === "missed" ? " Every drill you've tried is marked as got it." : " Try another topic or type.");
      return;
    }
    if (drill.i >= total) {
      const missedIds = drill.deck.filter(function (id) { return drill.session[id] === "missed"; });
      let h = '<section class="flashcard summary" aria-labelledby="sum-h"><div class="fc-top"><span class="fc-type">Round done</span></div>' +
        '<h2 id="sum-h" tabindex="-1" class="score-big">' + got + "<span class=\"muted\">/" + total + "</span></h2>" +
        '<p class="muted">' + pct(got, total) + "% nailed this round." + (missedIds.length ? " Re-drill the ones you missed while they're fresh." : " Clean sweep, move on to another topic.") + "</p>";
      if (missedIds.length) {
        h += '<div><div class="filter-label">Missed</div><ul class="qlink-list">' + missedIds.map(function (id) {
          const d = DRILLS.find(function (x) { return x.id === id; });
          const t = d && topicById.get(d.topic);
          return '<li><a href="#/drills?d=' + enc(id) + '"><span class="ql-ref">' + esc(t ? t.title : (d && d.topic) || "") + '</span><span class="ql-text">' + esc(firstLine(d && d.prompt)) + "</span></a></li>";
        }).join("") + "</ul></div>";
      }
      h += '<div class="fc-actions">' + (missedIds.length ? '<button type="button" class="btn btn-primary" data-dact="redrill">Re-drill missed (' + missedIds.length + ")</button>" : "") +
        '<button type="button" class="btn" data-dact="restart">Restart this deck</button></div></section>';
      el.innerHTML = h;
      if (focus) { const hd = document.getElementById("sum-h"); if (hd) hd.focus(); }
      return;
    }

    const d = currentDrill();
    const t = d && topicById.get(d.topic);
    const prev = drill.picked == null && !drill.session[d.id] ? saved[d.id] : null;
    const sk = t ? secKey(topicSection(t)) : "";
    let h = '<div class="drill-bar"><span class="drill-count">' + (drill.i + 1) + " / " + total + "</span>" +
      '<div class="meter" role="progressbar" aria-label="Deck progress" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + drill.i + '"><span style="width:' + pct(drill.i, total) + '%"></span></div>' +
      '<span class="drill-count"><span style="color:var(--good)">✓ ' + got + '</span> &nbsp;<span style="color:var(--bad)">✗ ' + missedN + "</span></span></div>";
    h += '<section class="flashcard ' + secCls(sk) + '" aria-labelledby="fc-prompt">' +
      '<div class="fc-top"><span class="fc-type">' + esc(TYPE_LABEL[d.type] || d.type || "Drill") + "</span>" +
      (t ? secPill(topicSection(t), true) + '<a class="tag tag-topic" href="#/topics/' + enc(t.id) + '" title="' + esc(t.title) + '">' + esc(shortTitle(t)) + "</a>" : d.topic ? '<span class="tag">' + esc(d.topic) + "</span>" : "") +
      (prev ? '<span class="tag" title="Last time"><span class="result-dot ' + prev + '"></span>&nbsp;last: ' + (prev === "got" ? "got it" : "missed") + "</span>" : "") +
      "</div>" + '<div id="fc-prompt">' + richText(d.prompt || "", "fc-prompt" + (d.type === "scenario" ? " fc-scenario" : "")) + "</div>";

    if (d.type === "mcq" && list(d.options).length) {
      const ci = mcqCorrectIndex(d);
      h += '<div class="options" role="group" aria-label="Options">' + list(d.options).map(function (o, i) {
        let cls = "";
        if (drill.picked != null) { if (i === ci) cls = " correct"; else if (i === drill.picked) cls = " wrong"; }
        return '<button type="button" class="option' + cls + '" data-opt="' + i + '"' + (drill.picked != null ? " disabled" : "") + '><span class="opt-key">' + String.fromCharCode(65 + i) + "</span><span>" + inline(o) + "</span></button>";
      }).join("") + "</div>";
      if (drill.picked != null) {
        const right = drill.picked === ci;
        h += '<div class="fc-answer" role="status"><p class="feedback ' + (right ? "good" : "bad") + '">' + (right ? ICON.check + "Correct" : ICON.x + "Not quite. Answer: " + esc(ci >= 0 ? list(d.options)[ci] : d.answer)) + "</p>" +
          (d.explain ? richText(d.explain) : "") + "</div>" +
          '<div class="fc-actions"><button type="button" class="btn btn-primary" data-dact="next" id="fc-next">Next ' + ICON.arrow + "</button></div>";
      }
    } else {
      if (!drill.revealed) {
        h += '<div class="fc-actions"><button type="button" class="btn btn-primary" data-dact="reveal" aria-expanded="false" aria-controls="fc-answer">' + ICON.eye + "Reveal answer</button></div>";
      } else {
        h += '<div class="fc-answer" id="fc-answer"><h4>Model answer</h4>' + richText(d.answer || "") +
          (d.explain ? '<div class="fc-explain">' + richText(d.explain) + "</div>" : "") + "</div>" +
          '<div class="fc-actions"><button type="button" class="btn btn-good" data-dact="got" id="fc-got">' + ICON.check + 'Got it</button><button type="button" class="btn btn-bad" data-dact="missed">' + ICON.x + "Missed it</button></div>";
      }
    }
    h += "</section>";
    h += '<p class="kbd-hints no-print"><kbd>Space</kbd> reveal · <kbd>G</kbd> got it · <kbd>M</kbd> missed · <kbd>A</kbd>–<kbd>D</kbd> pick option · <kbd>N</kbd> next</p>';
    el.innerHTML = h;
    if (focus) {
      const target = el.querySelector("#fc-next, #fc-got, [data-dact='reveal'], .option:not([disabled])");
      if (target) target.focus({ preventScroll: true });
    }
  }
  function drillAction(act, arg) {
    const d = currentDrill();
    if (act === "reveal" && d) { drill.revealed = true; renderDrillStage(true); return; }
    if ((act === "got" || act === "missed") && d && drill.revealed) { record(d, act); advance(); return; }
    if (act === "pick" && d && drill.picked == null) {
      const n = list(d.options).length;
      if (arg < 0 || arg >= n) return;
      drill.picked = arg;
      record(d, arg === mcqCorrectIndex(d) ? "got" : "missed");
      renderDrillStage(true);
      return;
    }
    if (act === "next" && d && drill.picked != null) { advance(); return; }
    if (act === "redrill") {
      drill.deck = drill.deck.filter(function (id) { return drill.session[id] === "missed"; });
      drill.i = 0; drill.session = {}; drill.revealed = false; drill.picked = null;
      renderDrillStage(true); return;
    }
    if (act === "restart") { drill.i = 0; drill.session = {}; drill.revealed = false; drill.picked = null; renderDrillStage(true); }
  }
  function record(d, result) {
    drill.session[d.id] = result;
    const res = drillResults();
    res[d.id] = result;
    save("drills", res);
  }
  function advance() {
    drill.i++; drill.revealed = false; drill.picked = null;
    renderDrillStage(true);
  }

  /* ---------------- Cheat sheets ---------------- */
  function topDefinitions() {
    let picks = TERMS.filter(function (e) { return e.examined; });
    if (picks.length < 40) {
      const extra = TERMS.filter(function (e) { return !e.examined && e.topic && Number(e.topic.priority) === 3; });
      picks = picks.concat(extra.slice(0, 60 - picks.length));
    }
    return picks.sort(function (a, b) { return a.term.localeCompare(b.term, "en", { sensitivity: "base" }); }).slice(0, 90);
  }
  function viewCheat() {
    const acr = list(PLAN.acronyms).filter(function (a) { return a && a.short; })
      .slice().sort(function (a, b) { return String(a.short).localeCompare(String(b.short), "en", { sensitivity: "base" }); });
    const tips = list(PLAN.answerTips).filter(function (x) { return x && (x.verb || x.how); });
    const tech = TOPICS.filter(function (t) { return secKey(topicSection(t)) === "X"; });
    const cmpTopics = TOPICS.filter(function (t) { return list(t.compare).length; })
      .sort(function (a, b) { return sectionRank(topicSection(a)) - sectionRank(topicSection(b)) || (Number(b.priority) || 0) - (Number(a.priority) || 0); });
    const tops = topDefinitions();

    let h = '<div class="print-only"><strong>IEB IT Paper 2 (Theory) · cheat sheet</strong></div>';
    h += '<div class="page-head topic-header"><div><div class="eyebrow no-print">Quick reference</div><h1>Cheat sheets</h1>' +
      "<p>Acronyms, how marks are earned, every comparison table and the top definitions, on as few pages as possible. Print it or keep it open.</p></div>" +
      '<button type="button" class="btn no-print" id="print-btn">' + ICON.print + "Print</button></div>";
    h += missingNotice(["data/plan.js", "data/topics.js", "data/glossary.js"]);
    h += '<nav class="chips no-print" aria-label="Jump to" style="margin-bottom:8px">' +
      '<a class="chip" href="#cs-acr" data-jump="cs-acr">Acronyms</a><a class="chip" href="#cs-how" data-jump="cs-how">How to answer</a>' +
      '<a class="chip" href="#cs-cmp" data-jump="cs-cmp">Comparisons</a><a class="chip" href="#cs-def" data-jump="cs-def">Top definitions</a></nav>';

    // (a) Acronyms
    h += '<section class="section-block" id="cs-acr" aria-labelledby="cs-a-h"><div class="section-title"><h2 id="cs-a-h">Acronyms</h2><span class="badge badge-year">' + acr.length + "</span></div>";
    if (!acr.length) h += emptyHtml("No acronyms yet", " Comes from data/plan.js (acronyms).");
    else h += '<dl class="acr-list">' + acr.map(function (a) { return "<div><dt>" + esc(a.short) + "</dt><dd>" + esc(a.full || "") + "</dd></div>"; }).join("") + "</dl>";
    h += "</section>";

    // (b) How to answer
    h += '<section class="section-block" id="cs-how" aria-labelledby="cs-h-h"><div class="section-title"><h2 id="cs-h-h">How to answer</h2></div>';
    if (!tips.length && !tech.length) h += emptyHtml("No answer tips yet", " Comes from data/plan.js (answerTips).");
    if (tips.length) {
      h += '<div class="verb-grid">' + tips.map(function (x) {
        return '<article class="verb-card"><h3>' + esc(x.verb || "") + "</h3>" + richText(x.how || "") + "</article>";
      }).join("") + "</div>";
    }
    tech.forEach(function (t) {
      if (!list(t.points).length) return;
      h += '<article class="card cheat-item" style="margin-top:14px"><h3><a href="#/topics/' + enc(t.id) + '">' + esc(t.title) + "</a></h3>" +
        '<ul class="points">' + list(t.points).map(function (p) { return "<li>" + inline(p) + "</li>"; }).join("") + "</ul>" +
        (list(t.pitfalls).length ? '<p class="cheat-pit"><strong>Watch:</strong> ' + list(t.pitfalls).slice(0, 3).map(inline).join(" · ") + "</p>" : "") + "</article>";
    });
    h += "</section>";

    // (c) Comparison tables
    h += '<section class="section-block" id="cs-cmp" aria-labelledby="cs-c-h"><div class="section-title"><h2 id="cs-c-h">Comparison tables</h2></div>';
    if (!cmpTopics.length) h += emptyHtml("No comparison tables yet", " Collected from the compare tables in data/topics.js.");
    else {
      h += '<div class="cmp-grid cheat-cmp">';
      cmpTopics.forEach(function (t) {
        list(t.compare).forEach(function (c) {
          const tbl = compareTable(c);
          if (tbl) h += '<div class="cmp-item ' + secCls(secKey(topicSection(t))) + '">' + tbl + '<a class="cmp-src no-print" href="#/topics/' + enc(t.id) + '">' + secPill(topicSection(t), true) + esc(t.title) + "</a></div>";
        });
      });
      h += "</div>";
    }
    h += "</section>";

    // (d) Top definitions
    h += '<section class="section-block page-break" id="cs-def" aria-labelledby="cs-d-h"><div class="section-title"><h2 id="cs-d-h">Top definitions</h2><span class="badge badge-year">' + tops.length + "</span></div>";
    if (!tops.length) h += emptyHtml("No definitions yet", " Comes from data/glossary.js (terms examined before, else priority topics).");
    else {
      h += '<p class="muted small no-print">' + (tops.some(function (e) { return e.examined; }) ? "Terms examined in past Q1s first; topped up from high-priority topics." : "From high-priority topics.") + "</p>" +
        '<dl class="top-defs">' + tops.map(function (e) {
          return '<div class="' + secCls(e.sec) + '"><dt>' + esc(e.term) + (e.examined ? '<span class="td-y">' + esc(e.years.join(", ")) + "</span>" : "") + "</dt><dd>" + inline(e.def) + "</dd></div>";
        }).join("") + "</dl>";
    }
    h += "</section>";
    return {
      html: h,
      title: "Cheat sheets",
      after: function () {
        const pb = document.getElementById("print-btn");
        pb.addEventListener("click", function () { window.print(); });
      }
    };
  }

  /* ---------------- Exam day ---------------- */
  function viewExam() {
    const items = list(PLAN.checklist);
    const done = loadSet("check");
    const resources = list(PLAN.resources);
    const technique = TOPICS.filter(function (t) { return secKey(topicSection(t)) === "X"; });
    const tips = list(PLAN.answerTips).filter(function (x) { return x && x.verb; });
    let h = '<div class="page-head"><div class="eyebrow">Tomorrow</div><h1>Exam day</h1><p>' + esc(examLabel()) + ". Tick these off before you leave.</p></div>";
    h += missingNotice(["data/plan.js"]);
    if (PLAN.examNote) h += '<div class="callout" style="margin-bottom:18px"><strong>Remember:</strong> ' + inline(PLAN.examNote) + "</div>";
    h += '<div class="grid-2">';
    h += '<section class="card" aria-labelledby="cl-h"><div class="card-head"><h2 id="cl-h">Checklist</h2><span class="muted tiny mono" id="cl-count">' +
      items.filter(function (x, i) { return done.has(i + "|" + x); }).length + "/" + items.length + "</span></div>";
    if (!items.length) h += emptyHtml("No checklist yet", " Comes from data/plan.js.");
    else {
      h += '<ul class="checklist">' + items.map(function (x, i) {
        const k = i + "|" + x;
        return '<li><label class="check"><input type="checkbox" data-check="' + esc(k) + '"' + (done.has(k) ? " checked" : "") + '><span class="check-body"><span class="check-text">' + esc(x) + "</span></span></label></li>";
      }).join("") + "</ul>" +
        '<div class="btn-row" style="margin-top:10px"><button type="button" class="btn btn-sm btn-ghost" id="cl-reset">Untick all</button></div>';
    }
    h += "</section>";

    h += '<div class="stack">';
    if (tips.length) {
      h += '<section class="card" aria-labelledby="verbs-h"><div class="card-head"><h2 id="verbs-h">Command verbs</h2><a class="card-link" href="#/cheat">Full sheet →</a></div><div class="chips">' +
        tips.map(function (x) { return '<span class="tag">' + esc(x.verb) + "</span>"; }).join("") +
        '</div><p class="muted small" style="margin:10px 0 0">Marks = distinct points. Use the scenario\'s names and context, not textbook generalities.</p></section>';
    }
    if (technique.length) {
      h += '<section class="card" aria-labelledby="tech-h"><h2 id="tech-h">Exam technique</h2><ul class="topic-mini">' + technique.map(function (t) {
        return '<li><a href="#/topics/' + enc(t.id) + '"><span class="tm-title">' + esc(t.title) + '</span><span class="muted" aria-hidden="true">→</span></a></li>';
      }).join("") + "</ul></section>";
    }
    h += '<section class="card" aria-labelledby="res-h"><h2 id="res-h">Resources</h2>';
    if (!resources.length) h += '<p class="muted">No resources listed.</p>';
    else {
      h += '<ul class="resource-list">' + resources.map(function (r) {
        const u = safeUrl(r.url);
        const inner = "<strong>" + esc(r.title || r.url) + "</strong>" + (r.why ? "<span>" + esc(r.why) + "</span>" : "") + (u ? '<span class="url">' + esc(u.replace(/^https?:\/\//, "")) + "</span>" : "");
        return "<li>" + (u ? '<a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">' + inner + "</a>" : '<div class="resource-static">' + inner + "</div>") + "</li>";
      }).join("") + "</ul>";
    }
    h += "</section></div></div>";
    return {
      html: h,
      title: "Exam day",
      after: function (view) {
        const r = document.getElementById("cl-reset");
        if (r) r.addEventListener("click", function () {
          save("check", []);
          view.querySelectorAll("input[data-check]").forEach(function (i) { i.checked = false; });
          updateChecklistCount();
        });
      }
    };
  }
  function updateChecklistCount() {
    const el = document.getElementById("cl-count");
    if (!el) return;
    const boxes = document.querySelectorAll("input[data-check]");
    el.textContent = Array.from(boxes).filter(function (b) { return b.checked; }).length + "/" + boxes.length;
  }

  function notFound(msg, href, label) {
    return { html: '<div class="page-head"><h1>Not found</h1><p>' + esc(msg) + '</p></div><a class="btn" href="' + href + '">' + ICON.back + esc(label) + "</a>", title: "Not found" };
  }

  /* ======================================================================
     ROUTER
     ====================================================================== */
  function parseHash() {
    const raw = (location.hash || "").replace(/^#\/?/, "");
    const qi = raw.indexOf("?");
    const path = (qi >= 0 ? raw.slice(0, qi) : raw).split("/").filter(Boolean).map(function (s) {
      try { return decodeURIComponent(s); } catch (e) { return s; }
    });
    const params = {};
    if (qi >= 0) {
      raw.slice(qi + 1).split("&").forEach(function (kv) {
        if (!kv) return;
        const i = kv.indexOf("=");
        const k = i >= 0 ? kv.slice(0, i) : kv;
        let v = i >= 0 ? kv.slice(i + 1) : "1";
        try { v = decodeURIComponent(v.replace(/\+/g, " ")); } catch (e) { /* keep raw */ }
        params[k] = v;
      });
    }
    return { path: path, params: params };
  }
  let firstRender = true;
  let lastRouteKey = "";
  function route() {
    const r = parseHash();
    const p = r.path;
    // In-page anchor links (e.g. "#sec-1") are not routes: handled by the jump handler.
    const nonRoute = (location.hash || "").length > 1 && location.hash.charAt(1) !== "/";
    if (nonRoute && !firstRender) return;
    let nav = "home", out;
    const head = nonRoute ? "" : (p[0] || "");
    try {
      if (!head) out = viewHome();
      else if (head === "topics" && p[1]) { nav = "topics"; out = viewTopic(p[1]); }
      else if (head === "topics") { nav = "topics"; out = viewTopics(); }
      else if (head === "definitions" && p[1] === "drill") { nav = "definitions"; out = viewDefDrill(r.params); }
      else if (head === "definitions") { nav = "definitions"; out = viewDefinitions(r.params); }
      else if (head === "papers" && p[1]) { nav = "papers"; out = viewPaper(p[1], r.params); }
      else if (head === "papers") { nav = "papers"; out = viewPapers(); }
      else if (head === "heatmap") { nav = "papers"; out = viewHeatmap(); }
      else if (head === "drills") { nav = "drills"; out = viewDrills(r.params); }
      else if (head === "cheat" || head === "cheatsheets" || head === "cheatsheet") { nav = "cheat"; out = viewCheat(); }
      else if (head === "exam") { nav = "exam"; out = viewExam(); }
      else out = notFound("There's no page at that address.", "#/", "Home");
    } catch (err) {
      console.error(err);
      out = { html: '<div class="page-head"><h1>Something went wrong</h1><p>This view hit an error, probably from unexpected data. Other pages should still work.</p></div><a class="btn" href="#/">Home</a>' };
    }

    const view = document.getElementById("view");
    view.innerHTML = out.html;
    const key = p.join("/");
    if (key !== lastRouteKey) {
      view.classList.remove("view-in");
      void view.offsetWidth; // restart the enter animation
      view.classList.add("view-in");
    }
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === nav) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    const titles = { topics: "Topics", definitions: "Definitions", papers: "Past papers", drills: "Drills", cheat: "Cheat sheets", exam: "Exam day" };
    document.title = out.title ? out.title + " · " + BASE_TITLE : nav === "home" ? BASE_TITLE : (titles[nav] || "") + " · " + BASE_TITLE;

    let handledScroll = false;
    if (out.after) {
      try { handledScroll = out.after(view) === true; } catch (err) { console.error(err); }
    }
    if (!handledScroll && key !== lastRouteKey) window.scrollTo(0, 0);
    if (!firstRender && key !== lastRouteKey) {
      const main = document.getElementById("main");
      main.focus({ preventScroll: true });
    }
    lastRouteKey = key;
    firstRender = false;
    tick();
  }

  /* ======================================================================
     GLOBAL SEARCH
     ====================================================================== */
  let searchIndex = null;
  function buildSearchIndex() {
    const idx = [];
    TOPICS.forEach(function (t) {
      idx.push({
        kind: "Topic", title: t.title || t.id, sub: (t.section ? t.section + " · " : "") + (t.summary || ""), href: "#/topics/" + enc(t.id),
        hay: norm([t.title, t.id, t.section, t.summary].concat(list(t.points), list(t.pitfalls), list(t.years)).join(" ")), boost: Number(t.priority) || 0
      });
    });
    TERMS.forEach(function (e) {
      idx.push({
        kind: "Term", title: e.term, sub: e.def, href: "#/definitions?term=" + enc(e.id),
        hay: norm([e.term, e.def, e.topic ? e.topic.title : e.topicId].concat(e.years).join(" ")), boost: e.examined ? 2 : 0, titleBoost: 4
      });
    });
    QUESTIONS.forEach(function (x) {
      const tagNames = list(x.q.tags).map(function (tg) { const r = resolveTag(tg); return r ? r.title + " " + tg : tg; });
      idx.push({
        kind: "Q", title: paperShort(x.paper) + " · Q" + x.q.num + " (" + (x.q.marks || 0) + ")", sub: x.q.asked || "", href: qHref(x.paper, x.q),
        hay: norm([x.paper.year, x.paper.session, x.paper.scenario, x.section.name, "q" + x.q.num, x.q.num, x.q.asked, x.q.answer].concat(tagNames).join(" ")), boost: 0
      });
    });
    DRILLS.forEach(function (d) {
      const t = topicById.get(d.topic);
      idx.push({
        kind: "Drill", title: firstLine(d.prompt), sub: (TYPE_LABEL[d.type] || d.type || "") + (t ? " · " + t.title : ""), href: "#/drills?d=" + enc(d.id),
        hay: norm([d.prompt, d.answer, d.explain, d.type, d.topic, t && t.title].concat(list(d.options)).join(" ")), boost: 0
      });
    });
    return idx;
  }
  function highlight(text, terms) {
    let out = esc(text);
    terms.forEach(function (t) {
      const et = esc(t).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!et) return;
      out = out.replace(new RegExp("(" + et + ")(?![^<]*>)", "gi"), "<mark>$1</mark>");
    });
    return out;
  }
  let searchActive = -1;
  function runSearch(q) {
    const box = document.getElementById("search-results");
    const input = document.getElementById("search-input");
    if (!searchIndex) searchIndex = buildSearchIndex();
    const terms = norm(q).split(/\s+/).filter(Boolean);
    searchActive = -1;
    input.removeAttribute("aria-activedescendant");
    if (!terms.length) {
      box.innerHTML = '<div class="search-empty">Type to search ' + plural(TOPICS.length, "topic") + ", " + plural(TERMS.length, "definition") + ", " + plural(QUESTIONS.length, "question") + " and " + plural(DRILLS.length, "drill") + ".</div>";
      input.setAttribute("aria-expanded", "false");
      return;
    }
    const scored = [];
    searchIndex.forEach(function (e) {
      if (!terms.every(function (t) { return e.hay.indexOf(t) >= 0; })) return;
      const tl = norm(e.title);
      let s = e.boost;
      terms.forEach(function (t) { if (tl.indexOf(t) >= 0) s += 5 + (e.titleBoost || 0); if (tl.indexOf(t) === 0) s += 3; });
      if (tl === norm(q)) s += 10;
      scored.push({ e: e, s: s });
    });
    scored.sort(function (a, b) { return b.s - a.s; });
    const best = {};
    scored.forEach(function (x) { if (!(x.e.kind in best)) best[x.e.kind] = x.s; });
    const groups = [["Topic", "Topics", 5], ["Term", "Definitions", 6], ["Q", "Past-paper questions", 8], ["Drill", "Drills", 5]]
      .map(function (g, i) { return { g: g, i: i }; })
      .sort(function (a, b) { return (best[b.g[0]] || 0) - (best[a.g[0]] || 0) || a.i - b.i; })
      .map(function (x) { return x.g; });
    let h = "", n = 0;
    groups.forEach(function (g) {
      const items = scored.filter(function (x) { return x.e.kind === g[0]; }).slice(0, g[2]);
      if (!items.length) return;
      h += '<div class="sr-group" role="presentation">' + g[1] + "</div>";
      items.forEach(function (x) {
        h += '<a class="sr-item" role="option" id="sr-' + n + '" aria-selected="false" href="' + x.e.href + '" tabindex="-1">' +
          '<span class="sr-kind kind-' + x.e.kind.toLowerCase() + '">' + (x.e.kind === "Q" ? "Paper" : x.e.kind) + '</span><span class="sr-main"><span class="sr-title">' + highlight(x.e.title, terms) +
          '</span><span class="sr-sub">' + highlight(x.e.sub, terms) + "</span></span></a>";
        n++;
      });
    });
    box.innerHTML = n ? h : '<div class="search-empty">No results for “' + esc(q) + "”.</div>";
    input.setAttribute("aria-expanded", n ? "true" : "false");
    if (n) setActive(0);
  }
  function setActive(i) {
    const items = document.querySelectorAll("#search-results .sr-item");
    if (!items.length) return;
    searchActive = (i + items.length) % items.length;
    items.forEach(function (el, k) { el.setAttribute("aria-selected", String(k === searchActive)); });
    const cur = items[searchActive];
    document.getElementById("search-input").setAttribute("aria-activedescendant", cur.id);
    cur.scrollIntoView({ block: "nearest" });
  }
  function openSearch() {
    const dlg = document.getElementById("search-dialog");
    const input = document.getElementById("search-input");
    if (dlg.open) { input.focus(); return; }
    try { dlg.showModal(); } catch (e) { dlg.setAttribute("open", ""); }
    runSearch(input.value);
    input.focus();
    input.select();
  }
  function closeSearch() {
    const dlg = document.getElementById("search-dialog");
    if (!dlg.open) return;
    try { dlg.close(); } catch (e) { dlg.removeAttribute("open"); }
  }

  /* ======================================================================
     THEME
     ====================================================================== */
  function effectiveTheme() {
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function syncThemeButton() {
    const b = document.getElementById("theme-toggle");
    if (b) b.setAttribute("aria-label", effectiveTheme() === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
  function toggleTheme() {
    const next = effectiveTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { window.localStorage.setItem("p2:theme", next); } catch (e) { /* ignore */ }
    syncThemeButton();
  }

  /* ======================================================================
     EVENTS
     ====================================================================== */
  function isTyping(el) {
    if (!el) return false;
    const tag = el.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
  }
  function init() {
    try { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; } catch (e) { /* ignore */ }
    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
    syncThemeButton();
    if (window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", syncThemeButton);
    }

    // Search dialog
    const input = document.getElementById("search-input");
    const dlg = document.getElementById("search-dialog");
    document.getElementById("search-open").addEventListener("click", openSearch);
    document.getElementById("search-close").addEventListener("click", closeSearch);
    input.addEventListener("input", function () { runSearch(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(searchActive + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(searchActive - 1); }
      else if (e.key === "Enter") {
        e.preventDefault();
        const items = document.querySelectorAll("#search-results .sr-item");
        const cur = items[searchActive >= 0 ? searchActive : 0];
        if (cur) { closeSearch(); goTo(cur.getAttribute("href")); }
      }
    });
    document.getElementById("search-results").addEventListener("click", function (e) {
      const a = e.target.closest(".sr-item");
      if (!a) return;
      e.preventDefault();
      closeSearch();
      goTo(a.getAttribute("href"));
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) closeSearch(); }); // backdrop click

    // Delegated clicks inside the view
    const view = document.getElementById("view");
    view.addEventListener("click", function (e) {
      const rb = e.target.closest("[data-reveal]");
      if (rb) { setReveal(rb, rb.getAttribute("aria-expanded") !== "true"); return; }
      const tf = e.target.closest("[data-tf]");
      if (tf) {
        topicFilter[tf.getAttribute("data-tf")] = tf.getAttribute("data-val");
        view.querySelectorAll('[data-tf="' + tf.getAttribute("data-tf") + '"]').forEach(function (b) { b.setAttribute("aria-pressed", String(b === tf)); });
        renderTopicResults();
        return;
      }
      const gf = e.target.closest("[data-gf]");
      if (gf) {
        gl[gf.getAttribute("data-gf")] = gf.getAttribute("data-val");
        view.querySelectorAll('[data-gf="' + gf.getAttribute("data-gf") + '"]').forEach(function (b) { b.setAttribute("aria-pressed", String(b === gf)); });
        renderGlossList();
        return;
      }
      const gc = e.target.closest("[data-gcover]");
      if (gc) { gl.cover = !gl.cover; gc.setAttribute("aria-pressed", String(gl.cover)); renderGlossList(); return; }
      const pk = e.target.closest("[data-peek]");
      if (pk && !e.target.closest("a")) { pk.classList.toggle("peek"); return; }
      const ddf = e.target.closest("[data-ddf]");
      if (ddf) { dd[ddf.getAttribute("data-ddf")] = ddf.getAttribute("data-val"); buildDefDeck(); renderDefStage(false); return; }
      const dda = e.target.closest("[data-ddact]");
      if (dda) { defAction(dda.getAttribute("data-ddact")); return; }
      const hc = e.target.closest("[data-heat]");
      if (hc) { heatFilter.scope = hc.getAttribute("data-heat"); route(); const again = view.querySelector('[data-heat="' + heatFilter.scope + '"]'); if (again) again.focus(); return; }
      const mc = e.target.closest("[data-metric]");
      if (mc) { heatFilter.metric = mc.getAttribute("data-metric"); route(); const again = view.querySelector('[data-metric="' + heatFilter.metric + '"]'); if (again) again.focus(); return; }
      const cc = e.target.closest("[data-hcols]");
      if (cc) { heatFilter.cols = cc.getAttribute("data-hcols"); route(); const again = view.querySelector('[data-hcols="' + heatFilter.cols + '"]'); if (again) again.focus(); return; }
      const df = e.target.closest("[data-df]");
      if (df) { drill[df.getAttribute("data-df")] = df.getAttribute("data-val"); buildDeck(); renderDrillStage(false); return; }
      const opt = e.target.closest("[data-opt]");
      if (opt) { drillAction("pick", Number(opt.getAttribute("data-opt"))); return; }
      const da = e.target.closest("[data-dact]");
      if (da) { drillAction(da.getAttribute("data-dact")); return; }
      const jump = e.target.closest("[data-jump]");
      if (jump) {
        e.preventDefault();
        const target = document.getElementById(jump.getAttribute("data-jump"));
        if (target) { target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" }); }
      }
    });
    view.addEventListener("submit", function (e) {
      if (e.target.matches("[data-defform]")) { e.preventDefault(); defAction("reveal"); }
    });
    view.addEventListener("keydown", function (e) {
      const pk = e.target.closest && e.target.closest("[data-peek]");
      if (pk && (e.key === "Enter" || e.key === " ") && e.target === pk) { e.preventDefault(); pk.classList.toggle("peek"); }
    });
    view.addEventListener("change", function (e) {
      const t = e.target;
      if (t.matches("input[data-plan]")) {
        const set = loadSet("plan");
        if (t.checked) set.add(t.getAttribute("data-plan")); else set.delete(t.getAttribute("data-plan"));
        saveSet("plan", set);
        const li = t.closest("li");
        if (li) li.classList.toggle("done", t.checked);
        const boxes = view.querySelectorAll("input[data-plan]");
        const c = document.getElementById("plan-count");
        if (c) c.textContent = Array.from(boxes).filter(function (b) { return b.checked; }).length + "/" + boxes.length + " done";
        refreshProgress();
      } else if (t.matches("input[data-check]")) {
        const set = loadSet("check");
        if (t.checked) set.add(t.getAttribute("data-check")); else set.delete(t.getAttribute("data-check"));
        saveSet("check", set);
        updateChecklistCount();
      }
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", function (e) {
      if (e.defaultPrevented) return;
      const typing = isTyping(document.activeElement);
      if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K"))) {
        e.preventDefault();
        openSearch();
        return;
      }
      if (typing || e.ctrlKey || e.metaKey || e.altKey || dlg.open) return;
      const k = e.key.toLowerCase();
      const ae = document.activeElement;
      const onControl = ae && (ae.tagName === "BUTTON" || ae.tagName === "A");
      if (document.getElementById("def-stage")) {
        if ((k === " " || k === "enter") && !onControl && !dd.revealed) { e.preventDefault(); defAction("reveal"); }
        else if (k === "g") defAction("got");
        else if (k === "m") defAction("missed");
        return;
      }
      if (!document.getElementById("drill-stage")) return;
      if (k === " " && !onControl) { e.preventDefault(); drillAction("reveal"); }
      else if (k === "g") drillAction("got");
      else if (k === "m") drillAction("missed");
      else if (k === "n") drillAction("next");
      else if (/^[a-h]$/.test(k) && currentDrill() && currentDrill().type === "mcq") drillAction("pick", k.charCodeAt(0) - 97);
    });

    window.addEventListener("hashchange", route);
    route();
    setInterval(tick, 1000);
  }
  function goTo(href) {
    if (location.hash === href) route(); else location.hash = href;
  }
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
