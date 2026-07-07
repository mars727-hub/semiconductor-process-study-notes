const sessions = [
  {
    id: "SMT-01",
    title: "Introduction",
    subtitle: "半導體產業、IC 歷史與晶圓製造總覽",
    pages: 45,
    videos: 4,
    minutes: 74.6,
    terms: ["wafer", "chip", "transistor", "integrated circuit", "fab", "packaging"],
    concepts: [
      "半導體製造的核心任務是把設計好的電路圖案，透過清洗、成膜、微影、蝕刻、摻雜與金屬化等步驟轉移到晶圓上。",
      "晶圓製造後還會經過 wafer test/sort、切割、封裝與最終測試，形成可使用的 IC 產品。",
      "從 vacuum tube、電晶體到 integrated circuit，重點是尺寸縮小、整合度提升與成本/性能的系統性改善。"
    ],
    flow: ["IC concept", "wafer fabrication", "wafer sort", "packaging", "final test"],
    emphasis: ["老師多次用產業演進說明為什麼晶圓製程不是單一機台，而是跨材料、圖案轉移、設備與良率的整合系統。"],
    verify: ["已由 SMT-01 講義之 wafer fabrication、packaging、wafer test/sort 章節核對。"],
    caution: []
  },
  {
    id: "SMT-02",
    title: "Materials",
    subtitle: "材料、能帶、矽與摻雜",
    pages: 38,
    videos: 2,
    minutes: 35.2,
    terms: ["silicon", "valence electron", "band gap", "dopant", "n-type", "p-type"],
    concepts: [
      "導體、絕緣體與半導體可用能帶與載子行為區分；半導體可藉摻雜控制導電性。",
      "矽常用於半導體製程，原因包含材料豐富、可形成穩定氧化層、製程成熟。",
      "施體摻雜產生 n-type，受體摻雜產生 p-type；這是 PN junction、MOSFET 與 CMOS 的基礎。"
    ],
    flow: ["atomic bonding", "energy band", "intrinsic silicon", "dopant addition", "n/p type material"],
    emphasis: ["錄音中多次提醒要注意材料分類與摻雜後載子來源；網站將 n-type/p-type 放入測驗。"],
    verify: ["已由 SMT-02 講義之 classifying materials、silicon、silicon dopants 頁面核對。"],
    caution: []
  },
  {
    id: "SMT-03",
    title: "Devices",
    subtitle: "基本元件、PN 接面、BJT 與 MOS/CMOS",
    pages: 38,
    videos: 3,
    minutes: 58.8,
    terms: ["PN junction", "diode", "BJT", "MOSFET", "CMOS", "source/drain/gate"],
    concepts: [
      "PN diode 的順向/逆向偏壓決定載子是否容易跨越接面，這是許多元件動作的基礎。",
      "MOSFET 以 gate 電場控制 source 與 drain 間通道，是 CMOS 邏輯與高密度 IC 的核心。",
      "講義比較 BJT 與 MOS 結構，重點在開關速度、功耗、整合密度與製程結構差異。"
    ],
    flow: ["passive devices", "PN junction", "BJT", "MOS structure", "CMOS logic"],
    emphasis: ["錄音中提到電流流向與 MOS 結構是重點；此處以 source、drain、gate 與 biasing 作為複習核心。"],
    verify: ["已由 SMT-03 講義之 diode、NPN BJT、MOS/CMOS 相關頁面核對。"],
    caution: []
  },
  {
    id: "SMT-04",
    title: "Wafer Prep",
    subtitle: "矽晶圓製備、晶體結構與缺陷",
    pages: 47,
    videos: 1,
    minutes: 51.6,
    terms: ["single crystal silicon", "CZ", "FZ", "crystal orientation", "defect", "polishing"],
    concepts: [
      "晶圓製備從高純度多晶矽開始，經單晶成長、切片、倒角、研磨、蝕刻、拋光與清洗等步驟形成可製程晶圓。",
      "CZ 法產能高且常用，FZ 法不使用坩堝，較適合高純度、低氧/低碳需求。",
      "晶向如 (100)、(111) 影響氧化、蝕刻、元件特性與製程選擇。"
    ],
    flow: ["polysilicon", "crystal growth", "ingot shaping", "slicing", "lapping/etching", "polishing"],
    emphasis: ["錄音中多次提醒晶體結構與取向要注意；講義也明列 unit cell、FCC 與 orientation。"],
    verify: ["已由 SMT-04 講義之 Siemens reactor、unit cell、CZ/FZ、wafer edge/thickness 頁面核對。"],
    caution: []
  },
  {
    id: "SMT-05",
    title: "Chemicals",
    subtitle: "製程化學品、氣體、壓力與安全概念",
    pages: 45,
    videos: 4,
    minutes: 87.9,
    terms: ["gas", "vacuum", "pressure", "acid", "IPA", "dopant source"],
    concepts: [
      "半導體製程使用大量高純度氣體、液體化學品與清洗溶劑，控制純度與安全是良率基礎。",
      "氣體/液體的壓力、溫度、相變與熱膨脹會影響供應、反應與設備安全。",
      "講義列出常用化學品，例如 IPA 作為清洗溶劑，BBr3 作為硼摻雜來源。"
    ],
    flow: ["chemical property", "storage/distribution", "process delivery", "reaction/cleaning", "exhaust/safety"],
    emphasis: ["錄音中反覆出現「注意」與安全相關說明；網站將 chemical handling 以老師強調標籤呈現。"],
    verify: ["已由 SMT-05 講義之 properties、bulk chemical distribution、process gases/chemicals 頁面核對。"],
    caution: ["化學品安全細節以課程講義為學習範圍；實務操作需遵守實驗室與廠務 SOP。"]
  },
  {
    id: "SMT-06",
    title: "Contamination",
    subtitle: "污染控制、潔淨室、DI water 與清洗",
    pages: 70,
    videos: 6,
    minutes: 138.3,
    terms: ["particle", "cleanroom", "native oxide", "DI water", "RCA clean", "ESD"],
    concepts: [
      "微粒、金屬、離子、有機物與自然氧化層都可能造成缺陷；尺寸越小，污染容忍度越低。",
      "潔淨室透過過濾、層流、服裝、濕度與人員規範降低粒子與靜電風險。",
      "清洗流程包含去除粒子、金屬與有機污染，DI water 品質與乾燥方式也會影響 wafer surface。"
    ],
    flow: ["contamination source", "cleanroom protocol", "air filtration", "wet clean", "rinse/dry", "monitoring"],
    emphasis: ["錄音中明確出現「很重要」與多段「注意」；清洗、水源與 particle control 是本章複習優先區。"],
    verify: ["已由 SMT-06 講義之 cleanroom protocol、particle strategy、DI water、native oxide 頁面核對。"],
    caution: ["SMT-06 影片為多段 partial 檔；已依檔名順序整理，但段落連續性仍標為需人工確認。"]
  },
  {
    id: "SMT-08",
    title: "Gas Controls",
    subtitle: "真空、氣體控制、MFC 與 plasma",
    pages: 30,
    videos: 1,
    minutes: 33.1,
    terms: ["vacuum", "pump", "MFC", "plasma", "ion", "torr"],
    concepts: [
      "真空可降低污染、控制反應環境、提升氣體平均自由徑並支援 deposition/etch 等製程。",
      "Mass Flow Controller 用於準確且可重複地控制進入 chamber 的氣體流量。",
      "Plasma 由電子、離子、中性粒子與自由基組成，是乾蝕刻與 PECVD 等技術的基礎。"
    ],
    flow: ["gas supply", "MFC", "process chamber", "plasma/reaction", "pump/exhaust"],
    emphasis: ["錄音開頭即提醒 gas control 與 reaction chamber 的注意事項；MFC、vacuum range、plasma 放入測驗。"],
    verify: ["已由 SMT-08 講義之 vacuum ranges、MFC、plasma generation 頁面核對。"],
    caution: []
  },
  {
    id: "SMT-09",
    title: "Process Flow",
    subtitle: "CMOS 製程流程與 mask sequence",
    pages: 58,
    videos: 1,
    minutes: 65.6,
    terms: ["process flow", "mask", "N-well", "P-well", "STI", "LDD"],
    concepts: [
      "CMOS 製程不是單一步驟，而是多次薄膜、微影、蝕刻、離子佈植、退火與金屬化的順序整合。",
      "講義依 mask 順序介紹 N-well、P-well、STI、poly gate、LDD、source/drain、contact 與 metal 等形成。",
      "理解 mask sequence 有助於掌握「哪一層先做、為什麼要保護或開口、後續步驟會影響哪個區域」。"
    ],
    flow: ["N-well", "P-well", "STI", "poly gate", "LDD", "source/drain", "contact", "metal"],
    emphasis: ["錄音中對 process flow 多處說「重點」與「注意」；網站將 mask sequence 以流程條呈現。"],
    verify: ["已由 SMT-09 講義之 Mask #1 到後續 mask sequence 頁面核對。"],
    caution: []
  },
  {
    id: "SMT-10",
    title: "Oxidation",
    subtitle: "熱氧化、乾/濕氧化與氧化層用途",
    pages: 59,
    videos: 2,
    minutes: 79.6,
    terms: ["oxidation", "SiO2", "dry oxidation", "wet oxidation", "thermal budget", "furnace"],
    concepts: [
      "熱氧化以高溫使矽與氧化性氣體反應形成 SiO2；乾氧化品質較佳但較慢，濕氧化較快。",
      "氧化層可作為 gate oxide、field oxide、screen oxide、sacrificial oxide 或 passivation 等用途。",
      "thermal budget 會影響 dopant diffusion 與 junction depth，因此氧化時間與溫度需要精準控制。"
    ],
    flow: ["wafer load", "temperature ramp", "oxidant flow", "oxide growth", "cool down", "thickness check"],
    emphasis: ["錄音提到氧化相關數值與「很重要」；講義反覆列出 oxide applications，優先複習用途與乾/濕差異。"],
    verify: ["已由 SMT-10 講義之 thermal budget、Si + O2 → SiO2、wet oxidation、oxide applications 頁面核對。"],
    caution: []
  },
  {
    id: "SMT-11",
    title: "Deposition",
    subtitle: "CVD、PVD、epitaxy 與薄膜覆蓋",
    pages: 68,
    videos: 2,
    minutes: 80.9,
    terms: ["CVD", "PVD", "epitaxy", "step coverage", "LPCVD", "PECVD"],
    concepts: [
      "Deposition 是在 wafer 上形成薄膜，可分為物理氣相沉積、化學氣相沉積與外延成長等類型。",
      "CVD 反應包含氣體傳輸、表面吸附、表面反應與副產物排出；反應 regime 會影響沉積速率與均勻性。",
      "step coverage、gap fill、particle contamination 與 throughput 是選擇 deposition 技術時的重要考量。"
    ],
    flow: ["precursor delivery", "transport", "surface reaction", "film growth", "byproduct removal"],
    emphasis: ["錄音中明確說有些 deposition 注意事項必須納入考量；RPCVD/LPCVD/PECVD 與 step coverage 列為重點。"],
    verify: ["已由 SMT-11 講義之 CVD essential aspects、deposition regimes、step coverage 頁面核對。"],
    caution: []
  },
  {
    id: "SMT-12",
    title: "Metallization",
    subtitle: "金屬連線、barrier、tungsten plug 與 copper damascene",
    pages: 80,
    videos: 1,
    minutes: 68.8,
    terms: ["metallization", "copper", "barrier metal", "tungsten plug", "damascene", "electromigration"],
    concepts: [
      "Metallization 形成元件之間的低電阻連線，材料需兼顧導電性、附著性、可靠度與製程相容性。",
      "Copper interconnect 具低電阻優勢，但需 barrier 阻止擴散，且常與 damascene/CMP 整合。",
      "Tungsten plug 用於接觸孔/介層孔填充，是多層金屬連線早期與關鍵的接觸技術。"
    ],
    flow: ["contact/via open", "barrier", "metal fill", "planarization/etchback", "interconnect stack"],
    emphasis: ["錄音對金屬層厚度、接觸與可靠性有多處注意提醒；barrier metal 與 copper challenge 列為老師強調。"],
    verify: ["已由 SMT-12 講義之 copper metallization、barrier metal、tungsten plug、damascene 頁面核對。"],
    caution: []
  },
  {
    id: "SMT-13",
    title: "Photo-1",
    subtitle: "微影概論、photoresist 與八大步驟",
    pages: 50,
    videos: 1,
    minutes: 45.4,
    terms: ["photolithography", "photoresist", "spin coat", "soft bake", "exposure", "development"],
    concepts: [
      "Photolithography 把 mask/reticle 上的圖案轉移到 photoresist，再用後續蝕刻或佈植把圖案轉移到薄膜/基板。",
      "正光阻曝光區較易被 developer 去除；負光阻曝光區交聯後保留。",
      "八大步驟包含 vapor prime、spin coat、soft bake、alignment、exposure、PEB、develop、hard bake/inspect 等。"
    ],
    flow: ["surface prep", "spin coat", "soft bake", "align/expose", "PEB", "develop", "inspect"],
    emphasis: ["錄音對 resist thickness、resolution 與製程條件多次提醒注意；八大步驟列入測驗。"],
    verify: ["已由 SMT-13 講義之 positive/negative resist、eight steps of photolithography 頁面核對。"],
    caution: []
  },
  {
    id: "SMT-14",
    title: "Photo-2",
    subtitle: "Stepper、alignment、光學解析度與景深",
    pages: 80,
    videos: 2,
    minutes: 95.9,
    terms: ["stepper", "reticle", "alignment", "resolution", "NA", "depth of focus"],
    concepts: [
      "Wafer stepper 的核心任務包含 alignment、exposure 與 stepping/repeating，把 reticle 影像投影到 wafer field。",
      "解析度與曝光波長、數值孔徑 NA 相關；景深則隨 NA 增加而下降，形成解析度與製程容忍度的取捨。",
      "Diffraction、lens aberration、focus control 與 overlay 都會影響圖案品質。"
    ],
    flow: ["reticle", "illumination", "projection lens", "alignment", "exposure field", "step-and-repeat"],
    formulas: ["\\(R=k_1\\lambda/NA\\)", "\\(DOF=k_2\\lambda/NA^2\\)"],
    emphasis: ["錄音中對光學與景深定義說「非常注意」；解析度/景深公式與 alignment 是本章核心。"],
    verify: ["已由 SMT-14 講義之 stepper functions、diffraction、depth of focus、resolution 頁面核對。"],
    caution: []
  },
  {
    id: "SMT-15",
    title: "Photo-3",
    subtitle: "顯影、PEB、先進微影與檢查返工",
    pages: 32,
    videos: 1,
    minutes: 25.0,
    terms: ["development", "PAB", "PEB", "PAG", "DUV", "EUV"],
    concepts: [
      "Development 將曝光後溶解度改變的 resist 圖案顯現出來；puddle development 是常見方法。",
      "PEB 可降低 standing wave、促進 chemically amplified resist 反應，但溫度/時間需控制。",
      "先進微影包含 DUV、immersion、EUV、step-and-scan 與其他解析度提升方法。"
    ],
    flow: ["exposure", "PEB", "develop", "rinse/dry", "inspect", "rework decision"],
    emphasis: ["講義把 develop inspect rework flow 與 advanced lithography 列為後段重點；網站以流程卡複習。"],
    verify: ["已由 SMT-15 講義之 development methods、PEB、advanced lithography、inspect/rework 頁面核對。"],
    caution: []
  },
  {
    id: "SMT-16",
    title: "Etch",
    subtitle: "濕蝕刻、乾蝕刻、plasma/RIE 與選擇比",
    pages: 86,
    videos: 2,
    minutes: 83.8,
    terms: ["etch", "selectivity", "anisotropic", "isotropic", "RIE", "endpoint"],
    concepts: [
      "Etch 的目標是選擇性移除未被保護的薄膜；重要指標包含 etch rate、selectivity、uniformity 與 profile。",
      "Wet etch 多為 isotropic，dry etch/RIE 可提供較佳 anisotropy，適合微縮圖案。",
      "Plasma etch 同時利用化學自由基與離子轟擊，bias、pressure、gas chemistry 會改變 profile 與 damage。"
    ],
    flow: ["mask pattern", "etch chemistry", "plasma/bias", "material removal", "endpoint", "strip/clean"],
    emphasis: ["錄音一開始即說 dry etch 相關 D 字很重要；selectivity、anisotropy、endpoint 放入測驗。"],
    verify: ["已由 SMT-16 講義之 wet/dry etch、undercut、selectivity、plasma/RIE 頁面核對。"],
    caution: []
  },
  {
    id: "SMT-17",
    title: "Doping",
    subtitle: "擴散、離子佈植、劑量/能量與退火",
    pages: 56,
    videos: 1,
    minutes: 64.5,
    terms: ["dopant", "diffusion", "ion implantation", "dose", "energy", "anneal"],
    concepts: [
      "Doping 透過引入受體或施體改變矽的電性，常見方法包含 diffusion 與 ion implantation。",
      "Ion implantation 可精準控制 dose 與 energy，決定摻雜量與深度分布，但會造成晶格 damage，需要 anneal 修復與活化。",
      "channeling、masking、junction depth 與 thermal budget 是佈植後整合時的重要因素。"
    ],
    flow: ["dopant source", "beam generation", "mass selection", "implant", "anneal", "junction formation"],
    emphasis: ["錄音中多處說要注意 implant 角度、位置與記憶；dose/energy/junction depth 列入重點。"],
    verify: ["已由 SMT-17 講義之 common dopant processes、diffusion steps、ion implantation advantages 頁面核對。"],
    caution: []
  },
  {
    id: "SMT-18",
    title: "CMP",
    subtitle: "化學機械平坦化、slurry/pad 與缺陷",
    pages: 55,
    videos: 1,
    minutes: 53.9,
    terms: ["CMP", "planarization", "slurry", "pad", "dishing", "erosion"],
    concepts: [
      "CMP 結合化學反應與機械磨除，用於 ILD、STI、tungsten plug 與 copper damascene 等平坦化需求。",
      "Preston equation 描述 removal rate 與壓力、相對速度的關係：\\(RR=kPV\\)。",
      "dishing、erosion、scratches、slurry residue 與 endpoint control 是 CMP 常見挑戰。"
    ],
    flow: ["slurry delivery", "pad contact", "chemical reaction", "mechanical removal", "endpoint", "post-CMP clean"],
    formulas: ["\\(RR=kPV\\)"],
    emphasis: ["錄音中 SMT-18 明確出現「星星」與「三個星號」，且後段說「這邊是重點／很重要」；CMP 缺陷與 removal rate 優先複習。"],
    verify: ["已由 SMT-18 講義之 advantages/disadvantages、oxide polish、Preston's equation、CMP defects 頁面核對。"],
    caution: ["ASR 可確認有星號語氣，但星號對應的精確投影片位置仍建議人工回看 SMT-18 約 21 分鐘附近。"]
  }
];

