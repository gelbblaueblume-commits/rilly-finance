import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // --- GLOBALE EINSTELLUNGEN ---
      currency: 'EUR',
      isDemo: true,
      isAuthenticated: false,
      
      // --- FINANZDATEN (ELITE-LEVEL) ---
      netWorth: 1250400.55,
      liquidity: 142500.00,
      monthlyInflow: 24500.00,
      monthlyOutflow: 8450.00,

      // --- AKTIONEN (FUNKTIONEN) ---
      setCurrency: (c) => set({ currency: c }),
      toggleDemo: () => set((state) => ({ isDemo: !state.isDemo })),
      setAuth: (status) => set({ isAuthenticated: status }),
      
      // Simulation einer Wertsteigerung
      addTransaction: (amount) => set((state) => ({ 
        netWorth: state.netWorth + amount 
      })),

      // Reset-Funktion für den Kunden
      resetPortfolio: () => set({
        netWorth: 1250400.55,
        liquidity: 142500.00,
        isDemo: true
      }),
    }),
    {
      name: 'rilly-elite-storage', // Dieser Name sorgt dafür, dass die Daten im Browser-Cache bleiben
    }
  )
);
