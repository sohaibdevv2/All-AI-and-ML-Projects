import { Artifact, WorkflowTask } from './types';

export const SECTIONS = [
  { id: 1, name: "🛠️ Strategic Prompting", desc: "Cognitive planning models to ensure LLM precision and prevent failure modes early." },
  { id: 2, name: "📚 Research & Grounding", desc: "Establishing strict factual data guardrails to avoid hallucinations during deep research." },
  { id: 3, name: "✍️ Technical Writing", desc: "Automating standard developer documentation guidelines and repository briefs." },
  { id: 4, name: "📊 Data Transformation", desc: "Query maps and mathematical code translators designed to unlock raw metrics instantly." },
  { id: 5, name: "🎨 Visual Strategy & Flow", desc: "Drafting user visual journeys, slide-decks, and code-based architecture block diagrams." },
  { id: 6, name: "🚀 Capstone App Building", desc: "Using human-centered system prompts to configure code scaffolds and scripts." }
];

export const ARTIFACTS: Artifact[] = [
  // Section 1
  {
    id: 1,
    sectionId: 1,
    sectionTitle: "🛠️ Strategic Prompting",
    title: "Structured Prompt Blueprint",
    description: "A repeatable Role-Context-Goal markdown initialization framework that establishes strict parameters to produce predictable, production-grade outputs.",
    implementationHint: "Run this inside your developer console or copy it into your prompt library to initialize highly formal LLM tasks.",
    defaultParams: {
      Role: "Senior Software Architect specializing in distributed systems",
      Context: "Designing a low-latency payment processing microservice handling 5,000 requests per second with strict data consistency.",
      Goal: "Generate a complete system architecture blueprint specifying exact microservice boundaries, double-entry ledger database structures, and network failure-retry fallback procedures."
    },
    paramMetadata: [
      { key: "Role", label: "LLM Role / Persona", placeholder: "e.g., Senior Database Administrator", type: "text" },
      { key: "Context", label: "Technical Context & Constraints", placeholder: "e.g., Migrating an legacy SQL database to NoSQL with zero downtime.", type: "textarea" },
      { key: "Goal", label: "Exact Delivery Goal", placeholder: "e.g., Write a step-by-step schema migration execution plan.", type: "textarea" }
    ],
    template: (p) => `**Role:** ${p.Role}
**Context:** ${p.Context}
**Goal:** ${p.Goal}

Please proceed by first outlining your high-level strategy, identifying any potential performance bottlenecks, and then providing the completed architecture blueprint with structured markdown tables for the data schemas.`
  },
  {
    id: 2,
    sectionId: 1,
    sectionTitle: "🛠️ Strategic Prompting",
    title: "Chain-of-Thought (CoT) Reasoning Guide",
    description: "Forces the LLM to systematically document logical assumptions, edge cases, and design trade-offs step-by-step before returning code, reducing critical errors.",
    implementationHint: "Prepend or append this directive to code-heavy, complex math, or architectural queries.",
    defaultParams: {
      Topic: "Implementing an in-memory sliding window rate limiter in TypeScript without external dependencies",
      Constraints: "Must handle high concurrent traffic and prevent race conditions. High efficiency is critical."
    },
    paramMetadata: [
      { key: "Topic", label: "Core Problem to Solve", placeholder: "e.g., Designing a cache-invalidation strategy", type: "text" },
      { key: "Constraints", label: "Engineering Limitations", placeholder: "e.g., Space complexity O(1), memory cap 128MB", type: "textarea" }
    ],
    template: (p) => `Task: ${p.Topic}
Constraints: ${p.Constraints}

Instructions for Reasoning:
Deconstruct your engineering approach step-by-step before writing a single line of code. You MUST explicitly detail:
1. Your underlying architectural assumptions.
2. Potential failure modes (race conditions, memory leaks, out-of-order execution, etc.).
3. Critical edge-case evaluations (extreme inputs, boundary conditions, zero states).
4. Comparative trade-offs of at least two different implementation strategies.

Only after outputting this exhaustive logical trace, generate the final highly-optimized production-grade code.`
  },
  {
    id: 3,
    sectionId: 1,
    sectionTitle: "🛠️ Strategic Prompting",
    title: "Iterative Refinement Feedback Loop",
    description: "Enables surgical, directional critiques of previous outputs rather than re-prompting from scratch. Preserves state and saves context.",
    implementationHint: "Use this multi-turn dialogue prompt when an AI output is close, but needs targeted refinement in specific areas.",
    defaultParams: {
      OriginalOutput: "A standard Node.js Express script returning random database queries based on query parameters.",
      RevisionCritique: "Keep the exact API endpoint structure and JSON response schema, but rewrite the database access layer to utilize strict asynchronous connections with explicit pooling limits of 20 maximum connections."
    },
    paramMetadata: [
      { key: "OriginalOutput", label: "Original AI Output Context", placeholder: "e.g., An Express server with promises", type: "textarea" },
      { key: "RevisionCritique", label: "Surgical Revision Instruction", placeholder: "e.g., Change database pooled size and make it fully async", type: "textarea" }
    ],
    template: (p) => `I want to iterate on my previous output. 

Current Draft Reference:
"""
${p.OriginalOutput}
"""

Target Revision Directive:
Please maintain the overall context, structure, and headers of the previous draft exactly, but surgically apply the following changes:
👉 ${p.RevisionCritique}

Walk through the modified sections clearly, and output the updated version.`
  },
  {
    id: 4,
    sectionId: 1,
    sectionTitle: "🛠️ Strategic Prompting",
    title: "Modular Persona Map",
    description: "Defines specific organizational roles to evaluate and shape technical assets from various distinct stakeholders' perspectives.",
    implementationHint: "Toggle different persona maps to review requirements, roadmaps, code, or marketing drafts.",
    defaultParams: {
      PersonaSelection: "Tech Lead (Focuses: scalability, low tech-debt, security, speed)",
      DraftDocument: "Proposed microservice roadmap introducing active event streams to replace batched cron schedules."
    },
    paramMetadata: [
      { key: "PersonaSelection", label: "Stakeholder Persona preset", placeholder: "e.g., Tech Lead, Product Owner, Infosec Compliance Officer", type: "select", options: ["Tech Lead (Focus: scalability, clean-code, maintainability)", "Product Owner (Focus: milestones, business value, user stories)", "UX Architect (Focus: micro-interactions, layout simplicity, accessibility)", "Information Security Officer (Focus: zero-trust, data privacy, compliance)"] },
      { key: "DraftDocument", label: "Draft Document or Feature Spec", placeholder: "e.g., User onboarding authentication flow", type: "textarea" }
    ],
    template: (p) => `Act as the following corporate stakeholder: "${p.PersonaSelection}".

Analyze the following proposed draft/specification:
"""
${p.DraftDocument}
"""

Please critique this proposal entirely from your professional perspective. Provide:
1. Critical Concerns (what major items might introduce risk, bottlenecks, or overhead based on your goals).
2. Missing Requirements (what standard parameters or specifications were omitted).
3. Recommended Revisions (actionable, tactical feedback to make this system ready for your signature of approval).`
  },

  // Section 2
  {
    id: 5,
    sectionId: 2,
    sectionTitle: "📚 Research & Grounding",
    title: "NotebookLM Research Corpus",
    description: "An optimization prompt that organizes local source assets (PDFs, Markdown, logs) into structured research vectors inside NotebookLM, preventing standard hallucinations.",
    implementationHint: "Paste this grounding instruction as your baseline system guide in a NotebookLM note or custom grounding system.",
    defaultParams: {
      DocumentName: "Internal VPC Firewall Policies and DB Failover Manual 2026",
      TargetInsights: "Summarize precisely what ports must remain restricted, the network transit tunnels acceptable for database recovery, and how secondary replicas are promoted."
    },
    paramMetadata: [
      { key: "DocumentName", label: "Target Corpus Documents", placeholder: "e.g., API Specifications v3.2, AWS Architecture whitepapers", type: "text" },
      { key: "TargetInsights", label: "Target Grounded Insights", placeholder: "e.g., Identify rate limit response status codes and retry timing headers", type: "textarea" }
    ],
    template: (p) => `Context: Searching inside grounded workspace documents including: "${p.DocumentName}".

You must extract and report information strictly grounded in these provided reference materials. If the material does not explicitly contain the necessary technical details to satisfy the query, clearly declare: "INFORMATION NOT AVAILABLE IN SPECIFIED SOURCE CORPUS" rather than extrapolating.

Goal: ${p.TargetInsights}

Format your output with exact document references and citation fragments where possible.`
  },
  {
    id: 6,
    sectionId: 2,
    sectionTitle: "📚 Research & Grounding",
    title: "Deep Research Query Structure",
    description: "A synthesized search structure designed to feed into deep web research engines to isolate verified source citations and post-2025 technology release years.",
    implementationHint: "Use this formula for Gemini Deep Research, search engines, or AI web search prompts.",
    defaultParams: {
      ComparativeTopicA: "Apache Kafka Event Streams (with multi-active replication cluster setups)",
      ComparativeTopicB: "RabbitMQ Quorum Queues (handling durable partition tolerances)",
      IndustrySector: "E-Commerce high-volume transaction ledger logging"
    },
    paramMetadata: [
      { key: "ComparativeTopicA", label: "Technology Variant A", placeholder: "e.g., Kubernetes in-cluster proxying", type: "text" },
      { key: "ComparativeTopicB", label: "Technology Variant B", placeholder: "e.g., Linkerd Service Mesh egress routing", type: "text" },
      { key: "IndustrySector", label: "Operational Context / Industry", placeholder: "e.g., FinTech real-time high-throughput ledger logging", type: "text" }
    ],
    template: (p) => `Research Task: Perform a targeted deep research lookup comparing "${p.ComparativeTopicA}" against "${p.ComparativeTopicB}" within "${p.IndustrySector}".

Your analysis must strictly focus on comparative metrics including:
1. Operational overhead & infrastructure resource scaling limits.
2. Throughput saturation points (messages/queries per second) under high network latency overhead.
3. Partition tolerance and recovery bounds in multi-region failover.

Guidelines:
- Retrieve whitepapers, technical benchmarks, and vendor specifications.
- Filter out conversational marketing blogs. Only include sources that provide concrete data charts or architectural diagrams.
- Provide source URLs along with exact quotes backing your comparative summary table.`
  },
  {
    id: 7,
    sectionId: 2,
    sectionTitle: "📚 Research & Grounding",
    title: "Document Summarization Profile",
    description: "An extraction template that condenses lengthy technology specifications, whitepapers, or RFCs into highly scannable briefs focusing on constraints and action-items.",
    implementationHint: "Paste this before importing large text files, documentation pages, or raw paper transcripts.",
    defaultParams: {
      DocumentSummaryType: "OAuth 2.1 Security Best Practices RFC Update Draft",
      TextToSummarize: "Attach or copy the lengthy document text here. The AI will extract immediate action items from it."
    },
    paramMetadata: [
      { key: "DocumentSummaryType", label: "Document Classification Type", placeholder: "e.g., Google Spanner DB scaling manual", type: "text" },
      { key: "TextToSummarize", label: "Source Text to Process", placeholder: "Paste or describe manual data files here", type: "textarea" }
    ],
    template: (p) => `Profile: Summarization of document type: "${p.DocumentSummaryType}".

Please analyze the following text:
"""
${p.TextToSummarize}
"""

Extract the content and present it strictly in this format with zero filler:
# Title: [Summarized subject title]

## 1. Core Architecture Thesis
[Express the primary technological goal or purpose of this system in exactly 3 clear sentences.]

## 2. Key Technical Constraints & Limitations
- **Constraint A:** [e.g. Memory overhead, dependency constraints, or latency ceilings]
- **Constraint B:** [e.g. Network protocols, specific hardware bounds, or rate ceilings]
- **Constraint C:** [e.g. Deprecation vectors or migration complexity factors]

## 3. High-Priority Action Items for Engineering
1. [First immediate implementation step]
2. [Testing paradigm required to validate compliance]`
  },

  // Section 3
  {
    id: 8,
    sectionId: 3,
    sectionTitle: "✍️ Technical Writing",
    title: "Standard Markdown README Blueprint",
    description: "An automated compiler template for producing highly structured, professional repository documentation mapping to open-source standards.",
    implementationHint: "Provide raw script files or directory trees to receive a masterfully generated README.",
    defaultParams: {
      RepoName: "Event Sourced Distributed Task Ledger (NestJS & Redis Stack)",
      CodeOutline: "Uses NestJS microservices under port 3001, backed by Redis Streams for message publishing, with built-in Prometheus metric hooks at /metrics and Health routes."
    },
    paramMetadata: [
      { key: "RepoName", label: "Project/Repository Name", placeholder: "e.g., Serverless Invoice Processor", type: "text" },
      { key: "CodeOutline", label: "Core App Outline & Ports", placeholder: "e.g., Python FastAPI app running on port 8000 using SQLite database.", type: "textarea" }
    ],
    template: (p) => `Act as an expert Technical Documentation Specialist. Analyze this project metadata and generate a comprehensive, polished markdown 'README.md' following open-source industry standards.

Project Profile:
- **Repository Name:** ${p.RepoName}
- **Structural Overview:** ${p.CodeOutline}

Your generated README.md MUST include:
1. **Header Section:** Dynamic title with high-contrast badge configurations, descriptive single paragraph.
2. **Prerequisites & System Architecture:** Clean mapping of local software versions (Node, Redis, SQLite, Docker, etc.).
3. **Environment Variables Configuration:** Create a code block with clear placeholders and descriptive comments.
4. **Step-by-Step Installation & Bootstrapping:** Markdown steps with explicit terminal commands.
5. **Usage Snippets:** A fully functioning code snippet demonstrating standard library consumption.
6. **Health Checking & Telemetry:** How to query the metrics/monitoring endpoints.`
  },
  {
    id: 9,
    sectionId: 3,
    sectionTitle: "✍️ Technical Writing",
    title: "Inline Code Documentation Specification",
    description: "Enforces standard comment rules (e.g., JSDoc or PEP 257) across raw code blocks, detailing input parameters, types, exceptions, and return structures.",
    implementationHint: "Highlight any raw code snippet in your IDE and prepend this instruction.",
    defaultParams: {
      FunctionName: "calculateInterestsAndAmortizePayments",
      CodeSegment: "function calculate(p, r, t, extra) { let i = (p * r * t) / 100; let total = p + i; if (extra) { total = total - extra; } return { interest: i, finalPayment: total }; }"
    },
    paramMetadata: [
      { key: "FunctionName", label: "Target Function Name", placeholder: "e.g., processTransactionPayload", type: "text" },
      { key: "CodeSegment", label: "Raw Code Snippet", placeholder: "Paste raw code block", type: "textarea" }
    ],
    template: (p) => `Act as a Senior Engineer focused on codebase maintainability. Standardize this function's documentation using industry standard conventions (JSDoc for TypeScript/JS, Docstrings for Python, etc.).

Target Function: \`${p.FunctionName}\`
Raw Source Code:
\`\`\`
${p.CodeSegment}
\`\`\`

Instructions:
1. Parse the logical variables inside the code segment.
2. Generate structured, explicit documentation blocks directly above the implementation code.
3. Clearly detail:
   - **Description:** Clear summary of the mathematical/logic workflow.
   - **Parameters:** Explicitly state the name, expected type classification, and practical role of each parameter.
   - **Returns:** Describe the structure of the returned object or variable, defining each internal field.
   - **Exceptions/Errors:** Cite what inputs or exceptions trigger failures or validation failures.
4. Output the fully commented code block.`
  },
  {
    id: 10,
    sectionId: 3,
    sectionTitle: "✍️ Technical Writing",
    title: "Technical Release Notes Template",
    description: "An automated translation system that parses raw Git commit hash messages or team PR descriptions into elegant, client-ready markdown changelogs.",
    implementationHint: "Provide raw developer Git commit logs and prompt to translate it for non-technical stakeholders or product managers.",
    defaultParams: {
      CommitLog: "feat(auth): add OAuth2 provider endpoints for Github authentication\nfix(db): resolve connection leaking under intense nested transactions\nrefactor: update UI variables in header bar inline spacing\nchore: bump vite version to 6.2.3",
      ReleaseVersion: "v1.4.2-Production"
    },
    paramMetadata: [
      { key: "CommitLog", label: "Git Commit History Block", placeholder: "Paste git log stdout or PR descriptions", type: "textarea" },
      { key: "ReleaseVersion", label: "Target Release Version Tag", placeholder: "e.g., v2.0.0-Beta", type: "text" }
    ],
    template: (p) => `Act as a Product Manager. Translate the following raw Git developer commit logs into an elegant, customer-ready markdown Release Notes document for version \`${p.ReleaseVersion}\`.

Raw Commits / PR Summaries:
"""
${p.CommitLog}
"""

Formatting Rules:
- Exclude internal technical jargon, commit hashes, or developer-specific shorthand.
- Translate terms into client-facing values (e.g., 'resolve connection leak' becomes 'Enhanced database stability during period of intensive traffic usage').
- Group updates strictly under these major headers:
  🚀 **New Features / Enhancements**
  🛠️ **Bug Fixes & Stability Improvements**
  ⚠️ **Important Advisory & Breaking Changes** (if any, otherwise write 'None')`
  },
  {
    id: 11,
    sectionId: 3,
    sectionTitle: "✍️ Technical Writing",
    title: "Cross-Functional Email Layouts",
    description: "A communication mapper prompt that translates dry, numeric technical systems/incidents reports into appropriate email formats for business stakeholders.",
    implementationHint: "Paste raw error traces, database lag graphs, or system alerts and specify your target audience.",
    defaultParams: {
      TechnicalIncidentReport: "Database container memory saturation peaked at 98.7% at 14:22 UTC. Connection pooling choked out. Redis cache was stale. Total API outage lasted 11 minutes. Solved by increasing container memory dynamically and flush-cleaning cache namespaces.",
      TargetReader: "Business Account Managers & Executive VP of Sales"
    },
    paramMetadata: [
      { key: "TechnicalIncidentReport", label: "Raw Engineering Telemetry or Report", placeholder: "Describe the outage, downtime, or bug in raw jargon", type: "textarea" },
      { key: "TargetReader", label: "Email Audience", placeholder: "e.g., Non-technical business partners, support executives", type: "text" }
    ],
    template: (p) => `Act as a Director of Engineering Customer Success. Formulate a highly polished, professional, and reassuring email based on the following raw system incident report:

 incident context:
\"\"\"
${p.TechnicalIncidentReport}
\"\"\"

Target Audience: ${p.TargetReader}

Guidelines:
1. Translate raw developer-level jargon (saturation, choked connections, flush-namespaces) into professional, business-friendly terms.
2. Structure the email to include:
   - **Status/Summary:** Honest explanation ofwhat took place, without triggering panic.
   - **Impact Metric:** Clear declaration of the duration and sphere of service impacted.
   - **Stabilization & Root Cause:** What corrective actions were immediately put in place to fix the issue.
   - **Preventative Roadmaps:** Precise measures scheduled to ensure this specific incident does not occur again.
3. Keep the tone calm, responsible, and customer-centric.`
  },

  // Section 4
  {
    id: 12,
    sectionId: 4,
    sectionTitle: "📊 Data Transformation",
    title: "Plain-Text Spreadsheet Formula Map",
    description: "A blueprint that translates conversational English descriptions of logical requirements into complex, nested spreadsheet formula statements.",
    implementationHint: "Run this inside your prompt editor whenever you need to compute complex database joins, conditional averages, or lookups in Sheets/Excel.",
    defaultParams: {
      SourceCol: "Column B (containing client subscription join date)",
      LookupCol: "Sheet 'FinancialPlans', Column G (pricing options)",
      LookupCondition: "Lookup the customer subscription plan from Column C in the local database sheet, return row pricing if the status in Column E is marked 'active' and signup date is post-2025."
    },
    paramMetadata: [
      { key: "SourceCol", label: "Source Column Reference", placeholder: "e.g., Column A (Customer ID)", type: "text" },
      { key: "LookupCol", label: "Target Table or Sheet Destination", placeholder: "e.g., 'InventorySheet', Column E", type: "text" },
      { key: "LookupCondition", label: "Conversational Goal of lookup", placeholder: "e.g., return inventory price multiplied by regional tax multiplier", type: "textarea" }
    ],
    template: (p) => `Context: Creating a mathematical cell formula inside Google Sheets / MS Excel.
- Source Variable/Column: ${p.SourceCol}
- Destination Search Range: ${p.LookupCol}
- Conversational Logic Rule: "${p.LookupCondition}"

Instructions:
1. Generate the exact, syntactically correct spreadsheet formula (using standard functions like VLOOKUP, INDEX, MATCH, IF, FILTER, or SUMIFS).
2. Capitalize all function keywords.
3. Below the formula block, provide a clear, step-by-step plain English breakdown explaining why that specific layout was chosen, how error handling (e.g. IFERROR) is incorporated, and how to verify if the formula evaluates successfully.`
  },
  {
    id: 13,
    sectionId: 4,
    sectionTitle: "📊 Data Transformation",
    title: "Natural Language to SQL Query Optimizer",
    description: "A durable interface parser that converts natural business language requests into highly optimized, parameterized SQL statement scripts based on target schemas.",
    implementationHint: "Provide your database schema and prompt to get custom SQL queries complete with proper indexes, join keys, and safety constraints.",
    defaultParams: {
      SchemaContext: "TABLE subscriptions (id UUID, user_id UUID, tier VARCHAR, status VARCHAR, amount NUMERIC, created_at TIMESTAMP);\nTABLE users (id UUID, email VARCHAR, region VARCHAR);",
      NaturalLanguageGoal: "Calculate total revenue contributed by active tier tier-Premium users grouped by region over the past 90 days. Include index suggestions."
    },
    paramMetadata: [
      { key: "SchemaContext", label: "Target SQL Schema Definition", placeholder: "Paste CREATE TABLE statement blocks", type: "textarea" },
      { key: "NaturalLanguageGoal", label: "Data Goal to Query", placeholder: "e.g., Find top 10 products with lowest stock and sort them by supplier reliability.", type: "textarea" }
    ],
    template: (p) => `Schema Context:
\`\`\`sql
${p.SchemaContext}
\`\`\`

Request: Convert the following business request into a high-performance database-compliant SQL query:
"To: ${p.NaturalLanguageGoal}"

Rules for Output:
1. Generate valid, parameterized, standards-compliant SQL (defaulting to PostgreSQL standards unless indicated).
2. Use proper, explicit JOIN keys and clear table aliases.
3. Structure queries with clear casing, indenting, and performance optimization hints (utilizing indexed columns correctly).
4. List the necessary database INDEX syntax to speed up this specific query.`
  },
  {
    id: 14,
    sectionId: 4,
    sectionTitle: "📊 Data Transformation",
    title: "CSV Data Profiler Prompt",
    description: "An analytical parser designated to inspect data files (CSV/JSON), exposing schema patterns, mathematical distributions, anomalies, and data outliers.",
    implementationHint: "Provide raw header grids and a row payload block to audit data sanity.",
    defaultParams: {
      DataSampleHeader: "transaction_id,timestamp,user_id,amount,payment_method,status\nt1,2026-06-15T12:00:00Z,u101,150.00,Stripe,COMPLETED\nt2,2026-06-15T12:02:00Z,,450.00,PayPal,FAILED\nt3,2026-06-15T12:05:00Z,u102,-500.00,Stripe,COMPLETED",
      AnomalyGoals: "Expose critical outlier anomalies (e.g., negative billing amounts, empty fields, corrupted date timestamps)"
    },
    paramMetadata: [
      { key: "DataSampleHeader", label: "CSV Metadata Header & Sample Rows", placeholder: "Paste sample rows of CSV database", type: "textarea" },
      { key: "AnomalyGoals", label: "Audit Objectives", placeholder: "e.g., Find data typing mismatches, anomalies, invalid currency structures", type: "textarea" }
    ],
    template: (p) => `You are a Senior Data Analyst. Analyze the integrity and structural profile of the following CSV content:

CSV Data Extract:
"""
${p.DataSampleHeader}
"""

Audit Goals: ${p.AnomalyGoals}

Instructions:
1. Identify all data completeness violations (null parameters, missing identifiers, blank values).
2. Highlight outliers or mathematical impossibilities (such as negative financial balances, impossible dates, typing mismatches).
3. Outline step-by-step cleaning logic required to programmatically filter or fix this dataset before ingestion.`
  },

  // Section 5
  {
    id: 15,
    sectionId: 5,
    sectionTitle: "🎨 Visual Strategy & Flow",
    title: "Mermaid.js System Architecture Spec",
    description: "A text-to-graphics blueprint that utilizes Mermaid code structures to chart microservice links, ledger interactions, and data flows automatically.",
    implementationHint: "Copy the output markdown code block directly into any markdown viewer or Mermaid live renderer.",
    defaultParams: {
      ServiceA: "Client Web Single Page App (React Container)",
      ServiceB: "API Gateway Proxy Middleware Router",
      ServiceC: "Event Store Database Ledger Cluster",
      FlowType: "Sequence diagram mapping standard user OAuth login confirmation steps"
    },
    paramMetadata: [
      { key: "ServiceA", label: "System Component A", placeholder: "e.g., NextJS Frontend", type: "text" },
      { key: "ServiceB", label: "System Component B", placeholder: "e.g., AWS Lambda serverless handler", type: "text" },
      { key: "ServiceC", label: "System Component C", placeholder: "e.g., Postgres Replication cluster", type: "text" },
      { key: "FlowType", label: "Target Diagram Flow Goal", placeholder: "e.g., Sequence diagram illustrating write-through caching steps", type: "textarea" }
    ],
    template: (p) => `Act as an expert Cloud Architect. Define a precise, syntactically clean Mermaid.js diagram illustrating a: "${p.FlowType}".

The diagram must involve the following structural nodes:
- Node A: "${p.ServiceA}"
- Node B: "${p.ServiceB}"
- Node C: "${p.ServiceC}"

Rules for Output:
1. Provide only fresh, syntax-compliant Mermaid.js structural code inside a standard markdown code block.
2. Ensure there are no syntax errors, invalid linking signs, or loops.
3. Label all activation lines and communication links with precise API event actions (e.g., 'POST /api/auth', 'Sync Query', 'Acknowledge message offset').`
  },
  {
    id: 16,
    sectionId: 5,
    sectionTitle: "🎨 Visual Strategy & Flow",
    title: "User Interface Flow Architecture",
    description: "A textual wireframe planner mapping step-by-step user interfaces, control state variations, and warning thresholds across screens.",
    implementationHint: "Map features completely before writing front-end layout HTML/React pages.",
    defaultParams: {
      FeatureWizard: "Secure 3-Step Wallet Transfer Validation Wizard",
      TotalSteps: "Step 1: Amount Selection -> Step 2: Peer Address Verification -> Step 3: Multifactor SMS Trigger & Finish"
    },
    paramMetadata: [
      { key: "FeatureWizard", label: "Feature/Interface Process Name", placeholder: "e.g., Multi-factor email change form", type: "text" },
      { key: "TotalSteps", label: "Steps and Flows Overview", placeholder: "List sequential panels user is presented with", type: "textarea" }
    ],
    template: (p) => `Draft a complete textual User Interface Flow Specification for: "${p.FeatureWizard}"

Flow Overview:
${p.TotalSteps}

For each individual screen/panel within this flow, map out:
1. **Visual Elements Displayed:** Headers, inputs, status flags, action buttons, active navigation options.
2. **Acceptable Actions & Input Fields:** Specify formatting rules (letters only, numbers with decimal limits, length bounds) for each field.
3. **Primary Validation Guidelines:** Explicit actions taken when entries fail parameter limits.
4. **Conditional Interface State Rules:** Explain clearly where the user is redirected when they cancel or successfully finish the step.`
  },
  {
    id: 17,
    sectionId: 5,
    sectionTitle: "🎨 Visual Strategy & Flow",
    title: "Multi-Slide Presentation Outline",
    description: "Deconstructs complex system files or architectures into highly specific, sequential presentation layouts for reviews or boards.",
    implementationHint: "Feed raw engineering reports to quickly draft formatted slideware speaking scripts.",
    defaultParams: {
      PresentationTopic: "Adopting Agentic AI Workflows and LLM Routing and cognitive guardrails in our SaaS portal.",
      TargetSlidesCount: "5",
      AudienceType: "SaaS Product Executives and Chief technology Officer (CTO)"
    },
    paramMetadata: [
      { key: "PresentationTopic", label: "Presentation Core Theme", placeholder: "e.g., Technical migration review", type: "text" },
      { key: "TargetSlidesCount", label: "Number of Slides", placeholder: "e.g., 5, 8, 10", type: "text" },
      { key: "AudienceType", label: "Target Audience", placeholder: "e.g., Investors, Core Developer Team, HR Managers", type: "text" }
    ],
    template: (p) => `Act as an Elite Tech Presenter and Executive Advisor. Create a comprehensive, highly cohesive slide-by-slide presentation outline for: "${p.PresentationTopic}".

Total Slides Needed: ${p.TargetSlidesCount}
Audience: ${p.AudienceType}

For every single slide, you MUST structure your outline exactly as follows with zero generic text:
# Slide [Number]: [Descriptive Title]
- **Core Visual Layout Strategy:** [Describe the exact visual composition: charts, graphics, split layouts, color highlights, or typography hierarchy. Avoid boring text bullets description.]
- **Dynamic Content Bullet Points:**
  - *Point 1:* [Core argument or statistic]
  - *Point 2:* [Architectural reasoning or trade-off]
  - *Point 3:* [Financial or productivity impact]
- **Speaker Dialogue Script:** [Write word-for-word exactly what the presenter should say to this audience to deliver high impact.]`
  },

  // Section 6
  {
    id: 18,
    sectionId: 6,
    sectionTitle: "🚀 Capstone App Building",
    title: "Vibe Coding Application Architecture",
    description: "The peak of agentic coding: A macro systemic blueprint completely defining local file layouts, state patterns, databases, and routes.",
    implementationHint: "Use this before initializing any brand new app or writing directories in AI Studio or terminal workspaces.",
    defaultParams: {
      TargetFramework: "TypeScript & React 18 SPA (Vite builder, Tailwind CSS v4)",
      DatabaseType: "Client-side LocalStorage state with syncing capabilities",
      TaskDescription: "An interactive, searchable workspace tracker for engineering milestones with filters, checklist states, import/export buttons, and responsive grid layouts."
    },
    paramMetadata: [
      { key: "TargetFramework", label: "Target Framework Engine", placeholder: "e.g., Python FastAPI backend, Next.js fullstack", type: "text" },
      { key: "DatabaseType", label: "Database / Persistence target", placeholder: "e.g., PostgreSQL, SQLite, Firestore", type: "text" },
      { key: "TaskDescription", label: "Complete App Functional Scope", placeholder: "Provide comprehensive description of what application builds", type: "textarea" }
    ],
    template: (p) => `Act as a Senior Principal Engineer. We are starting an architectural blueprint for a brand new application.
- **Underlying Engine/Framework:** ${p.TargetFramework}
- **Data Persistence Strategy:** ${p.DatabaseType}
- **App Objective:** ${p.TaskDescription}

Please map out:
1. **Target Directory Structure Layout:** Complete hierarchical folder mapping from root down to single utility script files.
2. **Package Configurations (package.json / requirements.txt):** Explicit list of crucial NPM/PIP packages needed without versions conflict.
3. **Core Application Entities:** Typescript Interfaces or Database Schema structures.
4. **Endpoint / Router Boundaries:** Detail URL paths, request structures, and expected response codes.
5. **Key Component States:** Map out how data reactivity flows from dashboard down to subcomponents.`
  },
  {
    id: 19,
    sectionId: 6,
    sectionTitle: "🚀 Capstone App Building",
    title: "Boilerplate Elimination Script",
    description: "An instruction pattern designed to generate repetitive, clean operational code scaffold blocks including security CORS headers and health endpoints.",
    implementationHint: "Quickly build new clean services or APIs without writing baseline server setups manually.",
    defaultParams: {
      LanguageFramework: "Express.js with Node, written in clean TypeScript",
      MiddlewareTypes: "JSON parser, CORS headers, logging middleware, error handling safety wrapper, standard health check endpoint at /api/health"
    },
    paramMetadata: [
      { key: "LanguageFramework", label: "Target Server Technology", placeholder: "e.g., Python FastAPI, Go Fiber, Express.js", type: "text" },
      { key: "MiddlewareTypes", label: "Scaffold Middlewares, Ports, Routes", placeholder: "List paths, check endpoints, error wrappers needed", type: "textarea" }
    ],
    template: (p) => `Act as a Senior Software developer. Generate clean, highly secure, and optimized boilerplate code for a: "${p.LanguageFramework}" server initialization.

Configure the boiler plate to cleanly support:
${p.MiddlewareTypes}

Ensure:
- Code uses clean, modular structures with zero placeholders or comments saying 'implement here'.
- Error handling catches all exceptions cleanly without crashing the Node/Python thread.
- Proper CORS origin guidelines are strictly parametrized.`
  },
  {
    id: 20,
    sectionId: 6,
    sectionTitle: "🚀 Capstone App Building",
    title: "Repetitive Workflow Automation Script",
    description: "A script specification blueprint that automates manual routines or folder updates, triggered automatically via webhook or cron schedule parameters.",
    implementationHint: "Generate lightweight micro-utilities to crawl logs, sync cloud files, or scrub backups.",
    defaultParams: {
      AutomatedAction: "Scrapes a remote API JSON database, evaluates for security warning keywords, formats anomalies into HTML markdown emails, and appends summaries to a backup local text log file.",
      TriggerEvent: "Runs as a daily cron schedule script at exactly 02:00 AM UTC"
    },
    paramMetadata: [
      { key: "AutomatedAction", label: "Manual Workflow Action to automate", placeholder: "e.g., Parse server system metrics log, pull outlier anomalies", type: "textarea" },
      { key: "TriggerEvent", label: "Execution Schedule Trigger", placeholder: "e.g., Executed every hour via local cron", type: "text" }
    ],
    template: (p) => `Write a standard, fully functioning Python/Bash script that automates the following manual technical operations workflow:
"Action: ${p.AutomatedAction}"

Trigger Protocol: ${p.TriggerEvent}

Ensure your script incorporates:
1. Robust error checking with try/catch wrapping around all HTTP/Fetch requests.
2. Standard local logging using proper timestamps.
3. Clean configuration parsing from local environment variables (.env files) without hardcoding secrets anywhere.`
  }
];

