/* ===== SYSTEM DESIGN COMPONENTS CATALOG ===== */

const CATEGORIES = [
  {
    id: 'client',
    name: 'Client Layer',
    color: '#4A7FA5',
    dot: '#4A7FA5',
    components: [
      { id: 'browser',     name: 'Web Browser',     icon: '🌐', desc: 'Web client',          shape: 'roundrectangle', color: '#4A7FA5' },
      { id: 'mobile',      name: 'Mobile App',      icon: '📱', desc: 'iOS / Android',        shape: 'roundrectangle', color: '#4A7FA5' },
      { id: 'desktop',     name: 'Desktop App',     icon: '🖥️', desc: 'Native desktop',       shape: 'roundrectangle', color: '#4A7FA5' },
      { id: 'iot',         name: 'IoT Device',      icon: '📡', desc: 'Embedded hardware',    shape: 'roundrectangle', color: '#4A7FA5' },
    ]
  },
  {
    id: 'network',
    name: 'Networking',
    color: '#7C5CBF',
    dot: '#7C5CBF',
    components: [
      { id: 'dns',         name: 'DNS',             icon: '🔍', desc: 'Name resolution',      shape: 'diamond',        color: '#7C5CBF' },
      { id: 'cdn',         name: 'CDN',             icon: '🌍', desc: 'Content delivery',     shape: 'diamond',        color: '#7C5CBF' },
      { id: 'lb',          name: 'Load Balancer',   icon: '⚖️', desc: 'Traffic distribution', shape: 'diamond',        color: '#7C5CBF' },
      { id: 'api_gateway', name: 'API Gateway',     icon: '🚪', desc: 'Request routing',      shape: 'diamond',        color: '#7C5CBF' },
      { id: 'firewall',    name: 'Firewall',        icon: '🛡️', desc: 'Security layer',       shape: 'diamond',        color: '#7C5CBF' },
      { id: 'vpn',         name: 'VPN / Tunnel',    icon: '🔐', desc: 'Encrypted tunnel',     shape: 'diamond',        color: '#7C5CBF' },
    ]
  },
  {
    id: 'compute',
    name: 'Compute',
    color: '#2D9C6E',
    dot: '#2D9C6E',
    components: [
      { id: 'webserver',   name: 'Web Server',      icon: '🌐', desc: 'HTTP server',          shape: 'roundrectangle', color: '#2D9C6E' },
      { id: 'appserver',   name: 'App Server',      icon: '⚙️', desc: 'Business logic',       shape: 'roundrectangle', color: '#2D9C6E' },
      { id: 'microservice',name: 'Microservice',    icon: '🧩', desc: 'Single-purpose svc',   shape: 'roundrectangle', color: '#2D9C6E' },
      { id: 'lambda',      name: 'Serverless Fn',   icon: '⚡', desc: 'Event-driven fn',      shape: 'roundrectangle', color: '#2D9C6E' },
      { id: 'worker',      name: 'Worker / Job',    icon: '👷', desc: 'Background processor', shape: 'roundrectangle', color: '#2D9C6E' },
      { id: 'container',   name: 'Container',       icon: '📦', desc: 'Docker container',     shape: 'roundrectangle', color: '#2D9C6E' },
      { id: 'kubernetes',  name: 'Kubernetes',      icon: '☸️', desc: 'Container orchestration',shape:'roundrectangle', color: '#2D9C6E' },
    ]
  },
  {
    id: 'storage',
    name: 'Storage',
    color: '#B8621A',
    dot: '#B8621A',
    components: [
      { id: 'sql',         name: 'SQL Database',    icon: '🗄️', desc: 'Relational DB',        shape: 'barrel',         color: '#B8621A' },
      { id: 'nosql',       name: 'NoSQL DB',        icon: '📊', desc: 'Document / KV store',  shape: 'barrel',         color: '#B8621A' },
      { id: 'redis',       name: 'Cache (Redis)',   icon: '⚡', desc: 'In-memory cache',      shape: 'barrel',         color: '#B8621A' },
      { id: 'blob',        name: 'Blob Storage',    icon: '🗂️', desc: 'S3 / object store',    shape: 'barrel',         color: '#B8621A' },
      { id: 'search',      name: 'Search Engine',   icon: '🔎', desc: 'Elasticsearch etc.',   shape: 'barrel',         color: '#B8621A' },
      { id: 'datalake',    name: 'Data Lake',       icon: '🏊', desc: 'Raw data storage',     shape: 'barrel',         color: '#B8621A' },
      { id: 'timeseries',  name: 'Time Series DB',  icon: '📈', desc: 'InfluxDB / Prometheus', shape: 'barrel',        color: '#B8621A' },
    ]
  },
  {
    id: 'messaging',
    name: 'Messaging',
    color: '#A0467A',
    dot: '#A0467A',
    components: [
      { id: 'queue',       name: 'Message Queue',   icon: '📬', desc: 'Kafka / RabbitMQ',     shape: 'roundrectangle', color: '#A0467A' },
      { id: 'pubsub',      name: 'Pub / Sub',       icon: '📢', desc: 'Event fanout',         shape: 'roundrectangle', color: '#A0467A' },
      { id: 'eventbus',    name: 'Event Bus',       icon: '🚌', desc: 'Event-driven arch',    shape: 'roundrectangle', color: '#A0467A' },
      { id: 'stream',      name: 'Data Stream',     icon: '🌊', desc: 'Kafka Streams etc.',   shape: 'roundrectangle', color: '#A0467A' },
    ]
  },
  {
    id: 'infra',
    name: 'Infrastructure',
    color: '#8A4A4A',
    dot: '#8A4A4A',
    components: [
      { id: 'monitoring',  name: 'Monitoring',      icon: '📊', desc: 'Metrics / alerts',     shape: 'roundrectangle', color: '#8A4A4A' },
      { id: 'logging',     name: 'Log Aggregator',  icon: '📝', desc: 'Centralized logs',     shape: 'roundrectangle', color: '#8A4A4A' },
      { id: 'auth',        name: 'Auth Service',    icon: '🔑', desc: 'OAuth / JWT',          shape: 'roundrectangle', color: '#8A4A4A' },
      { id: 'ci_cd',       name: 'CI/CD Pipeline',  icon: '🔄', desc: 'Deploy pipeline',      shape: 'roundrectangle', color: '#8A4A4A' },
      { id: 'external',    name: 'External API',    icon: '🌐', desc: '3rd party service',    shape: 'roundrectangle', color: '#8A4A4A' },
      { id: 'user',        name: 'User / Actor',    icon: '👤', desc: 'Human end user',       shape: 'ellipse',        color: '#8A4A4A' },
    ]
  }
];