const missingSources = [
  "SMT-07：目前未在影片與講義資料夾中找到對應檔案，網站以缺件標示，不補寫未提供內容。",
  "部分錄音 ASR 將「考慮」誤聽為「考試」；只有可由語境或講義支撐的片段才標為老師強調。"
];

const flashcards = [
  ["Wafer fabrication", "將電路結構在晶圓上形成的製程總稱，包含清洗、成膜、微影、蝕刻、摻雜、金屬化等。"],
  ["n-type / p-type", "施體摻雜提供電子形成 n-type；受體摻雜形成電洞為主的 p-type。"],
  ["MOSFET", "以 gate 電場控制 source 與 drain 間通道導通的場效電晶體。"],
  ["CZ vs FZ", "CZ 產能高且常用；FZ 不用坩堝，通常可得到較高純度、較低氧碳污染。"],
  ["Cleanroom", "透過過濾、氣流、服裝、濕度與行為規範降低微粒與污染。"],
  ["MFC", "Mass Flow Controller，用來穩定且可重複地控制氣體流量。"],
  ["STI", "Shallow Trench Isolation，用於元件間隔離。"],
  ["Dry / Wet Oxidation", "乾氧化較慢但品質佳；濕氧化較快，常用於較厚氧化層。"],
  ["Step coverage", "薄膜在階梯側壁與底部覆蓋的能力，是 deposition 重要品質指標。"],
  ["Barrier metal", "阻止金屬擴散並改善附著/可靠度的阻障層。"],
  ["Photolithography", "用光阻與曝光把 mask/reticle 圖案轉移到晶圓表面。"],
  ["Resolution / DOF", "解析度與景深共同限制微影能力；NA 提升解析度但通常降低景深。"],
  ["Selectivity", "蝕刻目標材料相對於遮罩或底層材料的蝕刻速率比。"],
  ["Ion implantation", "以加速離子打入矽中控制摻雜濃度與深度。"],
  ["CMP", "Chemical Mechanical Planarization，用化學與機械作用平坦化薄膜或金屬。"]
];

