import { Router } from "express"
export const dealRouter = Router()
import { authenticate } from "../middleware/authMiddleware.js"
import { getAllDeals } from "../modules/deals/deal.service.js"

dealRouter.get("/all-deals", authenticate, async (_req, res, next) => {
    try {
        const allDeals = await getAllDeals()
        res.status(200).json({
            message: "All deals",
            data: allDeals
        })
    } catch (error) {
        next(error)
    }
})