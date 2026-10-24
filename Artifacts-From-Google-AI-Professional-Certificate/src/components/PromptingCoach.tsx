import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Code, 
  BookOpen, 
  FileText, 
  User, 
  CheckSquare, 
  Check, 
  Copy, 
  Zap, 
  ListOrdered, 
  ArrowRight,
  TrendingUp,
  MessageSquare,
  FileDown,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const WORKPLACE_TASKS = [
  {
    id: 'creation',
    title: 'Content Creation',
    description: 'Use AI to brain-storm or draft original images, videos, documents, and code drafts.',
    scenario: 'You are trying to launch a new marketing campaign, but get stuck while drafting a catchy tagline that captures the product’s core value.',
    samplePrompt: 'Act as a creative advertising professional. Create a tagline for a washing machine that gets clothes extra clean, has 25 customizable settings, and fits in a small space. The tagline should use an active voice, and be no more than 6 words. Refer to these examples of successful taglines in this industry:\n- Reference #1: Less soap. More clean.\n- Reference #2: Transform laundry into magic.',
    tip: 'Move past creative block by treating AI as a collaborative creative partner. Add references to style guide examples.'
  },
  {
    id: 'summarize',
    title: 'Summarization',
    description: 'Process and condense large volumes of text while preserving the critical semantic highlights.',
    scenario: 'You receive a dense email from a software vendor listing complicated subscription tiers. You need a fast, scannable brief for your team.',
    samplePrompt: 'Summarize the following email from a software vendor. Create a concise, professional summary that includes a bulleted list of each paid subscription tier with its benefits. The summary should be easy to quickly review.\n\n[Insert email content here]',
    tip: 'Define specific format requirements (like "bulleted lists" or "under 200 words") to restrict AI wordiness.'
  },
  {
    id: 'class',
    title: 'Classification',
    description: 'Instruct AI to analyze, sort, and categorize raw text files according to strict criteria.',
    scenario: 'Your customer support channel receives hundreds of product reviews, and you need a fast way to organize them into positive, neutral, and urgent categories.',
    samplePrompt: 'Analyze these customer reviews and tell me whether the sentiment of the reviews is positive, negative, or neutral. For each review, provide a one-sentence explanation for the classification based on these criteria:\n● Positive: Consistently favorable comments or mostly positive with minor criticisms\n● Neutral: Mixed positive and negative comments\n● Negative: Consistently unfavorable comments or mostly negative with minor positive elements',
    tip: 'Always declare clear, explicit definitions of categories to prevent the model from creating random taxonomies.'
  },
  {
    id: 'extraction',
    title: 'Extraction',
    description: 'Save valuable hours by instructing AI to pull specific datasets, indices, or figures from complex documents.',
    scenario: 'You are a department manager planning your annual clothing budget, and need to extract price points from a long, conversational blog post.',
    samplePrompt: 'I\'m planning our department\'s clothing budget and need to track pricing trends. Extract all of the references to items of clothing I can buy and how much each item costs from the text below. Create a spreadsheet layout of just these items. Format the output with two columns labeled "Item" and "Price." Capitalize list items and organize them by price from high to low.',
    tip: 'To achieve highly precise results, use the verb "exact" in your prompt, coupled with target output column names.'
  },
  {
    id: 'translate',
    title: 'Translation',
    description: 'Translate collateral for global audiences while preserving cultural context and native marketing nuances.',
    scenario: 'You are a boutique bicycle shop expanding your marketing descriptions to Netherlands clients but want to preserve a casual tone.',
    samplePrompt: 'We\'re a boutique bike shop that sells cycling and outdoor adventure gear. Translate our product descriptions from English to Dutch. Maintain the same structure and casual tone that is used in the English version in the Dutch translation. Consider cultural context and ensure the expressions maintain their marketing appeal in Dutch.',
    tip: 'Don\'t just translate literally. Instruct the model to "transcreate" or keep the original promotional tone and cultural references.'
  },
  {
    id: 'editing',
    title: 'Refining & Editing',
    description: 'Simplify terms, enhance grammar, and adjust delivery tone for different targeted stakeholders.',
    scenario: 'You have drafted a highly technical internal memo about site selection but need to present it clearly to local neighborhood citizens.',
    samplePrompt: 'As the communications manager for a manufacturing company, I need to explain our site selection process to local community stakeholders. Rewrite this text for a non-technical audience. Simplify the language while keeping all the main ideas intact.\n\n[Insert technical text here]',
    tip: 'Specify your target audience clearly ("non-technical", "board of directors", "students") to calibrate vocabulary difficulty.'
  },
  {
    id: 'solving',
    title: 'Problem Solving & Steps',
    description: 'Deconstruct complex strategic bottlenecks into clear sequential milestones.',
    scenario: 'You are organizing a beginner gardening community program and need to list appropriate plant types and schedule their harvesting timelines.',
    samplePrompt: '[Step 1] We are running a community program to teach beginners gardening skills. The program runs from June 1 to August 15. Identify a list of 10 plants that can be planted and grown in that time period in a temperate climate.\n\n[Step 2] Next, choose three plants from the list that will provide participants with the most variety. We want plants that are as different from each other as possible.',
    tip: 'Break requests into smaller pieces. Ask for steps one at a time so you can review and review the intermediate results.'
  }
];

