/* ===== SYSTEM DESIGN CANVAS — DESIGNER ===== */

/* ── State ─────────────────────────────────── */
let cy;
let mode        = 'select';   // 'select' | 'connect' | 'pan'
let connectSrc  = null;       // node awaiting connection target
let history     = [];         // undo stack (JSON snapshots)
let redoStack   = [];
let nodeCount   = 0;
let selectedEl  = null;

/* ── Init ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCytoscape();
  buildSidebar();
  buildTemplatesModal();
  wireToolbar();
  wireKeyboard();
  wirePropsPanel();
  loadDesign();
  updateZoomLabel();
});

/* ── Cytoscape Init ─────────────────────────── */
function initCytoscape() {
  cy = cytoscape({
    container: document.getElementById('cy'),
    elements: [],
    style: [
      {
        selector: 'node',
        style: {
          'label':              'data(label)',
          'text-valign':        'bottom',
          'text-halign':        'center',
          'text-margin-y':       6,
          'font-family':        'Inter, sans-serif',
          'font-size':          '11px',
          'font-weight':        '600',
          'color':              '#2A2318',
          'background-color':   'data(color)',
          'background-opacity': 0.18,
          'border-color':       'data(color)',
          'border-width':       2,
          'border-opacity':     0.9,
          'width':               80,
          'height':              60,
          'shape':              'data(shape)',
          'text-background-color':  '#FFFDF7',
          'text-background-opacity': 0.85,
          'text-background-padding': '3px',
          'text-background-shape':  'roundrectangle',
          'padding':            '16px',
        }
      },
      {
        selector: 'node[shape="ellipse"]',
        style: { 'width': 70, 'height': 70 }
      },
      {
        selector: 'node[shape="diamond"]',
        style: { 'width': 90, 'height': 70 }
      },
      {
        selector: 'node[shape="barrel"]',
        style: { 'width': 80, 'height': 70 }
      },
      {
        selector: 'node:selected',
        style: {
          'border-width':       3,
          'border-color':       '#C8621A',
          'background-opacity': 0.3,
          'box-shadow':         '0 0 0 4px rgba(200,98,26,0.25)',
        }
      },
      {
        selector: '.connect-source',
        style: {
          'border-width':   3,
          'border-color':   '#2D9C6E',
          'border-style':   'dashed',
          'background-opacity': 0.35,
        }
      },
      {
        selector: '.connect-hover',
        style: {
          'border-color':   '#C8621A',
          'border-width':   3,
          'background-opacity': 0.25,
        }
      },
      {
        selector: 'edge',
        style: {
          'label':              'data(label)',
          'font-family':        'Inter, sans-serif',
          'font-size':          '10px',
          'color':              '#6B5E52',
          'text-background-color':  '#FFFDF7',
          'text-background-opacity': 0.8,
          'text-background-padding': '2px',
          'text-background-shape':  'roundrectangle',
          'curve-style':        'bezier',
          'target-arrow-shape': 'triangle',
          'target-arrow-color': '#9E8F82',
          'arrow-scale':        1.1,
          'line-color':         '#C4B8AA',
          'line-style':         'data(lineStyle)',
          'width':               1.5,
        }
      },
      {
        selector: 'edge:selected',
        style: {
          'line-color':         '#C8621A',
          'target-arrow-color': '#C8621A',
          'width':               2.5,
        }
      },
      {
        selector: '.eh-handle',
        style: {
          'background-color': '#2D9C6E',
          'width':             12,
          'height':            12,
          'shape':            'ellipse',
          'overlay-opacity':   0,
          'border-width':      2,
          'border-color':      'white',
        }
      }
    ],
    layout: { name: 'preset' },
    userZoomingEnabled:    true,
    userPanningEnabled:    true,
    boxSelectionEnabled:   false,
    autounselectify:       false,
    wheelSensitivity:      0.25,
    minZoom: 0.2,
    maxZoom: 3,
  });

  /* Events */
  cy.on('tap', 'node', onNodeTap);
  cy.on('tap', 'edge', onEdgeTap);
  cy.on('tap', onCanvasTap);
  cy.on('mouseover', 'node', onNodeHover);
  cy.on('mouseout',  'node', onNodeHoverOut);
  cy.on('zoom pan',  updateZoomLabel);
  cy.on('add remove', checkEmptyState);
  cy.on('position', 'node', () => { scheduleSave(); });
  cy.on('select unselect', updatePropsPanel);

  checkEmptyState();
}

