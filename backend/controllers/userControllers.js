import asyncHandler from 'express-async-handler'
import { OtpMail } from '../emails/OTPEmail.js'
import User from '../models/userModel.js'
import { createTokken } from '../config/tokken.js'
import CryptoJS from 'crypto-js'

// des - Auth User & and generate OTP
// route - POST /api/users/login
// access - public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })
	if (user && (await user.matchPassword(password))) {
		const generateCode = () => {
			let x = ''
			const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
			for (let index = 0; index < 6; index++) {
				x += allLetters[Math.floor(Math.random() * allLetters.length)]
			}
			return x
		}

		const userOtp = generateCode()

		user.otp = userOtp
		user.hash = CryptoJS.AES.encrypt(userOtp, 'MYSECRET123')

		const updatedUser = await user.save()

		OtpMail(updatedUser.otp)

		res.json({
			email: updatedUser.email,
			hash: updatedUser.hash,
		})
	} else {
		res.status(401)
		throw new Error('Invalid Email or Password')
	}
})

const verifyOTP = asyncHandler(async (req, res) => {
	const { email, otp, hash } = req.body

	const user = await User.findOne({ email, otp, hash })
	if (user) {
		res.json({
			token: createTokken(user._id),
		})
	} else {
		res.status(401)
		throw new Error('Invalid OTP')
	}
})

// des - Register a new user
// route - POST /api/users/
// access - public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body
	const userExists = await User.findOne({ email })
	if (userExists) {
		res.status(404)
		throw new Error('User Allready Exists')
	}
	const user = await User.create({
		name,
		email,
		password,
	})
	if (user) {
		res.status(201).json({
			msg: 'Account Created',
		})
	} else {
		res.status(400)
		throw new Error('invalid User data')
	}
})

// des - get logedin user details
// route - GET /api/users/user-details
// access - public
const getUserDetails = asyncHandler(async (req, res) => {
	res.status(201).json(req.user)
})

export { registerUser, authUser, verifyOTP, getUserDetails }
