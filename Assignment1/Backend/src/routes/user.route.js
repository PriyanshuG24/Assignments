const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/requireAuth')
const { updateProfile } = require('../controllers/user.controller')
router.get('/profile', requireAuth, (req, res) => {
    return res.json({ user: req.user })
})
router.put('/update-profile', requireAuth, updateProfile)
module.exports = router