import { create } from 'zustand';

interface FilterState {
  selectedChain: string | null;
  setSelectedChain: (chain: string | null) => void;
}

export const useRestaurantFilter = create<FilterState>((set) => ({
  selectedChain: null,
  setSelectedChain: (chain) => set({ selectedChain: chain })
}));