/* Flat lookup map: id → component def */
const COMP_MAP = {};
CATEGORIES.forEach(cat => {
  cat.components.forEach(c => {
    COMP_MAP[c.id] = { ...c, category: cat.id, catColor: cat.color };
  });
});

/* ===== TEMPLATES ===== */
const TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank Canvas',
    desc: 'Start from scratch',
    icon: '✨',
    bg: 'linear-gradient(135deg, #FFFDF7, #F7F2EA)',
    nodes: [],
    edges: []
  },
  {
    id: 'web_app',
    name: 'Web Application',
    desc: 'Classic 3-tier web architecture',
    icon: '🌐',
    bg: 'linear-gradient(135deg, #EBF4FF, #DDEEFF)',
    nodes: [
      { id: 'n1', type: 'user',       x: 100, y: 220, label: 'User' },
      { id: 'n2', type: 'browser',    x: 260, y: 220, label: 'Browser' },
      { id: 'n3', type: 'cdn',        x: 420, y: 120, label: 'CDN' },
      { id: 'n4', type: 'lb',         x: 420, y: 220, label: 'Load Balancer' },
      { id: 'n5', type: 'webserver',  x: 580, y: 160, label: 'Web Server 1' },
      { id: 'n6', type: 'webserver',  x: 580, y: 280, label: 'Web Server 2' },
      { id: 'n7', type: 'appserver',  x: 740, y: 220, label: 'App Server' },
      { id: 'n8', type: 'redis',      x: 900, y: 140, label: 'Cache' },
      { id: 'n9', type: 'sql',        x: 900, y: 300, label: 'Primary DB' },
      { id: 'n10',type: 'sql',        x: 1060,y: 300, label: 'Replica DB' },
    ],
    edges: [
      { src: 'n1',  tgt: 'n2',  label: 'HTTPS' },
      { src: 'n2',  tgt: 'n3',  label: 'Static' },
      { src: 'n2',  tgt: 'n4',  label: 'HTTPS' },
      { src: 'n4',  tgt: 'n5',  label: 'HTTP' },
      { src: 'n4',  tgt: 'n6',  label: 'HTTP' },
      { src: 'n5',  tgt: 'n7',  label: 'REST' },
      { src: 'n6',  tgt: 'n7',  label: 'REST' },
      { src: 'n7',  tgt: 'n8',  label: 'Redis' },
      { src: 'n7',  tgt: 'n9',  label: 'SQL' },
      { src: 'n9',  tgt: 'n10', label: 'Replicate' },
    ]
  },
  {
    id: 'microservices',
    name: 'Microservices',
    desc: 'Event-driven microservice mesh',
    icon: '🧩',
    bg: 'linear-gradient(135deg, #F0FFF0, #DDFFE0)',
    nodes: [
      { id: 'n1',  type: 'user',        x: 80,  y: 240, label: 'Client' },
      { id: 'n2',  type: 'api_gateway', x: 240, y: 240, label: 'API Gateway' },
      { id: 'n3',  type: 'auth',        x: 400, y: 120, label: 'Auth Service' },
      { id: 'n4',  type: 'microservice',x: 400, y: 240, label: 'User Service' },
      { id: 'n5',  type: 'microservice',x: 400, y: 360, label: 'Order Service' },
      { id: 'n6',  type: 'queue',       x: 560, y: 240, label: 'Event Bus' },
      { id: 'n7',  type: 'microservice',x: 720, y: 180, label: 'Payment Svc' },
      { id: 'n8',  type: 'microservice',x: 720, y: 300, label: 'Notify Svc' },
      { id: 'n9',  type: 'nosql',       x: 880, y: 180, label: 'Orders DB' },
      { id: 'n10', type: 'nosql',       x: 880, y: 300, label: 'Users DB' },
      { id: 'n11', type: 'monitoring',  x: 560, y: 420, label: 'Observability' },
    ],
    edges: [
      { src: 'n1', tgt: 'n2',  label: 'HTTPS' },
      { src: 'n2', tgt: 'n3',  label: 'Auth' },
      { src: 'n2', tgt: 'n4',  label: 'REST' },
      { src: 'n2', tgt: 'n5',  label: 'REST' },
      { src: 'n4', tgt: 'n6',  label: 'Publish' },
      { src: 'n5', tgt: 'n6',  label: 'Publish' },
      { src: 'n6', tgt: 'n7',  label: 'Subscribe' },
      { src: 'n6', tgt: 'n8',  label: 'Subscribe' },
      { src: 'n7', tgt: 'n9',  label: 'Write' },
      { src: 'n4', tgt: 'n10', label: 'Write' },
      { src: 'n5', tgt: 'n11', label: 'Metrics' },
    ]
  },
  {
    id: 'realtime_chat',
    name: 'Real-Time Chat',
    desc: 'WhatsApp-style messaging system',
    icon: '💬',
    bg: 'linear-gradient(135deg, #FFF7E6, #FFECD1)',
    nodes: [
      { id: 'n1', type: 'mobile',     x: 80,  y: 200, label: 'Mobile A' },
      { id: 'n2', type: 'mobile',     x: 80,  y: 320, label: 'Mobile B' },
      { id: 'n3', type: 'lb',         x: 240, y: 260, label: 'Load Balancer' },
      { id: 'n4', type: 'appserver',  x: 400, y: 200, label: 'WS Server 1' },
      { id: 'n5', type: 'appserver',  x: 400, y: 320, label: 'WS Server 2' },
      { id: 'n6', type: 'queue',      x: 560, y: 260, label: 'Msg Queue' },
      { id: 'n7', type: 'appserver',  x: 720, y: 260, label: 'Msg Service' },
      { id: 'n8', type: 'nosql',      x: 880, y: 200, label: 'Messages DB' },
      { id: 'n9', type: 'redis',      x: 880, y: 320, label: 'Presence Cache' },
      { id: 'n10',type: 'blob',       x: 720, y: 400, label: 'Media Storage' },
    ],
    edges: [
      { src: 'n1',  tgt: 'n3',  label: 'WebSocket' },
      { src: 'n2',  tgt: 'n3',  label: 'WebSocket' },
      { src: 'n3',  tgt: 'n4',  label: 'WS' },
      { src: 'n3',  tgt: 'n5',  label: 'WS' },
      { src: 'n4',  tgt: 'n6',  label: 'Publish' },
      { src: 'n5',  tgt: 'n6',  label: 'Publish' },
      { src: 'n6',  tgt: 'n7',  label: 'Consume' },
      { src: 'n7',  tgt: 'n8',  label: 'Persist' },
      { src: 'n7',  tgt: 'n9',  label: 'Cache' },
      { src: 'n7',  tgt: 'n10', label: 'Upload' },
    ]
  },
  {
    id: 'video_streaming',
    name: 'Video Streaming',
    desc: 'Netflix / YouTube architecture',
    icon: '🎬',
    bg: 'linear-gradient(135deg, #FFF0F0, #FFE0E0)',
    nodes: [
      { id: 'n1', type: 'user',        x: 80,  y: 240, label: 'Viewer' },
      { id: 'n2', type: 'cdn',         x: 240, y: 240, label: 'CDN' },
      { id: 'n3', type: 'api_gateway', x: 400, y: 240, label: 'API Gateway' },
      { id: 'n4', type: 'appserver',   x: 560, y: 160, label: 'Stream Service' },
      { id: 'n5', type: 'appserver',   x: 560, y: 320, label: 'Metadata Svc' },
      { id: 'n6', type: 'worker',      x: 720, y: 160, label: 'Transcoder' },
      { id: 'n7', type: 'blob',        x: 880, y: 160, label: 'Video Storage' },
      { id: 'n8', type: 'nosql',       x: 880, y: 320, label: 'Metadata DB' },
      { id: 'n9', type: 'redis',       x: 720, y: 320, label: 'Recommendations' },
      { id: 'n10',type: 'monitoring',  x: 560, y: 440, label: 'Analytics' },
    ],
    edges: [
      { src: 'n1',  tgt: 'n2',  label: 'Stream' },
      { src: 'n1',  tgt: 'n3',  label: 'HTTPS' },
      { src: 'n2',  tgt: 'n7',  label: 'Fetch' },
      { src: 'n3',  tgt: 'n4',  label: 'REST' },
      { src: 'n3',  tgt: 'n5',  label: 'REST' },
      { src: 'n4',  tgt: 'n6',  label: 'Queue' },
      { src: 'n6',  tgt: 'n7',  label: 'Store' },
      { src: 'n5',  tgt: 'n8',  label: 'Read/Write' },
      { src: 'n5',  tgt: 'n9',  label: 'Cache' },
      { src: 'n4',  tgt: 'n10', label: 'Events' },
    ]
  },
  {
    id: 'ride_sharing',
    name: 'Ride Sharing',
    desc: 'Uber / Lyft location system',
    icon: '🚗',
    bg: 'linear-gradient(135deg, #F0F7FF, #E0EEFF)',
    nodes: [
      { id: 'n1', type: 'mobile',     x: 80,  y: 160, label: 'Driver App' },
      { id: 'n2', type: 'mobile',     x: 80,  y: 320, label: 'Rider App' },
      { id: 'n3', type: 'api_gateway',x: 280, y: 240, label: 'API Gateway' },
      { id: 'n4', type: 'appserver',  x: 460, y: 160, label: 'Location Svc' },
      { id: 'n5', type: 'appserver',  x: 460, y: 320, label: 'Matching Svc' },
      { id: 'n6', type: 'redis',      x: 640, y: 160, label: 'Location Cache' },
      { id: 'n7', type: 'queue',      x: 640, y: 320, label: 'Ride Events' },
      { id: 'n8', type: 'appserver',  x: 820, y: 240, label: 'Pricing Svc' },
      { id: 'n9', type: 'nosql',      x: 1000,y: 200, label: 'Trips DB' },
      { id: 'n10',type: 'external',   x: 1000,y: 320, label: 'Maps API' },
    ],
    edges: [
      { src: 'n1',  tgt: 'n3',  label: 'GPS Update' },
      { src: 'n2',  tgt: 'n3',  label: 'Request' },
      { src: 'n3',  tgt: 'n4',  label: 'REST' },
      { src: 'n3',  tgt: 'n5',  label: 'REST' },
      { src: 'n4',  tgt: 'n6',  label: 'Geo Cache' },
      { src: 'n5',  tgt: 'n7',  label: 'Publish' },
      { src: 'n7',  tgt: 'n8',  label: 'Consume' },
      { src: 'n8',  tgt: 'n9',  label: 'Write' },
      { src: 'n5',  tgt: 'n10', label: 'Route Calc' },
    ]
  },
  {
    id: 'search_engine',
    name: 'Search Engine',
    desc: 'Google-style search infrastructure',
    icon: '🔍',
    bg: 'linear-gradient(135deg, #F5FFF5, #E0FFE8)',
    nodes: [
      { id: 'n1', type: 'browser',    x: 80,  y: 240, label: 'User' },
      { id: 'n2', type: 'api_gateway',x: 240, y: 240, label: 'Search API' },
      { id: 'n3', type: 'appserver',  x: 420, y: 160, label: 'Query Parser' },
      { id: 'n4', type: 'search',     x: 600, y: 160, label: 'Search Index' },
      { id: 'n5', type: 'appserver',  x: 420, y: 320, label: 'Ranking Svc' },
      { id: 'n6', type: 'redis',      x: 600, y: 320, label: 'Result Cache' },
      { id: 'n7', type: 'worker',     x: 780, y: 160, label: 'Web Crawler' },
      { id: 'n8', type: 'datalake',   x: 780, y: 280, label: 'Raw Pages' },
      { id: 'n9', type: 'worker',     x: 960, y: 200, label: 'Indexer' },
      { id: 'n10',type: 'monitoring', x: 600, y: 420, label: 'Analytics' },
    ],
    edges: [
      { src: 'n1',  tgt: 'n2',  label: 'HTTPS' },
      { src: 'n2',  tgt: 'n3',  label: 'Query' },
      { src: 'n3',  tgt: 'n4',  label: 'Lookup' },
      { src: 'n3',  tgt: 'n5',  label: 'Rank' },
      { src: 'n5',  tgt: 'n6',  label: 'Cache Hit' },
      { src: 'n7',  tgt: 'n8',  label: 'Store' },
      { src: 'n8',  tgt: 'n9',  label: 'Process' },
      { src: 'n9',  tgt: 'n4',  label: 'Update Index' },
      { src: 'n2',  tgt: 'n10', label: 'Events' },
    ]
  }
];
