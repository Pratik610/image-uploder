import asyncHandler from 'express-async-handler'
import Image from '../models/imageModel.js'

const imageCreate = asyncHandler(async (req, res) => {
	const data = await Image.insertMany(req.body)
	if (data) {
		res.json({
			msg: 'Added',
		})
	} else {
		res.status(401)
		throw new Error('Something Went Wrong')
	}
})

const getAllImagesOfUser = asyncHandler(async (req, res) => {
	const data = await Image.find({ userID: req.user._id })
	if (data) {
		res.json({
			data,
		})
	} else {
		res.status(401)
		throw new Error('Something Went Wrong')
	}
})

const deleteImageByID = asyncHandler(async (req, res) => {
	const data = await Image.deleteOne({ _id: req.body.id })
	if (data) {
		res.json({
			msg: 'file deleted',
		})
	} else {
		res.status(401)
		throw new Error('Something Went Wrong')
	}
})

export { imageCreate, getAllImagesOfUser, deleteImageByID }
