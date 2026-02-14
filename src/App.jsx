import React, { useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('dashboard');

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold text-blue-500">rilly Finance</h1>
        <div className="space-x-4">
          <button onClick={() => setPage('dashboard')} className="hover:text-blue-300 transition">Dashboard</button>
          <button onClick={() => setPage('pricing')} className="bg-blue-600 px-5 py-2 rounded-lg font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">Upgrade</button>
        </div>
      </nav>

      {/* Hauptbereich */}
      {page === 'dashboard' ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-8">
            <p className="text-gray-400 text-sm uppercase tracking-wider">Verfügbares Guthaben</p>
            <h2 className="text-5xl font-bold mt-2">€ 12.450,00</h2>
            <div className="mt-6 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-3/4"></div>
            </div>
          </div>
          
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold mb-4">Letzte Aktivitäten</h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm border-b border-white/10 pb-2">
                <span>Apple Store</span> <span className="text-red-400">- € 1.299,00</span>
              </li>
              <li className="flex justify-between text-sm border-b border-white/10 pb-2">
                <span>Stripe Payout</span> <span className="text-green-400">+ € 4.500,00</span>
              </li>
              <li className="flex justify-between text-sm">
                <span>Server Kosten</span> <span className="text-red-400">- € 29,00</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-4xl font-bold mb-4">Wähle deinen Plan</h2>
          <p className="text-gray-400 mb-10">Schalte alle Features frei.</p>
          
          <div className="glass-card p-8 max-w-md mx-auto border border-blue-500/50 relative">
            <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-2 py-1">BESTSELLER</div>
            <h3 className="text-2xl font-bold text-blue-400">Pro Cloud</h3>
            <p className="text-5xl font-bold my-6">€ 9,99<span className="text-lg font-normal text-gray-400">/Monat</span></p>
            <ul className="text-left space-y-3 mb-8 text-gray-300">
              <li>✓ Unbegrenzte Transaktionen</li>
              <li>✓ KI-Analyse</li>
              <li>✓ Priority Support</li>
            </ul>
            <button className="w-full bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-500 transition transform hover:scale-105">
              Jetzt abonnieren
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
