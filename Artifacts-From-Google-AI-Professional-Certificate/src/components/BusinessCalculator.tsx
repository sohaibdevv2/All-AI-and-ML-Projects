import React, { useState, useMemo } from 'react';
import { DollarSign, Percent, TrendingUp, Users, ArrowUpRight, Calculator } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export default function BusinessCalculator() {
  const [unitPrice, setUnitPrice] = useState<number>(350);
  const [traffic, setTraffic] = useState<number>(12000);
  const [convRate, setConvRate] = useState<number>(2.5);
  const [productionCostPercent, setProductionCostPercent] = useState<number>(30);
  const [fixedOverhead, setFixedOverhead] = useState<number>(2500);
  const [marketingBudget, setMarketingBudget] = useState<number>(1800);

  const stats = useMemo(() => {
    const totalSalesQuantity = Math.round(traffic * (convRate / 100));
    const grossRevenue = totalSalesQuantity * unitPrice;
    const directProductionOverhead = grossRevenue * (productionCostPercent / 100);
    const totalOutflowExpenses = Math.round(directProductionOverhead + fixedOverhead + marketingBudget);
    const netEarningProfit = grossRevenue - totalOutflowExpenses;
    const profitMarginPercent = grossRevenue > 0 ? Math.round((netEarningProfit / grossRevenue) * 100) : 0;

    return {
      sales: totalSalesQuantity,
      revenue: grossRevenue,
      production: directProductionOverhead,
      expenses: totalOutflowExpenses,
      profit: netEarningProfit,
      margin: profitMarginPercent
    };
  }, [unitPrice, traffic, convRate, productionCostPercent, fixedOverhead, marketingBudget]);

  const chartData = useMemo(() => {
    return [
      {
        name: 'Financial Outlook',
        Revenue: stats.revenue,
        Expenses: stats.expenses,
        Profit: stats.profit
      }
    ];
  }, [stats]);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs" id="business-calculator-root">
      <div className="mb-6 pb-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-[#1A73E8]" /> Interactive Business Profit Scenario Simulator
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Adjust monthly sliders (AOV, conversion channels, marketing budget, fixed rent) to forecast exact profit trends dynamically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Input Parameter Form */}
        <div className="lg:col-span-6 space-y-5 bg-slate-50/50 p-5 rounded-xl border border-slate-200">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Simulation variables</h4>
          
          {/* Slider: Unit Price */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-slate-700 flex items-center gap-1"><DollarSign className="h-3 w-3 text-[#1A73E8]" /> Average Order Value (AOV)</span>
              <span className="text-[#1A73E8] font-bold font-mono">${unitPrice}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="2000" 
              step="10"
              value={unitPrice} 
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              className="w-full accent-[#1A73E8] bg-slate-200 h-1.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$10</span>
              <span>$2,000</span>
            </div>
          </div>

          {/* Slider: Traffic */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-slate-700 flex items-center gap-1"><Users className="h-3 w-3 text-[#1A73E8]" /> Monthly Unique Traffic</span>
              <span className="text-[#1A73E8] font-bold font-mono">{traffic.toLocaleString()} visitors</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="100000" 
              step="500"
              value={traffic} 
              onChange={(e) => setTraffic(Number(e.target.value))}
              className="w-full accent-[#1A73E8] bg-slate-200 h-1.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>500</span>
              <span>100,000</span>
            </div>
          </div>

          {/* Slider: Conversion Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-slate-700 flex items-center gap-1"><Percent className="h-3 w-3 text-[#1A73E8]" /> Conversion Rate</span>
              <span className="text-[#1A73E8] font-bold font-mono">{convRate}%</span>
            </div>
            <input 
              type="range" 
              min="0.1" 
              max="15" 
              step="0.1"
              value={convRate} 
              onChange={(e) => setConvRate(Number(e.target.value))}
              className="w-full accent-[#1A73E8] bg-slate-200 h-1.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0.1%</span>
              <span>15.0%</span>
            </div>
          </div>

          {/* Slider: Production Margin cost */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-slate-700">⚙️ Product/Service Cost Fraction</span>
              <span className="text-[#1A73E8] font-bold font-mono">{productionCostPercent}% of MSRP</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="90" 
              step="5"
              value={productionCostPercent} 
              onChange={(e) => setProductionCostPercent(Number(e.target.value))}
              className="w-full accent-[#1A73E8] bg-slate-200 h-1.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>5% (Software)</span>
              <span>90% (Physical Goods)</span>
            </div>
          </div>

          {/* Slider: Fixed Rent */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-slate-700">🏢 Fixed Rent & Staff Monthly Overhead</span>
              <span className="text-[#1A73E8] font-bold font-mono">${fixedOverhead.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="25000" 
              step="100"
              value={fixedOverhead} 
              onChange={(e) => setFixedOverhead(Number(e.target.value))}
              className="w-full accent-[#1A73E8] bg-slate-200 h-1.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$100</span>
              <span>$25,000</span>
            </div>
          </div>

          {/* Slider: Marketing spend */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-slate-700">📣 Monthly Ad Spend (Marketing Budget)</span>
              <span className="text-[#1A73E8] font-bold font-mono">${marketingBudget.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="15000" 
              step="100"
              value={marketingBudget} 
              onChange={(e) => setMarketingBudget(Number(e.target.value))}
              className="w-full accent-[#1A73E8] bg-slate-200 h-1.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$0</span>
              <span>$15,000</span>
            </div>
          </div>
        </div>

        {/* Results display and Recharts widget */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* KPI Output Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-left shadow-2xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-mono font-bold text-slate-450 uppercase tracking-widest">Gross revenue</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-bold">Monthly</span>
              </div>
              <h4 className="text-lg font-bold font-mono text-slate-900">${stats.revenue.toLocaleString()}</h4>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <ArrowUpRight className="h-3.5 w-3.5 text-[#1A73E8]" />
                <span>Total of {stats.sales.toLocaleString()} active orders</span>
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 text-left shadow-2xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-mono font-bold text-slate-450 uppercase tracking-widest">Net profit</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${stats.profit >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {stats.margin}% margin
                </span>
              </div>
              <h4 className={`text-lg font-bold font-mono ${stats.profit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                ${stats.profit.toLocaleString()}
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <TrendingUp className={`h-3.5 w-3.5 ${stats.profit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`} />
                <span>Monthly margin balance</span>
              </p>
            </div>
          </div>

          {/* Recharts graphic chart block */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex-1 flex flex-col min-h-[220px] shadow-2xs">
            <h5 className="text-[10px] font-mono uppercase tracking-widest text-slate-450 mb-3 font-bold">Profit &amp; Loss Comparison</h5>
            
            <div className="flex-1 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: 8, color: '#334155' }}
                    labelStyle={{ color: '#475569', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}
                    itemStyle={{ color: '#1e293b' }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                  <Bar dataKey="Revenue" fill="#1A73E8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
