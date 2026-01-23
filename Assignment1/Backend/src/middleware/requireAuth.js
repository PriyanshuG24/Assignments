const User = require("../models/User");
const { verifyAccessToken } = require("../utils/auth.validation");

async function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = verifyAccessToken(token)
        const user = await User.findById(payload.userId).select('-password')
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}
module.exports = { requireAuth }