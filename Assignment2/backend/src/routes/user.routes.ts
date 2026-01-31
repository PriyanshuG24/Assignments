import { Router } from "express"
import { register, login, verify, refreshToken } from '../modules/users/user.service.js'
import type { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../lib/error.js'
import { z } from 'zod'
import { env } from "../config/env.js"
import { authenticate } from '../middleware/authMiddleware.js'

const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
})

const loginSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
})

export const userRouter = Router()
userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = registerSchema.safeParse(req.body)
        if (!validatedData.success) {
            throw new BadRequestError('Invalid data', validatedData.error.issues)
        }
        const user = await register(validatedData.data)
        res.status(201).json({
            message: 'User registered successfully',
            user
        })
    } catch (error) {
        next(error)
    }
})

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = loginSchema.safeParse(req.body)
        if (!validatedData.success) {
            throw new BadRequestError('Invalid data', validatedData.error.issues)
        }
        const authResponse = await login(validatedData.data)
        res.cookie('refreshToken', authResponse.refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            message: 'User logged in successfully',
            user: authResponse.user,
            accessToken: authResponse.accessToken
        })
    } catch (error) {
        next(error)
    }
})



userRouter.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await refreshToken(req, res, next)
        res.status(200).json({
            message: 'User logged in successfully',
            data: result,
        })
    } catch (error) {
        next(error)
    }
})

userRouter.post('/logout', authenticate, async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'strict'
        })

        res.status(200).json({
            message: 'User logged out successfully'
        })

    } catch (error) {
        next(error)
    }
})

userRouter.post('/verify', authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await verify(req, res, next)
        res.status(200).json({
            message: 'User verified successfully',
            user: result.user
        })
    } catch (error) {
        next(error)
    }
})

