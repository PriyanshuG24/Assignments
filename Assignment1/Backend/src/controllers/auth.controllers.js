const { validateRegistration, validateLogin } = require("../utils/auth.validation");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const generateTokens = require("../utils/auth.generateToken");

//user registration
const registerUser = async (req, res) => {
    try {
        const { error } = validateRegistration(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const { username, email, password } = req.body;
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        user = new User({ username, email, password });
        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully!!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Intenal server error",
        });
    }
};

//user login
const loginUser = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }
        const { accessToken, refreshToken } = await generateTokens(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            userId: user._id,
            username: user.username,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Intenal server error",
        });
    }
};



//refresh token
const refreshTokenUser = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing",
            });
        }

        const storedToken = await RefreshToken.findOne({ token: refreshToken });

        if (!storedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        if (new Date() > storedToken.expiresAt) {
            await RefreshToken.deleteOne({ _id: storedToken._id });

            return res.status(401).json({
                success: false,
                message: "Refresh token expired",
            });
        }

        const user = await User.findById(storedToken.user);

        if (!user) {
            await RefreshToken.deleteOne({ _id: storedToken._id });

            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        await RefreshToken.deleteOne({ _id: storedToken._id });

        const { accessToken, refreshToken: newRefreshToken } =
            await generateTokens(user);

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        return res.status(200).json({
            success: true,
            accessToken,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//logout
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
        });
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Intenal server error",
        });
    }
};
module.exports = { registerUser, loginUser, refreshTokenUser, logoutUser };
