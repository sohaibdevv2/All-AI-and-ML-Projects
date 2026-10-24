import React, { useState } from 'react';
import { CheckSquare, Square, BadgePercent, ShieldCheck, HelpCircle, FileText, Download } from 'lucide-react';

export default function ACTChecklist() {
  const [inputText, setInputText] = useState('');
  const [checks, setChecks] = useState({
    // Ask
    aiFit: false,
    dataPrivacy: false,
    guidelinesMatch: false,
    // Check
    accuracyChecked: false,
    biasEvaluated: false,
    toneApproved: false,
    humanRefinementAdd: false,
    // Tell
    transparencyDisclosed: false,
    complianceAffirmed: false,
  });

  const [auditLog, setAuditLog] = useState<{ id: string; time: string; score: number; textSnippet: string }[]>([]);

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const scorePercentage = Math.round(
    (Object.values(checks).filter(Boolean).length / Object.keys(checks).length) * 100
  );

  const getScoreVerdict = () => {
    if (scorePercentage === 100) return { label: 'Fully ACT Compliant ✅', text: 'Excellent! Your content matches all requirements of the Google AI Responsible guide.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (scorePercentage >= 70) return { label: 'Partially Compliant ⚠️', text: 'Fairly safe, but you have missed key check metrics or disclosure parameters.', color: 'text-amber-800 bg-amber-50 border-amber-200' };
    return { label: 'Non-Compliant 🚨', text: 'High risk detected. Run critical checks to secure confidentiality and eliminate hallucination variables.', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const handleAuditSubmit = () => {
    if (!inputText.trim()) return;
    const logItem = {
      id: `audit-${Date.now()}`,
      time: new Date().toLocaleTimeString(),
      score: scorePercentage,
      textSnippet: inputText.slice(0, 60) + (inputText.length > 60 ? '...' : '')
    };
    setAuditLog(prev => [logItem, ...prev]);
  };

  const resetChecks = () => {
    setChecks({
      aiFit: false,
      dataPrivacy: false,
      guidelinesMatch: false,
      accuracyChecked: false,
      biasEvaluated: false,
      toneApproved: false,
      humanRefinementAdd: false,
      transparencyDisclosed: false,
      complianceAffirmed: false,
    });
    setInputText('');
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs" id="act-checklist-root">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900">ACT Responsible AI Evaluation Checker</h3>
          <p className="text-xs text-slate-500 mt-1">
            Perform a professional governance analysis of LLM outputs against Google AI Certificate parameters before deployment.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={resetChecks}
            className="text-xs font-mono text-slate-500 hover:text-slate-800 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer font-bold"
          >
            Clear Sheet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: input pane and score */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200 shadow-2xs">
            <label className="block text-xs font-mono uppercase font-bold tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-[#1A73E8]" /> Output Code or Draft to Evaluation
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste generated raw code, client email drafts, or article summaries here to begin evaluation..."
              rows={6}
              className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] font-mono leading-relaxed"
            />
            <button
              onClick={handleAuditSubmit}
              disabled={!inputText.trim()}
              className="w-full mt-3 bg-[#1A73E8] hover:bg-blue-600 disabled:opacity-40 text-white font-semibold py-2 rounded-lg text-xs transition-colors cursor-pointer"
            >
              Log Evaluation Entry
            </button>
          </div>

          {/* Audit Metrics Panel */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col items-center">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Compliance score</span>
            <div className="relative flex items-center justify-center my-4 h-24 w-24 rounded-full border-4 border-slate-100 bg-[#F1F7FE]">
              <span className="text-3xl font-extrabold text-[#1A73E8] font-mono">{scorePercentage}%</span>
            </div>
            
            <div className={`p-4 rounded-xl border text-center text-xs w-full shadow-2xs ${getScoreVerdict().color}`}>
              <h4 className="font-bold uppercase tracking-wider mb-1 font-sans">{getScoreVerdict().label}</h4>
              <p className="leading-relaxed">{getScoreVerdict().text}</p>
            </div>
          </div>
        </div>

        {/* Right column: check list details */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6">
          <div className="space-y-6">
            {/* Category: Ask */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 font-sans flex items-center gap-2 mb-3 border-b border-slate-100 pb-1.5">
                <span className="h-5 w-5 rounded bg-amber-100 text-amber-800 text-xs font-mono font-bold flex items-center justify-center">A</span>
                Ask Yourself First (Cognitive Intent)
              </h4>
              
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => toggleCheck('aiFit')}
                  className="flex items-start gap-3 text-left w-full p-2.5 hover:bg-slate-50 transition-colors rounded-lg border border-slate-200 bg-white shadow-2xs"
                >
                  {checks.aiFit ? <CheckSquare className="h-4 w-4 text-[#1A73E8] mt-0.5 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-300 mt-0.5 flex-shrink-0" />}
                  <div>
                    <h5 className="text-xs font-semibold text-slate-800">Is Generative AI appropriate for this task?</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">I am not bypassing certified healthcare, legal finance expert audits. (No blind trust).</p>
                  </div>
                </button>

                <button 
                  onClick={() => toggleCheck('dataPrivacy')}
                  className="flex items-start gap-3 text-left w-full p-2.5 hover:bg-slate-50 transition-colors rounded-lg border border-slate-200 bg-white shadow-2xs"
                >
                  {checks.dataPrivacy ? <CheckSquare className="h-4 w-4 text-[#1A73E8] mt-0.5 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-300 mt-0.5 flex-shrink-0" />}
                  <div>
                    <h5 className="text-xs font-semibold text-slate-800">Is data privacy preserved? (Confidentiality Protection)</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Zero sensitive client credentials, secret corporate code files, or identifiers entered.</p>
                  </div>
                </button>

                <button 
                  onClick={() => toggleCheck('guidelinesMatch')}
                  className="flex items-start gap-3 text-left w-full p-2.5 hover:bg-slate-50 transition-colors rounded-lg border border-slate-200 bg-white shadow-2xs"
                >
                  {checks.guidelinesMatch ? <CheckSquare className="h-4 w-4 text-[#1A73E8] mt-0.5 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-300 mt-0.5 flex-shrink-0" />}
                  <div>
                    <h5 className="text-xs font-semibold text-slate-800">Is system compliance matched?</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Checked employer/platform policy rules. AI usage is fully legal within active regulations.</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Category: Check */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 font-sans flex items-center gap-2 mb-3 border-b border-slate-100 pb-1.5">
                <span className="h-5 w-5 rounded bg-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center justify-center">C</span>
                Check &amp; Audit Output (Quality Control)
              </h4>
              
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => toggleCheck('accuracyChecked')}
                  className="flex items-start gap-3 text-left w-full p-2.5 hover:bg-slate-50 transition-colors rounded-lg border border-slate-200 bg-white shadow-2xs"
                >
                  {checks.accuracyChecked ? <CheckSquare className="h-4 w-4 text-[#1A73E8] mt-0.5 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-300 mt-0.5 flex-shrink-0" />}
                  <div>
                    <h5 className="text-xs font-semibold text-slate-800">Independently verify facts and numbers</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Scrutinize API references, citations, mathematical sums, and URLs. Caught hallucinations.</p>
                  </div>
                </button>

                <button 
                  onClick={() => toggleCheck('biasEvaluated')}
                  className="flex items-start gap-3 text-left w-full p-2.5 hover:bg-slate-50 transition-colors rounded-lg border border-slate-200 bg-white shadow-2xs"
                >
                  {checks.biasEvaluated ? <CheckSquare className="h-4 w-4 text-[#1A73E8] mt-0.5 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-300 mt-0.5 flex-shrink-0" />}
                  <div>
                    <h5 className="text-xs font-semibold text-slate-800">Audit for unmerited bias or one-sided views</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-sans">Output presents an objective, neutral approach and values equitable representation.</p>
                  </div>
                </button>

                <button 
                  onClick={() => toggleCheck('toneApproved')}
                  className="flex items-start gap-3 text-left w-full p-2.5 hover:bg-slate-50 transition-colors rounded-lg border border-slate-200 bg-white shadow-2xs"
                >
                  {checks.toneApproved ? <CheckSquare className="h-4 w-4 text-[#1A73E8] mt-0.5 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-300 mt-0.5 flex-shrink-0" />}
                  <div>
                    <h5 className="text-xs font-semibold text-slate-800">Tone styling validation</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Checked formatting matches exact delivery environment requirements and customer-polite channels.</p>
                  </div>
                </button>

                <button 
                  onClick={() => toggleCheck('humanRefinementAdd')}
                  className="flex items-start gap-3 text-left w-full p-2.5 hover:bg-slate-50 transition-colors rounded-lg border border-slate-200 bg-white shadow-2xs"
                >
                  {checks.humanRefinementAdd ? <CheckSquare className="h-4 w-4 text-[#1A73E8] mt-0.5 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-300 mt-0.5 flex-shrink-0" />}
                  <div>
                    <h5 className="text-xs font-semibold text-slate-800">Human-in-the-loop original refinements</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">I have added custom domain experience context or edited structural wording. (No copy slop).</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Category: Tell */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 font-sans flex items-center gap-2 mb-3 border-b border-slate-100 pb-1.5">
                <span className="h-5 w-5 rounded bg-blue-105 bg-blue-100 text-blue-800 text-xs font-mono font-bold flex items-center justify-center">T</span>
                Tell Others (Aesthetic Transparency)
              </h4>
              
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => toggleCheck('transparencyDisclosed')}
                  className="flex items-start gap-3 text-left w-full p-2.5 hover:bg-slate-50 transition-colors rounded-lg border border-slate-200 bg-white shadow-2xs"
                >
                  {checks.transparencyDisclosed ? <CheckSquare className="h-4 w-4 text-[#1A73E8] mt-0.5 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-300 mt-0.5 flex-shrink-0" />}
                  <div>
                    <h5 className="text-xs font-semibold text-slate-800">Clear transparency disclosures where required</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Teams or stakeholders are appropriately made aware that AI assisted in generating content.</p>
                  </div>
                </button>

                <button 
                  onClick={() => toggleCheck('complianceAffirmed')}
                  className="flex items-start gap-3 text-left w-full p-2.5 hover:bg-slate-50 transition-colors rounded-lg border border-slate-200 bg-white shadow-2xs"
                >
                  {checks.complianceAffirmed ? <CheckSquare className="h-4 w-4 text-[#1A73E8] mt-0.5 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-300 mt-0.5 flex-shrink-0" />}
                  <div>
                    <h5 className="text-xs font-semibold text-slate-800">Compliance &amp; auditing readiness</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-sans">Able to track how sources were evaluated, ready to justify analytical parameters if requested.</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Audit Logs History */}
          {auditLog.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mt-2 shadow-2xs">
              <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-3">Checklist Audit History Log</h5>
              <div className="space-y-2 max-h-[150px] overflow-y-auto font-mono text-[11px]">
                {auditLog.map(log => (
                  <div key={log.id} className="flex justify-between items-center border-b border-slate-100 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-slate-400 font-semibold">{log.time}</span>
                    <span className="text-slate-700 flex-1 truncate mx-3">Content: "{log.textSnippet}"</span>
                    <span className={`font-bold ${log.score === 100 ? 'text-emerald-600' : log.score >= 70 ? 'text-amber-700' : 'text-slate-500'}`}>Score: {log.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
