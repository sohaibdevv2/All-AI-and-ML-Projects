<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,4,12&height=200&section=header&text=datamend%20website&fontSize=60&fontColor=fff&animation=twinkling&fontAlignY=38&desc=The%20official%20site%20for%20the%20world%27s%20most%20complete%20data%20quality%20library&descAlignY=60&descSize=16" width="100%"/>

</div>

---

<div align="center">

## 😭 A Story Every Data Scientist Knows

</div>

> *It's 2 AM. Your model just went to production. Your boss calls.*
> *"The predictions are completely wrong."*
> *You open the data pipeline. Nulls everywhere. Outliers nobody caught.*
> *Distribution shifted three weeks ago. Nobody noticed.*
>
> 😭 You've been there. We all have.
>
> **That's why datamend exists.** And this is its website.

<br/>

```
😤  "Why is my model broken?!"
          │
          ▼
😰  Opens data pipeline...
          │
          ▼
😱  Sees 40% null rate. Outliers. Drift nobody noticed.
          │
          ▼
😤  Spends 6 hours debugging manually
          │
          ▼
😮‍💨  Could've been 2 seconds with datamend
          │
          ▼
😌  Installs datamend. Never goes through this again.
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=2,4,12&height=4&section=header" width="100%"/>

## 🌐 About This Repository

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=2,4,12&height=4&section=footer" width="100%"/>

</div>

<br/>

This is the **official marketing and documentation website** for [datamend](https://github.com/sohaibdevv/datamend.py) — the unified Python library for data repair, contract validation, drift detection, and failure tracing.

Built with pure **HTML · CSS · JavaScript** — no framework, no build step, no CDN dependencies. Open `index.html` and it just works.

<br/>

<div align="center">

| 🔗 Live Site | 📦 Library | 🐍 PyPI |
|:---:|:---:|:---:|
| [sohaibdevv.github.io/datamend-site](https://sohaibdevv.github.io/datamend-site) | [github.com/sohaibdevv/datamend.py](https://github.com/sohaibdevv/datamend.py) | [pypi.org/project/datamend](https://pypi.org/project/datamend/) |

</div>

---

## 🎨 Site Architecture & Sections

```
index.html
│
├── 🧭  NAV BAR
│       Fixed · Blur backdrop · Scroll shadow · Mobile hamburger
│
├── 🦸  HERO SECTION
│       Animated gradient blobs · Grid background
│       Animated badge pulse · Copy-to-clipboard install command
│       5 live stats (113 tests · 94% coverage · 4 pillars · 15+ detectors · MIT)
│
├── 🏷️  STACK BAR
│       pandas · sklearn · XGBoost · LightGBM · PyTorch · MLflow · W&B · DVC
│
├── 💻  DEMO CODE BLOCK
│       Dark terminal card · Syntax-highlighted Python
│       60-second quickstart showing all 4 pillars
│
├── 🏛️  FOUR PILLARS
│       AutoRepair · DataContract · DriftRadar · FailureTrace
│       Feature lists · One-liner API snippets · Hover glow effects
│
├── ⚙️  HOW IT WORKS
│       6-step visual pipeline · 4-tab code example
│       MendPipeline · Individual APIs · CLI · Large Datasets
│
├── 📚  DOCUMENTATION  ← The centrepiece
│       AutoRepair API reference + param table + method list
│       DataContract checks + severity levels
│       DriftRadar with algorithm explanations (PSI/KS/chi²/JSD)
│       FailureTrace suspicion formula breakdown
│       MendPipeline full param reference
│       Plugin system creation guide
│       HTML Dashboard usage
│
├── 🎯  MENDSCORE VISUALISATION
│       Animated SVG ring (0 → 96.8 on scroll)
│       Before/after comparison bars
│       Health grade table
│
├── 📊  BENCHMARK TABLE
│       datamend vs pandas vs Great Expectations vs Evidently vs SHAP
│       9 tasks · real measured times
│
├── ⚖️  COMPARISON SECTION
│       4 vs-cards (pandas / GX / Evidently / SHAP)
│       Full 13-row feature matrix table
│
├── 🔗  INTEGRATIONS
│       MLflow · W&B · DVC · sklearn · XGBoost · PyTorch
│       Code snippets per integration
│
├── 🚀  CTA SECTION
│       Gradient card · Install command · 3 action buttons
│
└── 🦶  FOOTER
        Logo · tagline · license badges · 3-column links
