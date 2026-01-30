import Deal from "../deals/deal.model.js"
import Claim from "./claim.model.js"
import { BadRequestError } from "../../lib/error.js"
import type { ClaimResponse, ClaimWithDealResponse, DealData } from "./claim.types.js"

interface PopulatedClaim {
    claimId: number;
    userId: string;
    dealId: DealData
    status: 'pending' | 'approved' | 'rejected';
}

export const findDealById = async (dealId: string) => {
    const data = await Deal.findOne({ dealId: Number(dealId) });
    return data;
}

const getNextClaimId = async (): Promise<number> => {
    const lastClaim = await Claim.findOne().sort({ claimId: -1 });
    return lastClaim ? lastClaim.claimId + 1 : 1;
}

export const createClaim = async (userId: string, dealId: number): Promise<ClaimResponse> => {
    const claimId = await getNextClaimId();

    const deal = await Deal.findOne({ dealId: dealId });
    if (!deal) {
        throw new BadRequestError('Deal not found');
    }
    if (deal.expiresAt < new Date()) {
        throw new BadRequestError('Deal is expired')
    }
    const existingClaim = await Claim.findOne({ userId: userId, dealId: deal._id.toString() });
    if (existingClaim) {
        throw new BadRequestError('You have already claimed this deal');
    }

    const data = await Claim.create({
        claimId,
        userId,
        dealId: deal._id.toString()
    });

    return {
        claimId: data.claimId,
        userId: data.userId.toString(),
        dealId: data.dealId.toString(),
        status: data.status as 'pending' | 'approved' | 'rejected'
    };
}

export const getMyAllClaims = async (userId: string): Promise<ClaimWithDealResponse[]> => {
    const data = await Claim.find({ userId: userId }).populate('dealId') as unknown as PopulatedClaim[];

    return data.map(claim => ({
        claimId: claim.claimId,
        userId: claim.userId.toString(),
        dealData: claim.dealId,
        status: claim.status
    }));
}