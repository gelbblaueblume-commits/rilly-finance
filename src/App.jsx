import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, Zap, Save, ArrowUpRight, ArrowDownRight, Target, Crown, Shield } from 'lucide-react';

const ELITE_DATA = {
  liquidity: 142500.00,
  inflow: 24500.00,
  outflow: 8450.00,
  activities: [
    { id: 1, name: 'Rolex Boutique', amount: -12500, date: '2026-02-12' },
    { id: 2, name: 'Tesla Dividend', amount: 4500, date: '2026-02-10' },
    { id: 3, name: 'Private Jet Charter', amount: -8500, date: '2026-02-05' }
  ],
  goals: [
    { name: 'Villa Fund', current: 450000, target: 2500000, color: '#eab308' },
    { name: 'Yacht Maintenance', current: 15000, target: 50000, color: '#22c55e' }
  ]
};

const EMPTY_DATA = { liquidity: 0, inflow: 0, outflow: 0, activities: [], goals: [] };

export default function App() {
  const [isDemo, setIsDemo] = useState(false);
  const [data, setData] = useState(EMPTY_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 1500); // Edler Pre-loader
  }, []);

  const toggleDemo = () => {
    setIsDemo(!isDemo);
    setData(!isDemo ? ELITE_DATA : EMPTY_DATA);
  };

  if (!isLoaded) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-blue-500 font-serif italic text-4xl">rilly elite</motion.div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-white/5 bg-black p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">R</div>
          <span className="text-2xl font-bold tracking-tighter italic">rilly elite</span>
        </div>
        <nav className="flex-1 space-y-2">
          <button onClick={() => setView('wealth')} className="flex items-center gap-3 w-full p-4 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20 font-bold text-sm transition-all"><LayoutDashboard size={18}/> Wealth</button>
          <button onClick={toggleDemo} className={`flex items-center gap-3 w-full p-4 rounded-2xl border border-white/5 transition-all ${isDemo ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'hover:bg-white/5 text-white/30'}`}><Zap size={18}/> {isDemo ? 'Stop Demo' : 'Start Demo'}</button>
        </nav>
        <button onClick={() => window.location.href = 'DEIN_STRIPE_LINK'} className="py-4 bg-white text-black rounded-2xl font-bold hover:scale-[1.02] transition-transform">Institutional Access</button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-12 overflow-y-auto bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
        <header className="mb-12">
          <h1 className="text-5xl font-serif italic mb-2 tracking-tight">Portfolio Overview</h1>
          <p className="text-white/30 font-medium italic">High-Net-Worth Individual Management</p>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <StatCard label="Liquidity" value={data.liquidity} sub="+4.2% this month" trend="up" col="span-4" />
          <StatCard label="Monthly Inflow" value={data.inflow} sub="Dividends & Assets" trend="up" col="span-4" />
          <StatCard label="Monthly Outflow" value={data.outflow} sub="Luxury & Services" trend="down" col="span-4" />

          {/* ACTIVITY */}
          <div className="col-span-8 bg-white/5 rounded-[2.5rem] border border-white/5 p-10 shadow-2xl">
            <h2 className="text-2xl font-serif italic mb-8">Recent Movements</h2>
            <div className="space-y-6">
              {data.activities.map(act => (
                <div key={act.id} className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <h4 className="font-bold text-lg">{act.name}</h4>
                    <p className="text-xs text-white/30">{act.date}</p>
                  </div>
                  <span className={`text-xl font-serif ${act.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>{act.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GOALS */}
          <div className="col-span-4 bg-white/5 rounded-[2.5rem] border border-white/5 p-10 flex flex-col gap-8">
            <h2 className="text-2xl font-serif italic">Strategic Goals</h2>
            {data.goals.map((goal, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-white/40 italic"><span>{goal.name}</span><span>{goal.current.toLocaleString()} €</span></div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(goal.current / goal.target) * 100}%` }} className="h-full" style={{ backgroundColor: goal.color }} />
                </div>
              </div>
            ))}
            <div className="mt-auto p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center"><span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Sentiment: Greedy 🦁</span></div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, sub, trend, col }) {
  return (
    <div className={`${col} bg-white/5 rounded-[2.5rem] border border-white/5 p-8 hover:border-white/10 transition-all`}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold mb-4">{label}</p>
      <h3 className="text-4xl font-serif italic mb-2">{value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h3>
      <p className={`text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>{sub}</p>
    </div>
  );
}
