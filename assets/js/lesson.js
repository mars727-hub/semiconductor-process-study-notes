const courseData = window.COURSE_DATA || { sessions: [] };
const sessionId = document.body.dataset.session;
const session = (courseData.sessions || []).find((item) => item.id === sessionId);
const $ = (selector) => document.querySelector(selector);

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function safeList(items) {
  return `<ul>${(items || []).map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function richList(items) {
  return `<ul>${(items || []).map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function renderHero() {
  $("#lessonHero").innerHTML = `
    <div class="lesson-title">
      <p class="eyebrow">${esc(session.id)}</p>
      <h1>${esc(session.title)}</h1>
      <p>${esc(session.subtitle)}</p>
      <p class="theme-line">${esc(session.theme)}</p>
    </div>
    <div class="lesson-stats">
      <div><strong>${session.sourcePageCount}</strong><span>逐頁整理</span></div>
      <div><strong>${(session.conceptBlocks || []).length}</strong><span>核心觀念</span></div>
      <div><strong>${(session.pages || []).filter((p) => p.confidence !== "講義核對整理").length}</strong><span>需確認頁</span></div>
      <div><strong>${(session.quiz || []).length}</strong><span>測驗題</span></div>
    </div>
  `;
}

function renderOverview() {
  $("#overview").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Overview</p>
      <h2>本堂學習地圖</h2>
    </div>
    <div class="text-panel">${safeList(session.overview)}</div>
  `;
}

function renderStudyMap() {
  $("#studyMap").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Study Path</p>
      <h2>考前速讀順序</h2>
    </div>
    <ol class="flow-list">
      ${(session.studyMap || []).map((step) => `<li>${esc(step)}</li>`).join("")}
    </ol>
  `;
}

function renderConcepts() {
  $("#concepts").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Concept Blocks</p>
      <h2>逐觀念完整整理</h2>
    </div>
    <div class="concept-grid">
      ${(session.conceptBlocks || []).map((item) => `
        <article class="concept-card">
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.body)}</p>
          <div class="review-note"><strong>複習檢核：</strong>${esc(item.review)}</div>
        </article>
      `).join("")}
    </div>
  `;
}

function diagramSvg(type) {
  const common = `viewBox="0 0 760 320" role="img" aria-label="自製半導體製程示意圖"`;
  const labels = {
    "wafer-flow": ["設計", "晶圓製造", "測試分類", "封裝", "最終測試"],
    "wafer-prep": ["多晶矽", "單晶晶棒", "切片", "拋光晶圓", "檢查"],
    "wet-clean": ["化學槽", "晶圓", "DI 沖洗", "乾燥", "再污染控制"],
    "cleanroom": ["HEPA", "層流", "晶圓", "回風", "微粒控制"],
    "gas-control": ["氣瓶", "MFC", "chamber", "pump", "exhaust"],
    "cmos-flow": ["well", "isolation", "gate", "S/D", "metal"],
  };
  if (labels[type]) {
    return `<svg ${common}>${labels[type].map((label, i) => {
      const x = 70 + i * 145;
      return `<g><rect x="${x}" y="120" width="112" height="62" rx="8" fill="#e7f6f3" stroke="#0f766e" stroke-width="2"/><text x="${x + 56}" y="156" text-anchor="middle" font-size="18" fill="#1f2937">${label}</text>${i < 4 ? `<path d="M${x + 114} 151 H${x + 142}" stroke="#b45309" stroke-width="4" marker-end="url(#arrow)"/>` : ""}</g>`;
    }).join("")}<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#b45309"/></marker></defs></svg>`;
  }
  if (type === "pn-band") {
    return `<svg ${common}><rect x="120" y="80" width="230" height="150" fill="#ffe4e6" stroke="#be123c" stroke-width="2"/><rect x="350" y="80" width="230" height="150" fill="#e8f0ff" stroke="#2563eb" stroke-width="2"/><text x="235" y="160" text-anchor="middle" font-size="24">P 型</text><text x="465" y="160" text-anchor="middle" font-size="24">N 型</text><rect x="330" y="65" width="40" height="180" fill="#fff0d2" stroke="#b45309" stroke-width="2"/><text x="350" y="270" text-anchor="middle" font-size="18">空乏區 / 接面</text></svg>`;
  }
  if (type === "mos-cross-section") {
    return `<svg ${common}><rect x="90" y="210" width="580" height="60" fill="#e7f6f3" stroke="#0f766e"/><rect x="180" y="170" width="120" height="40" fill="#e8f0ff"/><rect x="460" y="170" width="120" height="40" fill="#e8f0ff"/><rect x="315" y="150" width="130" height="18" fill="#fff0d2" stroke="#b45309"/><rect x="335" y="105" width="90" height="45" fill="#d8dee8" stroke="#1f2937"/><text x="240" y="196" text-anchor="middle">Source</text><text x="520" y="196" text-anchor="middle">Drain</text><text x="380" y="135" text-anchor="middle">Gate</text><text x="380" y="252" text-anchor="middle">Si substrate / channel</text></svg>`;
  }
  if (type === "oxidation") {
    return `<svg ${common}><rect x="110" y="185" width="540" height="70" fill="#e7f6f3" stroke="#0f766e"/><rect x="110" y="140" width="540" height="45" fill="#e8f0ff" stroke="#2563eb"/><text x="380" y="168" text-anchor="middle">SiO2 oxide</text><text x="380" y="229" text-anchor="middle">Silicon consumed at interface</text><path d="M380 70 V132" stroke="#b45309" stroke-width="5" marker-end="url(#arrowOx)"/><text x="380" y="55" text-anchor="middle">O2 / H2O diffusion</text><defs><marker id="arrowOx" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#b45309"/></marker></defs></svg>`;
  }
  if (type === "deposition") {
    return `<svg ${common}><rect x="120" y="220" width="520" height="42" fill="#e7f6f3" stroke="#0f766e"/><rect x="160" y="175" width="440" height="45" fill="#fff0d2" stroke="#b45309"/><text x="380" y="205" text-anchor="middle">deposited film</text><g fill="#2563eb">${[170,260,350,440,530].map((x) => `<circle cx="${x}" cy="90" r="12"/>`).join("")}</g><text x="380" y="60" text-anchor="middle">reactants / sputtered atoms arrive at wafer</text></svg>`;
  }
  if (type === "interconnect") {
    return `<svg ${common}><rect x="120" y="220" width="520" height="42" fill="#e7f6f3"/><rect x="160" y="160" width="440" height="60" fill="#f8fafc" stroke="#94a3b8"/><rect x="230" y="105" width="70" height="115" fill="#d1a054" stroke="#8a5a16"/><rect x="460" y="105" width="70" height="115" fill="#d1a054" stroke="#8a5a16"/><rect x="170" y="85" width="420" height="24" fill="#f6c453"/><text x="380" y="70" text-anchor="middle">metal line / via / barrier</text></svg>`;
  }
  if (type === "lithography" || type === "lithography-resolution" || type === "photo-defect") {
    return `<svg ${common}><rect x="120" y="230" width="520" height="38" fill="#e7f6f3" stroke="#0f766e"/><rect x="120" y="185" width="520" height="45" fill="#ffe4e6" stroke="#be123c"/><rect x="190" y="90" width="100" height="45" fill="#1f2937"/><rect x="470" y="90" width="100" height="45" fill="#1f2937"/><path d="M240 140 L210 180 M520 140 L550 180" stroke="#b45309" stroke-width="4"/><text x="380" y="65" text-anchor="middle">mask pattern projects into photoresist</text><text x="380" y="214" text-anchor="middle">photoresist</text></svg>`;
  }
  if (type === "etch-profile") {
    return `<svg ${common}><rect x="130" y="220" width="500" height="46" fill="#e7f6f3"/><rect x="130" y="150" width="500" height="70" fill="#e8f0ff"/><path d="M300 150 L330 220 H430 L460 150" fill="#f6f7f4" stroke="#be123c" stroke-width="3"/><text x="380" y="110" text-anchor="middle">anisotropic etch profile</text><text x="380" y="250" text-anchor="middle">substrate / stop layer</text></svg>`;
  }
  if (type === "implant-profile") {
    return `<svg ${common}><rect x="120" y="210" width="520" height="60" fill="#e7f6f3" stroke="#0f766e"/><path d="M380 60 V195" stroke="#2563eb" stroke-width="5" marker-end="url(#arrowI)"/><path d="M230 230 C300 160 460 160 530 230" fill="none" stroke="#be123c" stroke-width="5"/><text x="380" y="45" text-anchor="middle">implanted ions</text><text x="380" y="300" text-anchor="middle">dopant concentration profile</text><defs><marker id="arrowI" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#2563eb"/></marker></defs></svg>`;
  }
  if (type === "cmp") {
    return `<svg ${common}><rect x="120" y="90" width="520" height="45" fill="#d8dee8" stroke="#1f2937"/><rect x="150" y="155" width="460" height="34" fill="#fff0d2" stroke="#b45309"/><rect x="120" y="190" width="520" height="45" fill="#e7f6f3" stroke="#0f766e"/><text x="380" y="120" text-anchor="middle">pad pressure + relative velocity</text><text x="380" y="180" text-anchor="middle">slurry chemical/mechanical action</text><text x="380" y="220" text-anchor="middle">wafer surface planarization</text></svg>`;
  }
  return `<svg ${common}><rect x="120" y="110" width="520" height="110" rx="8" fill="#e7f6f3" stroke="#0f766e"/><text x="380" y="170" text-anchor="middle" font-size="24">process concept diagram</text></svg>`;
}

function renderDiagram() {
  const diagram = session.diagram;
  if (!diagram) {
    $("#diagramBlock").innerHTML = "";
    return;
  }
  $("#diagramBlock").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Figures & Tables</p>
      <h2>${esc(diagram.title)}</h2>
    </div>
    <div class="diagram-card">
      ${diagramSvg(diagram.type)}
      <p>${esc(diagram.caption)}</p>
    </div>
  `;
}

function renderTerminology() {
  $("#terminology").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Terminology</p>
      <h2>中英文術語表</h2>
    </div>
    <div class="term-grid">
      ${(session.terminology || []).map((term) => `
        <article class="term-card">
          <h3>${esc(term.zh)}</h3>
          <p class="term-en">${esc(term.en)}</p>
          <p>${esc(term.desc)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderFlow() {
  $("#processFlow").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Process Flow</p>
      <h2>製程流程背誦版</h2>
    </div>
    <ol class="flow-list">
      ${(session.processFlow || []).map((step) => `<li>${esc(step)}</li>`).join("")}
    </ol>
  `;
}

function renderFormulas() {
  const formulas = session.formulas || [];
  $("#formulaBlock").innerHTML = formulas.length ? `
    <div class="section-heading">
      <p class="eyebrow">Formulas</p>
      <h2>公式與使用時機</h2>
    </div>
    <div class="formula-grid">
      ${formulas.map((item) => `
        <article class="formula-box">
          <div class="formula-latex">${item.latex}</div>
          <p>${esc(item.use)}</p>
        </article>
      `).join("")}
    </div>
  ` : "";
}

function renderEmphasis() {
  const items = session.emphasis || [];
  $("#emphasis").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Instructor Emphasis</p>
      <h2>老師強調、必考與星號重點</h2>
    </div>
    ${items.length ? `
      <div class="emphasis-list">
        ${items.map((item) => `
          <article class="emphasis-card">
            <span class="label hot">${esc(item.label)}</span>
            <span class="label muted">${esc(item.confidence)}</span>
            <p>${esc(item.text)}</p>
          </article>
        `).join("")}
      </div>
    ` : `<div class="status status-warn">本分堂未找到可靠的必考、星號或很重要轉錄線索；若課堂另有口頭補充，建議人工補註。</div>`}
  `;
}

function renderVerification() {
  const items = session.verification || [];
  $("#verification").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Verification Notes</p>
      <h2>驗證、資料衝突與待確認</h2>
    </div>
    ${items.length ? `<div class="verify-list">${safeList(items)}</div>` : `<div class="status status-ok">目前沒有特別標示的資料衝突；仍建議考前回看老師補充。</div>`}
  `;
}

function pageMatches(page, query) {
  const haystack = [
    page.page,
    page.title,
    page.learningGoal,
    ...(page.coreConcepts || []),
    ...(page.definitions || []),
    ...(page.processSteps || []),
    ...(page.figureNotes || []),
    ...(page.examFocus || []),
    ...(page.commonMistakes || []),
    page.selfCheck,
  ].join(" ").toLowerCase();
  return !query || haystack.includes(query);
}

function renderPageCards() {
  const query = ($("#pageSearch")?.value || "").trim().toLowerCase();
  const uncertainOnly = $("#uncertainOnly")?.checked || false;
  const examOnly = $("#examOnly")?.checked || false;
  const pages = (session.pages || []).filter((page) => {
    const queryOk = pageMatches(page, query);
    const uncertainOk = !uncertainOnly || page.confidence !== "講義核對整理";
    const examOk = !examOnly || (page.examFocus || []).length > 0;
    return queryOk && uncertainOk && examOk;
  });

  $("#pageGuide").innerHTML = pages.map((page) => `
    <article class="page-card">
      <div class="card-topline">
        <span class="session-id">p.${page.page}</span>
        <span class="pill ${page.confidence !== "講義核對整理" ? "warn" : ""}">${esc(page.confidence)}</span>
      </div>
      <h3>${esc(page.title)}</h3>
      <p class="learning-goal">${esc(page.learningGoal)}</p>
      <div class="page-block">
        <h4>核心觀念</h4>
        ${safeList(page.coreConcepts)}
      </div>
      <div class="page-block">
        <h4>定義與術語</h4>
        ${safeList(page.definitions)}
      </div>
      <div class="page-block">
        <h4>流程位置</h4>
        ${safeList(page.processSteps)}
      </div>
      <div class="page-block">
        <h4>圖表/照片讀法</h4>
        ${safeList(page.figureNotes)}
      </div>
      <div class="page-block exam-block">
        <h4>常考提醒</h4>
        ${safeList(page.examFocus)}
      </div>
      <div class="page-block warning-block">
        <h4>易錯點</h4>
        ${safeList(page.commonMistakes)}
      </div>
      <div class="self-check">${esc(page.selfCheck)}</div>
      ${(page.verification || []).length ? `<div class="page-block warning-block"><h4>待確認</h4>${safeList(page.verification)}</div>` : ""}
    </article>
  `).join("") || `<div class="empty-state">此篩選條件沒有頁面。</div>`;
}

let cardIndex = 0;
let flipped = false;
const cards = (session?.terminology || []).map((term) => ({ front: `${term.zh} / ${term.en}`, back: term.desc }));

function renderFlashcards() {
  if (!cards.length) {
    $("#flashcards").innerHTML = "";
    return;
  }
  const card = cards[cardIndex];
  $("#flashcards").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Flashcards</p>
      <h2>本堂術語卡</h2>
    </div>
    <div class="flashcard-shell">
      <button class="icon-button" id="lessonPrev" type="button" aria-label="上一張">‹</button>
      <article class="flashcard" id="lessonCard" tabindex="0">
        <p class="eyebrow">${esc(session.id)}</p>
        <h3>${esc(flipped ? "解釋" : "術語")}</h3>
        <p>${esc(flipped ? card.back : card.front)}</p>
        <small>點擊或按 Enter 翻面</small>
      </article>
      <button class="icon-button" id="lessonNext" type="button" aria-label="下一張">›</button>
    </div>
    <p class="card-counter">${cardIndex + 1} / ${cards.length}</p>
  `;
  $("#lessonCard").addEventListener("click", () => { flipped = !flipped; renderFlashcards(); });
  $("#lessonCard").addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      flipped = !flipped;
      renderFlashcards();
    }
  });
  $("#lessonPrev").addEventListener("click", () => moveCard(-1));
  $("#lessonNext").addEventListener("click", () => moveCard(1));
}

