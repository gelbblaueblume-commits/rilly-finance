import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { LayoutDashboard, Activity, ShieldCheck, Zap, Save, Trash2, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react';

/* --- DATEN-KONFIGURATION --- */
const DEMO_DATA = {
  liquidity: 142500.00,
  inflow: 24500.00,
  outflow: 8450.00,
  activities: [
    { id: 1, name: 'Rolex Boutique', date: '2026-02-12', amount: -12500, type: 'luxury' },
    { id: 2, name: 'Tesla Dividend', date: '2026-02-10', amount: 4500, type: 'income' },
    { id: 3, name: 'Private Jet Charter', date: '2026-02-05', amount: -8500, type: 'luxury' },
    { id: 4, name: 'Real Estate Rent', date: '2026-02-01', amount: 12000, type: 'income' }
  ],
  goals: [
    { name: 'Villa Fund', current: 450000, target: 2500000, color: '#eab308' },
    { name: 'Yacht Maintenance', current: 15000, target: 50000, color: '#22c55e' },
    { name: 'Angel Investing', current: 50000, target: 500000, color: '#a855f7' }
  ]
};

const EMPTY_DATA = { liquidity: 0, inflow: 0, outflow: 0, activities: [], goals: [] };

export default function App() {
  const [isDemo, setIsDemo] = useState(false);
  const [shouldSave, setShouldSave] = useState(false);
  const [view, setView] = useState('dashboard');
  const [data, setData] = useState(EMPTY_DATA);

  // Initiales Laden & Persistence Logik
  useEffect(() => {
    const saved = localStorage.getItem('rilly_user_data');
    if (saved) {
      setData(JSON.parse(saved));
      setShouldSave(true);
    }
  }, []);

  // Speicher-Watcher
  useEffect(() => {
    if (shouldSave && !isDemo) {
      localStorage.setItem('rilly_user_data', JSON.stringify(data));
    } else if (!shouldSave) {
      localStorage.removeItem('rilly_user_data');
    }
  }, [data, shouldSave, isDemo]);

  const toggleDemo = () => {
    setIsDemo(!isDemo);
    setData(!isDemo ? DEMO_DATA : EMPTY_DATA);
  };

  const formatEuro = (val) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-sans selection:bg-blue-500/30">
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex h-screen overflow-hidden"
        >
          {/* SIDEBAR */}
          <aside className="w-72 border-r border-white/5 bg-[#0a0a0a] p-8 flex flex-col gap-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center font-serif italic text-2xl">R</div>
              <span className="text-2xl font-bold tracking-tighter">rilly<span className="text-blue-500">.</span></span>
            </div>

            <nav className="flex flex-col gap-2 flex-1">
              <NavBtn icon={<LayoutDashboard size={20}/>} label="Wealth" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
              <NavBtn icon={<Activity size={20}/>} label="Analytics" active={view === 'analytics'} onClick={() => setView('analytics')} />
              <div className="mt-8 mb-2 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">System</div>
              
              {/* DEMO SWITCH */}
              <button onClick={toggleDemo} className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${isDemo ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'hover:bg-white/5 text-white/50'}`}>
                <Zap size={20} fill={isDemo ? "currentColor" : "none"}/>
                <span className="font-semibold text-sm">{isDemo ? 'Stop Demo' : 'Start Demo'}</span>
              </button>

              {/* SAVE SWITCH */}
              <button onClick={() => setShouldSave(!shouldSave)} className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${shouldSave ? 'bg-blue-500/10 text-blue-500' : 'hover:bg-white/5 text-white/50'}`}>
                <Save size={20}/>
                <span className="font-semibold text-sm">{shouldSave ? 'Auto-Save ON' : 'Save Session'}</span>
              </button>
            </nav>

            <button onClick={() => window.location.href = 'DEIN_STRIPE_LINK'} className="group relative overflow-hidden bg-white text-black p-4 rounded-2xl font-bold transition-all hover:scale-[1.02]">
              <span className="relative z-10 flex items-center justify-center gap-2">Upgrade Pro <ArrowUpRight size={18}/></span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto p-12 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
            <header className="flex justify-between items-end mb-12">
              <div>
                <h1 className="text-4xl font-serif mb-2">Guten Tag,</h1>
                <p className="text-white/40 font-medium">Hier ist Ihre finanzielle Übersicht.</p>
              </div>
              {isDemo && <div className="px-4 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-xs font-bold uppercase tracking-widest">Demo Mode Active</div>}
            </header>

            <div className="grid grid-cols-12 gap-8">
              {/* STAT CARDS */}
              <StatCard col="span-4" label="Liquidity" value={formatEuro(data.liquidity)} sub="+4.2% this month" trend="up" />
              <StatCard col="span-4" label="Monthly Inflow" value={formatEuro(data.inflow)} sub="Dividends & Rent" trend="up" />
              <StatCard col="span-4" label="Monthly Outflow" value={formatEuro(data.outflow)} sub="Luxury & Services" trend="down" />

              {/* RECENT ACTIVITY */}
              <div className="col-span-8 bg-[#0d0d0d] rounded-[2rem] border border-white/5 p-10 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-serif">Recent Activity</h2>
                  <button className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">View All</button>
                </div>
                <div className="space-y-6">
                  {data.activities.length > 0 ? data.activities.map((act) => (
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={act.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-5">
                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${act.amount < 0 ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                          {act.amount < 0 ? <ArrowUpRight size={24}/> : <ArrowDownRight size={24}/>}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg group-hover:text-blue-400 transition-colors">{act.name}</h4>
                          <p className="text-sm text-white/30 font-medium">{act.date}</p>
                        </div>
                      </div>
                      <span className={`text-xl font-serif ${act.amount < 0 ? 'text-white' : 'text-emerald-400'}`}>
                        {act.amount > 0 ? '+' : ''}{formatEuro(act.amount)}
                      </span>
                    </motion.div>
                  )) : <div className="text-white/20 py-10 text-center italic">Keine Transaktionen vorhanden. Drücken Sie "Start Demo".</div>}
                </div>
              </div>

              {/* GOALS */}
              <div className="col-span-4 bg-[#0d0d0d] rounded-[2rem] border border-white/5 p-10 flex flex-col gap-8">
                <h2 className="text-2xl font-serif flex items-center gap-3"><Target className="text-blue-500"/> Goals</h2>
                <div className="space-y-8 flex-1">
                  {data.goals.map((goal, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-3">
                        <span className="font-bold text-white/60">{goal.name}</span>
                        <span className="font-serif italic">{formatEuro(goal.current)}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${(goal.current / goal.target) * 100}%` }} 
                          className="h-full rounded-full" 
                          style={{ backgroundColor: goal.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-emerald-500/10 p-4 rounded-2xl flex items-center justify-between border border-emerald-500/10">
                  <span className="text-xs font-bold uppercase text-emerald-500">Sentiment</span>
                  <span className="text-sm font-bold">Greedy 🦁</span>
                </div>
              </div>
            </div>
          </main>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
      {icon} <span className="font-bold text-sm tracking-tight">{label}</span>
    </button>
  );
}

function StatCard({ label, value, sub, trend, col }) {
  return (
    <div className={`${col} bg-[#0d0d0d] rounded-[2rem] border border-white/5 p-8 hover:border-white/20 transition-all group`}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-4">{label}</p>
      <h3 className="text-3xl font-serif mb-2 group-hover:text-blue-400 transition-colors">{value}</h3>
      <p className={`text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'} flex items-center gap-1`}>
        {trend === 'up' ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {sub}
      </p>
    </div>
  );
}
