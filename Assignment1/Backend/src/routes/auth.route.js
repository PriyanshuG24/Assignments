const express = require('express')
const { registerUser, loginUser, refreshTokenUser, logoutUser } = require('../controllers/auth.controllers')

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/refresh-token", refreshTokenUser)

module.exports = router