function moveCard(delta) {
  cardIndex = (cardIndex + delta + cards.length) % cards.length;
  flipped = false;
  renderFlashcards();
}

function renderQuiz() {
  const quiz = session.quiz || [];
  $("#quiz").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Session Quiz</p>
      <h2>分堂互動測驗</h2>
    </div>
    <div class="quiz-shell">
      <div id="lessonQuizList">
        ${quiz.map((item, index) => `
          <article class="quiz-item" data-index="${index}">
            <h3>${index + 1}. ${esc(item.q)}</h3>
            <div class="options">
              ${item.options.map((option, optIndex) => `
                <label>
                  <input type="radio" name="lessonQ${index}" value="${optIndex}">
                  <span>${esc(option)}</span>
                </label>
              `).join("")}
            </div>
            <p class="explanation" hidden></p>
          </article>
        `).join("")}
      </div>
      <div class="quiz-actions">
        <button class="button" id="lessonSubmit" type="button">交卷計分</button>
        <button class="button ghost" id="lessonReset" type="button">重新作答</button>
      </div>
      <div class="score-panel" id="lessonScore" aria-live="polite"></div>
    </div>
  `;
  $("#lessonSubmit").addEventListener("click", submitQuiz);
  $("#lessonReset").addEventListener("click", resetQuiz);
}

function submitQuiz() {
  const quiz = session.quiz || [];
  let score = 0;
  quiz.forEach((item, index) => {
    const checked = document.querySelector(`input[name="lessonQ${index}"]:checked`);
    const chosen = checked ? Number(checked.value) : -1;
    const box = document.querySelector(`.quiz-item[data-index="${index}"]`);
    const explanation = box.querySelector(".explanation");
    const correct = chosen === item.answer;
    if (correct) score += 1;
    box.classList.toggle("correct", correct);
    box.classList.toggle("wrong", !correct);
    explanation.hidden = false;
    explanation.innerHTML = `正解：${esc(item.options[item.answer])}<br>${esc(item.exp)}`;
  });
  $("#lessonScore").innerHTML = `<strong>${score} / ${quiz.length}</strong><span>答對題數</span>`;
  window.MathJax?.typesetPromise?.();
}

function resetQuiz() {
  document.querySelectorAll(".quiz-item input").forEach((input) => { input.checked = false; });
  document.querySelectorAll(".quiz-item").forEach((item) => item.classList.remove("correct", "wrong"));
  document.querySelectorAll(".explanation").forEach((item) => { item.hidden = true; item.textContent = ""; });
  $("#lessonScore").textContent = "";
}

function bindFilters() {
  $("#pageSearch")?.addEventListener("input", renderPageCards);
  $("#uncertainOnly")?.addEventListener("change", renderPageCards);
  $("#examOnly")?.addEventListener("change", renderPageCards);
}

if (!session) {
  document.body.innerHTML = `<main class="content-section"><h1>找不到分堂資料</h1><p>請回首頁重新選擇課程。</p><a class="button" href="index.html">回首頁</a></main>`;
} else {
  renderHero();
  renderOverview();
  renderStudyMap();
  renderConcepts();
  renderDiagram();
  renderTerminology();
  renderFlow();
  renderFormulas();
  renderEmphasis();
  renderVerification();
  renderPageCards();
  renderFlashcards();
  renderQuiz();
  bindFilters();
  window.MathJax?.typesetPromise?.();
}
