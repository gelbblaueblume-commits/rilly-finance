import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  LayoutDashboard, Activity, Target, Zap, Save, Trash2, 
  ArrowUpRight, ArrowDownRight, ShieldCheck, Crown, Wallet
} from 'lucide-react';

/* --- ELITE MOCK DATA (Basierend auf deinen Bildern) --- */
const DEMO_DATA = {
  liquidity: 142500.00,
  inflow: 24500.00,
  outflow: 8450.00,
  wealthCurve: [
    { month: 'Jan', value: 110000 }, { month: 'Feb', value: 118000 },
    { month: 'Mar', value: 135000 }, { month: 'Apr', value: 128000 },
    { month: 'May', value: 142500 }
  ],
  distribution: [
    { name: 'Housing', value: 35, color: '#eab308' },
    { name: 'Luxury', value: 20, color: '#f97316' },
    { month: 'Investments', value: 45, color: '#3b82f6' }
  ],
  activities: [
    { id: 1, name: 'Rolex Boutique', date: '12.02.2026', amount: -12500, type: 'luxury' },
    { id: 2, name: 'Tesla Dividend', date: '10.02.2026', amount: 4500, type: 'income' },
    { id: 3, name: 'Private Jet Charter', date: '05.02.2026', amount: -8500, type: 'luxury' }
  ],
  goals: [
    { name: 'Villa Fund', current: 450000, target: 2500000, color: '#eab308' },
    { name: 'Yacht Access', current: 15000, target: 50000, color: '#22c55e' }
  ]
};

const EMPTY_DATA = { liquidity: 0, inflow: 0, outflow: 0, wealthCurve: [], distribution: [], activities: [], goals: [] };

