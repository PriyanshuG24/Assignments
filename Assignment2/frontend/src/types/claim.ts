export type Claim = {
    claimId: number;
    userId: string;
    dealData: {
        _id: string;
        dealId: number;
        title: string;
        description?: string;
        category?: string;
        partnerName?: string;
        isLocked?: boolean;
        expiresAt?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
    };
    status: "pending" | "approved" | "rejected";
    createdAt?: string;
};
