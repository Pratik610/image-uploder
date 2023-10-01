import express from 'express'
import {
	imageCreate,
	getAllImagesOfUser,
	deleteImageByID,
} from '../controllers/imageControllers.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'

router.route('/create').post(protect, imageCreate)
router.route('/').get(protect, getAllImagesOfUser)
router.route('/delete-file').post(protect, deleteImageByID)

export default router
