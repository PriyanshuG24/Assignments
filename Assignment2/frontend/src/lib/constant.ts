export const API_ENDPOINTS = {
    AUTH: {
        SIGNIN: "/auth/login",
        SIGNUP: "/auth/register",
        REFRESH: "/auth/refresh-token",
        LOGOUT: "/auth/logout",
        VERIFY: "/auth/verify",
    },
    DEALS: {
        ALL: "/deal/all-deals",
        CLAIM: "/claim/claim-deal",
        MY_CLAIMS: "/claim/my-deals",
    },
    SEARCH: "/search",
} as const;

export const ROUTES = {
    HOME: "/",
    SIGNIN: "/signin",
    SIGNUP: "/signup",
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
} as const;

export const CLAIM_STATUS = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
} as const;

export const DEAL_CATEGORIES = {
    CLOUD: "cloud",
    MARKETING: "marketing",
    ANALYTICS: "analytics",
    PRODUCTIVITY: "productivity",
    DEVTOOLS: "devtools",
    OTHER: "other",
} as const;

export const TOAST_MESSAGES = {
    AUTH: {
        SIGNIN_SUCCESS: "Signed in successfully",
        SIGNIN_ERROR: "Invalid credentials",
        SIGNUP_SUCCESS: "Account created successfully",
        SIGNUP_ERROR: "Registration failed",
        LOGOUT_SUCCESS: "Logged out successfully",
    },
    DEALS: {
        CLAIM_SUCCESS: "Deal claimed successfully",
        CLAIM_ERROR: "Failed to claim deal",
        CLAIM_EXISTS: "You have already claimed this deal",
    },
    SEARCH: {
        NO_RESULTS: "No results found",
    }
} as const;