/* ── Sidebar ─────────────────────────────────── */
function buildSidebar() {
  const scroll = document.getElementById('sidebarScroll');
  scroll.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const catEl = document.createElement('div');
    catEl.className = 'comp-category';
    catEl.dataset.cat = cat.id;

    const header = document.createElement('div');
    header.className = 'comp-category-header';
    header.innerHTML = `
      <div class="comp-cat-label">
        <span class="comp-cat-dot" style="background:${cat.color}"></span>
        ${cat.name}
      </div>
      <i class="fa fa-chevron-down comp-cat-chevron"></i>
    `;
    header.addEventListener('click', () => catEl.classList.toggle('collapsed'));

    const list = document.createElement('div');
    list.className = 'comp-list';

    cat.components.forEach(comp => {
      const item = document.createElement('div');
      item.className = 'comp-item';
      item.dataset.id = comp.id;
      item.innerHTML = `
        <div class="comp-item-icon" style="background:${cat.color}22; color:${cat.color}">
          ${comp.icon}
        </div>
        <div class="comp-item-info">
          <div class="comp-item-name">${comp.name}</div>
          <div class="comp-item-desc">${comp.desc}</div>
        </div>
        <button class="comp-item-add" title="Add to canvas">
          <i class="fa fa-plus"></i>
        </button>
      `;
      item.addEventListener('click', () => addComponent(comp.id));
      list.appendChild(item);
    });

    catEl.appendChild(header);
    catEl.appendChild(list);
    scroll.appendChild(catEl);
  });

  // Search
  document.getElementById('sidebarSearch').addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.comp-item').forEach(el => {
      const name = el.querySelector('.comp-item-name').textContent.toLowerCase();
      const desc = el.querySelector('.comp-item-desc').textContent.toLowerCase();
      el.style.display = (!q || name.includes(q) || desc.includes(q)) ? '' : 'none';
    });
    document.querySelectorAll('.comp-category').forEach(cat => {
      const visible = [...cat.querySelectorAll('.comp-item')].some(i => i.style.display !== 'none');
      cat.style.display = visible ? '' : 'none';
    });
  });
}

/* ── Add Component ─────────────────────────────── */
function addComponent(compId, x, y) {
  const def = COMP_MAP[compId];
  if (!def) return;

  nodeCount++;
  const id    = `node_${Date.now()}_${nodeCount}`;
  const ext   = cy.extent();
  const cx    = x !== undefined ? x : (ext.x1 + ext.x2) / 2 + (Math.random() - 0.5) * 100;
  const cy_   = y !== undefined ? y : (ext.y1 + ext.y2) / 2 + (Math.random() - 0.5) * 100;

  saveHistory();

  cy.add({
    group:    'nodes',
    data: {
      id,
      label:     def.name,
      icon:      def.icon,
      compId:    def.id,
      color:     def.color,
      shape:     def.shape,
      notes:     '',
      lineStyle: 'solid',
    },
    position: { x: cx, y: cy_ }
  });

  showToast(`Added ${def.name}`);
  checkEmptyState();
  scheduleSave();

  // Select new node
  cy.$id(id).select();
}

/* ── Node Interaction ─────────────────────────── */
function onNodeTap(e) {
  const node = e.target;

  if (mode === 'connect') {
    if (!connectSrc) {
      connectSrc = node;
      node.addClass('connect-source');
      showToast('Now click target node to connect');
    } else if (connectSrc.id() !== node.id()) {
      saveHistory();
      cy.add({
        group: 'edges',
        data: {
          id:        `edge_${Date.now()}`,
          source:    connectSrc.id(),
          target:    node.id(),
          label:     '',
          lineStyle: 'solid',
        }
      });
      connectSrc.removeClass('connect-source');
      connectSrc = null;
      scheduleSave();
      showToast('Connected!');
    } else {
      connectSrc.removeClass('connect-source');
      connectSrc = null;
    }
    return;
  }

  selectedEl = node;
  updatePropsPanel();
}

function onEdgeTap(e) {
  if (mode === 'connect') return;
  selectedEl = e.target;
  updatePropsPanel();
}

function onCanvasTap(e) {
  if (e.target === cy) {
    if (connectSrc) {
      connectSrc.removeClass('connect-source');
      connectSrc = null;
    }
    selectedEl = null;
    updatePropsPanel();
  }
}

function onNodeHover(e) {
  if (mode === 'connect' && connectSrc && connectSrc.id() !== e.target.id()) {
    e.target.addClass('connect-hover');
  }
}
function onNodeHoverOut(e) { e.target.removeClass('connect-hover'); }