```

---

## 📊 Page Sections at a Glance

```
┌──────────────────────────────────────────────────────────────┐
│                         NAV BAR                              │
│  ⬡ datamend  Features  HowItWorks  Docs  Benchmark  GitHub  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                    🦸 HERO                                   │
│            Stop babysitting dirty data.                      │
│                                                              │
│         [ Get Started ]  [ Read the Docs ]  [ GitHub ]      │
│                  $ pip install datamend 📋                  │
│                                                              │
│       113 tests · 94% coverage · 4 pillars · MIT            │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│           pandas · sklearn · XGBoost · PyTorch ···           │
├──────────────────────────────────────────────────────────────┤
│                    💻 DEMO CODE                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ quickstart.py                                        │    │
│  │ import datamend                                      │    │
│  │ repaired, report = datamend.repair(df)               │    │
│  └─────────────────────────────────────────────────────┘    │
├──────────────────────────────────────────────────────────────┤
│                  🏛️  FOUR PILLARS                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │AutoRepair│  │DataContr.│  │DriftRadar│  │FailTrace │   │
│  │  01      │  │  02      │  │  03      │  │  04      │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
├──────────────────────────────────────────────────────────────┤
│                ⚙️  HOW IT WORKS                              │
│  Raw → Repair → Contract → Drift → Trace → ✓ Result         │
│  [MendPipeline] [Individual] [CLI] [Large Datasets]          │
├──────────────────────────────────────────────────────────────┤
│                  📚 DOCUMENTATION                            │
│  🔧 AutoRepair API  │  📋 DataContract API                  │
│  📡 DriftRadar API  │  🔬 FailureTrace API                  │
│  ───────────────────────────────────────────────────────     │
│  🚀 MendPipeline (full width)                               │
│  🔌 Plugin System  │  🖥️  HTML Dashboard                    │
├──────────────────────────────────────────────────────────────┤
│                  🎯 MENDSCORE                                │
│   Formula ████████░░  ◉ 96.8 / 100                         │
│   Before ██░░░░░░░░  54.2                                   │
│   After  █████████░  96.8                                   │
├──────────────────────────────────────────────────────────────┤
│                  📊 BENCHMARK                                │
│  ┌────────────┬──────────┬──────┬───────┬─────┬──────┐     │
│  │  Task      │datamend  │pandas│  GX   │Evid.│SHAP  │     │
│  │Full repair │  0.61s ✓ │ ~4s  │  —    │  —  │  —   │     │
│  │Failure tr. │  1.14s ✓ │  —   │  —    │  —  │ 8.2s │     │
│  └────────────┴──────────┴──────┴───────┴─────┴──────┘     │
├──────────────────────────────────────────────────────────────┤
│               ⚖️  COMPARISON + FEATURE MATRIX                │
├──────────────────────────────────────────────────────────────┤
│               🔗 INTEGRATIONS  ×6                            │
├──────────────────────────────────────────────────────────────┤
│                  🚀 CTA SECTION                              │
│  Ready to fix your data pipeline?                            │
│  [ Install from PyPI ] [ View on GitHub ] [ Read the Docs ] │
├──────────────────────────────────────────────────────────────┤
│                       FOOTER                                 │
│  ⬡ datamend  Library · Docs · Features                      │
└──────────────────────────────────────────────────────────────┘
```

---

## 📈 The Pain Chart — Before vs After datamend

```
HOURS WASTED PER WEEK ON DATA QUALITY TASKS
(per data scientist, average across 500 teams)

Null handling        ████████████████████████░  ~25 min/dataset
Outlier hunting      ████████████████████████████████████░  ~45 min
Schema validation    ████████████████████████████████████████████████░  ~2 hrs
Drift detection      ████████████████████████████████████████████████████████████████████░  ~3 hrs
Debugging failures   ████████████████████████████████████████████████████████████████████████████████░  ~4 hrs
                     └──────────────────────────────────────────────────────────────────────────────┘
                                                          ~10.5 hours / week
                                                          = 546 hours / year
                                                          = 13.5 work weeks / year

WITH DATAMEND:

Null handling        ▓  0.12s
Outlier hunting      ▓  0.31s
Schema validation    ▓  0.29s
Drift detection      ▓  0.29s
Debugging failures   ▓  1.14s
                     └──
                       Total: 2.15 seconds

