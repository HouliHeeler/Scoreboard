const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { use } = require('../routes/userRoutes')

// @description  Register New User
// @route        POST /api/users
// @access       Public
const registerUser = asyncHandler(async(req,res) => {
    const { name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields');
    }
    
    //Check if user exists

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

// @description  Authenticate User
// @route        POST /api/login
// @access       Public
const loginUser = asyncHandler(async(req,res) => {
    res.json({message: 'login user'})
})

// @description  Get User Data
// @route        GET /api/users/me
// @access       Public
const getUserData = asyncHandler(async(req,res) => {
    res.json({message: 'Display User Data'})
})

module.exports = {registerUser, loginUser, getUserData}