"use client";

import { useEffect, useRef } from "react";
import DealList from "@/components/deals/DealList";
import { useDeals } from "@/hooks/useDeals";
import { useSearch } from "@/hooks/useSearch";

export default function Dashboard() {
  const { fetchAllDeals } = useDeals();
  const { updateSearchParams, loading } = useSearch();

  // ✅ prevents double call in dev StrictMode
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    // ✅ initial load should use getAll deals, NOT search
    fetchAllDeals();
  }, [fetchAllDeals]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">Available Deals</h1>
        <p className="text-slate-600 max-w-2xl">
          Browse exclusive SaaS benefits for your startup. Some deals require verification before claiming.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search deals by name, partner, or category..."
            className="
              w-full h-12 rounded-xl font-medium
              bg-white border border-sky-200
              pl-4 pr-4
              text-sky-800
              shadow-sm
              focus:outline-none
              focus:ring-2 focus:ring-sky-300
            "
            // ✅ this still works; it will trigger /api/search only after typing
            onChange={(e) => updateSearchParams({ q: e.target.value })}
          />
        </div>

        {!loading && <div className="text-sm text-sky-500">Showing available deals</div>}
      </div>

      <DealList />
    </div>
  );
}
