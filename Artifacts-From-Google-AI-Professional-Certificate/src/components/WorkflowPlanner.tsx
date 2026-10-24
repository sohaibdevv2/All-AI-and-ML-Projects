import React, { useState } from 'react';
import { INITIAL_TASKS } from '../data';
import { WorkflowTask } from '../types';
import { Plus, Trash2, ShieldAlert, BadgeCheck, FileJson, Layers, Clipboard } from 'lucide-react';

export default function WorkflowPlanner() {
  const [tasks, setTasks] = useState<WorkflowTask[]>(INITIAL_TASKS);
  
  // States for adding a new task
  const [newGoal, setNewGoal] = useState('');
  const [newTaskText, setNewTaskText] = useState('');
  const [newAiHelp, setNewAiHelp] = useState('');
  const [newTime, setNewTime] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [newFreq, setNewFreq] = useState<'Low' | 'Medium' | 'High'>('High');
  const [newRepet, setNewRepet] = useState<'Low' | 'Medium' | 'High'>('High');

  const getMetricScore = (val: 'Low' | 'Medium' | 'High') => {
    if (val === 'Low') return 1;
    if (val === 'Medium') return 2;
    return 3;
  };

  const calculateScore = (task: WorkflowTask) => {
    const ts = getMetricScore(task.timeSpent);
    const f = getMetricScore(task.frequency);
    const r = getMetricScore(task.repetitiveness);
    return Math.round(((ts + f + r) / 9) * 10);
  };

  const getUrgencyBadge = (score: number) => {
    if (score >= 8) {
      return {
        label: "🔥 Prime App Candidate",
        color: "bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20",
        desc: "High priority. Build a bespoke client app/workflow immediately!"
      };
    }
    if (score >= 6) {
      return {
        label: "🤖 Great for Chat Prompt",
        color: "bg-amber-100/60 text-amber-800 border-amber-200/50",
        desc: "Medium priority. Use standard Gemini prompt templates on-demand."
      };
    }
    return {
      label: "🛡️ Manual or Low Benefit",
      color: "bg-slate-100 text-slate-500 border-slate-200",
      desc: "Low-impact action. Keep doing manually or optimize on-demand."
    };
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal || !newTaskText) return;

    const taskItem: WorkflowTask = {
      id: `wt-${Date.now()}`,
      goal: newGoal,
      task: newTaskText,
      howAiCanHelp: newAiHelp || "Assist in automation & standard blueprint generation",
      timeSpent: newTime,
      frequency: newFreq,
      repetitiveness: newRepet
    };

    setTasks(prev => [taskItem, ...prev]);
    
    // reset form fields
    setNewTaskText('');
    setNewAiHelp('');
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "google_ai_workflow_map.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs" id="workflow-planner-root">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-sans">Step-by-Step AI Workflow Mapping Tool</h3>
          <p className="text-xs text-slate-500 mt-1">
            Map your monthly goals and determine which repetitive actions are prime candidates for bespoke app building!
          </p>
        </div>
        <button
          onClick={exportToJson}
          className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-lg transition-colors font-bold"
        >
          <FileJson className="h-4 w-4 text-[#1A73E8]" /> Export Config
        </button>
      </div>

      {/* Grid: Form and Spreadsheet */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="xl:col-span-4 bg-slate-50/50 p-5 rounded-lg border border-slate-200 self-start">
          <h4 className="text-xs font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-wider font-mono">
            <Plus className="h-4 w-4 text-[#1A73E8]" /> Catalog New Workflow Goal
          </h4>
          
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Work Goal</label>
              <select
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-[#1A73E8] focus:border-[#1A73E8]"
                required
              >
                <option value="">-- Choose/Type a Goal --</option>
                <option value="Prepare quarterly performance report">Prepare quarterly performance report</option>
                <option value="Build a social media calendar">Build a social media calendar</option>
                <option value="Research ideas to expand business">Research ideas to expand business</option>
                <option value="Revamp company onboarding process">Revamp company onboarding process</option>
                <option value="Improve sales conversions for service">Improve sales conversions for service</option>
              </select>
              {/* Optional custom input if they choose other */}
              <input
                type="text"
                placeholder="Or type custom goal..."
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="w-full mt-1.5 bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:outline-[#1A73E8] focus:border-[#1A73E8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Tactical Task</label>
              <textarea
                placeholder="e.g. Scrape financial records to calculate monthly overhead variance manually"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                rows={2}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-[#1A73E8] focus:border-[#1A73E8]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">How AI Could Augment This Task</label>
              <textarea
                placeholder="e.g. Translate plaintext descriptions to complex nested VLOOKUP/Index formulas"
                value={newAiHelp}
                onChange={(e) => setNewAiHelp(e.target.value)}
                rows={2}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-[#1A73E8] focus:border-[#1A73E8]"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500 mb-1">Time Spent</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded p-1 text-[11px] text-slate-800"
                >
                  <option value="Low">Low (Min)</option>
                  <option value="Medium">Medium (1 hr)</option>
                  <option value="High">High (Hours)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500 mb-1">Frequency</label>
                <select
                  value={newFreq}
                  onChange={(e) => setNewFreq(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded p-1 text-[11px] text-slate-800"
                >
                  <option value="Low">Low (Mo)</option>
                  <option value="Medium">Medium (Wk)</option>
                  <option value="High">High (Daily)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500 mb-1">Repetition</label>
                <select
                  value={newRepet}
                  onChange={(e) => setNewRepet(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded p-1 text-[11px] text-slate-800"
                >
                  <option value="Low">Low (Var)</option>
                  <option value="Medium">Medium (Semi)</option>
                  <option value="High">High (Ident)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A73E8] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-xs tracking-wide transition-colors mt-2"
            >
              Analyze &amp; Add Task
            </button>
          </form>
        </div>

        {/* Spreadsheet spreadsheet column */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50 font-mono text-[10px] uppercase font-bold tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="p-3">Core Goal</th>
                  <th className="p-3">Details &amp; Tactical Task</th>
                  <th className="p-3">Attributes</th>
                  <th className="p-3 text-right">AI Score</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-705 bg-white">
                {tasks.map(task => {
                  const score = calculateScore(task);
                  const badge = getUrgencyBadge(score);
                  return (
                    <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-semibold text-slate-800 align-top max-w-[150px]">
                        {task.goal}
                      </td>
                      <td className="p-3 align-top max-w-[320px]">
                        <p className="text-slate-900 font-medium">{task.task}</p>
                        <p className="text-[11px] text-amber-800 italic mt-1.5 flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded border border-amber-100 font-semibold">
                          <Clipboard className="h-3.5 w-3.5 inline text-amber-600" />
                          <span>AI: {task.howAiCanHelp}</span>
                        </p>
                      </td>
                      <td className="p-3 align-top">
                        <div className="flex flex-col gap-1 font-mono text-[10px]">
                          <span className="text-slate-500">Time: <b className="text-slate-800">{task.timeSpent}</b></span>
                          <span className="text-slate-500">Freq: <b className="text-slate-800">{task.frequency}</b></span>
                          <span className="text-slate-500">Repet: <b className="text-slate-800">{task.repetitiveness}</b></span>
                        </div>
                      </td>
                      <td className="p-3 text-right align-top">
                        <div className="inline-flex flex-col items-end gap-1">
                          <span className="text-base font-bold text-slate-900 font-mono">{score}/10</span>
                          <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${badge.color}`}>
                            {badge.label.split(" ").slice(1).join(" ")}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-center align-top">
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick Informative Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#1A73E8]/5 border border-[#1A73E8]/10 p-3.5 rounded-lg">
              <span className="text-xs font-mono font-bold text-[#1A73E8] block mb-1">
                🔥 Score 8-10: PRIME APPS
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                Tasks that take hours, occur daily, and remain identical every single session. Build dedicated apps here!
              </p>
            </div>

            <div className="bg-amber-50/50 border border-amber-200/50 p-3.5 rounded-lg">
              <span className="text-xs font-mono font-bold text-amber-800 block mb-1">
                🤖 Score 6-7: PROMPT CHIPS
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                Repetitive tasks or weekly emails with slight context variance. Best optimized with static templates.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
              <span className="text-xs font-mono font-bold text-slate-500 block mb-1">
                🛡️ Score 1-5: KEEP MANUAL
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                Highly creative, low-frequency, or micro-second tasks. AI has low return of optimization effort here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
