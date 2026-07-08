const data = window.COURSE_DATA || { sessions: [], course: {} };
const sessions = data.sessions || [];
const $ = (selector) => document.querySelector(selector);

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderStats() {
  const pageCount = sessions.reduce((sum, item) => sum + item.sourcePageCount, 0);
  const emphasisCount = sessions.reduce((sum, item) => sum + (item.emphasis || []).length, 0);
  $("#stats").innerHTML = [
    ["17", "分堂頁面"],
    [String(pageCount), "逐頁整理"],
    [String(emphasisCount), "老師強調"],
    ["0", "原始教材公開"],
  ].map(([num, label]) => `<div class="stat"><strong>${esc(num)}</strong><span>${esc(label)}</span></div>`).join("");
}

function sessionTopics(session) {
  const text = `${session.id} ${session.title} ${session.subtitle} ${session.theme} ${(session.terminology || []).map((t) => `${t.zh} ${t.en}`).join(" ")}`;
  const topics = [];
  if (/微影|光阻|曝光|解析度|景深|stepper|overlay|CD/.test(text)) topics.push("微影");
  if (/蝕刻|RIE|plasma|電漿|selectivity/.test(text)) topics.push("蝕刻");
  if (/沉積|金屬|CVD|PVD|互連|薄膜|damascene/.test(text)) topics.push("沉積");
  if (/污染|清洗|潔淨|化學|DI|particle/.test(text)) topics.push("污染");
  if (/材料|元件|矽|PN|MOS|CMOS|摻雜/.test(text)) topics.push("材料");
  if (/CMP|平坦化|slurry|Preston/.test(text)) topics.push("CMP");
  return topics;
}

function renderMissing() {
  const missing = data.course?.missingSessions || [];
  $("#missingBanner").innerHTML = missing.map((item) => `
    <div class="status status-warn">
      <strong>${esc(item.id)} 缺件：</strong>${esc(item.note)}
    </div>
  `).join("");
}

function renderSessions() {
  const query = ($("#sessionSearch")?.value || "").trim().toLowerCase();
  const topic = $("#topicFilter")?.value || "all";
  const filtered = sessions.filter((session) => {
    const haystack = `${session.id} ${session.title} ${session.subtitle} ${session.theme} ${(session.terminology || []).map((t) => `${t.zh} ${t.en}`).join(" ")}`.toLowerCase();
    const queryOk = !query || haystack.includes(query);
    const topicOk = topic === "all" || sessionTopics(session).includes(topic);
    return queryOk && topicOk;
  });

  $("#sessionGrid").innerHTML = filtered.map((session) => {
    const terms = (session.terminology || []).slice(0, 5).map((term) => `<span>${esc(term.zh)}</span>`).join("");
    const verify = (session.verification || []).length;
    const emphasis = (session.emphasis || []).length;
    return `
      <article class="session-card">
        <div class="card-topline">
          <span class="session-id">${esc(session.id)}</span>
          <span class="pill">${session.sourcePageCount} 頁</span>
        </div>
        <h3>${esc(session.title)}</h3>
        <p>${esc(session.subtitle)}</p>
        <p class="theme-line">${esc(session.theme)}</p>
        <div class="term-pills">${terms}</div>
        <div class="mini-metrics">
          <span>${(session.conceptBlocks || []).length} 個核心觀念</span>
          <span>${emphasis} 個強調標籤</span>
          <span>${verify} 個驗證提示</span>
        </div>
        <a class="button small" href="${session.id.toLowerCase()}.html">進入逐頁複習</a>
      </article>
    `;
  }).join("") || `<div class="empty-state">找不到符合條件的分堂。</div>`;
}

const flashcards = sessions.flatMap((session) =>
  (session.terminology || []).slice(0, 3).map((term) => ({
    session: session.id,
    front: `${term.zh} / ${term.en}`,
    back: term.desc,
  }))
);
let cardIndex = 0;
let flipped = false;

function renderFlashcard() {
  if (!flashcards.length) return;
  const card = flashcards[cardIndex];
  $("#flashcard").innerHTML = `
    <p class="eyebrow">${esc(card.session)}</p>
    <h3>${esc(flipped ? "解釋" : "術語")}</h3>
    <p>${esc(flipped ? card.back : card.front)}</p>
    <small>點擊或按 Enter 翻面</small>
  `;
  $("#cardCounter").textContent = `${cardIndex + 1} / ${flashcards.length}`;
}

function moveCard(delta) {
  cardIndex = (cardIndex + delta + flashcards.length) % flashcards.length;
  flipped = false;
  renderFlashcard();
}

const quiz = sessions.slice(0, 8).flatMap((session) => (session.quiz || []).slice(0, 1));

function renderQuiz() {
  $("#quizList").innerHTML = quiz.map((item, index) => `
    <article class="quiz-item" data-index="${index}">
      <h3>${index + 1}. ${esc(item.q)}</h3>
      <div class="options">
        ${item.options.map((option, optIndex) => `
          <label>
            <input type="radio" name="q${index}" value="${optIndex}">
            <span>${esc(option)}</span>
          </label>
        `).join("")}
      </div>
      <p class="explanation" hidden></p>
    </article>
  `).join("");
}

function submitQuiz() {
  let score = 0;
  quiz.forEach((item, index) => {
    const checked = document.querySelector(`input[name="q${index}"]:checked`);
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
  $("#scorePanel").innerHTML = `<strong>${score} / ${quiz.length}</strong><span>答對題數</span>`;
  window.MathJax?.typesetPromise?.();
}

function resetQuiz() {
  document.querySelectorAll(".quiz-item input").forEach((input) => { input.checked = false; });
  document.querySelectorAll(".quiz-item").forEach((item) => item.classList.remove("correct", "wrong"));
  document.querySelectorAll(".explanation").forEach((item) => { item.hidden = true; item.textContent = ""; });
  $("#scorePanel").textContent = "";
}

function bind() {
  $("#sessionSearch")?.addEventListener("input", renderSessions);
  $("#topicFilter")?.addEventListener("change", renderSessions);
  $("#flashcard")?.addEventListener("click", () => { flipped = !flipped; renderFlashcard(); });
  $("#flashcard")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      flipped = !flipped;
      renderFlashcard();
    }
  });
  $("#prevCard")?.addEventListener("click", () => moveCard(-1));
  $("#nextCard")?.addEventListener("click", () => moveCard(1));
  $("#submitQuiz")?.addEventListener("click", submitQuiz);
  $("#resetQuiz")?.addEventListener("click", resetQuiz);
}

renderStats();
renderMissing();
renderSessions();
renderFlashcard();
renderQuiz();
bind();