export default function App() {
  const [isDemo, setIsDemo] = useState(false);
  const [shouldSave, setShouldSave] = useState(false);
  const [data, setData] = useState(EMPTY_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Persistenz & Start-Animation
  useEffect(() => {
    const saved = localStorage.getItem('rilly_elite_session');
    if (saved) {
      setData(JSON.parse(saved));
      setShouldSave(true);
    }
    setTimeout(() => setIsLoaded(true), 800);
  }, []);

  // 2. Speicher-Logik (Automatisches Backup bei Änderungen)
  useEffect(() => {
    if (shouldSave && !isDemo) {
      localStorage.setItem('rilly_elite_session', JSON.stringify(data));
    } else if (!shouldSave) {
      localStorage.removeItem('rilly_elite_session');
    }
  }, [data, shouldSave, isDemo]);

  const toggleDemo = () => {
    setIsDemo(!isDemo);
    setData(!isDemo ? DEMO_DATA : EMPTY_DATA);
  };

  const formatEuro = (val) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val);

  if (!isLoaded) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="h-16 w-16 bg-blue-600 rounded-2xl neo-glow-blue"
      />
      <p className="mt-8 text-white/20 font-bold uppercase tracking-[0.4em] text-xs">Authenticating Elite Access</p>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      
      {/* SIDEBAR: Ultra-Clean & Glassy */}
      <aside className="w-80 border-r border-white/5 bg-black/40 backdrop-blur-3xl p-10 flex flex-col">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-12 w-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Crown className="text-white" size={24}/>
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">rilly<span className="text-blue-500 italic">.elite</span></span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Wealth Overview" active />
          <NavItem icon={<Activity size={20}/>} label="Market Analytics" />
          <NavItem icon={<Target size={20}/>} label="Investment Goals" />
          
          <div className="pt-10 pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Control Center</div>
          
          <ControlBtn 
            icon={<Zap size={20}/>} 
            label={isDemo ? "Stop Simulator" : "Initialize Demo"} 
            active={isDemo} 
            onClick={toggleDemo}
            color="amber"
          />
          
          <ControlBtn 
            icon={<Save size={20}/>} 
            label={shouldSave ? "Sync Active" : "Private Session"} 
            active={shouldSave} 
            onClick={() => setShouldSave(!shouldSave)}
            color="blue"
          />
        </nav>

        <button 
          onClick={() => window.location.href = 'https://buy.stripe.com/DEIN_LINK'}
          className="mt-auto py-5 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95"
        >
          Institutional Access <ArrowUpRight size={18}/>
        </button>
      </aside>

      {/* MAIN: High Fidelity Content */}
      <main className="flex-1 overflow-y-auto p-12 relative">
        <header className="flex justify-between items-end mb-16">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-5xl font-serif italic text-white mb-2 tracking-tight">Financial Hub</h1>
            <p className="text-white/40 font-medium">Willkommen zurück. Ihr Portfolio ist stabil.</p>
          </motion.div>
          <div className="flex gap-4">
            <div className="glass-card px-6 py-3 rounded-2xl flex items-center gap-3">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-white/60">Live Market Feed</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          
          {/* STAT CARDS - Die Top-Leiste */}
          <StatCard col="span-4" label="Liquidity" value={formatEuro(data.liquidity)} change="+4.2%" trend="up" />
          <StatCard col="span-4" label="Monthly Inflow" value={formatEuro(data.inflow)} change="Verified" trend="up" />
          <StatCard col="span-4" label="Outflow" value={formatEuro(data.outflow)} change="-12% vs last month" trend="down" />

          {/* MAIN CHART - Das visuelle Herzstück */}
          <div className="col-span-8 glass-card rounded-[2.5rem] p-10">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-serif italic text-white">Wealth Trajectory</h3>
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-white/40 uppercase">Performance Index</span>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.wealthCurve}>
                  <defs>
                    <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px' }}
                    itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={4} 
                    fill="url(#glow)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ASSET GOALS - Fortschritts-Tracker */}
          <div className="col-span-4 glass-card rounded-[2.5rem] p-10 flex flex-col">
            <h3 className="text-2xl font-serif italic text-white mb-10">Strategic Goals</h3>
            <div className="space-y-8 flex-1">
              {data.goals.length > 0 ? data.goals.map((goal, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60 font-medium">{goal.name}</span>
                    <span className="text-white font-bold">{Math.round((goal.current / goal.target) * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      className="h-full rounded-full" 
                      style={{ backgroundColor: goal.color, boxShadow: `0 0 10px ${goal.color}44` }}
                    />
                  </div>
                </div>
              )) : <div className="text-white/10 italic text-center py-20">Initialize Demo to view goals.</div>}
            </div>
            <div className="mt-8 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Sentiment</span>
              <span className="font-bold text-white tracking-tighter italic">Greedy 🦁</span>
            </div>
          </div>

          {/* RECENT TRANSACTIONS */}
          <div className="col-span-12 glass-card rounded-[2.5rem] p-10">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-serif italic text-white">Recent Movements</h3>
              <button className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors">Audit Log</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.activities.map((act) => (
                <motion.div 
                  whileHover={{ y: -5 }}
                  key={act.id} 
                  className="p-6 bg-white/5 rounded-3xl border border-white/5 flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl ${act.amount < 0 ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                      {act.amount < 0 ? <ArrowUpRight size={20}/> : <ArrowDownRight size={20}/>}
                    </div>
                    <span className="text-[10px] font-bold text-white/20">{act.date}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">{act.name}</h4>
                    <p className="text-4xl font-serif italic mt-2 text-white">{formatEuro(act.amount)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

/* --- HELPER COMPONENTS --- */

function NavItem({ icon, label, active }) {
  return (
    <button className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all duration-300 ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
      {icon} <span className="font-bold text-sm">{label}</span>
    </button>
  );
}

function ControlBtn({ icon, label, active, onClick, color }) {
  const styles = color === 'amber' 
    ? (active ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : 'hover:bg-amber-500/10 text-white/40')
    : (active ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' : 'hover:bg-blue-500/10 text-white/40');

  return (
    <button onClick={onClick} className={`flex items-center gap-4 w-full p-4 rounded-2xl border border-transparent transition-all duration-300 ${styles}`}>
      {icon} <span className="font-bold text-sm">{label}</span>
    </button>
  );
}

function StatCard({ label, value, change, trend, col }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className={`${col} glass-card rounded-[2.5rem] p-10 flex flex-col justify-between group`}>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-6">{label}</p>
      <h2 className="text-4xl font-serif italic text-white group-hover:text-blue-400 transition-colors">{value}</h2>
      <div className={`mt-6 flex items-center gap-2 text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
        {trend === 'up' ? <ArrowUpRight size={16}/> : <ArrowDownRight size={16}/>} {change}
      </div>
    </motion.div>
  );
}
