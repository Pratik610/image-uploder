import mongoose from 'mongoose'

const imageSchema = mongoose.Schema(
	{
		userID: {
			type: String,
			required: true,
		},
		fileName: {
			type: String,
			required: true,
		},
		fileSize: {
			type: String,
			required: true,
		},
		fileType: {
			type: String,
			required: true,
		},
		url: {
			type: String,
		},
		fileStorageName: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

const Image = mongoose.model('Image', imageSchema)

export default Image
