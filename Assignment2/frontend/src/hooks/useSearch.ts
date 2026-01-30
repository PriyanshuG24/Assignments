"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { searchAPI, getErrorMessage } from "../lib";
import type { SearchType } from "../types";
import { useDealStore } from "../store/dealStore";

export const useSearch = () => {
    const { setDeals } = useDealStore();
    const initialSearchParams = {
        q: "",
        category: [],
        isLocked: undefined,
        sort: "createdAt_desc",
        includeExpired: true,
    }
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState<SearchType>(initialSearchParams)
    const [prevParams, setPrevParams] = useState<SearchType>(initialSearchParams)
    const [isInitialized, setIsInitialized] = useState(false)

    const search = async () => {
        // Prevent redundant calls if already loading
        if (loading) return;

        setLoading(true);
        try {
            const response = await searchAPI.search(searchParams);
            console.log(response.data);
            setDeals(response.data.data);
        } catch (error) {
            toast.error(getErrorMessage(error));
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Always search on initial mount
        if (!isInitialized) {
            console.log("initial search");
            search();
            setIsInitialized(true);
            setPrevParams(searchParams);
            return;
        }

        // Only search if parameters actually changed
        if (JSON.stringify(prevParams) !== JSON.stringify(searchParams)) {
            const timer = setTimeout(() => {
                console.log("searching");
                search();
                setPrevParams(searchParams);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [searchParams])

    return {
        loading,
        search,
        setSearchParams,
        initialSearchParams,
    };
};