const quiz = [
  ["SMT-01", "晶圓製造流程最能代表哪一組製程整合？", ["清洗、成膜、微影、蝕刻、摻雜等反覆整合", "只做封裝", "只做電路設計", "只做出貨測試"], 0, "SMT-01 講義明列 wafer fabrication 包含 cleaning、layering、patterning、etching、doping。"],
  ["SMT-02", "形成 n-type silicon 的主要概念是什麼？", ["加入施體 dopant 使電子成為主要載子", "加入受體讓電洞成為主要載子", "移除所有雜質", "只改變晶圓厚度"], 0, "n-type 由施體摻雜提供額外電子。"],
  ["SMT-03", "MOSFET 中控制通道導通的端點是？", ["Gate", "Package", "Wafer edge", "CMP pad"], 0, "MOSFET 的 gate 透過電場控制 source/drain 間通道。"],
  ["SMT-04", "FZ 法相對 CZ 法的一個常見優點是？", ["較高純度、低氧/低碳", "一定成本最低", "不用單晶矽", "只用於封裝"], 0, "講義指出 FZ 不用坩堝，可得到高純度且低氧/碳的矽。"],
  ["SMT-05", "化學品與氣體在製程中最需要同時關注的是？", ["純度、供應控制與安全", "顏色", "包裝外觀", "檔案大小"], 0, "半導體製程化學品需高純度並受控供應，安全是基本要求。"],
  ["SMT-06", "潔淨室降低污染的核心策略不包含哪一項？", ["任意提高人員走動以加快流程", "空氣過濾", "服裝規範", "層流與粒子控制"], 0, "人員活動通常是污染源，不能靠增加走動降低污染。"],
  ["SMT-08", "Mass Flow Controller 的主要功能是？", ["控制進入 chamber 的氣體流量", "量測晶圓厚度", "顯影光阻", "拋光 wafer"], 0, "MFC 用於準確、可重複的氣體流量控制。"],
  ["SMT-09", "CMOS process flow 中 STI 的主要目的為何？", ["元件隔離", "封裝切割", "產生光阻", "降低晶圓直徑"], 0, "STI 是 shallow trench isolation，用於隔離元件。"],
  ["SMT-10", "乾氧化相對濕氧化通常具有哪個特性？", ["較慢但氧化層品質較佳", "一定最快", "完全不需高溫", "只用於 CMP"], 0, "乾氧化通常 growth rate 較慢，但薄氧化層品質佳。"],
  ["SMT-11", "Step coverage 指的是？", ["薄膜覆蓋階梯側壁與底部的能力", "曝光機移動距離", "潔淨室人數", "晶圓封裝速度"], 0, "Deposition 章節以 step coverage 評估薄膜在 topography 上的覆蓋品質。"],
  ["SMT-12", "Copper interconnect 需要 barrier metal 的主因是？", ["防止銅擴散並改善整合可靠度", "讓銅變透明", "降低 wafer 尺寸", "取代所有微影"], 0, "Cu 易擴散且會影響元件，需要 barrier 層。"],
  ["SMT-13", "正光阻被曝光後，一般顯影結果是？", ["曝光區較容易被去除", "曝光區一定變金屬", "未曝光區全部氧化", "所有光阻都不變"], 0, "Positive resist 曝光區溶解度提高，顯影後被移除。"],
  ["SMT-14", "微影解析度公式中，降低波長 \\(\\lambda\\) 通常會？", ["改善可解析最小線寬", "讓景深無限大", "讓 NA 變成 0", "取消 alignment"], 0, "\\(R=k_1\\lambda/NA\\)，波長越短，理論解析度越好。"],
  ["SMT-15", "PEB 在 chemically amplified resist 中常見用途是？", ["促進反應並降低 standing wave 等效應", "拋光金屬", "產生真空", "切割晶圓"], 0, "PEB 控制曝光後化學反應與圖案品質。"],
  ["SMT-16", "乾蝕刻相對濕蝕刻常被採用的關鍵理由是？", ["較容易得到 anisotropic profile", "永遠不需要 plasma", "只能蝕刻金屬", "不需要遮罩"], 0, "Dry etch/RIE 可藉離子方向性形成較垂直的輪廓。"],
  ["SMT-17", "Ion implantation 中 dose 與 energy 主要分別影響？", ["摻雜量與深度分布", "晶圓顏色與封裝", "光阻厚度與顯影液", "CMP pad 與 slurry"], 0, "dose 對應植入數量，energy 影響投影深度與分布。"],
  ["SMT-18", "Preston equation \\(RR=kPV\\) 中，RR 代表什麼？", ["CMP removal rate", "光刻解析度", "氣體流量", "晶圓直徑"], 0, "SMT-18 講義在 oxide polish 介紹 removal rate 與 Preston's equation。"],
  ["綜合", "哪一組順序最接近圖案轉移的基本邏輯？", ["成膜 → 塗佈光阻 → 曝光顯影 → 蝕刻/佈植 → 去光阻", "封裝 → 出貨 → 設計 → 製程", "CMP → 晶圓長晶 → 周期表", "測試 → 真空 → 投影鏡頭"], 0, "圖案轉移通常先形成材料層，再用微影定義開口，最後執行蝕刻或佈植。"]
];

