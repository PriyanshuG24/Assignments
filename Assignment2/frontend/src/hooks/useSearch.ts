"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import { searchAPI, getErrorMessage } from "../lib";
import type { SearchType } from "../types";
import { useDealStore } from "../store/dealStore";

const DEFAULT_PARAMS: SearchType = {
    q: "",
    category: [],
    isLocked: undefined,
    sort: "createdAt_desc",
    includeExpired: true,
};

export const useSearch = () => {
    const { setDeals } = useDealStore();

    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState<SearchType>(DEFAULT_PARAMS);
    const enabled = useRef(false);

    const initialSearchParams = useMemo(() => DEFAULT_PARAMS, []);

    const search = useCallback(async (params: SearchType) => {
        setLoading(true);
        try {
            const response = await searchAPI.search(params);
            setDeals(response.data.data);
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, [setDeals]);

    useEffect(() => {
        if (!enabled.current) return;

        const t = setTimeout(() => {
            search(searchParams);
        }, 300);

        return () => clearTimeout(t);
    }, [searchParams, search]);

    const updateSearchParams = (patch: Partial<SearchType>) => {
        enabled.current = true;
        setSearchParams((prev) => ({ ...prev, ...patch }));
    };

    const resetSearchParams = (keep?: Partial<SearchType>) => {
        enabled.current = true;
        setSearchParams({ ...DEFAULT_PARAMS, ...(keep || {}) });
    };

    const disableSearch = () => {
        enabled.current = false;
    };

    return {
        loading,
        searchParams,
        updateSearchParams,
        resetSearchParams,
        disableSearch,
        initialSearchParams,
    };
};