export const INITIAL_TASKS: WorkflowTask[] = [
  {
    id: "wt-1",
    goal: "Prepare quarterly performance report",
    task: "Identify metrics, query KPIs, and calculate shifting variance relative to last quarter",
    howAiCanHelp: "Parse sheets directly to calculate variance percent shifts, detect data anomalies, or outline bullet trends",
    timeSpent: "High",
    frequency: "Medium",
    repetitiveness: "High"
  },
  {
    id: "wt-2",
    goal: "Prepare quarterly performance report",
    task: "Develop visual charts and high-impact graphs to illustrate raw business metrics",
    howAiCanHelp: "Generate clean data visualizers or formulate optimal coordinates for visual plots automatically",
    timeSpent: "Medium",
    frequency: "Medium",
    repetitiveness: "Medium"
  },
  {
    id: "wt-3",
    goal: "Build a social media calendar",
    task: "Brainstorm creative copy headlines, write engagement hooks, and design visual asset briefs",
    howAiCanHelp: "Adopt advisor personas to suggest 10 whimsical/logical headline formats and outline detailed visual design cues",
    timeSpent: "High",
    frequency: "High",
    repetitiveness: "High"
  },
  {
    id: "wt-4",
    goal: "Revamp company onboarding process",
    task: "Draft standard FAQs, write employee handbooks, and compile checklists for department heads",
    howAiCanHelp: "Automate raw outline expansions into comprehensive, standardized markdown manuals using technical specs",
    timeSpent: "High",
    frequency: "Low",
    repetitiveness: "Medium"
  }
];

