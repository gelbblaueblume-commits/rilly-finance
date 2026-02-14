import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, Zap, ShieldCheck, Wallet } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function DashboardPage() {
  const { netWorth, currency, isDemo } = useStore();

  const formatValue = (val) => 
    new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(val);

  const chartData = [
    { name: 'Jan', value: 850000, aura: 400 },
    { name: 'Feb', value: 920000, aura: 600 },
    { name: 'Mar', value: 1100000, aura: 800 },
    { name: 'Apr', value: 1250400, aura: 950 },
  ];

  return (
    <div className="p-12 space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-serif italic text-white tracking-tighter">Executive Overview</h2>
          <p className="text-white/30 mt-2 font-medium">Global Assets & Institutional Liquidity</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-card px-6 py-3 rounded-2xl flex items-center gap-3 border-emerald-500/20">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-500">Aura AI: Optimized</span>
          </div>
        </div>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-3 gap-8">
        <StatCard 
          label="Total Net Worth" 
          value={formatValue(isDemo ? netWorth : 0)} 
          trend="+12.4%" 
          description="Consolidated global assets"
        />
        <StatCard 
          label="Annualized Yield" 
          value="8.42%" 
          trend="+1.2%" 
          description="Portfolio efficiency rating"
        />
        <StatCard 
          label="Aura Risk Score" 
          value="A+" 
          trend="Stable" 
          description="Institutional safety level"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 glass-card rounded-[3rem] p-12">
          <div className="flex justify-between mb-12">
            <h3 className="text-2xl font-serif italic">Wealth Trajectory</h3>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
              <span>Historical</span>
              <span className="text-blue-500">Projected</span>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={4} fill="url(#glow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Panel: AI Insights */}
        <div className="col-span-4 space-y-8">
          <div className="glass-card rounded-[2.5rem] p-8 border-blue-500/20 bg-blue-500/5">
            <div className="flex items-center gap-3 mb-6 text-blue-400">
              <Zap size={24} fill="currentColor"/>
              <h3 className="font-bold uppercase tracking-widest text-sm">Aura AI Insight</h3>
            </div>
            <p className="text-white/60 leading-relaxed text-sm font-medium">
              Basierend auf Ihren aktuellen Kapitalabflüssen in <span className="text-white">Luxury Goods</span> empfehlen wir eine Reallokation von 4% in <span className="text-blue-400 italic">Sustainable Energy Bonds</span>, um die Steuerlast um 1.2M € zu senken.
            </p>
          </div>
          
          <div className="glass-card rounded-[2.5rem] p-8">
            <h3 className="text-xl font-serif italic mb-6">Asset Allocation</h3>
            <div className="space-y-6">
              <AllocationRow label="Real Estate" progress={65} color="#3b82f6" />
              <AllocationRow label="Equity & Stocks" progress={20} color="#eab308" />
              <AllocationRow label="Crypto & Digital" progress={15} color="#a855f7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, description }) {
  return (
    <motion.div whileHover={{ y: -10 }} className="glass-card rounded-[2.5rem] p-10 group transition-all duration-500 hover:border-blue-500/30">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">{label}</p>
      <h3 className="text-4xl font-serif italic mb-4 group-hover:text-blue-400 transition-colors">{value}</h3>
      <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest">
        <ArrowUpRight size={14} /> {trend} <span className="text-white/10 ml-2 font-medium capitalize">{description}</span>
      </div>
    </motion.div>
  );
}

function AllocationRow({ label, progress, color }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${progress}%` }} 
          className="h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
