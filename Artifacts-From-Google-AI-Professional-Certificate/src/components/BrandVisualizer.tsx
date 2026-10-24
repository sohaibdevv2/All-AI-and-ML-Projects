import React, { useState } from 'react';
import { Target, Smartphone, Globe, Landmark, Eye, RefreshCw, Layers } from 'lucide-react';

export default function BrandVisualizer() {
  const [productDesc, setProductDesc] = useState('Augmented Reality AI glasses');
  const [flavorText, setFlavorText] = useState('Experience sight re-imagined. Built with Gemini 2.5 context streams.');
  const [brandStyle, setBrandStyle] = useState<'cyber' | 'eco' | 'luxury'>('cyber');
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaign, setCampaign] = useState<any>({
    product: 'Augmented Reality AI glasses',
    flavor: 'Experience sight re-imagined. Built with Gemini 2.5 context streams.',
    style: 'cyber'
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setCampaign({
        product: productDesc,
        flavor: flavorText || "A revolution in product integrity. Designed natively by Certified AI engineers.",
        style: brandStyle
      });
      setIsGenerating(false);
    }, 600);
  };

  const getStyleTheme = () => {
    if (campaign.style === 'cyber') {
      return {
        bg: 'from-slate-950 via-slate-900 to-indigo-950',
        textAccent: 'text-cyan-400',
        borderAccent: 'border-cyan-500/30',
        ribbon: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        gridAccent: 'bg-cyan-500/5',
        bannerGrad: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
      };
    }
    if (campaign.style === 'eco') {
      return {
        bg: 'from-stone-900 via-neutral-900 to-stone-950',
        textAccent: 'text-emerald-400',
        borderAccent: 'border-emerald-500/30',
        ribbon: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        gridAccent: 'bg-emerald-500/5',
        bannerGrad: 'linear-gradient(135deg, #10b981 0%, #84cc16 100%)'
      };
    }
    return { // luxury
      bg: 'from-zinc-950 via-neutral-950 to-zinc-900',
      textAccent: 'text-amber-400',
      borderAccent: 'border-amber-500/30',
      ribbon: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      gridAccent: 'bg-amber-500/5',
      bannerGrad: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)'
    };
  };

  const themeValues = getStyleTheme();

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs" id="brand-visualizer-root">
      <div className="mb-6 pb-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Target className="h-5 w-5 text-[#1A73E8]" /> Multi-Medium Brand Campaign Builder
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Describe any product and imagine its consistent brand visual presentation across billboards, newspapers, and social grids instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Control Panel Form */}
        <div className="lg:col-span-4 space-y-4 bg-slate-50/50 p-5 rounded-xl border border-slate-200 self-start">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Campaign settings</h4>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Product Name / Title</label>
            <input
              type="text"
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
              placeholder="e.g. Portable Solar Charger Kettle"
              className="w-full bg-white border border-slate-200 focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] rounded p-2 text-xs text-slate-800 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Ad Headline / Tagline</label>
            <textarea
              value={flavorText}
              onChange={(e) => setFlavorText(e.target.value)}
              placeholder="e.g. Turn boiling water into active cellphone charging power."
              rows={3}
              className="w-full bg-white border border-slate-200 focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] rounded p-2 text-xs text-slate-800 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Design Identity Presets</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setBrandStyle('cyber')}
                className={`py-2 px-1 text-center font-mono text-[9px] uppercase font-bold rounded border transition-all ${brandStyle === 'cyber' ? 'bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/30' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'}`}
              >
                Neon Cyber
              </button>
              <button
                type="button"
                onClick={() => setBrandStyle('eco')}
                className={`py-2 px-1 text-center font-mono text-[9px] uppercase font-bold rounded border transition-all ${brandStyle === 'eco' ? 'bg-emerald-50 text-emerald-700 border-emerald-350' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'}`}
              >
                Eco Earthy
              </button>
              <button
                type="button"
                onClick={() => setBrandStyle('luxury')}
                className={`py-2 px-1 text-center font-mono text-[9px] uppercase font-bold rounded border transition-all ${brandStyle === 'luxury' ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'}`}
              >
                Gold Lux
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !productDesc.trim()}
            className="w-full bg-[#1A73E8] hover:bg-blue-600 disabled:opacity-40 text-white font-bold py-2 rounded text-xs tracking-wider transition-colors cursor-pointer"
          >
            {isGenerating ? "Synthesizing Ad Layouts..." : "Re-Design Campaign Outputs"}
          </button>
        </div>

        {/* Right Gallery Displaying the 3 mock structures */}
        <div className="lg:col-span-8 space-y-6">
          {isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 border border-slate-200 rounded-xl min-h-[300px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A73E8] mb-4" />
              <p className="text-xs font-mono text-slate-500">Rendering Nano-Banana ad models...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Medium 1: Massive Billboard */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" /> Medium A: City Center Highway Billboard (Glassmorphic Wide)
                </span>
                
                <div className={`relative overflow-hidden rounded-xl border p-6 bg-gradient-to-r ${themeValues.bg} ${themeValues.borderAccent} shadow-2xl`}>
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col justify-between h-44">
                    <div className="flex justify-between items-start">
                      <span className={`text-[9px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded border ${themeValues.ribbon}`}>
                        LIVESTOCK OUTDOOR AD #1
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono tracking-wider">MSRP APPROVED</span>
                    </div>

                    <div className="max-w-xl">
                      <h4 className="text-3xl font-extrabold font-display leading-tight tracking-tight text-white">
                        {campaign.product}
                      </h4>
                      <p className="text-sm text-slate-300 font-sans mt-2 line-clamp-2 italic">
                        "{campaign.flavor}"
                      </p>
                    </div>

                    <div className="flex justify-between items-end text-[10px] font-mono text-slate-500 mt-2">
                      <span>STRICT COMPLIANCE DIRECTIVE CODE 2026</span>
                      <span className={themeValues.textAccent}>NANO-BANANA BRAND MODEL</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medium 2: Classical Editorial Newspaper Grid */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 flex items-center gap-1">
                  <Landmark className="h-3.5 w-3.5" /> Medium B: Retro Editorial Print Paper
                </span>
                
                <div className="bg-[#f2efe9] text-stone-900 p-5 rounded-xl border border-[#dedad2] shadow-md h-72 flex flex-col justify-between font-serif relative">
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-b from-stone-400/10 to-transparent" />
                  
                  <div className="border-b border-stone-400/60 pb-1.5 flex justify-between items-center text-[9px] font-sans font-bold tracking-widest text-stone-600 uppercase">
                    <span>Tech Ledger Daily</span>
                    <span>June 2026</span>
                  </div>

                  <div className="my-auto space-y-2">
                    <span className="text-[8px] font-sans uppercase font-extrabold tracking-widest text-stone-500 bg-stone-200 px-1.5 py-0.5 rounded">
                      ADVERTISEMENT SPEC
                    </span>
                    <h5 className="text-xl font-bold tracking-tight text-stone-950 font-serif leading-tight uppercase border-b border-stone-300 pb-1">
                      {campaign.product}
                    </h5>
                    <p className="text-[11px] text-stone-800 leading-relaxed italic pr-2 font-serif">
                      "{campaign.flavor}"
                    </p>
                    <p className="text-[9px] text-stone-500 leading-relaxed font-sans mt-1">
                      Certified software engineering parameters assert zero failure bounds during multi-node transit processing arrays. Buy original, reject replicas.
                    </p>
                  </div>

                  <div className="border-t border-stone-400/60 pt-1.5 flex justify-between items-center text-[8px] font-sans text-stone-500 font-bold">
                    <span>FOR STAKEHOLDER DISTRIBUTION</span>
                    <span>$0.25 CENTS</span>
                  </div>
                </div>
              </div>

              {/* Medium 3: Social Story / Ad Pitch */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 flex items-center gap-1">
                  <Smartphone className="h-3.5 w-3.5" /> Medium C: Social Feed / Story Post
                </span>
                
                <div className={`p-5 rounded-xl border border-slate-800 flex flex-col justify-between h-72 shadow-lg relative overflow-hidden bg-gradient-to-b ${themeValues.bg}`}>
                  <div className={`absolute top-0 right-0 h-20 w-20 rounded-full opacity-10 filter blur-xl ${themeValues.gridAccent}`} />
                  
                  <div className="flex justify-between items-center z-10">
                    <div className="flex items-center gap-1.5">
                      <div className="h-6 w-6 rounded-full bg-slate-850 border border-slate-700 flex items-center justify-center font-mono text-[9px] font-bold text-slate-300">
                        SB
                      </div>
                      <span className="text-[10px] font-mono text-slate-300">sohaib.ai</span>
                    </div>
                    <span className="text-[9px] font-bold font-mono text-slate-500">SPONSORED PITCH</span>
                  </div>

                  <div className="z-10 py-3 space-y-1.5">
                    <h5 className={`text-lg font-bold font-display ${themeValues.textAccent}`}>
                      {campaign.product}
                    </h5>
                    <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed">
                      {campaign.flavor} No telemetry logs. No system port clutter. Standardized, offline-first client security metrics initialized.
                    </p>
                  </div>

                  <div className="z-10 flex gap-2">
                    <button className="flex-1 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 py-1.5 px-3 rounded text-[10px] font-mono font-bold transition-all uppercase tracking-wider">
                      Learn More
                    </button>
                    <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 py-1.5 px-3 rounded text-[10px] font-mono font-bold transition-all uppercase tracking-wider">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
