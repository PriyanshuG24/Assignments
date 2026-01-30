import { Router } from "express"
import { authenticate } from "../middleware/authMiddleware.js"
import type { Request, Response, NextFunction } from 'express'
import { validateClaim, getMyAllClaimsByUserId } from "../modules/claims/claim.service.js"
export const claimRouter = Router()

claimRouter.post('/claim-deal', authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validateClaimResult = await validateClaim(req, res, next)

        res.status(201).json({
            message: "Claim created successfully",
            data: validateClaimResult
        })
    } catch (error) {
        next(error)
    }
})

claimRouter.get("/my-deals", authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const myDeals = await getMyAllClaimsByUserId(req, res, next)
        res.status(200).json({
            message: "My deals",
            data: myDeals
        })
    } catch (error) {
        next(error)
    }
})