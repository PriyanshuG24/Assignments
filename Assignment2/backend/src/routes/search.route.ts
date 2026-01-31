import { Router } from "express"
import { authenticate } from "../middleware/authMiddleware.js"
import type { Request, Response, NextFunction } from 'express'
export const searchRouter = Router()
import Deal from "../modules/deals/deal.model.js"

searchRouter.get("/", authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category, isLocked, q, sort, includeExpired } = req.query;

        const query: any = {};
        if (category) {
            const categories = Array.isArray(category) ? category : [category];
            const validCategories = categories
                .filter((cat): cat is string => typeof cat === "string")
                .map((cat) => cat.trim().toLowerCase())
                .filter(Boolean);

            if (validCategories.length > 0) {
                query.category = { $in: validCategories };
            }
        }

        if (isLocked !== undefined) {
            query.isLocked = isLocked === "true";
        }

        const includeExpiredBool =
            includeExpired === undefined ? true : includeExpired === "true";

        if (!includeExpiredBool) {
            query.expiresAt = { $gt: new Date() };
        }


        const qStr = typeof q === "string" ? q.trim() : "";
        if (qStr) {
            query.$or = [
                { title: { $regex: qStr, $options: "i" } },
                { description: { $regex: qStr, $options: "i" } },
                { partnerName: { $regex: qStr, $options: "i" } },
            ];
        }

        let sortOption: any = { createdAt: -1 };
        if (sort === "expiresAt_desc") sortOption = { expiresAt: -1 };
        if (sort === "expiresAt_asc") sortOption = { expiresAt: 1 };

        const deals = await Deal.find(query).sort(sortOption);
        res.json({ message: "success", data: deals });
    } catch (error) {
        next(error);
    }
});
