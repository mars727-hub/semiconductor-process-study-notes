# 半導體製程互動複習筆記

Live site: https://mars727-hub.github.io/semiconductor-process-study-notes/

Repository: https://github.com/mars727-hub/semiconductor-process-study-notes

## 專案目的

本專案將半導體製程課程資料整理成可公開瀏覽的靜態互動複習網站。網站以繁體中文呈現，依 SMT 分堂建立考前複習筆記，包含逐頁講義整理、核心術語、製程流程、公式、圖表說明、老師強調、待確認標籤、flashcards 與互動測驗。

## 頁面清單

- `index.html`：首頁、課程地圖、快速術語卡、總複習測驗、隱私與費用說明
- `smt-01.html`：課程導論與半導體產業
- `smt-02.html`：半導體材料基礎
- `smt-03.html`：半導體元件基礎
- `smt-04.html`：晶圓製備
- `smt-05.html`：化學品與濕式製程
- `smt-06.html`：污染控制與潔淨技術
- `smt-08.html`：氣體與真空控制
- `smt-09.html`：CMOS 製程整合
- `smt-10.html`：氧化製程
- `smt-11.html`：薄膜沉積
- `smt-12.html`：金屬化與互連
- `smt-13.html`：微影製程一
- `smt-14.html`：微影製程二
- `smt-15.html`：微影製程三
- `smt-16.html`：蝕刻製程
- `smt-17.html`：摻雜製程
- `smt-18.html`：CMP 平坦化

SMT-07 來源缺失，因此未建立分堂頁面，也未補寫未提供內容。

## 檔案結構

```text
.
├── index.html
├── smt-01.html
├── smt-02.html
├── ...
├── smt-18.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── app.js
│       ├── course-data.js
│       └── lesson.js
├── .gitignore
└── README.md
```

## 本機預覽

可直接用瀏覽器開啟 `index.html`。若要用本機伺服器預覽，可在此資料夾執行：

```bash
python -m http.server 8000
```

然後開啟：

```text
http://localhost:8000/
```

## 如何更新後續講義

1. 先在私人工作區處理新講義、錄音或影片，不要放入公開網站資料夾。
2. 只將整理後、可公開的學習筆記轉成 HTML/CSS/JS。
3. 若講義有「必考、會考、星號、很重要、注意」等提示，請放入老師強調區，不要混入一般段落。
4. 若來源互相衝突或文字抽取不足，請使用「待確認、資料衝突、需人工確認」標籤。
5. 發布前執行隱私掃描，通過後再 commit 與 push。

## 隱私範圍

公開網站不包含原始 PDF、影片、錄音、完整逐字稿、處理中間檔、私人筆記、本機路徑或憑證。公開內容僅限整理後的靜態網頁與互動程式。

## 免費託管

本網站使用 GitHub Pages 免費託管，不需要後端、資料庫、付費網域或付費託管服務。任何知道網址的人都可以瀏覽 public repository 發布的網站內容。

## 已知限制

- SMT-07 缺少來源資料。
- 部分頁面文字抽取偏短，網站已標示「需人工確認」。
- 老師強調內容以轉錄線索輔助判讀；疑似誤聽者不直接標成必考。
