export type Deal = {
    _id: string;
    dealId: number;
    title: string;
    description?: string;
    partnerName?: string;
    category?: string;
    createdAt?: string;
    updatedAt?: string;
    expiresAt?: string;
    isLocked?: boolean;
    __v?: number;
};
