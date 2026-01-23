const { validateUser } = require("../utils/user.validation");
const User = require("../models/User");

const updateProfile = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    try {
        const { email, username } = req.body;
        let user = await User.findOneAndUpdate({ _id: req.user._id }, { $set: { email, username } }, { new: true, runValidators: true }).select("-password");
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

module.exports = { updateProfile };