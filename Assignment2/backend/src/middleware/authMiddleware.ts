import User from "../modules/users/user.model.js";
import { verifyAccessToken } from "../modules/users/user.repository.js";
import type { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import { UnauthorizedError } from '../lib/error.js'

export const authenticate = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnauthorizedError("Not authorized, no token provided");
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = verifyAccessToken(token)
        const user = await User.findById(payload.userId).select('_id username email isVerified')

        if (!user) {
            throw new UnauthorizedError("Not authorized, user not found");
        }
        req.user = {
            _id: user._id.toString(),
            name: user.username,
            email: user.email,
            isVerified: user.isVerified
        };

        next();
    } catch (error) {
        throw new UnauthorizedError("Not authorized, invalid token");
    }
})