function byId(id) {
  return document.getElementById(id);
}

function renderTimeline() {
  const timeline = byId("timeline");
  timeline.innerHTML = sessions.map(s => `<a href="#${s.id}">${s.id}</a>`).join("") +
    `<a href="#missing">SMT-07 缺件</a>`;
}

function sessionTemplate(s) {
  const formulas = s.formulas ? `<div class="mini-box"><strong>公式</strong>${s.formulas.map(f => `<div class="formula">${f}</div>`).join("")}</div>` : "";
  const caution = s.caution.length ? `<div class="note warning"><strong>需人工確認</strong><ul>${s.caution.map(x => `<li>${x}</li>`).join("")}</ul></div>` : "";
  return `
    <article class="session" id="${s.id}" data-search="${[s.id, s.title, s.subtitle, ...s.terms, ...s.concepts].join(" ").toLowerCase()}">
      <div class="session-header">
        <div>
          <div class="session-title">
            <span class="tag">${s.id}</span>
            <h3>${s.title}｜${s.subtitle}</h3>
          </div>
          <div class="meta">${s.pages} 頁講義 · ${s.videos} 段影片 · 約 ${s.minutes} 分鐘錄影</div>
        </div>
        <span class="tag ok">PDF + 影片摘要核對</span>
      </div>
      <div class="session-body">
        <div>
          <h4>Key concepts</h4>
          <ul>${s.concepts.map(x => `<li>${x}</li>`).join("")}</ul>
          <h4>Process flow</h4>
          <ol class="process-flow">${s.flow.map(x => `<li>${x}</li>`).join("")}</ol>
          <h4>Technical terms</h4>
          <p>${s.terms.map(t => `<span class="tag">${t}</span>`).join(" ")}</p>
        </div>
        <div class="mini-grid">
          <div class="mini-box">
            <strong>老師強調</strong>
            <ul>${s.emphasis.map(x => `<li>${x}</li>`).join("")}</ul>
          </div>
          <div class="mini-box">
            <strong>驗證狀態</strong>
            <ul>${s.verify.map(x => `<li>${x}</li>`).join("")}</ul>
          </div>
          ${formulas}
        </div>
      </div>
      ${caution}
    </article>
  `;
}