// Presets for the Tiebreaker Simulator
export const TIEBREAKER_PRESETS = [
  {
    decision: "Should I offer my software for free with paid premium features, or charge a flat $20/month premium plan from day one?",
    type: "pros_cons",
    analysis: {
      optionA: "Option A: Freemium (Free baseline tiers with paid features)",
      optionB: "Option B: Premium Flat-Fee ($20/month Subscription)",
      title: "Business Monetization Evaluation Matrix",
      prosA: [
        "Massive organic user acquisition velocity - reduces friction entirely.",
        "Generates huge network effects and user feedback streams early on.",
        "Allows bottom-up product adoption in target corporate environments."
      ],
      consA: [
        "Extremely high server resource & hosting overhead supporting non-paying users.",
        "Historically lower conversion rates to paid (typically 2-5%).",
        "Could dilute your perceived brand authority value proposition."
      ],
      prosB: [
        "Immediate cash flow and direct validation of product value proposition.",
        "Eliminates unprofitable support cycles, keeping resources focused on high-value customers.",
        "Simpler engineering infrastructure: no limits, gates, or conversion paywalls to build."
      ],
      consB: [
        "Extremely high customer acquisition costs (CAC) on cold traffic.",
        "Much smaller top-of-funnel reach, meaning fewer opportunities for viral expansion.",
        "Competitors with free alternatives can easily undercut initial user interest."
      ],
      recommendation: "Freemium is recommended if your hosting margins are extremely thin or visual virality is built into the product loop. Flat-fee $20/month is superior for utility SaaS models with high structural AI token/compute costs where supporting non-paying users is economically unsustainable.",
      swot: null,
      comparison: null
    }
  },
  {
    decision: "Should we migrate our legacy database storage to fully managed Google Cloud Spanner, or stick to our self-hosted PostgreSQL replication clusters?",
    type: "swot",
    analysis: {
      title: "Spanner vs. Self-Hosted SQL Architectural SWOT Analysis",
      swot: {
        strengths: [
          "Google Cloud Spanner offers industry-leading external consistency with global horizontal scalability.",
          "Eliminates manual sharding, patching, replication configuration, and database failover scripts."
        ],
        weaknesses: [
          "Significantly higher monetary costs than standard hosting setups.",
          "Requires custom dialect adaptations; not 100% compliant with standard ANSI PostgreSQL syntax without conversion layers."
        ],
        opportunities: [
          "Enables zero-downtime, active-active multi-region user access across continents.",
          "Allows the engineering squad to focus completely on feature architecture rather than database infrastructure maintenance."
        ],
        threats: [
          "Complete vendor lock-in to Google Cloud infrastructure ecosystem.",
          "Budgets can inflate rapidly if developers run unoptimized queries across massive schemas without proper index constraints."
        ]
      },
      recommendation: "If sub-millisecond multi-region global synchronization is critical for your data integrity layer (e.g. distributed ledger balances), migrate to Spanner immediately. If you operate primarily in single-region setups under standard relational limits, self-hosted or standard managed SQL remains far more cost-efficient."
    }
  },
  {
    decision: "What should I eat tonight: Shaving hours cooking a healthy home meal, or ordering spicy Chinese food delivery right away?",
    type: "comparison",
    analysis: {
      title: "Nutritional vs. Convenience Comparison Matrix",
      comparison: [
        { criteria: "Preparation Time", home: "30-45 minutes active cooking", delivery: "10 minutes ordering (30 min wait time)" },
        { criteria: "Financial Cost", home: "Very Low (~$5 of fresh ingredients)", delivery: "High (~$35 including delivery, service fees, tips)" },
        { criteria: "Nutritional Cleanliness", home: "High (controlled oils, low sodium, clean greens)", delivery: "Low (often high sodium, deep fried, process additives)" },
        { criteria: "Post-Meal Contentment", home: "High (sustainable energy, proud accomplishment)", delivery: "Short-term satisfaction, high carb crash later" }
      ],
      recommendation: "Choose home cooking to maintain physical fitness and financial budget. Reserve delivery order as a special reward when completing major engineering deliverables."
    }
  }
];
