import { create } from "zustand";
import type { Deal, Claim } from "@/types";

interface DealStore {
  deals: Deal[];
  myDeals: Claim[];

  loadingDeals: boolean;
  loadingMyDeals: boolean;
  errorDeals: string | null;
  errorMyDeals: string | null;

  setDeals: (deals: Deal[]) => void;
  setMyDeals: (deals: Claim[]) => void;

  setLoadingDeals: (v: boolean) => void;
  setLoadingMyDeals: (v: boolean) => void;

  setErrorDeals: (msg: string | null) => void;
  setErrorMyDeals: (msg: string | null) => void;
}

export const useDealStore = create<DealStore>((set) => ({
  deals: [],
  myDeals: [],

  loadingDeals: false,
  loadingMyDeals: false,
  errorDeals: null,
  errorMyDeals: null,

  setDeals: (deals) => set({ deals, errorDeals: null }),
  setMyDeals: (deals) => set({ myDeals: deals, errorMyDeals: null }),

  setLoadingDeals: (v) => set({ loadingDeals: v }),
  setLoadingMyDeals: (v) => set({ loadingMyDeals: v }),

  setErrorDeals: (msg) => set({ errorDeals: msg }),
  setErrorMyDeals: (msg) => set({ errorMyDeals: msg }),
}));
