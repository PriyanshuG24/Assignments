"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authAPI, ROUTES, setTokens, getTokens, setUser, getUser, clearTokens, clearUser, getErrorMessage } from "../lib";

import type { User, SignInData, SignUpData } from "../types";

export const useAuth = () => {
    const [user, setUserState] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const tokens = getTokens();
        const savedUser = getUser();
        if (tokens.accessToken && savedUser) setUserState(savedUser);
    }, []);

    const signin = async (credentials: SignInData) => {
        setLoading(true);
        try {
            const response = await authAPI.signin(credentials);
            const { user: userData, accessToken } = response.data;

            setTokens(accessToken);
            setUser(userData);
            setUserState(userData);

            toast.success("Signed in successfully");
            router.push(ROUTES.DASHBOARD);
            return userData as User;
        } catch (error) {
            toast.error(getErrorMessage(error));
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (userData: SignUpData) => {
        setLoading(true);
        try {
            const response = await authAPI.signup(userData);
            const { user: newUser, accessToken } = response.data;

            setTokens(accessToken);
            setUser(newUser);
            setUserState(newUser);

            toast.success("Account created successfully");
            router.push(ROUTES.DASHBOARD);
            return newUser as User;
        } catch (error) {
            toast.error(getErrorMessage(error));
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signout = async () => {

        try {
            await authAPI.logout();
        } catch (error) {
            console.error("Logout error:", error);
        }

        clearTokens();
        clearUser();
        setUserState(null);

        toast.success("Logged out successfully");
        router.push(ROUTES.SIGNIN);
    };

    const refreshAuth = async () => {
        try {
            const response = await authAPI.refreshToken();
            console.log(response.data)
            const { accessToken } = response.data.data;
            setTokens(accessToken);
            return true;
        } catch (error) {
            await signout();
            return false;
        }
    };

    const getVerify = async () => {
        setLoading(true);
        try {
            const response = await authAPI.verify();
            const { user: userData } = response.data;

            setUser(userData);
            setUserState(userData);

            toast.success("Verified successfully");
            return userData as User;
        } catch (error) {
            toast.error(getErrorMessage(error));
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        user,
        loading,
        signin,
        signup,
        signout,
        refreshAuth,
        isAuthenticated: !!user,
        getVerify
    };
};
