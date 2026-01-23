const Joi = require('joi')
const jwt = require("jsonwebtoken");

const validateRegistration = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

const validateLogin = (data) => {
    const schema = Joi.object({

        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { validateRegistration, validateLogin, verifyAccessToken }