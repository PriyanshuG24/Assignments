"use client";
import DealList from "@/components/deals/DealList"
import { useSearch } from "@/hooks/useSearch"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const {setSearchParams, loading} = useSearch();
  const [searchInput, setSearchInput] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((prev)=>({
        ...prev,
        q: searchInput
      }));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput,setSearchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  return (
    <div className="space-y-10">

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">
          Available Deals
        </h1>
        <p className="text-slate-600 max-w-2xl">
          Browse exclusive SaaS benefits for your startup. Some deals require
          verification before claiming.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search deals by name, partner, or category..."
            className="
              w-full h-12 rounded-xl
              font-medium
              bg-white border border-sky-200
              pl-4 pr-4
              text-sky-800
              shadow-sm
              focus:outline-none
              focus:ring-2 focus:ring-sky-300
            "
            onChange={handleSearch}
          />
        </div>

        {!loading && <div className="text-sm text-sky-500">
          Showing available deals
        </div>}
      </div>

      <DealList />
    </div>
  )
}