/* ── Toolbar ─────────────────────────────────── */
function wireToolbar() {
  // Mode buttons
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.mode);
    });
  });

  // Toolbar actions
  document.getElementById('btnUndo').addEventListener('click', undo);
  document.getElementById('btnRedo').addEventListener('click', redo);
  document.getElementById('btnFit').addEventListener('click', () => cy.fit(undefined, 60));
  document.getElementById('btnClear').addEventListener('click', clearCanvas);
  document.getElementById('btnTemplates').addEventListener('click', openTemplatesModal);
  document.getElementById('btnExportPng').addEventListener('click', exportPng);
  document.getElementById('btnExportJson').addEventListener('click', exportJson);
  document.getElementById('btnImportJson').addEventListener('click', () => {
    document.getElementById('importInput').click();
  });
  document.getElementById('importInput').addEventListener('change', importJson);

  document.getElementById('btnHome').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Canvas zoom controls
  document.getElementById('ctrlZoomIn').addEventListener('click',  () => cy.zoom({ level: cy.zoom() * 1.2, renderedPosition: cy.pan() }));
  document.getElementById('ctrlZoomOut').addEventListener('click', () => cy.zoom({ level: cy.zoom() / 1.2, renderedPosition: cy.pan() }));
  document.getElementById('ctrlFit').addEventListener('click',     () => cy.fit(undefined, 60));
  document.getElementById('ctrlCenter').addEventListener('click',  () => cy.center());

  // Nav scroll
  window.addEventListener('scroll', () => {
    document.querySelector('nav')?.classList.toggle('scrolled', window.scrollY > 10);
  });
}

function setMode(m) {
  mode = m;
  if (connectSrc) {
    connectSrc.removeClass('connect-source');
    connectSrc = null;
  }
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === m));

  // Canvas cursor
  const area = document.getElementById('canvas-area');
  area.style.cursor = m === 'pan' ? 'grab' : m === 'connect' ? 'crosshair' : 'default';
  cy.userPanningEnabled(m !== 'connect');
}

/* ── Properties Panel ─────────────────────────── */
function wirePropsPanel() {
  document.getElementById('btnToggleProps').addEventListener('click', () => {
    document.getElementById('props-panel').classList.toggle('collapsed');
  });
}

function updatePropsPanel() {
  const panel = document.getElementById('propsContent');
  const el    = cy.$(':selected');
  selectedEl  = el.length ? el.first() : null;

  if (!selectedEl) {
    panel.innerHTML = `
      <div class="props-empty">
        <div class="props-empty-icon">🎯</div>
        <div>Select a node or edge to view and edit its properties</div>
      </div>
    `;
    return;
  }

  if (selectedEl.isNode()) {
    renderNodeProps(selectedEl, panel);
  } else {
    renderEdgeProps(selectedEl, panel);
  }
}

function renderNodeProps(node, panel) {
  const d    = node.data();
  const def  = COMP_MAP[d.compId] || {};

  panel.innerHTML = `
    <div class="props-node-header">
      <div class="props-node-icon" style="background:${d.color}22; color:${d.color}">
        ${def.icon || '📦'}
      </div>
      <div>
        <div class="props-node-title">${d.label}</div>
        <div class="props-node-type">${def.name || d.compId}</div>
      </div>
    </div>

    <div class="prop-group">
      <div class="prop-group-label">Identity</div>
      <div class="prop-row">
        <label class="prop-label">Label</label>
        <input id="propLabel" class="prop-input" type="text" value="${escHtml(d.label)}" />
      </div>
    </div>

    <div class="prop-group">
      <div class="prop-group-label">Notes</div>
      <div class="prop-row">
        <textarea id="propNotes" class="prop-input prop-textarea" placeholder="Add notes, specs, or description…">${escHtml(d.notes || '')}</textarea>
      </div>
    </div>

    <div class="prop-group">
      <div class="prop-group-label">Visual</div>
      <div class="prop-row prop-color-row">
        <label class="prop-label" style="flex:1; margin:0">Color</label>
        <input id="propColor" type="color" class="prop-color-swatch" value="${d.color}" />
      </div>
      <div class="prop-row">
        <label class="prop-label">Shape</label>
        <select id="propShape" class="prop-input prop-select">
          ${['roundrectangle','ellipse','diamond','barrel','hexagon','triangle'].map(s =>
            `<option value="${s}" ${d.shape === s ? 'selected' : ''}>${s}</option>`
          ).join('')}
        </select>
      </div>
    </div>

    <div class="prop-group">
      <div class="prop-group-label">Actions</div>
      <button id="propDelete" class="btn-delete">
        <i class="fa fa-trash"></i> Delete Node
      </button>
    </div>
  `;

  document.getElementById('propLabel').addEventListener('input', e => {
    saveHistory(); node.data('label', e.target.value); scheduleSave();
  });
  document.getElementById('propNotes').addEventListener('input', e => {
    node.data('notes', e.target.value); scheduleSave();
  });
  document.getElementById('propColor').addEventListener('input', e => {
    node.data('color', e.target.value); scheduleSave();
  });
  document.getElementById('propShape').addEventListener('change', e => {
    saveHistory(); node.data('shape', e.target.value); scheduleSave();
  });
  document.getElementById('propDelete').addEventListener('click', () => {
    saveHistory(); node.remove(); selectedEl = null; updatePropsPanel(); scheduleSave(); checkEmptyState();
  });
}