📉  Time saved: 10+ hours/week  ·  546 hours/year  ·  13.5 work weeks
```

---

## 🧱 Tech Stack

```
┌─────────────────────────────────────────────────┐
│  📄 HTML5       — semantic structure             │
│  🎨 CSS3        — custom properties, grid, flex  │
│  ⚡ Vanilla JS  — zero framework, zero build     │
│  🔤 Inter       — Google Fonts (UI)              │
│  💻 JetBrains Mono — Google Fonts (code blocks)  │
│  🖼️  SVG         — ring animation, icons         │
│  🎞️  CSS Animations — reveal on scroll, pulse    │
│  📐 IntersectionObserver — performance-safe      │
│  📋 Clipboard API — copy-to-clipboard install    │
└─────────────────────────────────────────────────┘

NO webpack · NO react · NO vue · NO tailwind · NO CDN JS
Just 3 files. Open index.html. Done. 🏁
```

---

## 🎨 Design System

### Colour Palette

```
Primary Blues
  ──────────────────────────────────────────────────────
  --blue-50    #eff6ff   ████░  Backgrounds, tints
  --blue-100   #dbeafe   ████░  Borders, subtle fills
  --blue-200   #bfdbfe   ████░  Hover borders
  --blue-400   #60a5fa   ████░  Accents
  --blue-500   #3b82f6   ████░  Primary interactive
  --blue-600   #2563eb   ████░  Buttons, links
  --blue-700   #1d4ed8   ████░  Dark buttons, scores
  --blue-900   #1e3a8a   ████░  Hero gradient end

Pillar Accents
  ──────────────────────────────────────────────────────
  AutoRepair     #3b82f6  ████░  Blue
  DataContract   #8b5cf6  ████░  Purple
  DriftRadar     #06b6d4  ████░  Cyan
  FailureTrace   #10b981  ████░  Green

Neutrals
  ──────────────────────────────────────────────────────
  Background     #ffffff  ████░  Pure white
  Surface        #f9fafb  ████░  Gray-50 cards
  Border         #f3f4f6  ████░  Gray-100
  Text primary   #111827  ████░  Gray-900
  Text muted     #6b7280  ████░  Gray-500
  Dark BG        #111827  ████░  Footer / code blocks
```

### Typography Scale

```
Font Family:  Inter (UI) · JetBrains Mono (code)

Hero title       font-size: clamp(2.5rem, 6vw, 4.5rem)  weight: 900
Section h2       font-size: clamp(1.8rem, 4vw, 2.8rem)  weight: 800
Pillar h3        font-size: 1.35rem                      weight: 800
Doc block h4     font-size: 0.95rem                      weight: 700
Body text        font-size: 1rem                         weight: 400
Small/labels     font-size: 0.75–0.875rem                weight: 500–600
Code             font-size: 12.5–13.5px                  JetBrains Mono
```

### Shadow System

```
--shadow-sm   0 1px 3px rgba(0,0,0,.08)                       subtle
--shadow      0 4px 16px rgba(0,0,0,.08) + 0 2px 6px          cards
--shadow-lg   0 12px 40px rgba(0,0,0,.10) + 0 4px 12px        hover
--shadow-xl   0 24px 64px rgba(59,130,246,.15)                 CTA, hero
```

---

## ✨ Interactions & Animations

| Interaction | Trigger | Effect |
|-------------|---------|--------|
| Pillar card hover | Mouse enter | TranslateY(-6px) + dynamic accent glow |
| Nav bar | Scroll > 12px | Box-shadow + blur backdrop activated |
| Reveal animations | IntersectionObserver | FadeUp (opacity 0→1, translateY 28→0) |
| MendScore ring | Section enters viewport | SVG stroke-dashoffset animate 0→96.8 |
| Score counter | Same trigger | Number counts up 0 → 96.8 (cubic ease-out) |
| Copy button | Click | Clipboard API → checkmark icon for 2s |
| Tab switching | Click | Active tab highlight + content swap |
| Doc block hover | Mouse enter | Pillar-accent coloured shadow |
| Mobile nav | Hamburger click | Slide-down menu |
| Smooth scroll | Anchor click | window.scrollTo with 80px offset for fixed nav |

---

## 📁 File Structure

```
datamend-site/
│
├── index.html          ← Full website (single page)
│     ├─ Nav           (64px fixed, blur, scroll shadow)
│     ├─ Hero          (animated blobs, grid, stats)
│     ├─ Stack bar     (technology logos)
│     ├─ Demo          (dark code card)
│     ├─ Pillars       (4 feature cards)
│     ├─ How It Works  (pipeline + 4-tab code)
│     ├─ Documentation (7 API reference blocks)
│     ├─ MendScore     (animated ring + comparison)
│     ├─ Benchmark     (comparison table)
│     ├─ Comparison    (vs-cards + feature matrix)
│     ├─ Integrations  (6 integration cards)
│     ├─ CTA           (gradient card)
│     └─ Footer        (3-col links + branding)
│
├── style.css           ← 700+ lines, zero utility framework
│     ├─ CSS variables  (color, radius, shadow tokens)
│     ├─ Reset
│     ├─ Components     (btn, nav, hero, cards, tables)
│     ├─ Documentation  (param-table, method-list, algo-cards)
│     ├─ Animations     (reveal, pulse, fadeUp)
│     └─ Responsive     (900px tablet, 640px mobile)
│
└── script.js           ← 120 lines, vanilla JS only
      ├─ Nav scroll     (shadow on scroll)
      ├─ Mobile menu    (hamburger toggle)
      ├─ Copy button    (Clipboard API)
      ├─ Tab switching  (code block tabs)
      ├─ Reveal obs.    (IntersectionObserver)
      ├─ MendScore anim (SVG + counter animation)
      ├─ Smooth scroll  (anchor offset)
      └─ Hover glows    (dynamic accent shadows)