function renderSessions() {
  byId("sessionList").innerHTML = sessions.map(sessionTemplate).join("");
}

function filterSessions() {
  const query = byId("searchInput").value.trim().toLowerCase();
  const group = byId("sessionSelect").value;
  document.querySelectorAll(".session").forEach(card => {
    const matchText = !query || card.dataset.search.includes(query);
    const matchGroup = group === "all" || card.id === group;
    card.style.display = matchText && matchGroup ? "" : "none";
  });
}

function renderSelect() {
  byId("sessionSelect").innerHTML = `<option value="all">全部課程</option>` +
    sessions.map(s => `<option value="${s.id}">${s.id} ${s.title}</option>`).join("");
}

function renderFlashcards() {
  byId("flashcards").innerHTML = flashcards.map(([front, back], i) => `
    <button class="flashcard" type="button" aria-label="flashcard ${i + 1}">
      <div class="front"><span class="tag">Term</span><h3>${front}</h3><p>點一下翻面</p></div>
      <div class="back"><span class="tag ok">Meaning</span><p>${back}</p></div>
    </button>
  `).join("");
  document.querySelectorAll(".flashcard").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
  });
}

function renderMissing() {
  byId("missingList").innerHTML = missingSources.map(x => `<li>${x}</li>`).join("");
}

