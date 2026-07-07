# 半導體製程互動複習網站

這是一個將半導體製程課程整理為靜態互動複習網站的 GitHub Pages 專案。網站依課程順序整理 SMT-01 到 SMT-18 的講義與錄影重點，提供章節摘要、術語、製程流程、老師強調、flashcards 與互動測驗。

Live site:

https://mars727-hub.github.io/semiconductor-process-study-notes/

Repository:

https://github.com/mars727-hub/semiconductor-process-study-notes

## Project Purpose

- 幫助快速複習 semiconductor manufacturing process 課程。
- 依 SMT-01、SMT-02、SMT-03 等錄影順序建立學習筆記。
- 保留老師強調與星號相關內容，並把不確定的語音辨識結果標示為需人工確認。
- 使用純靜態 HTML、CSS、JavaScript，在 GitHub Pages 上免費部署。

## Course Page List

目前網站採單頁互動儀表板形式，首頁內含下列課程區塊：

- SMT-01 Introduction
- SMT-02 Materials
- SMT-03 Devices
- SMT-04 Wafer Prep
- SMT-05 Chemicals
- SMT-06 Contamination
- SMT-08 Gas Controls
- SMT-09 Process Flow
- SMT-10 Oxidation
- SMT-11 Deposition
- SMT-12 Metallization
- SMT-13 Photo-1
- SMT-14 Photo-2
- SMT-15 Photo-3
- SMT-16 Etch
- SMT-17 Doping
- SMT-18 CMP

SMT-07 was not found in the available course materials and is marked as missing.

## File Structure

```text
.
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── .gitignore
└── README.md
```

## Local Preview

Open `index.html` directly in a browser, or serve the folder with any simple static server.

Example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Updating Future Lecture Materials

1. Review the new lecture recording and handout privately.
2. Extract only summary-level concepts, terminology, process flows, and teacher emphasis.
3. Add or update the relevant session data in `assets/js/app.js`.
4. Do not place raw recordings, PDFs, full transcripts, or processing outputs in this repository.
5. Run the privacy scan before committing.
6. Commit and push the static site files.

## Privacy Scope

此 repository 只包含公開網站所需的靜態檔案。

未上傳的內容包含：

- 課程影片與錄音
- 原始 PDF 講義
- 完整逐字稿
- 本機中間處理檔
- 本機依賴套件資料夾
- 登入憑證、密碼或其他私密資料

## Hosting and Cost

This site uses free GitHub Pages hosting. It does not require a backend server, database, paid domain, or paid external service.

## Notes

The website is for personal study and review. Please avoid uploading or redistributing course source materials unless you have permission.
