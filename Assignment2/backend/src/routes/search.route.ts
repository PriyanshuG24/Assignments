import { Router } from "express"
import { authenticate } from "../middleware/authMiddleware.js"
import type { Request, Response, NextFunction } from 'express'
export const searchRouter = Router()
import Deal from "../modules/deals/deal.model.js"
import console from "node:console"

searchRouter.get("/", authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category, isLocked, q, sort, includeExpired } = req.query;
        console.log("Received query params:", req.query)
        const query: any = {};
        if (category) {
            const categories = Array.isArray(category) ? category : [category];
            console.log("Categories to filter:", categories);
            const validCategories = categories
                .filter(cat => cat && typeof cat === 'string')
                .map(cat => cat as string)
                .filter(cat => cat.trim() !== '')
                .map(cat => cat.toLowerCase());

            if (validCategories.length > 0) {
                query.category = { $in: validCategories };
                console.log("Category query (lowercase):", query.category);
            }
        }
        if (isLocked !== undefined) {
            query.isLocked = isLocked === "true";
        }
        if (!includeExpired) {
            query.expiresAt = { $gt: new Date() };
        }
        if (q) {
            query.$or = [
                { title: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
                { partnerName: { $regex: q, $options: "i" } }
            ];
        }
        let sortOption: any = { createdAt: -1 };
        if (sort === "expiresAt_desc") {
            sortOption = { expiresAt: -1 };
        }
        if (sort === "expiresAt_asc") {
            sortOption = { expiresAt: 1 };
        }
        console.log(query)
        const deals = await Deal.find(query).sort(sortOption);
        res.json({ message: "success", data: deals });
    } catch (error) {
        next(error)
    }
});