const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async (req, res, next) => {
    let token
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById({ _id:decode.id }).select('-password')
            next()
        } catch (error) {
            res.status(401).json(error)
        }
    }
}
module.exports = auth