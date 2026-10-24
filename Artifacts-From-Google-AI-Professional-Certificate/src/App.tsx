import React, { useState } from 'react';
import ArtifactExplorer from './components/ArtifactExplorer';
import WorkflowPlanner from './components/WorkflowPlanner';
import BusinessCalculator from './components/BusinessCalculator';
import Tiebreaker from './components/Tiebreaker';
import BrandVisualizer from './components/BrandVisualizer';
import ACTChecklist from './components/ACTChecklist';
import PromptingCoach from './components/PromptingCoach';
import { 
  FileText, 
  Layers, 
  Settings, 
  CheckCircle, 
  TrendingUp, 
  Compass, 
  BookOpen, 
  Sparkles, 
  ArrowUpRight,
  Github,
  Award,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'artifacts' | 'workflow' | 'calculator' | 'tiebreaker' | 'brand' | 'act' | 'best-practices'>('artifacts');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Banner Ribbon */}
      <div className="bg-[#1A73E8]/5 border-b border-slate-200 px-4 py-2 text-center text-xs text-slate-600 font-mono flex items-center justify-center gap-2 flex-wrap">
        <span className="h-2.5 w-2.5 rounded-full bg-[#1A73E8] animate-pulse" />
        <span>Grounded Workspace: 20 Core Prompts &amp; Actionable Blueprints Synchronized</span>
        <span className="hidden md:inline text-slate-300">|</span>
        <span className="text-[#1A73E8] font-bold">Google AI Professional Certificate Milestone</span>
      </div>

      {/* Main Header / Top bar matching Design HTML */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-40 shadow-xs shrink-0">
        <div className="flex items-center gap-3">
          {/* Google colors dot */}
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#4285F4' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#EA4335' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FBBC04' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#34A853' }} />
          </div>
          <span className="font-semibold text-slate-900 text-sm md:text-base tracking-tight hover:opacity-90 transition-opacity">
            Google AI Professional Certificate Portfolio
          </span>
        </div>
        
        {/* Author / Metadata items */}
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-slate-600 border border-slate-200 font-mono scale-95">
            <span className="font-bold text-slate-850">By Sohaib Malik</span>
            <span className="text-slate-300">|</span>
            <span>June 2026</span>
          </div>
          <a 
            href="https://github.com/sohaibdevv" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-500 hover:text-[#1A73E8] transition-colors inline-flex items-center gap-1 font-mono hover:underline border border-slate-200 px-2.5 py-1 rounded-lg hover:bg-slate-50 font-bold"
          >
            <Github className="h-3.5 w-3.5" /> <span className="hidden xs:inline">@sohaibdevv</span>
          </a>
        </div>
      </header>

      {/* Main Layout containing Sidebar and Core Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 py-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible shrink-0 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] scrollbar-thin">
          <div className="px-5 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono hidden lg:block">
            Dashboard Modules
          </div>
          
          <nav className="flex lg:flex-col w-full px-2 lg:px-3 gap-1.5 mt-2">
            {/* Tab 1 */}
            <button
              onClick={() => setActiveTab('artifacts')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap lg:w-full border-l-[3px] ${
                activeTab === 'artifacts'
                  ? 'bg-[#F1F7FE] text-[#1A73E8] border-[#1A73E8]'
                  : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <BookOpen className="h-4 w-4 shrink-0" />
              <span>1. Prompts Library (1-20)</span>
            </button>

            {/* Tab 2 */}
            <button
              onClick={() => setActiveTab('workflow')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap lg:w-full border-l-[3px] ${
                activeTab === 'workflow'
                  ? 'bg-[#F1F7FE] text-[#1A73E8] border-[#1A73E8]'
                  : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Compass className="h-4 w-4 shrink-0" />
              <span>2. Workflow Priority Map</span>
            </button>

            {/* Tab 3 */}
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap lg:w-full border-l-[3px] ${
                activeTab === 'calculator'
                  ? 'bg-[#F1F7FE] text-[#1A73E8] border-[#1A73E8]'
                  : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <TrendingUp className="h-4 w-4 shrink-0" />
              <span>3. Scenario Simulator</span>
            </button>

            {/* Tab 4 */}
            <button
              onClick={() => setActiveTab('tiebreaker')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap lg:w-full border-l-[3px] ${
                activeTab === 'tiebreaker'
                  ? 'bg-[#F1F7FE] text-[#1A73E8] border-[#1A73E8]'
                  : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Layers className="h-4 w-4 shrink-0" />
              <span>4. Decision Tiebreaker</span>
            </button>

            {/* Tab 5 */}
            <button
              onClick={() => setActiveTab('brand')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap lg:w-full border-l-[3px] ${
                activeTab === 'brand'
                  ? 'bg-[#F1F7FE] text-[#1A73E8] border-[#1A73E8]'
                  : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>5. Brand Campaign</span>
            </button>

            {/* Tab 6 */}
            <button
              onClick={() => setActiveTab('act')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap lg:w-full border-l-[3px] ${
                activeTab === 'act'
                  ? 'bg-[#F1F7FE] text-[#1A73E8] border-[#1A73E8]'
                  : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>6. ACT Checklist</span>
            </button>

            {/* Tab 7 */}
            <button
              onClick={() => setActiveTab('best-practices')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap lg:w-full border-l-[3px] ${
                activeTab === 'best-practices'
                  ? 'bg-[#F1F7FE] text-[#1A73E8] border-[#1A73E8]'
                  : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Award className="h-4 w-4 shrink-0" />
              <span>7. Prompting &amp; Gems</span>
            </button>
          </nav>

          <div className="mt-auto p-4 hidden lg:block border-t border-slate-150">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block font-mono">STATUS</span>
              <span className="flex items-center gap-1.5 mt-1 text-xs text-slate-700 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Sandbox
              </span>
            </div>
          </div>
        </aside>

        {/* Content Pane of Dashboard */}
        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
          
          {/* Breadcrumbs & Hero Header matching Design HTML */}
          <div className="border-b border-slate-200 pb-5">
            <div className="font-mono text-[11px] text-slate-500 uppercase tracking-widest mb-1">
              SOHAIBDEVV / ARTIFACTS / {
                activeTab === 'artifacts' ? 'PROMPT-ENGINEERING' :
                activeTab === 'workflow' ? 'MODEL-SELECTION' :
                activeTab === 'calculator' ? 'BUSINESS-VALUE' :
                activeTab === 'tiebreaker' ? 'DECISION-METRICS' :
                activeTab === 'brand' ? 'VISUAL-PLAYGROUND' :
                activeTab === 'act' ? 'RESPONSIBLE-AI' : 'PROMPTING-BEST-PRACTICES'
              }
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              {activeTab === 'artifacts' && 'Prompting & Techniques Library'}
              {activeTab === 'workflow' && 'Actionable Workflow Priority Map'}
              {activeTab === 'calculator' && 'AI Business Case Scenario Simulator'}
              {activeTab === 'tiebreaker' && 'Dual-Model Decision Tiebreaker Matrix'}
              {activeTab === 'brand' && 'Brand Campaign Visualizer'}
              {activeTab === 'act' && 'ACT Compliance Checker (Analyze, Curate, Train)'}
              {activeTab === 'best-practices' && 'Google AI Prompting & Gems Coach'}
            </h1>
            
            <p className="text-slate-500 text-sm mt-1 max-w-4xl leading-relaxed">
              {activeTab === 'artifacts' && 'A comprehensive repository of 20 standardized prompts covering Strategic Prompting, Technical Writing, and SQL querying. Render and copy customized prompts.'}
              {activeTab === 'workflow' && 'Prioritization matrix mapping task impact against technical feasibility to identify high-efficacy Google Cloud automations.'}
              {activeTab === 'calculator' && 'Test scenarios to calculate immediate financial returns and active hours saved across your operational pipelines.'}
              {activeTab === 'tiebreaker' && 'Professional grade system utility scoring output models based on latency metrics, contextual relevance, safety compliance, and API cost factors.'}
              {activeTab === 'brand' && 'An interactive marketing playground translating campaign attributes to dynamic high-contrast banner graphics and vector outputs.'}
              {activeTab === 'act' && 'Quality assurance checker auditing custom model instructions against safety standards, continuous alignment, and model retraining criteria.'}
              {activeTab === 'best-practices' && 'An educational sandbox loaded with Google Prompting Framework metrics, custom repeatable Gems, and workplace operational strategies.'}
            </p>
          </div>

          {/* Interactive Component Section wrapper */}
          <div className="transition-all duration-200 animate-fadeIn">
            {/* Render Tab 1: Prompts Explorer */}
            {activeTab === 'artifacts' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-4 rounded-xl border border-blue-100 shadow-xs">
                  <h3 className="text-sm font-bold font-sans text-slate-800 flex items-center gap-2">
                    <BookOpen className="h-4.5 w-4.5 text-[#1A73E8]" /> 
                    <span>Cognitive Archetypes Index</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Select any template below, tweak parameters in the left side column, and copy the instantly customized model context. Perfect for developer standard operating procedures.
                  </p>
                </div>
                <ArtifactExplorer />
              </div>
            )}

            {/* Render Tab 2: Workflow Planner */}
            {activeTab === 'workflow' && (
              <WorkflowPlanner />
            )}

            {/* Render Tab 3: Business Calculator */}
            {activeTab === 'calculator' && (
              <BusinessCalculator />
            )}

            {/* Render Tab 4: Tiebreaker */}
            {activeTab === 'tiebreaker' && (
              <Tiebreaker />
            )}

            {/* Render Tab 5: Brand Campaign Visualizer */}
            {activeTab === 'brand' && (
              <BrandVisualizer />
            )}

            {/* Render Tab 6: ACT Checklist */}
            {activeTab === 'act' && (
              <ACTChecklist />
            )}

            {/* Render Tab 7: Prompting & Gems Guide */}
            {activeTab === 'best-practices' && (
              <PromptingCoach />
            )}
          </div>

        </main>

      </div>

      {/* Footer matching Design HTML */}
      <footer className="bg-white border-t border-slate-200 py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div>
          Built by <strong>Sohaibdevv</strong> &copy; 2026
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span>Build: <span className="bg-slate-900 text-white px-2 py-0.5 rounded text-[10px] font-mono leading-none">v2.4.0-stable</span></span>
          </div>
          <span className="hidden md:inline text-slate-200">|</span>
          <span className="font-mono text-[10px] tracking-wider uppercase">Interactive Index Portfolio Ready</span>
        </div>
      </footer>

    </div>
  );
}
