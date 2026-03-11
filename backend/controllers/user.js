require('dotenv').config()
const bcrypt = require('bcryptjs')
const Transactions = require('../models/transactions')
const User = require('../models/user'),
    jwt = require('jsonwebtoken')

    const createToken = (_id) => {
        return jwt.sign({_id: _id}, process.env.SECRET_KEY, {expiresIn: '1d'})
    }

    const generateRandomNumber = () => {
        const length = 5;
    
        // Generate random number with a specified length
        const randomNumber = Math.floor(Math.random() * 10 ** length);
    
        // Pad the number with leading zeros to ensure it has exactly five digits
        const formattedNumber = randomNumber.toString().padStart(length, "0");
    
        return formattedNumber;
    }
    
    exports.getAllUsers = async (req, res) => {
        try {
    
            const response = await User.find({})
            return res.status(200).json({message: 'success', data: response})
            
        } catch (error) {
            return res.status(400).json({message: 'error', error: error.message})
        }
    }
    
    exports.signup = async (req, res) => {
        try {
            const {email, password} = req.body 
            
            // generate verification code
            let verificationCode = await generateRandomNumber()
            
            const user = await User.signup(email, password, verificationCode)
    
            const token = createToken(user._id)

            // send welcome email
             await User.sendEmail(email, 'Welcome to iinstantchain', `verfication code: ${verificationCode}`)
    
            return res.status(201).json({message: 'success', data: user, token})
    
        } catch (error) {
            return res.status(400).json({message: 'error', error: error.message})
        }
    }
    
    exports.login = async (req, res) => {
        try {
            const {email, password} = req.body
    
             const user = await User.login(email, password)
    
            // create a token
            const token = createToken(user._id)
    
            return res.status(200).json({message: 'success', data: user, token})        
        } catch (error) {
            return res.status(400).json({message: 'error', error: error.message})
        }
    }

    exports.getUserByEmail = async (req, res) => {
        try {
            const {email} = req.params

            const user = await User.findOne({email})

            return res.status(200).json({message: 'success', data: user})
            
        } catch (error) {
            return res.status(400).json({message: 'error', error: error.message})
        }
    }

    exports.updateUserBalance = async (req, res) => {
        try {
            
            const {user, amount} = req.body

            const foundUser = await User.findOne({email: user})

            if(!foundUser) {
                throw new Error('user could not be found')
            }

            let newAmount = Number(foundUser.accountBalance) + Number(amount)

            const updatedUser = await User.findOneAndUpdate({email: user}, {accountBalance: newAmount}, {returnOriginal: false})

            return res.status(200).json({message: 'success', data: updatedUser})

        } catch (error) {
            return res.status(400).json({message: 'error', error: error.message})
        }
    }

    exports.updateUserBalanceMinus = async (req, res) => {
        try {
            
            const {user, amount} = req.body

            const foundUser = await User.findOne({email: user})

            if(!foundUser) {
                throw new Error('user could not be found')
            }

            let newAmount = Number(foundUser.accountBalance) - Number(amount)

            const updatedUser = await User.findOneAndUpdate({email: user}, {accountBalance: newAmount}, {returnOriginal: false})

            return res.status(200).json({message: 'success', data: updatedUser})

        } catch (error) {
            return res.status(400).json({message: 'error', error: error.message})
        }
    }

    exports.updateStatus = async (req, res) => {
        try {
            
            const {id} = req.params

            const updatedUser = await User.findByIdAndUpdate(id, {isAdmin: true},{new: true})

            return res.status(200).json({message: 'success', data: updatedUser})

        } catch (error) {
            return res.status(400).json({message: 'error', error: error.message})
        }
    }

    exports.forgotPassword = async (req, res) => {
        try {
            const {email} = req.body

            if(!email) {
                throw new Error('Email is required')
            }

            const user = await User.findOne({email})

            if(!user) {
                throw new Error('No account found with that email')
            }

            // generate a 5-digit reset code
            const resetCode = generateRandomNumber()
            const resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

            await User.findOneAndUpdate({email}, {resetCode, resetCodeExpiry})

            // send reset code email
            await User.sendEmail(
                email,
                'Password Reset Code - Instantchain',
                `<h2>Password Reset</h2><p>Your password reset code is: <strong>${resetCode}</strong></p><p>This code expires in 15 minutes.</p>`
            )

            return res.status(200).json({message: 'success', data: {email}})

        } catch (error) {
            return res.status(400).json({message: 'error', error: error.message})
        }
    }

    exports.resetPassword = async (req, res) => {
        try {
            const {email, resetCode, newPassword} = req.body

            if(!email || !resetCode || !newPassword) {
                throw new Error('All fields are required')
            }

            if(newPassword.length < 8) {
                throw new Error('Password must be at least 8 characters long')
            }

            const user = await User.findOne({email})

            if(!user) {
                throw new Error('No account found with that email')
            }

            if(!user.resetCode || user.resetCode !== resetCode) {
                throw new Error('Invalid reset code')
            }

            if(user.resetCodeExpiry < new Date()) {
                throw new Error('Reset code has expired')
            }

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(newPassword, salt)

            await User.findOneAndUpdate(
                {email},
                {password: hash, resetCode: null, resetCodeExpiry: null}
            )

            return res.status(200).json({message: 'success'})

        } catch (error) {
            return res.status(400).json({message: 'error', error: error.message})
        }
    }

module.exports = exports;