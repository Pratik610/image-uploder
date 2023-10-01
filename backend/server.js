import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import imageRoutes from './routes/imageRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import path from 'path'

const app = express()
dotenv.config()
connectDB()
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/image', imageRoutes)

// adding to production
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('Api is Running')
	})
}

// custom errors handling
app.use(notFound)
app.use(errorHandler)

app.listen(
	process.env.PORT,
	console.log(`Server Running on PORT ${process.env.PORT}`)
)