function renderEdgeProps(edge, panel) {
  const d = edge.data();
  panel.innerHTML = `
    <div class="props-node-header">
      <div class="props-node-icon" style="background:#EDE7DB; color:#6B5E52">→</div>
      <div>
        <div class="props-node-title">Connection</div>
        <div class="props-node-type">Edge</div>
      </div>
    </div>

    <div class="prop-group">
      <div class="prop-group-label">Label</div>
      <div class="prop-row">
        <input id="propEdgeLabel" class="prop-input" type="text" value="${escHtml(d.label || '')}" placeholder="e.g. HTTPS, REST, gRPC" />
      </div>
    </div>

    <div class="prop-group">
      <div class="prop-group-label">Style</div>
      <div class="prop-row">
        <label class="prop-label">Line Style</label>
        <select id="propLineStyle" class="prop-input prop-select">
          ${['solid','dashed','dotted'].map(s =>
            `<option value="${s}" ${d.lineStyle === s ? 'selected' : ''}>${s}</option>`
          ).join('')}
        </select>
      </div>
    </div>

    <div class="prop-group">
      <div class="prop-group-label">Actions</div>
      <button id="propEdgeDelete" class="btn-delete">
        <i class="fa fa-trash"></i> Delete Edge
      </button>
    </div>
  `;

  document.getElementById('propEdgeLabel').addEventListener('input', e => {
    edge.data('label', e.target.value); scheduleSave();
  });
  document.getElementById('propLineStyle').addEventListener('change', e => {
    edge.data('lineStyle', e.target.value); scheduleSave();
  });
  document.getElementById('propEdgeDelete').addEventListener('click', () => {
    saveHistory(); edge.remove(); selectedEl = null; updatePropsPanel(); scheduleSave();
  });
}

/* ── Templates ─────────────────────────────────── */
function buildTemplatesModal() {
  const grid = document.getElementById('templatesGrid');
  grid.innerHTML = '';
  TEMPLATES.forEach(tpl => {
    const card = document.createElement('div');
    card.className = 'template-modal-card';
    card.innerHTML = `
      <div class="template-modal-preview" style="background:${tpl.bg}">${tpl.icon}</div>
      <div class="template-modal-info">
        <h4>${tpl.name}</h4>
        <p>${tpl.desc}</p>
      </div>
    `;
    card.addEventListener('click', () => { loadTemplate(tpl); closeTemplatesModal(); });
    grid.appendChild(card);
  });

  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeTemplatesModal();
  });
  document.getElementById('btnModalClose').addEventListener('click', closeTemplatesModal);
}

function openTemplatesModal() {
  document.getElementById('modalOverlay').classList.add('open');
}
function closeTemplatesModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function loadTemplate(tpl) {
  if (cy.nodes().length > 0) {
    if (!confirm('Load template? This will replace the current design.')) return;
  }
  saveHistory();
  cy.elements().remove();
  nodeCount = 0;

  if (tpl.nodes.length === 0) {
    checkEmptyState(); scheduleSave(); return;
  }

  const els = [];
  tpl.nodes.forEach(n => {
    const def = COMP_MAP[n.type] || {};
    els.push({
      group: 'nodes',
      data: {
        id:        n.id,
        label:     n.label || def.name || n.type,
        compId:    n.type,
        color:     def.color || '#9E8F82',
        shape:     def.shape || 'roundrectangle',
        icon:      def.icon  || '📦',
        notes:     '',
        lineStyle: 'solid',
      },
      position: { x: n.x, y: n.y }
    });
  });

  tpl.edges.forEach((e, i) => {
    els.push({
      group: 'edges',
      data: {
        id:        `te_${i}`,
        source:    e.src,
        target:    e.tgt,
        label:     e.label || '',
        lineStyle: 'solid',
      }
    });
  });

  cy.add(els);
  cy.fit(undefined, 60);
  checkEmptyState();
  scheduleSave();
  showToast(`Loaded: ${tpl.name}`);

  document.getElementById('designTitle').value = tpl.name;
}