function renderQuiz() {
  byId("quizList").innerHTML = quiz.map((q, index) => {
    const options = q[2].map((option, optIndex) => `
      <label class="option" data-question="${index}" data-option="${optIndex}">
        <input type="radio" name="q${index}" value="${optIndex}" />
        <span>${option}</span>
      </label>
    `).join("");
    return `
      <article class="quiz-card">
        <div class="question-title">
          <span class="tag ${q[0] === "綜合" ? "warn" : ""}">${q[0]}</span>
          <span>${index + 1}. ${q[1]}</span>
        </div>
        <div class="options">${options}</div>
        <div class="explanation" id="explain-${index}">${q[4]}</div>
      </article>
    `;
  }).join("");

  document.querySelectorAll("#quizList input").forEach(input => input.addEventListener("change", updateProgress));
  if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise([byId("quizList")]);
  updateProgress();
}

function selected(index) {
  const checked = document.querySelector(`input[name="q${index}"]:checked`);
  return checked ? Number(checked.value) : null;
}

function updateProgress() {
  const answered = quiz.reduce((sum, _, index) => sum + (selected(index) !== null ? 1 : 0), 0);
  const pct = Math.round((answered / quiz.length) * 100);
  byId("progressBar").style.width = `${pct}%`;
  byId("progressText").textContent = `已作答 ${answered} / ${quiz.length}`;
}

