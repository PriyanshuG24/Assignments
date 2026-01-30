export interface ClaimResponse {
    claimId: number;
    userId: string;
    dealId: string;
    status: 'pending' | 'approved' | 'rejected';
}

export interface DealData {
    _id: string;
    dealId: number;
    title: string;
    description: string;
    category: 'cloud' | 'marketing' | 'analytics' | 'productivity' | 'devtools' | 'other';
    partnerName: string;
    isLocked: boolean;
    expiresAt: Date;
}

export interface ClaimWithDealResponse {
    claimId: number;
    userId: string;
    dealData: DealData;
    status: 'pending' | 'approved' | 'rejected';
}

