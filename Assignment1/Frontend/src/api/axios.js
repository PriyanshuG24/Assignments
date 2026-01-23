import axios from "axios";
import { toast } from 'sonner'

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});


export const plainAxios = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest?.url?.includes("/auth/refresh-token")) {
            return Promise.reject(error);
        }

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                })
                .catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const res = await plainAxios.post("/auth/refresh-token");
            const newAccessToken = res.data.accessToken;

            localStorage.setItem("accessToken", newAccessToken);

            processQueue(null, newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (err) {
            processQueue(err, null);

            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            toast.error("Session expired");
            try {
                await plainAxios.post("/auth/logout");
            } catch (_) { }

            window.location.replace("/login");
            return Promise.reject(err);
        } finally {
            isRefreshing = false;
        }
    }
);

export default api;
