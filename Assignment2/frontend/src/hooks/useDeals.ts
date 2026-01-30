import { useEffect } from 'react';
import { useDealStore } from '@/store';
import { dealsAPI } from '@/lib';
import { getErrorMessage } from '@/lib/utils';
import { toast } from 'sonner';

export const useDeals = () => {
  const {
    deals,
    myDeals,
    loading,
    error,
    setDeals,
    setMyDeals,
    setLoading,
    setError,
  } = useDealStore();

  const fetchDeals = async () => {
    // Prevent redundant calls if already loading or data exists
    if (loading || (deals.length > 0 && myDeals.length > 0)) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await dealsAPI.getAll();
      setDeals(response.data.data);
      const myDealsResponse = await dealsAPI.getMyClaims();
      setMyDeals(myDealsResponse.data.data);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const claimDeal = async (dealId: string) => {
    try {
      const response = await dealsAPI.claimDeal(dealId);
      toast.success(response?.data?.message || `Deal ${dealId} claimed successfully`)
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }



  useEffect(() => {
    fetchDeals();
  }, []);

  return {
    deals,
    myDeals,
    loading,
    error,
    claimDeal
  };
};
