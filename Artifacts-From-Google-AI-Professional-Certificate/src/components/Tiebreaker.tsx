import React, { useState } from 'react';
import { TIEBREAKER_PRESETS } from '../data';
import { SplitSquareVertical, Sparkles, Scale, Info, HelpCircle } from 'lucide-react';

export default function Tiebreaker() {
  const [customDecision, setCustomDecision] = useState('');
  const [analysisType, setAnalysisType] = useState<'pros_cons' | 'swot' | 'comparison'>('pros_cons');
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(TIEBREAKER_PRESETS[0].analysis);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const triggerPreset = (index: number) => {
    const preset = TIEBREAKER_PRESETS[index];
    setCustomDecision(preset.decision);
    setAnalysisType(preset.type as any);
    setCurrentAnalysis(preset.analysis);
  };

  const executeAnalysis = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const generated: any = {
        title: `Decisional Matrix: "${customDecision.slice(0, 40)}${customDecision.length > 40 ? '...' : ''}"`,
        optionA: "Option A: Proceed with proposed action",
        optionB: "Option B: Maintain current status",
        prosA: [
          "Provides an immediate solution to the core strategic bottleneck.",
          "Opens up avenues for scaling and automated velocity.",
          "Signals leadership resolution and team alignment milestones."
        ],
        consA: [
          "Requires immediate resource dedication, diverting energy from alternative paths.",
          "Introduces secondary bugs or migration overhead risks.",
          "Higher cost parameters during initial implementation phase."
        ],
        prosB: [
          "Saves development cycles and preserves immediate capital safety.",
          "Deepens consolidation of current working configurations.",
          "Mitigates the danger of introducing critical breaking bugs."
        ],
        consB: [
          "Causes stagnation and accumulates technical and strategic debt.",
          "Misses the critical market window of opportunity.",
          "Keeps teams executing repetitive, unoptimized manual workflows."
        ],
        recommendation: "Focus on Option A if you have adequate runway and executive bandwidth. Maintain Option B if your team needs immediate consolidation."
      };

      if (analysisType === 'swot') {
        generated.swot = {
          strengths: [
            "High strategic flexibility and immediate ownership of the timeline.",
            "Provides immediate technical leverage, automating away repetitive steps."
          ],
          weaknesses: [
            "Demands deep domain competence during custom configuration stages.",
            "Requires a learning curve for cross-functional stakeholders."
          ],
          opportunities: [
            "Maximizes productivity output by up to 10x using systematic workflows.",
            "Positions your organization as a cutting-edge, AI-native technical pioneer."
          ],
          threats: [
            "Risk of vendor lock-in or rate limit thresholds.",
            "Possibility of initial operational mismatch if guidelines are loosely defined."
          ]
        };
      } else if (analysisType === 'comparison') {
        generated.comparison = [
          { criteria: "Implementation Cost", home: "Moderate initial outlay of engineering time", delivery: "Low upfront cost, but high long-term maintenance" },
          { criteria: "Execution Velocity", home: "Slower initially while configuring templates", delivery: "Instantly actionable from day one" },
          { criteria: "Scalability Bounds", home: "Highly scalable with durable automation paths", delivery: "Fails to scale; tied entirely to active manual hours" },
          { criteria: "Risk & Security", home: "Secure; 100% controlled client-side or sandboxed", delivery: "Third-party dependency vectors" }
        ];
      }

      setCurrentAnalysis(generated);
      setIsAnalyzing(false);
    }, 850);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs" id="tiebreaker-root">
      <div className="mb-6 pb-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Scale className="h-5 w-5 text-[#1A73E8]" /> The Decision Tiebreaker Simulator
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Resolve architectural, financial, or strategic dilemmas. Choose structured views to expose logical tradeoffs instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Decision Form */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-5 bg-slate-50/50 p-5 rounded-xl border border-slate-200 self-start shadow-2xs">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Decisional Query Configuration</h4>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">What decision do you need to make?</label>
            <textarea
              value={customDecision}
              onChange={(e) => setCustomDecision(e.target.value)}
              placeholder="e.g. Should I migrate our servers to cloud SQL postgres, or continue using self-managed replicas?"
              rows={4}
              className="w-full bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-850 placeholder-slate-400 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] leading-relaxed font-sans"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Analysis Layout Mode</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAnalysisType('pros_cons')}
                className={`py-2 px-1 text-center font-mono text-[10px] uppercase font-bold rounded-lg border transition-all cursor-pointer ${analysisType === 'pros_cons' ? 'bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/30' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'}`}
              >
                Pros & Cons
              </button>
              <button
                type="button"
                onClick={() => setAnalysisType('swot')}
                className={`py-2 px-1 text-center font-mono text-[10px] uppercase font-bold rounded-lg border transition-all cursor-pointer ${analysisType === 'swot' ? 'bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/30' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'}`}
              >
                SWOT
              </button>
              <button
                type="button"
                onClick={() => setAnalysisType('comparison')}
                className={`py-2 px-1 text-center font-mono text-[10px] uppercase font-bold rounded-lg border transition-all cursor-pointer ${analysisType === 'comparison' ? 'bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/30' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'}`}
              >
                Grid Spec
              </button>
            </div>
          </div>

          <button
            onClick={executeAnalysis}
            disabled={isAnalyzing || !customDecision.trim()}
            className="w-full bg-[#1A73E8] hover:bg-blue-600 disabled:opacity-40 text-white font-bold py-2.5 rounded-lg text-xs tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {isAnalyzing ? "Processing Matrix..." : "Generate Analysis Matrix"}
          </button>

          {/* Quick presets list */}
          <div className="pt-3 border-t border-slate-200">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-2">Try Certificate Presets</span>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => triggerPreset(0)}
                className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-slate-100 text-xs text-slate-600 font-medium border border-slate-200 hover:border-slate-350 transition-colors cursor-pointer truncate"
              >
                💡 Freemium vs. Paid $20 plan
              </button>
              <button
                type="button"
                onClick={() => triggerPreset(1)}
                className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-slate-100 text-xs text-slate-600 font-medium border border-slate-200 hover:border-slate-350 transition-colors cursor-pointer truncate"
              >
                🛠️ Cloud Spanner vs Postgres Replication
              </button>
              <button
                type="button"
                onClick={() => triggerPreset(2)}
                className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-slate-100 text-xs text-slate-600 font-medium border border-slate-200 hover:border-slate-350 transition-colors cursor-pointer truncate"
              >
                🥦 Healthy Home Cooking vs Spicy Takeout
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Matrix Viewer */}
        <div className="lg:col-span-12 xl:col-span-7" id="tiebreaker-viewer">
          {isAnalyzing ? (
            <div className="h-full flex flex-col items-center justify-center p-12 text-slate-500 bg-slate-50 border border-slate-200 rounded-xl min-h-[300px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A73E8] mb-4" />
              <p className="text-xs font-mono text-[#1A73E8]">Resolving dilemma metrics...</p>
            </div>
          ) : currentAnalysis ? (
            <div className="space-y-6">
              {/* Header Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[9px] font-mono font-bold bg-[#1A73E8]/10 text-[#1A73E8] px-2.5 py-1 rounded">
                  ANALYSIS MATRIX
                </span>
                <h4 className="text-sm font-bold text-slate-800 mt-2 font-sans">{currentAnalysis.title}</h4>
              </div>

              {/* Render Type 1: Pros & Cons */}
              {analysisType === 'pros_cons' && currentAnalysis.prosA && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option A Box */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <h5 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-1.5 mb-2.5 uppercase font-mono tracking-wider">
                      {currentAnalysis.optionA || "Option A"}
                    </h5>
                    <div className="space-y-3">
                      <p className="text-[10px] font-extrabold text-[#1A73E8] uppercase tracking-wider">Pros:</p>
                      {currentAnalysis.prosA.map((pro: string, i: number) => (
                        <p key={i} className="text-xs text-slate-600 pl-3 border-l-2 border-emerald-500">
                          {pro}
                        </p>
                      ))}
                      <p className="text-[10px] font-extrabold text-rose-500 uppercase tracking-wider pt-2">Cons:</p>
                      {currentAnalysis.consA.map((con: string, i: number) => (
                        <p key={i} className="text-xs text-slate-600 pl-3 border-l-2 border-rose-450">
                          {con}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Option B Box */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <h5 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-1.5 mb-2.5 uppercase font-mono tracking-wider">
                      {currentAnalysis.optionB || "Option B"}
                    </h5>
                    <div className="space-y-3">
                      <p className="text-[10px] font-extrabold text-[#1A73E8] uppercase tracking-wider">Pros:</p>
                      {currentAnalysis.prosB?.map((pro: string, i: number) => (
                        <p key={i} className="text-xs text-slate-600 pl-3 border-l-2 border-emerald-500">
                          {pro}
                        </p>
                      ))}
                      <p className="text-[10px] font-extrabold text-rose-500 uppercase tracking-wider pt-2">Cons:</p>
                      {currentAnalysis.consB?.map((con: string, i: number) => (
                        <p key={i} className="text-xs text-slate-600 pl-3 border-l-2 border-rose-450">
                          {con}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Render Type 2: SWOT */}
              {analysisType === 'swot' && currentAnalysis.swot && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-250 uppercase">S - Strengths</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1.5 mt-3 leading-relaxed">
                      {currentAnalysis.swot.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] font-bold font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-250 uppercase">W - Weaknesses</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1.5 mt-3 leading-relaxed">
                      {currentAnalysis.swot.weaknesses.map((w: string, i: number) => <li key={i}>{w}</li>)}
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] font-bold font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-250 uppercase">O - Opportunities</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1.5 mt-3 leading-relaxed">
                      {currentAnalysis.swot.opportunities.map((o: string, i: number) => <li key={i}>{o}</li>)}
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] font-bold font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-250 uppercase">T - Threats</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1.5 mt-3 leading-relaxed">
                      {currentAnalysis.swot.threats.map((t: string, i: number) => <li key={i}>{t}</li>)}
                    </ul>
                  </div>
                </div>
              )}

              {/* Render Type 3: Comparison Matrix */}
              {analysisType === 'comparison' && currentAnalysis.comparison && (
                <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs bg-white">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase border-b border-slate-200">
                        <th className="p-3">Evaluation Criteria</th>
                        <th className="p-3">Home / Core Option</th>
                        <th className="p-3">Third-Party Option</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentAnalysis.comparison.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-3 font-semibold text-slate-800">{row.criteria}</td>
                          <td className="p-3 text-slate-600 leading-relaxed">{row.home}</td>
                          <td className="p-3 text-slate-600 leading-relaxed">{row.delivery}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Recommendation Box */}
              {currentAnalysis.recommendation && (
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-2xs">
                  <h5 className="text-xs font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                    <Sparkles className="h-4 w-4 text-emerald-600" /> Final recommendation verdict
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{currentAnalysis.recommendation}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl min-h-[300px]">
              <Info className="h-8 w-8 mb-2 opacity-50 text-slate-400" />
              <p className="text-xs font-sans text-center max-w-sm">Type your dilemma details or select a Certificate preset to generate the evaluation matrix immediately.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
