import { LayoutDashboard, Zap, Shield, Crown, Activity } from 'lucide-react';

export default function Sidebar({ activeView, setView }) {
  return (
    <aside className="w-80 border-r border-white/5 bg-black p-10 flex flex-col">
      <div className="flex items-center gap-4 mb-16">
        <div className="h-12 w-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center neo-glow-blue">
          <Crown className="text-white" size={24}/>
        </div>
        <span className="text-2xl font-bold tracking-tighter text-white font-serif italic">Aurum Capital</span>
      </div>
      <nav className="space-y-4">
        <button onClick={() => setView('wealth')} className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${activeView === 'wealth' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'}`}>
          <LayoutDashboard size={20}/> <span className="font-bold">Portfolio</span>
        </button>
        <button onClick={() => setView('ai')} className="flex items-center gap-4 w-full p-4 rounded-2xl text-white/30 hover:text-white transition-all">
          <Zap size={20}/> <span className="font-bold text-sm tracking-widest uppercase">Aura AI</span>
        </button>
      </nav>
    </aside>
  );
}
