IF U WANT TO BUILD A SYSTEM :  FIRST UNDERSTAND THE SYSTEM IN DEEPER WAY 
# SystemGraph — Visual System Architecture Designer

> **Design systems. Think visually.** An open-source, browser-based canvas for drawing, exploring, and exporting system architecture diagrams — zero setup, zero backend, zero friction.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-C8621A?style=for-the-badge&logo=github)](https://sohaibdevv.github.io/system-design/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)
[![Made with Cytoscape.js](https://img.shields.io/badge/Powered%20by-Cytoscape.js-2D9C6E?style=for-the-badge)](https://js.cytoscape.org/)

---

## ✨ What is SystemGraph?

SystemGraph is a **visual system design tool** that lives entirely in your browser. Think of it as your architecture second brain — a place to sketch, document, and share how your systems are built. Whether you're preparing for a system design interview, onboarding a new teammate, or thinking through a new product's architecture, SystemGraph gives you the canvas to do it clearly and beautifully.

---

## 🖥️ Live Demo

**[→ sohaibdevv.github.io/system-design](https://sohaibdevv.github.io/system-design/)**

---

## 📸 Screenshots

| Landing Page | Designer Canvas | Templates |
|---|---|---|
| Warm white hero with animated diagram preview | Full-screen Cytoscape.js canvas with sidebar | 7 pre-built architecture templates |

---

## 🚀 Features

| Feature | Description |
|---|---|
| **30+ Components** | Clients, networking, compute, storage, messaging, and infrastructure |
| **Click to Add** | Single-click any sidebar component to place it on the canvas |
| **Connect Mode** | Draw labeled edges between any two nodes — one click, one connection |
| **7 Templates** | Web App, Microservices, Real-Time Chat, Video Streaming, Ride Sharing, Search Engine |
| **60-level Undo** | Deep undo/redo stack — Ctrl+Z / Ctrl+Y |
| **Properties Panel** | Edit label, color, shape, notes, and line style per node/edge |
| **Export PNG** | 2× high-DPI export, ready for slides and docs |
| **Export JSON** | Full graph export — version-controllable, re-importable |
| **Import JSON** | Load any previously exported design |
| **Auto-save** | LocalStorage persistence — your work survives refresh |
| **Keyboard Shortcuts** | Full shortcut set for power users |
| **Zero Backend** | No server, no account, no tracking |

---

## 🧩 Component Library

### Client Layer
| Component | Icon | Description |
|---|---|---|
| Web Browser | 🌐 | Web client |
| Mobile App | 📱 | iOS / Android |
| Desktop App | 🖥️ | Native desktop |
| IoT Device | 📡 | Embedded hardware |

### Networking
| Component | Icon | Description |
|---|---|---|
| DNS | 🔍 | Name resolution |
| CDN | 🌍 | Content delivery |
| Load Balancer | ⚖️ | Traffic distribution |
| API Gateway | 🚪 | Request routing |
| Firewall | 🛡️ | Security layer |
| VPN / Tunnel | 🔐 | Encrypted tunnel |

### Compute
| Component | Icon | Description |
|---|---|---|
| Web Server | 🌐 | HTTP server |
| App Server | ⚙️ | Business logic |
| Microservice | 🧩 | Single-purpose service |
| Serverless Fn | ⚡ | Event-driven function |
| Worker / Job | 👷 | Background processor |
| Container | 📦 | Docker container |
| Kubernetes | ☸️ | Container orchestration |

### Storage
| Component | Icon | Description |
|---|---|---|
| SQL Database | 🗄️ | Relational DB |
| NoSQL DB | 📊 | Document / KV store |
| Cache (Redis) | ⚡ | In-memory cache |
| Blob Storage | 🗂️ | S3 / object store |
| Search Engine | 🔎 | Elasticsearch etc. |
| Data Lake | 🏊 | Raw data storage |
| Time Series DB | 📈 | InfluxDB / Prometheus |

### Messaging
| Component | Icon | Description |
|---|---|---|
| Message Queue | 📬 | Kafka / RabbitMQ |
| Pub / Sub | 📢 | Event fanout |
| Event Bus | 🚌 | Event-driven arch |
| Data Stream | 🌊 | Kafka Streams etc. |

### Infrastructure
| Component | Icon | Description |
|---|---|---|
| Monitoring | 📊 | Metrics / alerts |
| Log Aggregator | 📝 | Centralized logs |
| Auth Service | 🔑 | OAuth / JWT |
| CI/CD Pipeline | 🔄 | Deploy pipeline |
| External API | 🌐 | 3rd party service |
| User / Actor | 👤 | Human end user |

---

## 🗺️ Architecture Templates

| Template | Description | Patterns shown |
|---|---|---|
| **Blank Canvas** | Start from scratch | — |
| **Web Application** | Classic 3-tier web architecture | CDN, LB, Web servers, App server, Cache, DB |
| **Microservices** | Event-driven microservice mesh | API Gateway, Auth, 3 services, Event Bus |
| **Real-Time Chat** | WhatsApp-style messaging | WebSockets, Message Queue, Presence Cache |
| **Video Streaming** | Netflix / YouTube architecture | CDN, Transcoder, Blob Storage, Recommendations |
| **Ride Sharing** | Uber / Lyft location system | Geo Cache, Matching Service, Maps API |
| **Search Engine** | Google-style search infrastructure | Crawler, Indexer, Search Index, Ranking |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `V` | Select mode |
| `C` | Connect mode |
| `Del` / `Backspace` | Delete selected |
| `F` | Fit canvas |
| `Esc` | Cancel / return to Select |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` / `Ctrl+Shift+Z` | Redo |
| `Ctrl+S` | Save to localStorage |
| `Ctrl+E` | Export PNG |
| `Scroll` | Zoom in / out |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Graph Engine** | [Cytoscape.js](https://js.cytoscape.org/) v3.28 |
| **Styling** | Pure CSS (no framework), CSS custom properties |
| **Fonts** | [Inter](https://rsms.me/inter/) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) via Google Fonts |
| **Icons** | [Font Awesome 6](https://fontawesome.com/) |
| **Persistence** | Browser `localStorage` |
| **Hosting** | GitHub Pages |
| **Build** | None — vanilla HTML/CSS/JS, zero dependencies |

---

## 📁 Project Structure

```
system-design/
├── index.html          ← Landing page
├── designer.html       ← The canvas application
├── css/
│   ├── style.css       ← Landing page styles (warm white theme)
│   └── designer.css    ← Designer app styles
├── js/
│   ├── components.js   ← Component catalog + template definitions
│   └── designer.js     ← Canvas logic (Cytoscape, undo, export)
└── README.md
```

---

## 🏃 Running Locally

No build step required — just open the files:

```bash
git clone https://github.com/sohaibdevv/system-design.git
cd system-design
# Option 1: open directly
open index.html

# Option 2: local server (avoids any CORS quirks)
python3 -m http.server 8080
# then visit http://localhost:8080
```

---

## 🤝 How to Use the Designer

1. **Open** [the designer](https://sohaibdevv.github.io/system-design/designer.html)
2. **Add components** — click any item in the left sidebar
3. **Connect them** — click `Connect` in the toolbar (or press `C`), then click source node → target node
4. **Label edges** — select an edge, type the protocol in the Properties panel
5. **Customize** — click any node to change its label, color, shape, or add notes
6. **Export** — hit `PNG` to save as image, or `JSON` to save as portable data
7. **Templates** — click `Templates` in the toolbar to load a pre-built architecture

---

## 📜 License

MIT © 2025 [sohaib](https://github.com/sohaibdevv)

---

## 👤 Author

**sohaib** — [@sohaibdevv](https://github.com/sohaibdevv)

> *"The best way to understand a system is to draw it."*