export default function PromptingCoach() {
  const [subTab, setSubTab] = useState<'gems' | 'framework' | 'tasks'>('gems');

  // Interactive Prompt Builder State (Tab B)
  const [builderPersona, setBuilderPersona] = useState('Senior Business Consultant');
  const [builderTask, setBuilderTask] = useState('Create a list of 3 strategic execution models');
  const [builderContext, setBuilderContext] = useState('The user owns a local organic grocery delivery startup facing high logistics costs');
  const [builderFormat, setBuilderFormat] = useState('A professional markdown table detailing risks and advantages, active voice');
  const [copiedBuilder, setCopiedBuilder] = useState(false);

  // Gems Creator Simulator State (Tab A)
  const [gemName, setGemName] = useState('Copywriting assistant');
  const [gemDesc, setGemDesc] = useState('Writing helper for marketing copy');
  const [gemInstructions, setGemInstructions] = useState('You are an expert copywriter. Your key characteristics include editing existing writing and making suggestions for how to improve content. I am a small business owner. Use your expertise to challenge my thinking and ensure my ideas are sound. Your advice should be clear, concise, and professional.');
  const [defaultTool, setDefaultTool] = useState('Canvas');
  const [knowledgeFiles, setKnowledgeFiles] = useState<string[]>(['brand_identity_guidelines.pdf']);
  const [newFileName, setNewFileName] = useState('');
  const [simulatedChatHistory, setSimulatedChatHistory] = useState<{ role: 'user' | 'gem'; text: string }[]>([
    { role: 'gem', text: 'Hi! I am your Copywriting assistant. Paste any draft copy, tagline ideas, or product descriptions and let\'s turn them into magic together!' }
  ]);
  const [userChatInput, setUserChatInput] = useState('');
  const [isGemResponding, setIsGemResponding] = useState(false);

  // Workplace Task state (Tab C)
  const [selectedTaskId, setSelectedTaskId] = useState('creation');
  const [copiedTaskPrompt, setCopiedTaskPrompt] = useState(false);

  // Real-time compliance check for custom Gem instructions
  const gemScores = useMemo(() => {
    const text = gemInstructions.toLowerCase();
    
    // Checks
    const hasPersona = text.includes('you are') || text.includes('act as') || text.includes('expert') || text.includes('specialist') || text.includes('role') || text.includes('persona') || text.includes('analyst') || text.includes('guide');
    const hasTask = text.includes('create') || text.includes('summarize') || text.includes('write') || text.includes('analyze') || text.includes('list') || text.includes('help') || text.includes('provide') || text.includes('generate');
    const hasContext = text.includes('context') || text.includes('brand') || text.includes('user') || text.includes('startup') || text.includes('guidelines') || text.includes('business') || text.includes('situation') || text.includes('audience');
    const hasFormat = text.includes('format') || text.includes('bullet') || text.includes('table') || text.includes('concise') || text.includes('tone') || text.includes('style') || text.includes('length') || text.includes('paragraphs');

    const scoreList = [hasPersona, hasTask, hasContext, hasFormat];
    const totalScore = Math.round((scoreList.filter(Boolean).length / 4) * 100);

    return {
      hasPersona,
      hasTask,
      hasContext,
      hasFormat,
      totalScore
    };
  }, [gemInstructions]);

  // Handle building dynamic prompt
  const compiledDynamicPrompt = useMemo(() => {
    return `You are a ${builderPersona.trim() || '[Specify Persona]'}. Your task is to: ${builderTask.trim() || '[Specify Task]'}. \n\nBefore you start, here is some critical context: ${builderContext.trim() || '[Specify Context]'}. \n\nPlease format the response as follows: ${builderFormat.trim() || '[Specify Format]'}.`;
  }, [builderPersona, builderTask, builderContext, builderFormat]);

  const handleCopyBuilder = async () => {
    try {
      await navigator.clipboard.writeText(compiledDynamicPrompt);
      setCopiedBuilder(true);
      setTimeout(() => setCopiedBuilder(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    setKnowledgeFiles(prev => [...prev, newFileName.trim()]);
    setNewFileName('');
  };

  const handleRemoveFile = (index: number) => {
    setKnowledgeFiles(prev => prev.filter((_, i) => i !== index));
  };

  const selectedTaskData = useMemo(() => {
    return WORKPLACE_TASKS.find(t => t.id === selectedTaskId) || WORKPLACE_TASKS[0];
  }, [selectedTaskId]);

  const handleCopyTaskPrompt = async () => {
    try {
      await navigator.clipboard.writeText(selectedTaskData.samplePrompt);
      setCopiedTaskPrompt(true);
      setTimeout(() => setCopiedTaskPrompt(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Simulate Gem response in live playground
  const handleSendChatToGem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChatInput.trim() || isGemResponding) return;

    const userMsg = userChatInput;
    setSimulatedChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setUserChatInput('');
    setIsGemResponding(true);

    setTimeout(() => {
      let responseText = '';
      const promptLower = userMsg.toLowerCase();

      // Simple heuristic persona reactions
      if (gemName.toLowerCase().includes('write') || gemName.toLowerCase().includes('copywriter') || gemName.toLowerCase().includes('writing')) {
        responseText = `Adjusting lens as a Copywriting assistant. Here is an optimized rewrite of your seed ideas using professional principles:\n\n"Unleash your full focus. Elevate your everyday standards." \n\nI evaluated this draft based on high emotional alignment standards and ensured we are targeting immediate product benefits. Do you want me to expand this into a social media content brief or an advertising copy block?`;
      } else if (gemName.toLowerCase().includes('planner') || gemName.toLowerCase().includes('productivity') || gemName.toLowerCase().includes('manager')) {
        responseText = `Let's break down your request. Evaluating your productivity goals, here are the sequential steps:\n1. Consolidate your core checklist down to 3 major milestones.\n2. Dedicate a focused 45-minute block with zero browser distraction.\n3. Integrate Google Docs workspace tracking guidelines.\n\nDoes this align with your calendar bounds?`;
      } else {
        responseText = `Simulated response from "${gemName}". I have applied your specific Instructions (${gemInstructions.slice(0, 40)}...) to solve this task. My default canvas tool is loaded on "${defaultTool}". \n\nReady for your next iteration loop!`;
      }

      setSimulatedChatHistory(prev => [...prev, { role: 'gem', text: responseText }]);
      setIsGemResponding(false);
    }, 1000);
  };

  const handleResetGemChat = () => {
    setSimulatedChatHistory([
      { role: 'gem', text: `Hi! I am your custom ${gemName || 'Gem'}. Let's run repeatable task workflows together!` }
    ]);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs" id="prompting-coach-root">
      
      {/* Tab Select Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#1A73E8]" /> Prompting Best Practices &amp; Gems Hub
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Master the official Google AI Certificate guidelines: structure elite instructions, simulate custom Gems, and deploy targeted workplace task templates.
          </p>
        </div>
        
        {/* Sub-navigation tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setSubTab('gems')}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-md transition-all cursor-pointer ${subTab === 'gems' ? 'bg-white text-[#1A73E8] shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
          >
            💎 Gems Simulator
          </button>
          <button
            onClick={() => setSubTab('framework')}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-md transition-all cursor-pointer ${subTab === 'framework' ? 'bg-white text-[#1A73E8] shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
          >
            📋 4-Part Framework
          </button>
          <button
            onClick={() => setSubTab('tasks')}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-md transition-all cursor-pointer ${subTab === 'tasks' ? 'bg-white text-[#1A73E8] shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
          >
            🚀 Workplace Tasks
          </button>
        </div>
      </div>

      {subTab === 'gems' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 p-4 rounded-xl border border-blue-100 shadow-3xs flex items-start gap-3">
            <div className="p-2 bg-[#F1F7FE] text-[#1A73E8] rounded-lg mt-0.5">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">What are Gemini Gems?</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Gems let you save detailed instructions for your most repeatable operational tasks so you can save development hours and focus on deeper, more automated actions. Practice modeling custom Gems below and evaluate them automatically using structural prompt validation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left Box: Custom Gem Configuration */}
            <div className="xl:col-span-6 space-y-5 bg-slate-50/50 p-5 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1">
                  <Code className="h-3.5 w-3.5 text-[#1A73E8]" /> GEM MANAGER BLUEPRINT
                </span>
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  Editable Custom Gem
                </span>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  <span>Gem Name</span>
                  <span className="text-slate-400 text-[10px] font-normal">Give your personalized Gem a name</span>
                </label>
                <input 
                  type="text"
                  value={gemName}
                  onChange={(e) => setGemName(e.target.value)}
                  placeholder="e.g. Copywriting assistant, Code tutor..."
                  className="w-full bg-white border border-slate-200 focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none font-bold"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  <span>Description</span>
                  <span className="text-slate-400 text-[10px] font-normal">Add a short purpose</span>
                </label>
                <input 
                  type="text"
                  value={gemDesc}
                  onChange={(e) => setGemDesc(e.target.value)}
                  placeholder="e.g. Writing helper for social media channels"
                  className="w-full bg-white border border-slate-200 focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] rounded-lg p-2.5 text-xs text-slate-850 focus:outline-none"
                />
              </div>

              {/* Instructions */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-700">Detailed Instructions</label>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">Structural Builder Score: {gemScores.totalScore}%</span>
                </div>
                <p className="text-[10px] text-slate-500 mb-1 leading-snug">
                  Provide detailed guidelines. Be clear, concise, represent context, and declare your desired output formats.
                </p>
                <textarea 
                  value={gemInstructions}
                  onChange={(e) => setGemInstructions(e.target.value)}
                  rows={6}
                  placeholder="Insert instructions for your Gem..."
                  className="w-full bg-white border border-slate-200 focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none font-mono leading-relaxed"
                />
              </div>

              {/* Workspace Tools selection & Knowledge reference upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Default Sandbox Tool</label>
                  <select 
                    value={defaultTool}
                    onChange={(e) => setDefaultTool(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] rounded-lg p-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="Canvas">Canvas (Live HTML/Doc Workspace)</option>
                    <option value="Google Docs">Google Docs Workspace Export</option>
                    <option value="Code Editor">Code Terminal Console</option>
                    <option value="None">No preloaded tool</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Knowledge Reference Files</label>
                  <form onSubmit={handleAddFile} className="flex gap-1.5">
                    <input 
                      type="text" 
                      placeholder="e.g. style_guide.docx"
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      className="flex-1 bg-white border border-slate-200 rounded-lg p-1.5 text-[11px] focus:outline-none"
                    />
                    <button type="submit" className="bg-[#1A73E8] text-white px-2.5 rounded text-[11px] font-bold hover:bg-blue-600 transition-colors cursor-pointer">
                      +
                    </button>
                  </form>
                </div>
              </div>

              {knowledgeFiles.length > 0 && (
                <div className="bg-white p-2.5 border border-slate-250 rounded-lg space-y-1 relative shadow-3xs">
                  <span className="text-[9px] font-mono font-bold text-slate-400 block tracking-widest uppercase">UPLOADED REFERENCES</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {knowledgeFiles.map((f, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-600">
                        <FileText className="h-3 w-3 text-[#1A73E8]" /> {f}
                        <button type="button" onClick={() => handleRemoveFile(idx)} className="hover:text-rose-500 font-bold ml-1 text-slate-400">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Box: Live Playground Evaluation */}
            <div className="xl:col-span-6 flex flex-col gap-6">
              
              {/* Real-time Structural Validation Scorecard */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center justify-between">
                  <span>Gem Instruction Auditor</span>
                  <span className={gemScores.totalScore === 100 ? 'text-emerald-600' : 'text-[#1A73E8]'}>
                    {gemScores.totalScore}% Optimized
                  </span>
                </h5>

                <div className="grid grid-cols-2 gap-3 mb-1">
                  {/* Persona */}
                  <div className={`p-3 rounded-xl border text-left flex items-start gap-2 shadow-3xs ${gemScores.hasPersona ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    {gemScores.hasPersona ? <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />}
                    <div>
                      <h6 className="text-[11px] font-bold font-sans">Persona Aspect</h6>
                      <p className="text-[10px] mt-0.5 leading-snug">Expert role context identified.</p>
                    </div>
                  </div>

                  {/* Task */}
                  <div className={`p-3 rounded-xl border text-left flex items-start gap-2 shadow-3xs ${gemScores.hasTask ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    {gemScores.hasTask ? <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />}
                    <div>
                      <h6 className="text-[11px] font-bold font-sans">Task Aspect</h6>
                      <p className="text-[10px] mt-0.5 leading-snug">Action words and missions loaded.</p>
                    </div>
                  </div>

                  {/* Context */}
                  <div className={`p-3 rounded-xl border text-left flex items-start gap-2 shadow-3xs ${gemScores.hasContext ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    {gemScores.hasContext ? <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />}
                    <div>
                      <h6 className="text-[11px] font-bold font-sans">Context Aspect</h6>
                      <p className="text-[10px] mt-0.5 leading-snug">Reference variables or constraints described.</p>
                    </div>
                  </div>

                  {/* Format */}
                  <div className={`p-3 rounded-xl border text-left flex items-start gap-2 shadow-3xs ${gemScores.hasFormat ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    {gemScores.hasFormat ? <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />}
                    <div>
                      <h6 className="text-[11px] font-bold font-sans">Format Aspect</h6>
                      <p className="text-[10px] mt-0.5 leading-snug">Formatting boundaries, tone limits, tables specified.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Interactive Simulation Playground */}
              <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-850 shadow-2xl flex-1 flex flex-col min-h-[350px]">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <h5 className="text-xs font-bold leading-none">{gemName || 'Untitled Gem'}</h5>
                      <p className="text-[10px] text-slate-400 mt-1">{gemDesc || 'No description designated'}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleResetGemChat}
                    className="text-[10px] font-mono text-slate-400 hover:text-white border border-slate-800 hover:border-slate-600 px-2.5 py-1 rounded transition-colors cursor-pointer"
                  >
                    Reset Chat
                  </button>
                </div>

                {/* Chat items list wrapper */}
                <div className="flex-1 overflow-y-auto space-y-3 font-sans text-xs max-h-[220px] scrollbar-thin scrollbar-thumb-slate-800 pr-1 select-text">
                  {simulatedChatHistory.map((ch, idx) => (
                    <div key={idx} className={`flex flex-col ${ch.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <span className="text-[9px] font-mono uppercase text-slate-500 mb-0.5 font-bold">
                        {ch.role === 'user' ? 'Client Prompter' : `${gemName || 'Gem'}`}
                      </span>
                      <div className={`p-3 rounded-xl max-w-[90%] leading-relaxed shadow-3xs ${ch.role === 'user' ? 'bg-[#1A73E8] text-white rounded-tr-none' : 'bg-slate-800/80 text-slate-200 border border-slate-750 rounded-tl-none'}`}>
                        {ch.text}
                      </div>
                    </div>
                  ))}
                  {isGemResponding && (
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono py-1">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#1A73E8]" /> 
                      <span>"{gemName}" is evaluating instructions &amp; files...</span>
                    </div>
                  )}
                </div>

                {/* Submitting query input */}
                <form onSubmit={handleSendChatToGem} className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
                  <input 
                    type="text"
                    value={userChatInput}
                    onChange={(e) => setUserChatInput(e.target.value)}
                    placeholder={`Query your custom ${gemName}...`}
                    disabled={isGemResponding}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs focus:outline-none focus:border-[#1A73E8] text-slate-100 placeholder-slate-500"
                  />
                  <button 
                    type="submit" 
                    disabled={isGemResponding || !userChatInput.trim()}
                    className="bg-[#1A73E8] hover:bg-blue-600 disabled:opacity-40 text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    Send <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}

      {subTab === 'framework' && (
        <div className="space-y-6">
          <div className="bg-[#F1F7FE] p-5 rounded-xl border border-blue-100 flex flex-wrap gap-8 items-center justify-between">
            <div className="space-y-1 max-w-2xl">
              <h4 className="text-sm font-bold text-slate-900">The 4-Part Strategic Prompting Framework</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Google's recommended standard dictates that every stellar AI request MUST compile four distinct structural items: <strong className="text-slate-850">Persona</strong>, <strong className="text-slate-850">Task</strong>, <strong className="text-slate-850">Context</strong>, and <strong className="text-slate-850">Format</strong>. Test it yourself below.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded bg-blue-100 text-blue-800">Persona</span>
              <span className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded bg-purple-100 text-purple-800">Task</span>
              <span className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded bg-amber-100 text-amber-800">Context</span>
              <span className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded bg-emerald-100 text-emerald-800">Format</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Interactive Constructor builder */}
            <div className="lg:col-span-5 space-y-4 bg-slate-50/50 p-5 rounded-xl border border-slate-200">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-2">PROMPT CONSTRUCTOR</h4>
              
              {/* Persona */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#1A73E8] uppercase tracking-wider flex items-center gap-1">
                  <User className="h-3 w-3" /> Persona (Your Role Expert)
                </label>
                <input 
                  type="text"
                  value={builderPersona}
                  onChange={(e) => setBuilderPersona(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none"
                />
              </div>

              {/* Task */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1">
                  <CheckSquare className="h-3 w-3" /> Task (Goal to Achieve)
                </label>
                <input 
                  type="text"
                  value={builderTask}
                  onChange={(e) => setBuilderTask(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none"
                />
              </div>

              {/* Context */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
                  <FileText className="h-3 w-3" /> Context (Background Rules / Reference)
                </label>
                <textarea 
                  value={builderContext}
                  onChange={(e) => setBuilderContext(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none"
                />
              </div>

              {/* Format */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                  <ListOrdered className="h-3 w-3" /> Format (Structure Constraints / Tone)
                </label>
                <input 
                  type="text"
                  value={builderFormat}
                  onChange={(e) => setBuilderFormat(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Compiled code block output */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              
              {/* Prompt Block */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col min-h-[170px] select-text shadow-xl relative">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Zap className="h-3 w-3" /> COMPILED FULL STREAM PROMPT
                  </span>
                  <button
                    onClick={handleCopyBuilder}
                    className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] font-mono hover:underline cursor-pointer"
                  >
                    {copiedBuilder ? (
                      <span className="flex items-center gap-1 text-emerald-400"><Check className="h-3 w-3" /> Copied!</span>
                    ) : (
                      <span className="flex items-center gap-1"><Copy className="h-3 w-3" /> Copy Output</span>
                    )}
                  </button>
                </div>
                <div className="flex-1 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed select-all">
                  {compiledDynamicPrompt}
                </div>
              </div>

              {/* The Three C's card panel */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-3xs leading-relaxed text-left">
                  <span className="h-6 w-6 rounded-full bg-blue-50 text-blue-800 font-mono text-xs font-bold flex items-center justify-center mb-2 shadow-2xs">1</span>
                  <h5 className="text-xs font-bold text-slate-800 hover:text-slate-900">Be Concise</h5>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">Avoid multi-page instructions in a single prompt. Simple, targeted prompts require less cognitive processing.</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-3xs leading-relaxed text-left">
                  <span className="h-6 w-6 rounded-full bg-purple-50 text-purple-800 font-mono text-xs font-bold flex items-center justify-center mb-2 shadow-2xs">2</span>
                  <h5 className="text-xs font-bold text-slate-800 hover:text-slate-900">Be Clear</h5>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">Declare exact constraints. Avoid vague statements like "make this look cool or pretty." Specify clear output targets.</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-3xs leading-relaxed text-left">
                  <span className="h-6 w-6 rounded-full bg-amber-50 text-amber-800 font-mono text-xs font-bold flex items-center justify-center mb-2 shadow-2xs">3</span>
                  <h5 className="text-xs font-bold text-slate-800 hover:text-slate-900">Be Consistent</h5>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">Use the same core nomenclature. If you define a "Sheet" in step 1, don't switch and call it a "Tab Grid" in step 2.</p>
                </div>
              </div>

              {/* Continuous Evaluation parameters */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-3xs">
                <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-2">ALWAYS EVALUATE AI OUTPUTS FOR:</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs leading-tight text-slate-600">
                  <div className="p-2 border border-slate-200 rounded-lg bg-white"><strong>📈 Accuracy</strong>: Are all mathematical claims &amp; credentials factually sound and certified?</div>
                  <div className="p-2 border border-slate-200 rounded-lg bg-white"><strong>⚖️ Bias Audit</strong>: Does the output present balanced and objective perspectives?</div>
                  <div className="p-2 border border-slate-200 rounded-lg bg-white"><strong>🎯 Relevancy</strong>: Does the output directly answer your custom conditions?</div>
                  <div className="p-2 border border-slate-200 rounded-lg bg-white"><strong>🔄 Consistency</strong>: Is tone, vocabulary, and formatting stable throughout?</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {subTab === 'tasks' && (
        <div className="space-y-6">
          <div className="bg-slate-50/70 p-4 border border-slate-200 rounded-xl leading-relaxed">
            <h4 className="text-sm font-bold text-slate-800">Prompting for Specific Key Workplace Tasks</h4>
            <p className="text-xs text-slate-500 mt-1">
              Google identifies seven major cognitive tasks frequently optimized in high-efficiency workspaces. Select a task below to read its core scenario, sample prompting structures, and professional tips.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left sidebar listing workplace tasks */}
            <div className="lg:col-span-4 space-y-1.5 overflow-y-auto max-h-[380px] pr-1">
              {WORKPLACE_TASKS.map(task => (
                <button
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex justify-between items-center cursor-pointer ${selectedTaskId === task.id ? 'bg-[#F1F7FE] border-[#1A73E8] text-[#1A73E8] font-bold shadow-3xs' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800'}`}
                >
                  <div className="truncate">
                    <span className="block font-sans">{task.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal truncate mt-0.5 block">{task.description}</span>
                  </div>
                  <ChevronRightIcon className={`h-4 w-4 shrink-0 transition-transform ${selectedTaskId === task.id ? 'translate-x-1' : ''}`} />
                </button>
              ))}
            </div>

            {/* Right: Focused Dashboard Viewer */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Scenario description block */}
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
                <span className="text-[9px] font-mono font-bold bg-[#1A73E8]/10 text-[#1A73E8] px-2 py-0.5 rounded uppercase">
                  WORKPLACE SCENARIO
                </span>
                <h4 className="text-sm font-bold text-slate-850 mt-2 font-sans">{selectedTaskData.title} Scenario</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed italic">
                  "{selectedTaskData.scenario}"
                </p>
              </div>

              {/* Sample Prompt Box */}
              <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl text-left shadow-lg select-text relative">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    SAMPLE WORKPLACE PROMPT
                  </span>
                  <button
                    onClick={handleCopyTaskPrompt}
                    className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] hover:underline transition-colors font-mono cursor-pointer"
                  >
                    {copiedTaskPrompt ? (
                      <span className="text-emerald-400 flex items-center gap-1"><Check className="h-3 w-3" /> Copied!</span>
                    ) : (
                      <span className="flex items-center gap-1"><Copy className="h-3 w-3" /> Copy Prompt</span>
                    )}
                  </button>
                </div>
                <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[160px] overflow-y-auto scrollbar-thin select-all">
                  {selectedTaskData.samplePrompt}
                </pre>
              </div>

              {/* Pro Tip Alert */}
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-250 flex items-start gap-2.5 shadow-3xs text-left">
                <span className="text-base text-emerald-600 select-none">💡</span>
                <div>
                  <h5 className="text-xs font-bold text-emerald-700 uppercase tracking-wide">PRACTITIONER PRO-TIP</h5>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium leading-relaxed">
                    {selectedTaskData.tip}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