function submitQuiz() {
  let score = 0;
  quiz.forEach((q, index) => {
    const ans = q[3];
    const pick = selected(index);
    if (pick === ans) score += 1;
    document.querySelectorAll(`[data-question="${index}"]`).forEach(label => {
      const opt = Number(label.dataset.option);
      label.classList.toggle("correct", opt === ans);
      label.classList.toggle("wrong", pick === opt && opt !== ans);
    });
    byId(`explain-${index}`).style.display = "block";
  });
  const box = byId("scoreBox");
  box.style.display = "block";
  box.textContent = `得分：${score} / ${quiz.length}。${score >= 15 ? "製程主線抓得很穩。" : "建議回到錯題對應的 SMT 章節補強。"}`;
  if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise([box, byId("quizList")]);
}

function resetQuiz() {
  document.querySelectorAll("#quizList input").forEach(input => { input.checked = false; });
  document.querySelectorAll(".option").forEach(label => label.classList.remove("correct", "wrong"));
  document.querySelectorAll(".explanation").forEach(explain => { explain.style.display = "none"; });
  byId("scoreBox").style.display = "none";
  updateProgress();
}

function init() {
  renderTimeline();
  renderSelect();
  renderSessions();
  renderFlashcards();
  renderMissing();
  renderQuiz();
  byId("searchInput").addEventListener("input", filterSessions);
  byId("sessionSelect").addEventListener("change", filterSessions);
  byId("submitBtn").addEventListener("click", submitQuiz);
  byId("resetBtn").addEventListener("click", resetQuiz);
}

init();
