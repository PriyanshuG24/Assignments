"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { User, Menu, X } from "lucide-react";
import Logout from "../auth/Logout";
import { useSearch } from "@/hooks/useSearch";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

const CATEGORIES = ["Cloud", "Marketing", "Analytics", "Productivity", "Devtools"];

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();
  const { searchParams, updateSearchParams, resetSearchParams } = useSearch();
  const [isVerified, setIsVerified] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = getUser();
    setIsVerified(user?.isVerified || false);
  }, []);

  const selectedCategories = searchParams.category || [];
  const selectedAccess =
    searchParams.isLocked === undefined ? "All" : searchParams.isLocked ? "Locked" : "Unlocked";

  const expiryChecked = searchParams.sort === "expiresAt_asc";

  const toggleCategory = (cat: string) => {
    const current = searchParams.category || [];
    const next = current.includes(cat) ? current.filter((c) => c !== cat) : [...current, cat];
    updateSearchParams({ category: next });
  };

  const setAccess = (value: "All" | "Unlocked" | "Locked") => {
    updateSearchParams({
      isLocked: value === "All" ? undefined : value === "Locked",
    });
  };

  const setActiveDeals = () => {
    const currentValue = searchParams.includeExpired;
    updateSearchParams({ includeExpired: currentValue === false ? true : false });
  };

  const toggleExpirySort = () => {
    updateSearchParams({
      sort: searchParams.sort === "expiresAt_asc" ? "expiresAt_desc" : "expiresAt_asc",
    });
  };

  const handleReset = () => {
    resetSearchParams({ q: searchParams.q });
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        w-64 shrink-0 border-r border-slate-200 bg-sky-200 px-6 py-8 
        fixed md:relative top-0 left-0 h-screen md:h-auto z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isOpen ? 'flex' : 'hidden md:flex'} flex-col
      `}>        
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h2 className="text-3xl font-bold text-slate-900">Filter Deals</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      <div className="flex-1">
        <div className="mb-8 md:hidden">
          <h2 className="text-3xl font-bold text-slate-900">Filter Deals</h2>
        </div>

        <div className="mb-8">
          <h3 className="mb-3 text-md font-bold text-slate-700 uppercase tracking-wide">Category</h3>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 text-md text-slate-800 cursor-pointer hover:text-slate-600 transition"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-400"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h3 className="mb-3 text-md font-bold text-slate-700 uppercase tracking-wide">Access</h3>
          <div className="space-y-2">
            {mounted && isVerified ? (
              <label className="flex items-center gap-3 text-md text-slate-800 cursor-pointer hover:text-slate-600 transition">
                <input
                  type="radio"
                  name="access"
                  className="h-4 w-4 border-slate-300 text-sky-600 focus:ring-sky-400"
                  checked={selectedAccess === "All"}
                  onChange={() => setAccess("All")}
                />
                All
              </label>
            ) : mounted ? (
              (["All", "Unlocked", "Locked"] as const).map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 text-md text-slate-800 cursor-pointer hover:text-slate-600 transition"
                >
                  <input
                    type="radio"
                    name="access"
                    className="h-4 w-4 border-slate-300 text-sky-600 focus:ring-sky-400"
                    checked={selectedAccess === item}
                    onChange={() => setAccess(item)}
                  />
                  {item}
                </label>
              ))
            ) : (
              <div className="space-y-2">
                {["All", "Unlocked", "Locked"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-md text-slate-800">
                    <div className="h-4 w-4 border border-slate-300 rounded"></div>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status / Sort */}
        <div className="mb-10">
          <h3 className="mb-3 text-md font-bold text-slate-700 uppercase tracking-wide">Status</h3>

          <div className="space-y-2">
            <label className="flex items-center gap-3 text-md text-slate-800 cursor-pointer hover:text-slate-600 transition">
              <input
                type="checkbox"
                className="h-4 w-4 border-slate-300 text-sky-600 focus:ring-sky-400"
                checked={searchParams.includeExpired === false}
                onChange={setActiveDeals}
              />
              Active deals
            </label>

            <label className="flex items-center gap-3 text-md text-slate-800 cursor-pointer hover:text-slate-600 transition">
              <input
                type="checkbox"
                className="h-4 w-4 border-slate-300 text-sky-600 focus:ring-sky-400"
                checked={expiryChecked}
                onChange={toggleExpirySort}
              />
              Expiring soon
            </label>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full rounded-xl border border-slate-200 bg-sky-300 py-2 text-xl font-medium text-black hover:bg-sky-400 hover:text-white transition ease-in-out"
          onClick={handleReset}
        >
          Reset filters
        </Button>
      </div>

      <div className="border-t border-slate-300">
        <div className="flex flex-col gap-3 mt-2 mb-2">
          <Button
            variant="outline"
            className="rounded-xl text-md justify-start gap-2 hover:bg-slate-100 cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
          <Logout />
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
