import type { Request, Response, NextFunction } from 'express'
import { findDealById, createClaim, getMyAllClaims } from './claim.repository.js'
import { BadRequestError, UnauthorizedError } from '../../lib/error.js'
import type { ClaimResponse, ClaimWithDealResponse } from './claim.types.js'
export const validateClaim = async (req: Request, _res: Response, _next: NextFunction): Promise<ClaimResponse> => {

    if (!req.user) {
        throw new UnauthorizedError("User not found")
    }
    const { dealId } = req.body
    if (!dealId) {
        throw new BadRequestError("Deal id is required")
    }
    const findDeal = await findDealById(dealId)
    if (!findDeal) {
        throw new BadRequestError("Deal not found")
    }
    if (!req.user.isVerified && findDeal?.isLocked) {
        throw new BadRequestError("You are not verified")
    }
    const createNewClaim = await createClaim(req.user._id, Number(dealId))
    return createNewClaim

}

export const getMyAllClaimsByUserId = async (req: Request, _res: Response, _next: NextFunction): Promise<ClaimWithDealResponse[]> => {
    if (!req.user) {
        throw new UnauthorizedError("User not found")
    }
    const myAllClaims = await getMyAllClaims(req.user._id)
    return myAllClaims
}