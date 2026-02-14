import React, { useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Area, AreaChart, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { Activity, LayoutDashboard, Settings, CreditCard } from 'lucide-react';
import './App.css';

/* --- 1. DER SPEICHER (Direkt hier drin, damit es keine Fehler gibt) --- */
const useStore = create(
  persist(
    (set) => ({
      netWorth: 12450.00,
      transactions: [
        { id: '1', date: 'Heute', amount: -1299, merchant: 'Apple Store' },
        { id: '2', date: 'Gestern', amount: 4500, merchant: 'Gehalt' },
        { id: '3', date: '12.02.', amount: -29, merchant: 'Server Kosten' },
      ],
      // Aktionen (optional für später)
      addTransaction: (tx) => set((state) => ({ 
        transactions: [tx, ...state.transactions],
        netWorth: state.netWorth + tx.amount 
      })),
    }),
    { name: 'finance-storage' }
  )
);

/* --- 2. DIE APP --- */
function App() {
  const [view, setView] = useState('dashboard');
  const [isMounted, setIsMounted] = useState(false);
  const { netWorth, transactions } = useStore();

  // Wichtig: Verhindert "Hydration Errors" beim Laden
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatCurrency = (val) => 
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val);

  // Chart Daten generieren
  const data = Array.from({ length: 14 }).map((_, i) => ({
    name: `Tag ${i}`,
    value: netWorth - (Math.random() * 1000)
  }));

  if (!isMounted) return <div className="p-10 text-white">Lade Finance App...</div>;

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 p-6 hidden md:flex flex-col">
        <h1 className="text-2xl font-bold text-blue-500 mb-8">rilly Finance</h1>
        <nav className="space-y-2">
          <button onClick={() => setView('dashboard')} className={`flex items-center gap-3 w-full p-3 rounded-lg ${view === 'dashboard' ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-white/5'}`}>
            <LayoutDashboard size={20} /> Dashboard
          
                <div className="text-5xl font-bold text-white mb-6">{formatCurrency(netWorth)}</div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[70%]"></div>
                </div>
              </div>

              {/* Chart Karte */}
              <div className="bg-[#1e293b] rounded-xl border border-slate-700 p-8 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Verlauf</h3>
                <div className="h-[150px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Transaktionen */}
            <div className="bg-[#1e293b] rounded-xl border border-slate-700 p-8">
              <h3 className="text-lg font-bold mb-4">Letzte Buchungen</h3>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex justify-between border-b border-slate-700 pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{tx.merchant}</p>
                      <p className="text-xs text-slate-500">{tx.date}</p>
                    </div>
                    <span className={tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
                      {tx.amount > 0 ? '+' : ''} {formatCurrency(tx.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* --- PRICING PAGE --- */
          <div className="flex flex-col items-center justify-center py-10">
            <div className="bg-[#1e293b] p-8 rounded-2xl border border-blue-500 max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Pro Cloud</h2>
              <div className="text-4xl font-bold text-blue-400 mb-6">€ 9,99</div>
              <ul className="text-left space-y-3 mb-8 text-slate-300">
                <li>✓ Alle Features</li>
                <li>✓ Unbegrenzte Charts</li>
                <li>✓ Priority Support</li>
              </ul>
              <button 
                onClick={() => window.location.href = 'DEIN_LINK_HIER'}
                className="w-full py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-500 transition"
              >
                Jetzt abonnieren
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
