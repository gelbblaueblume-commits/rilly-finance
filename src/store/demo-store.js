import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Start-Daten (Das, was man am Anfang sieht)
const initialDemoData = {
  netWorth: 12450.00,
  transactions: [
    { id: '1', date: 'Heute', amount: -1299, merchant: 'Apple Store', category: 'Tech' },
    { id: '2', date: 'Gestern', amount: 4500, merchant: 'Gehalt', category: 'Einkommen' },
    { id: '3', date: 'Vorgestern', amount: -29, merchant: 'Server Kosten', category: 'Business' },
    { id: '4', date: '12.02.2024', amount: -85, merchant: 'Tankstelle', category: 'Auto' },
  ],
};

export const useDemoStore = create(
  persist(
    (set) => ({
      isDemoMode: true,
      ...initialDemoData,
      toggleDemoMode: () => set((state) => ({ isDemoMode: !state.isDemoMode })),
      // Funktion um Geld hinzuzufügen/abzuziehen
      addTransaction: (tx) => set((state) => ({ 
        transactions: [tx, ...state.transactions],
        netWorth: state.netWorth + tx.amount,
      })),
      resetDemoData: () => set(initialDemoData),
    }),
    {
      name: 'rilly-finance-storage', // Hier wird gespeichert
    }
  )
);
