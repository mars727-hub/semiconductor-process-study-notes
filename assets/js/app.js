const data = window.COURSE_DATA || { sessions: [], course: {} };
const sessions = data.sessions || [];

const $ = (selector) => document.querySelector(selector);

function html(strings, ...values) {
  return strings.reduce((out, part, index) => out + part + (values[index] ?? ""), "");
}

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
    [String(pageCount), "講義頁面"],
    [String(emphasisCount), "強調線索"],
    ["0", "原始教材公開"],
  ].map(([num, label]) => `<div class="stat"><strong>${esc(num)}</strong><span>${esc(label)}</span></div>`).join("");
}

function sessionTopics(session) {
  const text = `${session.title} ${session.subtitle} ${(session.terminology || []).map((t) => `${t.zh} ${t.en}`).join(" ")}`;
  const topics = [];
  if (/微影|光阻|曝光|解析度|景深/.test(text)) topics.push("微影");
  if (/蝕刻|RIE|plasma|電漿/.test(text)) topics.push("蝕刻");
  if (/沉積|金屬|CVD|PVD|互連|薄膜/.test(text)) topics.push("沉積");
  if (/污染|清洗|潔淨|化學|DI/.test(text)) topics.push("污染");
  if (/材料|元件|矽|PN|MOS|CMOS/.test(text)) topics.push("材料");
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
    const haystack = `${session.id} ${session.title} ${session.subtitle} ${(session.terminology || []).map((t) => `${t.zh} ${t.en}`).join(" ")}`.toLowerCase();
    const queryOk = !query || haystack.includes(query);
    const topicOk = topic === "all" || sessionTopics(session).includes(topic);
    return queryOk && topicOk;
  });
  $("#sessionGrid").innerHTML = filtered.map((session) => {
    const emphasis = (session.emphasis || []).length;
    const verify = (session.verification || []).length;
    const terms = (session.terminology || []).slice(0, 5).map((term) => `<span>${esc(term.zh)}</span>`).join("");
    return html`
      <article class="session-card">
        <div class="card-topline">
          <span class="session-id">${esc(session.id)}</span>
          <span class="pill">${session.sourcePageCount} 頁</span>
        </div>
        <h3>${esc(session.title)}</h3>
        <p>${esc(session.subtitle)}</p>
        <div class="term-pills">${terms}</div>
        <div class="mini-metrics">
          <span>${emphasis} 個強調線索</span>
          <span>${verify} 個待確認提示</span>
        </div>
        <a class="button small" href="${session.id.toLowerCase()}.html">進入逐頁整理</a>
      </article>
    `;
  }).join("") || `<div class="empty-state">找不到符合條件的分堂，請換一個關鍵字。</div>`;
}

const flashcards = sessions.flatMap((session) =>
  (session.terminology || []).slice(0, 2).map((term) => ({
    session: session.id,
    front: `${term.zh} / ${term.en}`,
    back: term.desc,
  }))
);
let cardIndex = 0;
let cardFlipped = false;

function renderFlashcard() {
  const card = flashcards[cardIndex];
  if (!card) return;
  $("#flashcard").innerHTML = `
    <p class="eyebrow">${esc(card.session)}</p>
    <h3>${esc(cardFlipped ? "解釋" : "術語")}</h3>
    <p>${esc(cardFlipped ? card.back : card.front)}</p>
    <small>點擊卡片可翻面</small>
  `;
  $("#cardCounter").textContent = `${cardIndex + 1} / ${flashcards.length}`;
}

function moveCard(delta) {
  cardIndex = (cardIndex + delta + flashcards.length) % flashcards.length;
  cardFlipped = false;
  renderFlashcard();
}

