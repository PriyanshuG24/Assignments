import User from './user.model.js'
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from '../../config/env.js'
import { SignatureRequest } from '../../modules/users/user.types.js'

export const findByEmail = async (email: string) => {
    return await User.findOne({ email })
}

export const createUser = async (userData: { email: string; password: string; username: string }) => {
    const user = new User(userData)
    return await user.save()
}
export const findById = async (id: string) => {
    return await User.findById(id)
}

export const findByIdAndVerify = async (id: string) => {
    return await User.findByIdAndUpdate(id, { isVerified: true }, { new: true })
}

export const generateTokens = (user: SignatureRequest) => {
    const secretKey: string = env.JWT_ACCESS_SECRET;
    if (!secretKey) {
        throw new Error("JWT_SECRET environment variable not set");
    }
    const payload = {
        userId: user.userId,
        username: user.username,
    };
    const options = {
        expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    };

    const refreshSecretKey: string = env.JWT_REFRESH_SECRET;
    if (!refreshSecretKey) {
        throw new Error("JWT_REFRESH_SECRET environment variable not set");
    }
    const refreshOptions = {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    };
    try {
        const accessToken = jwt.sign(payload, secretKey, options)
        const refreshToken = jwt.sign(payload, refreshSecretKey, refreshOptions)

        return { accessToken, refreshToken }
    } catch (error) {
        console.error("JWT signing error:", error)
        throw error
    }
}

export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload
}

export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload
}