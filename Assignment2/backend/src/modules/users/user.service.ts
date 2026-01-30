import { findByEmail, createUser, generateTokens, findById, findByIdAndVerify } from './user.repository.js'
import type { LoginRequest, RegisterRequest, UserResponse, AuthResponse } from './user.types.js'
import { BadRequestError } from '../../lib/error.js'
import { verifyRefreshToken } from './user.repository.js'
import type { Request, Response, NextFunction } from 'express'
import { env } from '../../config/env.js'

export const register = async (data: RegisterRequest): Promise<UserResponse> => {
    const existingUser = await findByEmail(data.email)
    if (existingUser) {
        throw new BadRequestError('User already exists')
    }

    const user = await createUser({
        email: data.email,
        password: data.password,
        username: data.username
    })

    return {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        isVerified: user.isVerified
    }
}

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const user = await findByEmail(data.email)
    if (!user) {
        throw new BadRequestError('User not found')
    }
    const isValidPassword = await user.comparePassword(data.password);
    if (!isValidPassword) {
        throw new BadRequestError('Invalid password')
    }
    const { accessToken, refreshToken } = generateTokens({ userId: user._id.toString(), username: user.username });
    return {
        user: {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            isVerified: user.isVerified
        },
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

export const refreshToken = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const refreshTokenFromCookie = req.cookies.refreshToken
        console.log(refreshTokenFromCookie)
        if (!refreshTokenFromCookie) {
            throw new BadRequestError('Refresh token not found')
        }
        const payload = verifyRefreshToken(refreshTokenFromCookie);
        if (!payload.userId) {
            throw new BadRequestError('Invalid refresh token')
        }
        const user = await findById(payload.userId)
        if (!user) {
            throw new BadRequestError('User not found')
        }
        const { accessToken, refreshToken } = generateTokens({ userId: user._id.toString(), username: user.username })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return {
            accessToken,
            user: {
                id: user._id.toString(),
                email: user.email,
                username: user.username,
                isVerified: user.isVerified
            }
        }

    } catch (error) {
        throw error
    }
}

export const verify = async (req: Request, _res: Response, _next: NextFunction): Promise<{ user: UserResponse, message: string }> => {
    const user = req.user
    if (!user || !user._id) {
        throw new BadRequestError('User not found')
    }
    const result = await findByIdAndVerify(user._id)
    if (!result) {
        throw new BadRequestError('User not found')
    }
    return {
        user: {
            id: result._id.toString(),
            email: result.email,
            username: result.username,
            isVerified: result.isVerified
        },
        message: 'User verified successfully'
    }
}