const quiz = [
  {
    q: "哪一個說法最符合 CMOS 製程整合的複習重點？",
    options: ["只要完成單一步驟即可形成完整 IC", "多個 mask、沉積、蝕刻、摻雜與平坦化流程反覆串接", "只與封裝測試有關", "主要是機械加工，與材料電性無關"],
    answer: 1,
    exp: "CMOS 製程整合的核心是多模組、多光罩、多次圖案轉移與材料處理的串接。"
  },
  {
    q: "微影解析度常用哪個關係式作為考前記憶骨架？",
    options: ["\\(MRR=kPV\\)", "\\(R=k_1\\lambda/NA\\)", "\\(x^2+Ax=B(t+\\tau)\\)", "\\(I=V/R\\)"],
    answer: 1,
    exp: "微影解析度與波長、數值孔徑相關，常寫成 \\(R=k_1\\lambda/NA\\)。"
  },
  {
    q: "CMP 的 Preston 關係式主要連結哪些量？",
    options: ["移除率、壓力與相對速度", "解析度、波長與 NA", "氧化厚度、時間與溫度", "載子濃度與能隙"],
    answer: 0,
    exp: "CMP 常用 \\(MRR=kPV\\) 表示移除率與壓力、相對速度的關係。"
  },
  {
    q: "乾蝕刻相較許多濕蝕刻，常被重視的能力是什麼？",
    options: ["完全不會造成缺陷", "較容易形成方向性與垂直側壁", "不需要任何氣體控制", "不會牽涉 plasma"],
    answer: 1,
    exp: "RIE 等乾蝕刻利用電漿與離子轟擊，可提升各向異性。"
  },
  {
    q: "網站中標示「需人工確認」通常代表什麼？",
    options: ["該頁一定錯誤", "該頁文字抽取偏短或來源線索不足，需要回看原講義", "該頁不重要", "該頁是已刪除內容"],
    answer: 1,
    exp: "這是驗證標籤，不是錯誤判決；它提醒該頁可能以圖片、表格或掃描內容為主。"
  },
  {
    q: "對老師強調內容的處理原則，下列何者正確？",
    options: ["任何出現『考慮』都標成必考", "只有可靠的必考、星號、重要、注意線索才用醒目標籤", "強調內容不進測驗", "全部當作普通段落"],
    answer: 1,
    exp: "為避免 ASR 誤聽，網站只把較可靠的強調語句標出，疑似者保留人工確認。"
  },
  {
    q: "DI water 在半導體製程複習中最常連到哪個主題？",
    options: ["清洗與污染控制", "光罩設計", "封裝外殼", "軟體編譯"],
    answer: 0,
    exp: "DI water 常用於清洗與沖洗，與離子污染控制高度相關。"
  },
  {
    q: "為什麼本網站不放原始 PDF 或課程影片？",
    options: ["靜態網頁不能連結任何頁面", "保護來源教材與個人資料，只發布整理後筆記", "GitHub Pages 不能顯示中文", "MathJax 不支援公式"],
    answer: 1,
    exp: "發布範圍只限公開安全的整理後 HTML/CSS/JS。"
  }
];

function renderQuiz() {
  $("#quizList").innerHTML = quiz.map((item, index) => `
    <article class="quiz-item" data-index="${index}">
      <h3>${index + 1}. ${item.q}</h3>
      <div class="options">
        ${item.options.map((option, optIndex) => `
          <label>
            <input type="radio" name="q${index}" value="${optIndex}">
            <span>${option}</span>
          </label>
        `).join("")}
      </div>
      <p class="explanation" hidden></p>
    </article>
  `).join("");
  if (window.MathJax) MathJax.typesetPromise?.();
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
    explanation.innerHTML = `正解：${item.options[item.answer]}<br>${item.exp}`;
  });
  $("#scorePanel").innerHTML = `<strong>${score} / ${quiz.length}</strong><span>答對題數</span>`;
  if (window.MathJax) MathJax.typesetPromise?.();
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
  $("#flashcard")?.addEventListener("click", () => { cardFlipped = !cardFlipped; renderFlashcard(); });
  $("#flashcard")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cardFlipped = !cardFlipped;
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
