import React, { useState, useMemo } from 'react';
import { ARTIFACTS, SECTIONS } from '../data';
import { Artifact } from '../types';
import { Search, Copy, Check, Info, Command, Sliders } from 'lucide-react';

export default function ArtifactExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedArtifactId, setSelectedArtifactId] = useState<number>(1);
  const [customParams, setCustomParams] = useState<Record<number, Record<string, string>>>(() => {
    // pre-fill with defaults
    const initial: Record<number, Record<string, string>> = {};
    ARTIFACTS.forEach(art => {
      initial[art.id] = { ...art.defaultParams };
    });
    return initial;
  });
  const [copied, setCopied] = useState(false);

  const filteredArtifacts = useMemo(() => {
    return ARTIFACTS.filter(art => {
      const folderMatches = selectedSection === null || art.sectionId === selectedSection;
      const textMatches = 
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.sectionTitle.toLowerCase().includes(searchTerm.toLowerCase());
      return folderMatches && textMatches;
    });
  }, [searchTerm, selectedSection]);

  const activeArtifact = useMemo(() => {
    return ARTIFACTS.find(a => a.id === selectedArtifactId) || ARTIFACTS[0];
  }, [selectedArtifactId]);

  const compiledPrompt = useMemo(() => {
    if (!activeArtifact) return '';
    const paramsForActive = customParams[activeArtifact.id] || activeArtifact.defaultParams;
    return activeArtifact.template(paramsForActive);
  }, [activeArtifact, customParams]);

  const handleParamChange = (key: string, val: string) => {
    setCustomParams(prev => ({
      ...prev,
      [activeArtifact.id]: {
        ...(prev[activeArtifact.id] || {}),
        [key]: val
      }
    }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(compiledPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const resetParams = () => {
    setCustomParams(prev => ({
      ...prev,
      [activeArtifact.id]: { ...activeArtifact.defaultParams }
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="artifact-explorer-container">
      {/* Sidebar: Navigation, search, filter list */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 font-bold">Search Library</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search 20 Certificate Blueprints..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] transition-colors font-sans"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            <button
              onClick={() => setSelectedSection(null)}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors border ${selectedSection === null ? 'bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20 font-semibold' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'}`}
            >
              All Sections
            </button>
            {SECTIONS.map(sec => (
              <button
                key={sec.id}
                onClick={() => setSelectedSection(sec.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors border ${selectedSection === sec.id ? 'bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20 font-semibold' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'}`}
              >
                {sec.name.split(" ")[0]} {sec.name.replace(/[^a-zA-Z0-9\s&]/g, "").trim().split(" ").slice(1).join(" ")}
              </button>
            ))}
          </div>
        </div>

        {/* List of filtered deliverables */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden max-h-[550px] overflow-y-auto shadow-xs">
          {filteredArtifacts.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-sans">No matching cognitive blueprints found.</p>
            </div>
          ) : (
            filteredArtifacts.map((art) => {
              const isActive = art.id === selectedArtifactId;
              return (
                <button
                  key={art.id}
                  onClick={() => setSelectedArtifactId(art.id)}
                  className={`w-full text-left p-4 border-b border-slate-100 transition-all ${isActive ? 'bg-[#F1F7FE] border-l-4 border-l-[#1A73E8]' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                      Artifact #{art.id}
                    </span>
                    <span className="text-[10px] font-mono text-[#1A73E8] font-bold">
                      {art.sectionTitle.split(" ").slice(1).join(" ")}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 mt-1">{art.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-normal">{art.description}</p>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Editor & Blueprint Display: Parameters and real-time generation */}
      <div className="lg:col-span-7 flex flex-col gap-6" id="editor-display-panel">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  SECTION {activeArtifact.sectionId}
                </span>
                <span className="text-xs font-mono text-[#1A73E8] font-bold">
                  {activeArtifact.sectionTitle}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-sans mt-1">{activeArtifact.title}</h3>
            </div>
            
            <button 
              onClick={resetParams}
              className="text-xs font-mono text-slate-500 hover:text-[#1A73E8] border border-slate-200 px-2.5 py-1 rounded-lg hover:bg-slate-50 transition-colors font-bold"
            >
              Reset Inputs
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-6 leading-relaxed bg-[#F8FAFC] p-4 rounded-lg border border-slate-100 font-sans">
            {activeArtifact.description}
          </p>

          {/* Dynamic Form Parameters */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5 font-bold">
              <Command className="h-3.5 w-3.5 text-[#1A73E8]" /> Prompt Parameters Customizer
            </h4>
            
            {activeArtifact.paramMetadata.map(meta => {
              const currentVal = (customParams[activeArtifact.id] || {})[meta.key] || '';
              return (
                <div key={meta.key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">{meta.label}</label>
                  
                  {meta.type === 'textarea' ? (
                    <textarea
                      value={currentVal}
                      onChange={(e) => handleParamChange(meta.key, e.target.value)}
                      placeholder={meta.placeholder}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] font-sans leading-relaxed"
                    />
                  ) : meta.type === 'select' ? (
                    <select
                      value={currentVal}
                      onChange={(e) => handleParamChange(meta.key, e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1A73E8] font-sans"
                    >
                      {meta.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={currentVal}
                      onChange={(e) => handleParamChange(meta.key, e.target.value)}
                      placeholder={meta.placeholder}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] font-sans"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Real-time Compiled Output */}
          <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden shadow-xs">
            <div className="bg-slate-950 px-4 py-2.5 flex justify-between items-center border-b border-slate-850">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Generated Cognitive Prompt
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 hover:text-emerald-350 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all px-2.5 py-1 rounded font-bold"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> Copy Prompt
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto bg-slate-950 selection:bg-blue-900 selection:text-white">
              {compiledPrompt}
            </pre>
          </div>

          <div className="mt-4 flex items-center gap-2 text-slate-500 text-[11px] font-sans bg-slate-50 p-3 rounded-lg border border-slate-100">
            <Info className="h-3.5 w-3.5 flex-shrink-0 text-[#1A73E8]" />
            <span><strong className="font-semibold text-slate-700">Implementation Note:</strong> {activeArtifact.implementationHint}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
