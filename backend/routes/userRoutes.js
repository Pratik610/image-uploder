import express from 'express'
import {
	registerUser,
	verifyOTP,
	authUser,
	getUserDetails,
} from '../controllers/userControllers.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'

router.route('/signup').post(registerUser)
router.route('/login').post(authUser)
router.route('/verify').post(verifyOTP)
router.route('/user-details').get(protect, getUserDetails)

export default router
