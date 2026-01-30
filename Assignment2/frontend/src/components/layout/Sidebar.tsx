'use client'
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { User } from "lucide-react"
import Logout from "../auth/Logout"
import { useSearch } from "@/hooks/useSearch"
import { useState, useEffect } from "react"

const Sidebar = () => {
  const router = useRouter();
  const {setSearchParams,initialSearchParams} = useSearch();
  
  // Form state for checkboxes and radio buttons
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAccess, setSelectedAccess] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("active");

  const handleProfile = () => {
    router.push("/profile");
  };
  const handleSearch = ({queryType, query}: {queryType: string, query: string}) => {
    // Update form state
    if (queryType === "category") {
      setSelectedCategories(prev => 
        prev.includes(query) 
          ? prev.filter(cat => cat !== query)
          : [...prev, query]
      );
    } else if (queryType === "isLocked") {
      setSelectedAccess(query === "" ? "All" : query === "true" ? "Locked" : "Unlocked");
    } else if (queryType === "includeExpired") {
      setSelectedStatus(query === "true" ? "expiring" : "active");
    } else if (queryType === "sort") {
      // Sort doesn't need form state update
    }

    setSearchParams((prev) => {
      const newState = { ...prev };
      
      if (queryType === "category") {
        const currentCategories = prev.category || [];
        const categoryIndex = currentCategories.indexOf(query);
        
        if (categoryIndex === -1) {
          newState.category = [...currentCategories, query];
        } else {
          newState.category = currentCategories.filter(cat => cat !== query);
        }
      } else if (queryType === "isLocked") {
        newState.isLocked = query === "" ? undefined : query === "true";
      } else if (queryType === "includeExpired") {
        newState.includeExpired = query === "true";
      }
      if (queryType === "sort") {
        newState.sort = query;
      }
      return newState;
    });
  };
  const handleReset = () => {
    // Reset form state to defaults
    setSelectedCategories([]);
    setSelectedAccess("All");
    setSelectedStatus("active");
    
    // Reset search params
    setSearchParams((prev)=>({
      ...initialSearchParams,
      q: prev.q // Preserve search query
    }))
  };
  return (
    <aside
      className="
        w-64 shrink-0
        border-r border-slate-200
        bg-sky-200
        px-6 py-8
        transition-all duration-300
        hidden md:flex
        flex-col
      "
    >
      <div className="flex-1">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Filter Deals
          </h2>
        </div>
        <div className="mb-8">
          <h3 className="mb-3 text-md font-bold text-slate-700 uppercase tracking-wide">
            Category
          </h3>

          <div className="space-y-2">
          {[
            "Cloud",
            "Marketing",
            "Analytics",
            "Productivity",
            "Devtools",
          ].map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3  text-md text-slate-800 cursor-pointer hover:text-slate-600 transition"
              onClick={() => handleSearch({queryType: "category", query: cat})}
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-400"
                checked={selectedCategories.includes(cat)}
                readOnly
              />
              {cat}
            </label>
          ))}
        </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-3 text-md font-bold text-slate-700 uppercase tracking-wide">
            Access
          </h3>

          <div className="space-y-2">
            {["All", "Unlocked", "Locked"].map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 text-md text-slate-800 cursor-pointer hover:text-slate-600 transition"
                onClick={() => handleSearch({queryType: "isLocked", query: item === "All" ? "" : item === "Unlocked" ? "false" : "true"})}
              >
                <input
                  type="radio"
                  name="access"
                  className="h-4 w-4 border-slate-300 text-sky-600 focus:ring-sky-400"
                  checked={selectedAccess === item}
                  readOnly
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-10">
          <h3 className="mb-3 text-md font-bold text-slate-700 uppercase tracking-wide">
            Status
          </h3>

          <div className="space-y-2">
            <label className="flex items-center gap-3  text-md text-slate-800 cursor-pointer hover:text-slate-600 transition"
            onClick={() => handleSearch({queryType: "includeExpired", query: "false"})}
            >
              <input
                type="checkbox"
                name="status"
                className="h-4 w-4 border-slate-300 text-sky-600 focus:ring-sky-400"
                checked={selectedStatus === "active"}
                readOnly
              />
              Active deals
            </label>

            <label className="flex items-center gap-3  text-md text-slate-800 cursor-pointer hover:text-slate-600 transition"
            onClick={() => handleSearch({queryType: "sort", query: "expiresAt_asc"})}
            >
              <input
                type="checkbox"
                name="status"
                className="h-4 w-4 border-slate-300 text-sky-600 focus:ring-sky-400 cursor-pointer"
                checked={selectedStatus === "expiring"}
                readOnly
              />
              Expiring soon
            </label>
          </div>
        </div>
        <Button
          variant="outline"
          className="
            w-full rounded-xl
            border border-slate-200
            bg-sky-300 py-2 text-xl font-medium
            text-black
            hover:bg-sky-400 hover:text-white
            transition ease-in-out
          "
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
            onClick={handleProfile}
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
          <Logout/>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
