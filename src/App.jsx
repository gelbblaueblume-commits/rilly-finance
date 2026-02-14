import React, { useState } from 'react';
import { useDemoStore } from './store/demo-store';
import { Area, AreaChart, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { Activity, LayoutDashboard, Settings, ShieldAlert, CreditCard } from 'lucide-react';
import './App.css';

function App() {
  const [view, setView] = useState('dashboard');
  const { netWorth, transactions } = useDemoStore();

  // Währungs-Formatierer (macht aus 12450 -> 12.450,00 €)
  const formatCurrency = (val) => 
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val);

  // Fake-Daten für den Chart generieren
  const mockChartData = Array.from({ length: 14 }).map((_, i) => ({
    day: `Tag ${i + 1}`,
    balance: netWorth - (Math.random() * 2000) + (Math.random() * 2000)
  }));

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white font-sans">
      
      {/* --- SIDEBAR (Links) --- */}
      <aside className="w-64 border-r border-slate-800 p-6 hidden md:flex flex-col bg-[#0f172a]">
        <h1 className="text-2xl font-bold text-blue-500 mb-10 tracking-tight">rilly Finance</h1>
        
        <nav className="space-y-2 flex-1">
          <button onClick={() => setView('dashboard')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${view === 'dashboard' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-white/5'}`}>
            <LayoutDashboard size={18} /> <span className="font-medium">Dashboard</span>
          </button>
          <button onClick={() => setView('transactions')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${view === 'transactions' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-white/5'}`}>
            <CreditCard size={18} /> <span className="font-medium">Transaktionen</span>
          </button>
          <button onClick={() => setView('pricing')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${view === 'pricing' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-white/5'}`}>
            <Activity size={18} /> <span className="font-medium">Upgrade</span>
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800 space-y-2">
          <button className="flex items-center gap-3 w-full p-3 text-slate-500 hover:text-white transition-colors">
            <Settings size={18} /> Einstellungen
          </button>
        </div>
      </aside>

      {/* --- HAUPTBEREICH (Rechts) --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-[#0f172a]/50 backdrop-blur-md">
          <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
            {view === 'dashboard' ? 'Finanzübersicht' : 'Premium Plan'}
          </h2>
          <button onClick={() => setView('pricing')} className="bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-md font-medium text-sm transition-colors shadow-lg shadow-blue-900/20">
            Upgrade
          </button>
        </header>

        {/* Scrollbarer Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {view === 'dashboard' ? (
            <div className="max-w-6xl mx-auto space-y-6">
              
              {/* Grid für Balance und Aktivität */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* KARTE 1: Kontostand */}
                <div className="bg-[#1e293b] rounded-xl border border-slate-700 p-8 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <LayoutDashboard size={100} />
                  </div>
                  <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-2">Verfügbares Guthaben</h3>
                  <div className="text-5xl font-bold text-white mb-6">{formatCurrency(netWorth)}</div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[70%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                  </div>
                </div>

                {/* KARTE 2: Transaktionen */}
                <div className="bg-[#1e293b] rounded-xl border border-slate-700 p-8 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Activity size={20} className="text-blue-500"/> Letzte Aktivitäten
                  </h3>
                  <div className="space-y-4">
                    {transactions.slice(0, 3).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between border-b border-slate-800/50 pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium text-slate-200">{tx.merchant}</p>
                          <p className="text-xs text-slate-500">{tx.date}</p>
                        </div>
                        <div className={`font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {tx.amount > 0 ? '+' : ''} {formatCurrency(tx.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* KARTE 3: Der Chart (Das Highlight) */}
              <div className="bg-[#1e293b] rounded-xl border border-slate-700 p-8 shadow-xl">
                 <h3 className="text-lg font-bold text-white mb-6">Vermögensverlauf (14 Tage)</h3>
                 <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockChartData}>
                        <defs>
                          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

            </div>
          ) : (
            /* --- PRICING PAGE --- */
            <div className="flex flex-col items-center justify-center h-full">
              <div className="max-w-md w-full bg-[#1e293b] rounded-2xl border border-blue-500/30 p-8 shadow-2xl relative">
                <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Empfohlen</div>
                
                <h2 className="text-2xl font-bold text-white mb-2">Pro Cloud Access</h2>
                <div className="text-4xl font-bold text-blue-400 mb-6">€ 9,99 <span className="text-sm text-slate-500 font-normal">/Monat</span></div>
                
                <ul className="space-y-4 text-slate-300 mb-8">
                  <li className="flex items-center gap-3"><span className="text-emerald-400">✓</span> Unbegrenzte Charts</li>
                  <li className="flex items-center gap-3"><span className="text-emerald-400">✓</span> 3 Jahre Historie</li>
                  <li className="flex items-center gap-3"><span className="text-emerald-400">✓</span> KI-Spar-Assistent</li>
                </ul>

                <button 
                  onClick={() => window.location.href = 'DEIN_STRIPE_LINK_HIER'}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/20"
                >
                  Jetzt abonnieren
                </button>
                <p className="text-xs text-center text-slate-600 mt-4">Sicher bezahlen via Stripe SSL</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
