import { create } from 'zustand';
import type { Deal, Claim } from '@/types';

interface DealStore {
  deals: Deal[];
  myDeals: Claim[];
  loading: boolean;
  error: string | null;

  setDeals: (deals: Deal[]) => void;
  setMyDeals: (deals: Claim[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDealStore = create<DealStore>((set) => ({
  deals: [],
  myDeals: [],
  loading: false,
  error: null,

  setDeals: (deals) => set({ deals, error: null }),
  setMyDeals: (deals) => set({ myDeals: deals, error: null }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

}));

export const useAllDeals = () => useDealStore((state) => state.deals);
export const useDealsLoading = () => useDealStore((state) => state.loading);
export const useDealsError = () => useDealStore((state) => state.error);
export const useMyDeals = () => useDealStore((state) => state.myDeals);

