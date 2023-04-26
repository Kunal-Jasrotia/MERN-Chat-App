const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const generateToken = require('../config/generateToken')
router.post('/', async (req, res) => {
    const { name, email, password, pic } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Enter all Feilds')
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        name, email, password, pic
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            password: user.password,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Failed to create user')
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }

})
module.exports = router