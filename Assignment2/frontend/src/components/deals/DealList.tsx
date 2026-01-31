"use client";

import DealCard from "./DealCard";
import { useDealStore } from "@/store/dealStore";

const DealList = () => {
  const { deals, loadingDeals } = useDealStore();

  if (loadingDeals) return <div className="text-slate-500">Loading deals…</div>;
  if (!deals || deals.length === 0) return <div className="text-slate-500">No deals found</div>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map((deal, index) => (
        <DealCard key={index} deal={deal} />
      ))}
    </div>
  );
};

export default DealList;
