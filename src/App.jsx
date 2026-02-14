import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, CreditCard, Activity, Settings, ArrowUpRight, ArrowDownRight, ShieldCheck, Menu, X } from 'lucide-react';

/* --- DAS IST DEINE FERTIGE APP --- */
export default function App() {
  const [view, setView] = useState('dashboard'); // Steuert, ob Dashboard oder Upgrade gezeigt wird
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // HIER SIND DEINE DATEN (Du kannst die Zahlen ändern, wenn du willst)
  const [balance] = useState(12450.00);
  const [transactions] = useState([
    { id: 1, name: 'Apple Store', date: 'Heute, 14:30', amount: -1299.00, type: 'expense' },
    { id: 2, name: 'Gehaltseingang', date: 'Gestern, 09:00', amount: 4500.00, type: 'income' },
    { id: 3, name: 'Spotify Abo', date: '12.02.2026', amount: -14.99, type: 'expense' },
    { id: 4, name: 'Amazon AWS', date: '10.02.2026', amount: -85.20, type: 'expense' },
    { id: 5, name: 'Dividende', date: '05.02.2026', amount: 320.50, type: 'income' },
  ]);

  // Fake-Daten für den Chart (simuliert einen Verlauf)
  const chartData = [
    { name: 'Mo', value: 11200 }, { name: 'Di', value: 11800 },
    { name: 'Mi', value: 11500 }, { name: 'Do', value: 12100 },
    { name: 'Fr', value: 12300 }, { name: 'Sa', value: 12400 },
    { name: 'So', value: 12450 },
  ];

  // Formatiert Euro-Beträge schön (z.B. 12.450,00 €)
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-white font-sans overflow-hidden">
      
      {/* --- SIDEBAR (Links) --- */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 border-r border-slate-800 bg-[#0f172a] flex flex-col hidden md:flex`}>
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">R</div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">rilly</span>}
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem icon={<LayoutDashboard size={20}/>} text="Übersicht" active={view === 'dashboard'} onClick={() => setView('dashboard')} full={isSidebarOpen} />
          <SidebarItem icon={<CreditCard size={20}/>} text="Transaktionen" active={view === 'transactions'} onClick={() => setView('transactions')} full={isSidebarOpen} />
          <SidebarItem icon={<Activity size={20}/>} text="Upgrade" active={view === 'upgrade'} onClick={() => setView('upgrade')} full={isSidebarOpen} highlight />
        </nav>

        <div className="p-4 border-t border-slate-800">
           <SidebarItem icon={<Settings size={20}/>} text="Einstellungen" full={isSidebarOpen} />
        </div>
      </aside>

      {/* --- HAUPTBEREICH (Rechts) --- */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Header für Mobile & Desktop */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-[#0f172a]/80 backdrop-blur-md z-10">
          <div className="md:hidden text-white font-bold text-xl">rilly</div>
          <div className="flex items-center gap-4 ml-auto">
             <button onClick={() => setView('upgrade')} className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]">
               Pro Plan
             </button>
             <div className="h-8 w-8 bg-slate-700 rounded-full border border-slate-600"></div>
          </div>
        </header>

        {/* --- INHALT --- */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0f172a]">
          
          {view === 'dashboard' ? (
            /* DASHBOARD ANSICHT */
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
              
              {/* Top Bereich: Guthaben & Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Guthaben Karte */}
                <div className="lg:col-span-1 bg-[#1e293b] rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5"><LayoutDashboard size={120}/></div>
                   <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Gesamtvermögen</h3>
                   <div className="text-4xl font-bold text-white mb-4">{formatMoney(balance)}</div>
                   <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-400/10 w-fit px-2 py-1 rounded-md mb-6">
                     <ArrowUpRight size={16}/> +2.4% diesen Monat
                   </div>
                   <button onClick={() => setView('upgrade')} className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors">
                     Analyse ansehen
                   </button>
                </div>

                {/* Chart Karte */}
                <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl p-6 border border-slate-700 shadow-xl">
                  <h3 className="text-slate-200 font-bold mb-4">Verlauf (7 Tage)</h3>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px'}} itemStyle={{color: '#fff'}}/>
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#colorVal)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Transaktionsliste */}
              <div className="bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="font-bold text-lg">Letzte Aktivitäten</h3>
                  <button className="text-blue-400 text-sm hover:text-blue-300">Alle anzeigen</button>
                </div>
                <div>
                  {transactions.map((tx) => (
                    <div key={tx.id} className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors border-b border-slate-700/50 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${tx.type === 'income' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'}`}>
                          {tx.type === 'income' ? <ArrowDownRight size={20}/> : <ArrowUpRight size={20}/>}
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">{tx.name}</p>
                          <p className="text-xs text-slate-500">{tx.date}</p>
                        </div>
                      </div>
                      <span className={`font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                        {tx.amount > 0 ? '+' : ''} {formatMoney(tx.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* UPGRADE ANSICHT */
            <div className="max-w-4xl mx-auto py-10 animate-in zoom-in-95 duration-500">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                  Upgrade auf Pro
                </h2>
                <p className="text-slate-400 max-w-lg mx-auto">
                  Entfessle das volle Potenzial deiner Finanzen mit KI-Analysen, unbegrenzter Historie und Priority Support.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Free Plan */}
                <div className="bg-[#1e293b]/50 p-8 rounded-2xl border border-slate-700 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-400">Starter</h3>
                  <div className="text-3xl font-bold mt-2 mb-6">Gratis</div>
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex gap-3 text-slate-300"><ShieldCheck className="text-slate-500"/> Grundlegende Charts</li>
                    <li className="flex gap-3 text-slate-300"><ShieldCheck className="text-slate-500"/> 5 Transaktionen</li>
                  </ul>
                  <button onClick={() => setView('dashboard')} className="w-full py-3 rounded-xl border border-slate-600 hover:bg-slate-700 transition-colors font-medium">
                    Zurück zum Dashboard
                  </button>
                </div>

                {/* PRO Plan (Der Verkaufsschlager) */}
                <div className="bg-gradient-to-b from-blue-900/40 to-[#1e293b] p-8 rounded-2xl border border-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.15)] relative flex flex-col transform md:scale-105">
                  <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-3 py-1 rounded-bl-xl uppercase">Empfohlen</div>
                  <h3 className="text-xl font-bold text-blue-400">Pro Cloud</h3>
                  <div className="text-4xl font-bold mt-2 mb-1">9,99 €</div>
                  <div className="text-sm text-slate-400 mb-6">pro Monat</div>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex gap-3 text-white"><ShieldCheck className="text-blue-400"/> <b>Unbegrenzte</b> Historie</li>
                    <li className="flex gap-3 text-white"><ShieldCheck className="text-blue-400"/> KI-Spar-Analysen</li>
                    <li className="flex gap-3 text-white"><ShieldCheck className="text-blue-400"/> CSV Export für Steuer</li>
                  </ul>
                  
                  <button 
                    /* HIER LINK EINFÜGEN */
                    onClick={() => window.location.href = 'DEIN_STRIPE_LINK_HIER'}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-blue-600/25"
                  >
                    Jetzt abonnieren
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4">Jederzeit kündbar. Sichere Zahlung.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Kleine Hilfskomponente für die Sidebar
function SidebarItem({ icon, text, active, onClick, full, highlight }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 group
        ${active 
          ? 'bg-blue-600/10 text-blue-400 shadow-inner' 
          : 'text-slate-400 hover:bg-white/5 hover:text-white'}
        ${highlight ? 'mt-6 border border-blue-500/20' : ''}
      `}
    >
      <div className={active || highlight ? 'text-blue-400' : 'group-hover:text-white'}>{icon}</div>
      {full && <span className={`font-medium ${active ? 'text-blue-400' : ''}`}>{text}</span>}
    </button>
  );
}