/* ── History / Undo-Redo ─────────────────────── */
function saveHistory() {
  history.push(cy.json());
  if (history.length > 60) history.shift();
  redoStack = [];
  updateUndoRedo();
}

function undo() {
  if (!history.length) return;
  redoStack.push(cy.json());
  cy.json(history.pop());
  updateUndoRedo();
  showToast('Undo');
  checkEmptyState();
}

function redo() {
  if (!redoStack.length) return;
  history.push(cy.json());
  cy.json(redoStack.pop());
  updateUndoRedo();
  showToast('Redo');
  checkEmptyState();
}

function updateUndoRedo() {
  document.getElementById('btnUndo').style.opacity = history.length    ? '' : '0.4';
  document.getElementById('btnRedo').style.opacity = redoStack.length  ? '' : '0.4';
}

/* ── Keyboard Shortcuts ────────────────────────── */
function wireKeyboard() {
  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName;
    if (['INPUT','TEXTAREA','SELECT'].includes(tag)) return;

    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveDesign(); showToast('Saved!'); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') { e.preventDefault(); exportPng(); }
    if (e.key === 'Delete' || e.key === 'Backspace') { deleteSelected(); }
    if (e.key === 'Escape') {
      if (connectSrc) { connectSrc.removeClass('connect-source'); connectSrc = null; }
      setMode('select');
    }
    if (e.key === 'v' && !e.ctrlKey && !e.metaKey) setMode('select');
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey) setMode('connect');
    if (e.key === 'f') cy.fit(undefined, 60);
  });
}

function deleteSelected() {
  const sel = cy.$(':selected');
  if (sel.length) {
    saveHistory();
    sel.remove();
    selectedEl = null;
    updatePropsPanel();
    checkEmptyState();
    scheduleSave();
  }
}

/* ── Clear / Save / Load ─────────────────────── */
function clearCanvas() {
  if (cy.elements().length === 0) return;
  if (!confirm('Clear the entire canvas?')) return;
  saveHistory();
  cy.elements().remove();
  checkEmptyState();
  scheduleSave();
  showToast('Canvas cleared');
}

let saveTimer;
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveDesign, 800);
}

function saveDesign() {
  const data = {
    title:   document.getElementById('designTitle').value,
    graph:   cy.json(),
    savedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem('sd_design', JSON.stringify(data));
  } catch(e) {}
}

function loadDesign() {
  try {
    const raw = localStorage.getItem('sd_design');
    if (!raw) { return; }
    const data = JSON.parse(raw);
    if (data.title) document.getElementById('designTitle').value = data.title;
    if (data.graph) {
      cy.json(data.graph);
      if (cy.nodes().length) cy.fit(undefined, 60);
      checkEmptyState();
    }
  } catch(e) {}
}

/* ── Export / Import ─────────────────────────── */
function exportPng() {
  const png64 = cy.png({ output: 'blob', bg: '#FFFDF7', scale: 2, full: true });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(png64);
  a.download = (document.getElementById('designTitle').value || 'design') + '.png';
  a.click();
  showToast('Exported as PNG');
}

function exportJson() {
  const data = {
    title:   document.getElementById('designTitle').value,
    version: '1.0',
    graph:   cy.json(),
    exportedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (document.getElementById('designTitle').value || 'design') + '.json';
  a.click();
  showToast('Exported as JSON');
}

function importJson(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (data.graph) {
        saveHistory();
        cy.json(data.graph);
        if (data.title) document.getElementById('designTitle').value = data.title;
        cy.fit(undefined, 60);
        checkEmptyState();
        showToast('Design imported!');
      }
    } catch { showToast('Invalid JSON file'); }
  };
  reader.readAsText(file);
  e.target.value = '';
}

/* ── Zoom Label ─────────────────────────────── */
function updateZoomLabel() {
  const z = Math.round(cy ? cy.zoom() * 100 : 100);
  const el = document.getElementById('zoomLabel');
  if (el) el.textContent = z + '%';
}

/* ── Empty State ─────────────────────────────── */
function checkEmptyState() {
  const es = document.getElementById('empty-state');
  if (!es) return;
  es.classList.toggle('hidden', cy.nodes().length > 0);
}

/* ── Toast ─────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ── Helpers ─────────────────────────────────── */
function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
