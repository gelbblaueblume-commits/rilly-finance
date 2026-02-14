import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/Dashboard';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [view, setView] = useState('wealth');

  return (
    <div className="flex h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-hidden font-sans">
      <Sidebar activeView={view} setView={setView} />
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {view === 'wealth' && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DashboardPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
