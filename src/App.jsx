import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  LayoutDashboard, Activity, Target, Zap, 
  ShieldCheck, Crown, ArrowUpRight, ArrowDownRight, 
  Fingerprint, Lock, Unlock 
} from 'lucide-react';

/* --- ELITE DASHBOARD LOGIC (ALL-IN-ONE) --- */

export default function App() {
  const [view, setView] = useState('auth'); // Startet mit dem Security-Check
  const [isDemo, setIsDemo] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Finanzdaten (Elite-Niveau aus den Screenshots)
  const data = {
    netWorth: isDemo ? 1250400.55 : 0,
    liquidity: isDemo ? 142500.00 : 0,
    chart: [
      { name: 'Jan', v: 850000 }, { name: 'Feb', v: 920000 },
      { name: 'Mar', v: 1100000 }, { name: 'Apr', v: 1250400 }
    ]
  };

  useEffect(() => {
    if (view === 'wealth') {
      setTimeout(() => setIsLoaded(true), 500);
    }
  }, [view]);

  // --- 1. BIOMETRIC LOGIN SCREEN ---
  if (view === 'auth') {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center font-sans">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-12 rounded-[3rem] border border-white/10 flex flex-col items-center text-center max-w-sm"
        >
          <div className="h-20 w-20 bg-blue-600/20 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
            <Fingerprint className="text-blue-500 animate-pulse" size={40} />
          </div>
          <h2 className="text-2xl font-serif italic text-white mb-2">Biometric Access</h2>
          <p className="text-white/30 text-sm mb-10 leading-relaxed">Verifying encrypted institutional identity...</p>
          <button 
            onClick={() => setView('wealth')}
            className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 transition-transform active:scale-95"
          >
            Authorize Terminal
          </button>
        </motion.div>
      </div>
    );
  }

  // --- 2. DAS HAUPT-TERMINAL ---
  return (
    <div className="flex h-screen overflow-hidden bg-[#050505] text-white font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-80 border-r border-white/5 bg-black/40 backdrop-blur-3xl p-10 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-12 w-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Crown size={24}/>
          </div>
          <span className="text-2xl font-bold tracking-tighter font-serif italic">Aurum Elite</span>
        </div>

        <nav className="space-y-4 flex-1">
          <button onClick={() => setView('wealth')} className="flex items-center gap-4 w-full p-4 rounded-2xl bg-white/10 text-white border border-white/5">
            <LayoutDashboard size={20} className="text-blue-500"/> <span className="font-bold">Portfolio</span>
          </button>
          <button className="flex items-center gap-4 w-full p-4 rounded-2xl text-white/30 hover:text-white transition-all">
            <Activity size={20}/> <span className="font-bold">Aura AI Insights</span>
          </button>
          
          <div className="pt-12 pb-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">System Control</div>
          
          <button 
            onClick={() => setIsDemo(!isDemo)}
