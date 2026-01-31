import { useCallback } from "react";
import { toast } from "sonner";
import { dealsAPI } from "@/lib";
import { getErrorMessage } from "@/lib/utils";
import { useDealStore } from "@/store";

export const useDeals = () => {
  const {
    deals,
    myDeals,
    loadingDeals,
    loadingMyDeals,
    errorDeals,
    errorMyDeals,
    setDeals,
    setMyDeals,
    setLoadingDeals,
    setLoadingMyDeals,
    setErrorDeals,
    setErrorMyDeals,
  } = useDealStore();

  const fetchAllDeals = useCallback(async () => {
    setLoadingDeals(true);
    setErrorDeals(null);
    try {
      const res = await dealsAPI.getAll();
      setDeals(res.data.data);
    } catch (err) {
      const msg = getErrorMessage(err);
      setErrorDeals(msg);
      toast.error(msg);
    } finally {
      setLoadingDeals(false);
    }
  }, [setDeals, setErrorDeals, setLoadingDeals]);

  const fetchMyClaims = useCallback(async () => {
    setLoadingMyDeals(true);
    setErrorMyDeals(null);
    try {
      const res = await dealsAPI.getMyClaims();
      setMyDeals(res.data.data);
    } catch (err) {
      const msg = getErrorMessage(err);
      setErrorMyDeals(msg);
      toast.error(msg);
    } finally {
      setLoadingMyDeals(false);
    }
  }, [setMyDeals, setErrorMyDeals, setLoadingMyDeals]);

  const claimDeal = async (dealId: string) => {
    try {
      const res = await dealsAPI.claimDeal(dealId);
      toast.success(res?.data?.message || "Deal claimed");

    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return {
    deals,
    myDeals,
    loadingDeals,
    loadingMyDeals,
    errorDeals,
    errorMyDeals,
    fetchAllDeals,
    fetchMyClaims,
    claimDeal,
  };
};
