export type User = {
    id: string;
    name: string;
    email: string;
    isVerified: boolean;
};

export type SignInData = {
    email: string;
    password: string;
};

export type SignUpData = {
    name: string;
    email: string;
    password: string;
};
