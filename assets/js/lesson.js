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

function list(items) {
  return `<ul>${(items || []).map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function safeList(items) {
  return `<ul>${(items || []).map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function renderHero() {
  $("#lessonHero").innerHTML = `
    <div class="lesson-title">
      <p class="eyebrow">${esc(session.id)}</p>
      <h1>${esc(session.title)}</h1>
      <p>${esc(session.subtitle)}</p>
    </div>
    <div class="lesson-stats">
      <div><strong>${session.sourcePageCount}</strong><span>講義頁</span></div>
      <div><strong>${(session.pages || []).filter((p) => p.confidence.includes("需人工確認")).length}</strong><span>需確認頁</span></div>
      <div><strong>${(session.emphasis || []).length}</strong><span>強調線索</span></div>
    </div>
  `;
}

function renderOverview() {
  $("#overview").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Overview</p>
      <h2>章節總覽</h2>
    </div>
    <div class="text-panel">${safeList(session.overview)}</div>
  `;
}

function renderTerminology() {
  $("#terminology").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Terminology</p>
      <h2>核心術語</h2>
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
      <h2>製程流程速讀</h2>
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
      <h2>公式與關係式</h2>
    </div>
    <div class="formula-box">${list(formulas)}</div>
  ` : "";
}

function renderEmphasis() {
  const items = session.emphasis || [];
  $("#emphasis").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Instructor Emphasis</p>
      <h2>老師強調與星號重點</h2>
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
    ` : `<div class="status status-warn">本分堂未找到可靠的必考、星號或很重要轉錄線索；若老師口頭有補充，建議人工補註。</div>`}
  `;
}

function renderVerification() {
  const items = session.verification || [];
  $("#verification").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Verification Notes</p>
      <h2>驗證與待確認</h2>
    </div>
    ${items.length ? `<div class="verify-list">${safeList(items)}</div>` : `<div class="status status-ok">目前未偵測到需要特別標示的資料衝突。</div>`}
  `;
}

function renderPageCards() {
  const query = ($("#pageSearch")?.value || "").trim().toLowerCase();
  const uncertainOnly = $("#uncertainOnly")?.checked || false;
  const pages = (session.pages || []).filter((page) => {
    const haystack = `${page.page} ${page.title} ${(page.keypoints || []).join(" ")} ${(page.terms || []).map((t) => `${t.zh} ${t.en}`).join(" ")}`.toLowerCase();
    const queryOk = !query || haystack.includes(query);
    const uncertainOk = !uncertainOnly || page.confidence.includes("需人工確認");
    return queryOk && uncertainOk;
  });
  $("#pageGuide").innerHTML = pages.map((page) => `
    <article class="page-card">
      <div class="card-topline">
        <span class="session-id">p.${page.page}</span>
        <span class="pill ${page.confidence.includes("需人工確認") ? "warn" : ""}">${esc(page.confidence)}</span>
      </div>
      <h3>${esc(page.title)}</h3>
      <div class="page-block">
        <h4>核心概念</h4>
        ${safeList(page.keypoints)}
      </div>
      ${(page.terms || []).length ? `
        <div class="page-block">
          <h4>術語</h4>
          <div class="term-pills">${page.terms.map((term) => `<span>${esc(term.zh)}</span>`).join("")}</div>
        </div>
      ` : ""}
      ${(page.figures || []).length ? `
        <div class="page-block">
          <h4>圖表/照片說明</h4>
          ${safeList(page.figures)}
        </div>
      ` : ""}
      ${(page.numbers || []).length ? `
        <div class="page-block">
          <h4>數值線索</h4>
          <div class="term-pills">${page.numbers.map((num) => `<span>${esc(num)}</span>`).join("")}</div>
        </div>
      ` : ""}
      ${(page.verification || []).length ? `
        <div class="page-block warning-block">
          <h4>待確認</h4>
          ${safeList(page.verification)}
        </div>
      ` : ""}
    </article>
  `).join("") || `<div class="empty-state">此篩選條件沒有頁面。</div>`;
}

let cardIndex = 0;
let flipped = false;
const cards = (session.terminology || []).map((term) => ({
  front: `${term.zh} / ${term.en}`,
  back: term.desc,
}));

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
        <small>點擊卡片可翻面</small>
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

function buildQuiz() {
  const questions = [];
  const firstTerm = session.terminology?.[0];
  const secondTerm = session.terminology?.[1];
  if (firstTerm) {
    questions.push({
      q: `在 ${session.id} 中，「${firstTerm.zh}」最適合如何理解？`,
      options: [firstTerm.desc, "與本章無關的封裝外觀名稱", "只是一個檔案格式", "只代表量測單位"],
      answer: 0,
      exp: `${firstTerm.zh} 是本堂關鍵術語，應連回講義中的製程或元件脈絡。`,
    });
  }
  if (secondTerm) {
    questions.push({
      q: `哪一個英文術語對應「${secondTerm.zh}」？`,
      options: [secondTerm.en, firstTerm?.en || "CMOS", "unrelated", "layout only"],
      answer: 0,
      exp: `本題測中英文術語對應：${secondTerm.zh} / ${secondTerm.en}。`,
    });
  }
  const flowStep = session.processFlow?.[0];
  questions.push({
    q: `${session.id} 的流程複習起點較接近哪一項？`,
    options: [flowStep || "閱讀講義頁面", "直接跳到最終測試且省略前段製程", "只背公式不看流程", "不需要管材料與設備"],
    answer: 0,
    exp: "分堂流程區將本章內容整理成可掃讀的順序，應先掌握流程骨架。"
  });
  questions.push({
    q: "本頁出現「需人工確認」時，正確讀法是什麼？",
    options: ["代表來源線索不足，需要回看原講義或老師補充", "代表內容一定不考", "代表可以刪除不看", "代表網站已放入原始講義"],
    answer: 0,
    exp: "這是驗證標籤，用來避免把圖像頁、亂碼或低抽取文字推論成確定內容。"
  });
  return questions;
}

const quiz = buildQuiz();

function renderQuiz() {
  $("#quiz").innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Session Quiz</p>
      <h2>分堂小測驗</h2>
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
    explanation.textContent = `正解：${item.options[item.answer]}。${item.exp}`;
  });
  $("#lessonScore").innerHTML = `<strong>${score} / ${quiz.length}</strong><span>答對題數</span>`;
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
}

if (!session) {
  document.body.innerHTML = `<main class="content-section"><h1>找不到分堂資料</h1><p>請回首頁重新選擇課程。</p><a class="button" href="index.html">回首頁</a></main>`;
} else {
  renderHero();
  renderOverview();
  renderTerminology();
  renderFlow();
  renderFormulas();
  renderEmphasis();
  renderVerification();
  renderPageCards();
  renderFlashcards();
  renderQuiz();
  bindFilters();
  if (window.MathJax) MathJax.typesetPromise?.();
}
