import axios from "axios";
import Cookies from "js-cookie";
import { ROUTES, API_ENDPOINTS } from "./constant"
import type { SearchType, SignInData, SignUpData } from "../types/index"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    withCredentials: true,
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = Cookies.get("accessToken");
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string | null) => void> = [];

function subscribeTokenRefresh(cb: (token: string | null) => void) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token: string | null) {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error?.response?.status;
        const originalRequest = error?.config;

        if (status !== 401) return Promise.reject(error);

        const isRefreshCall =
            originalRequest?.url?.includes(API_ENDPOINTS.AUTH.REFRESH);

        if (isRefreshCall) {

            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            if (typeof window !== "undefined") window.location.href = ROUTES.SIGNIN;
            return Promise.reject(error);
        }

        if (originalRequest?._retry) {

            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            if (typeof window !== "undefined") window.location.href = ROUTES.SIGNIN;
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                subscribeTokenRefresh((newToken) => {
                    if (!newToken) return reject(error);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    resolve(api(originalRequest));
                });
            });
        }

        isRefreshing = true;

        try {
            const resp = await api.post(API_ENDPOINTS.AUTH.REFRESH);
            const { accessToken } = resp.data.data;

            if (!accessToken) {
                throw new Error("No access token received from refresh");
            }

            Cookies.set("accessToken", accessToken, {
                expires: 30 / 1440, // 30 minutes in days
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });

            onRefreshed(accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
        } catch (e) {
            onRefreshed(null);
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            if (typeof window !== "undefined") window.location.href = ROUTES.SIGNIN;
            return Promise.reject(e);
        } finally {
            isRefreshing = false;
        }
    }
);


export const authAPI = {
    signin: (data: SignInData) => api.post(API_ENDPOINTS.AUTH.SIGNIN, data),
    signup: (data: SignUpData) => api.post(API_ENDPOINTS.AUTH.SIGNUP, data),
    refreshToken: () => api.post(API_ENDPOINTS.AUTH.REFRESH),
    logout: () => api.post(API_ENDPOINTS.AUTH.LOGOUT),
    verify: () => api.post(API_ENDPOINTS.AUTH.VERIFY),
};

export const dealsAPI = {
    getAll: () => api.get(API_ENDPOINTS.DEALS.ALL),
    getMyClaims: () => api.get(API_ENDPOINTS.DEALS.MY_CLAIMS),
    claimDeal: (dealId: string) => api.post(API_ENDPOINTS.DEALS.CLAIM, { dealId }),
};

export const searchAPI = {
    search: (query: SearchType) => api.get(API_ENDPOINTS.SEARCH, { params: query }),
};

export default api;
