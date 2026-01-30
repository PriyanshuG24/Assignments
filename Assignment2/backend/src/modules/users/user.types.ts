
export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface UserResponse {
    id: string;
    email: string;
    username: string;
    isVerified: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignatureRequest {
    userId: string;
    username: string;
}
export interface AuthResponse {
    user: UserResponse;
    accessToken: string;
    refreshToken: string;
}