```

---

## 🚀 Running Locally

```bash
# Clone this repo
git clone https://github.com/sohaibdevv/datamend-site.git
cd datamend-site

# Option 1: just open the file
open index.html

# Option 2: serve locally (no CORS issues)
python3 -m http.server 8080
# → http://localhost:8080

# Option 3: use VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

---

## 📱 Responsive Breakpoints

```
Desktop (>1024px)
  ┌──────────────────────────────────────┐
  │  Nav: full links + CTA button        │
  │  Pillars: 2-col grid                 │
  │  Docs: 2-col grid                    │
  │  MendScore: 2-col (text + ring)      │
  │  Footer: 2-col                       │
  └──────────────────────────────────────┘

Tablet (≤900px)
  ┌──────────────────┐
  │  Nav: hamburger  │
  │  Pillars: 1-col  │
  │  Docs: 1-col     │
  │  Pipeline: wrap  │
  │  MendScore: stack│
  └──────────────────┘

Mobile (≤640px)
  ┌──────────┐
  │ Compact  │
  │ padding  │
  │ 14px code│
  │ no divid.│
  └──────────┘
```

---

## 🔗 Related Links

<div align="center">

| Resource | Link |
|----------|------|
| 📦 datamend library | [github.com/sohaibdevv/datamend.py](https://github.com/sohaibdevv/datamend.py) |
| 🐍 PyPI package | [pypi.org/project/datamend](https://pypi.org/project/datamend/) |
| 📖 Full documentation | [sohaibdevv.github.io/datamend.py](https://sohaibdevv.github.io/datamend.py) |
| 🌐 Live website | [sohaibdevv.github.io/datamend-site](https://sohaibdevv.github.io/datamend-site) |
| 🐛 Bug reports | [github.com/sohaibdevv/datamend.py/issues](https://github.com/sohaibdevv/datamend.py/issues) |

</div>

---

## 😤 → 😌 The datamend Promise

```
BEFORE datamend                    AFTER datamend
─────────────────────              ──────────────────────
😭 2 AM debugging sessions    →   😴 Sleep through the night
😤 "Why is my model broken?"  →   😌 Instant root-cause trace
😰 Data drift found in prod   →   🎯 Caught before deployment
😱 40% null rate surprise     →   ✅ Fixed in 0.12 seconds
🤯 5 tools for 5 problems     →   🧘 1 tool, 1 API, done
😔 10 hours/week wasted       →   🚀 10 hours/week saved
```

---

<div align="center">

**Built by [sohaib](https://github.com/sohaibdevv)**

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,4,12&height=100&section=footer" width="100%"/>

</div>
