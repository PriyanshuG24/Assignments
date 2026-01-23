const Joi = require('joi')

const validatePost = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required(),
        content: Joi.string().min(3).max(3000).required()
    })
    return schema.validate(data)
}

module.exports = { validatePost }