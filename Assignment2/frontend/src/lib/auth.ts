"use client";
import Cookies from "js-cookie";
import type { User } from "../types/index";

export const setTokens = (accessToken: string) => {
    Cookies.set("accessToken", accessToken, {
        expires: new Date(Date.now() + 30 * 60 * 1000),
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

};

export const getTokens = () => ({
    accessToken: Cookies.get("accessToken"),
});

export const clearTokens = () => {
    Cookies.remove("accessToken");
};
export const setUser = (user: User) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(user));
};
export const getUser = (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;

};
export const clearUser = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("user");

};
export const isAuthenticated = (): boolean => {
    return !!Cookies.get("accessToken");
};
export const signOutHard = () => {
    clearTokens();
    clearUser();
    if (typeof window !== "undefined") window.location.href = "/signin";
};

