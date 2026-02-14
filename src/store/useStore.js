import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      currency: 'EUR',
      netWorth: 1250400.55,
      isDemo: false,
      setCurrency: (c) => set({ currency: c }),
      toggleDemo: () => set((state) => ({ isDemo: !state.isDemo })),
    }),
    { name: 'rilly-elite-storage' }
  )
);
