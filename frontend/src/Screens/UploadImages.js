import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { Icon } from '@iconify/react'
import storage from '../firebaseConfig.js'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getAllImagesDetails } from '../Actions/imageActions'

import { Link } from 'react-router-dom'
const UploadImages = () => {
	const dispatch = useDispatch()
	const [files, setFile] = useState([])
	const [progress, setProgress] = useState([])
	const [showProgress, setShowProgress] = useState(false)

	const [uploadedFilesData, setUploadedFilesData] = useState([])

	const userDetails = useSelector((state) => state.userDetails)
	const { userInfo } = userDetails

	const userAuth = useSelector((state) => state.userAuth)
	const {
		authDetails,
		error: userAuthError,
		loading: userAuthLoading,
	} = userAuth

	const uploadHandeler = (e) => {
		let userfiles = []
		for (let index = 0; index < Object.keys(e.target.files).length; index++) {
			userfiles.push(e.target.files[index])
		}
		setFile([...files, ...userfiles])
	}

	const removeFile = (name) => {
		setFile(files.filter((item) => item.name !== name))
	}

	const setData = async (name, size, type, url, fileStorageName) => {
		const images = [
			{
				userID: userInfo._id,
				fileName: name,
				fileSize: size,
				fileType: type,
				url,
				fileStorageName,
			},
		]

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authDetails.token}`,
			},
		}
		const { data } = await axios.post('/api/image/create', images, config)
	}

	const upload = async () => {
		if (files.length <= 0) {
			toast.error('Please Select Files')
			return
		}

		const uploadPromise = files.map((file) => {
			const fileName = file.name + new Date()
			const storageRef = ref(storage, `/files/${fileName}`)
			const uploadTask = uploadBytesResumable(storageRef, file)
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100

					setProgress(progress)

					switch (snapshot.state) {
						case 'running':
							setShowProgress(true)
							break
						case 'complete':
							setShowProgress(false)
							break

						default:
							break
					}
				},

				(err) => console.log(err),
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((url) => {
						setData(file.name, file.size, file.type, url, fileName)
					})
				}
			)

			uploadTask.on('state_changed', {
				complete: function () {
					setShowProgress(false)
				},
			})
		})

		try {
			await Promise.all(uploadPromise)
			setTimeout(() => {
				toast.success('All files uploaded successfully')
				dispatch(getAllImagesDetails())
			}, 2000)

			setFile([])
		} catch (error) {
			console.error('Error uploading files:', error)
		}
	}

	return (
		<div className='container-fluid'>
			<ToastContainer
				position='top-center'
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				theme='dark'
			/>
			<div className='row '>
				<div className='col-2 p-0 '>
					<Sidebar active={2} />
				</div>
				<div className='col-10 dashboard-content row '>
					<div className='col-12 mt-lg-5  pb-0   position-sticky '>
						<div>
							{showProgress && (
								<div
									class='progress mb-4'
									style={{ height: '5px' }}
								>
									<div
										class='progress-bar'
										role='progressbar'
										style={{ width: `${progress}%` }}
										aria-valuenow='25'
										aria-valuemin='0'
										aria-valuemax='100'
									></div>
								</div>
							)}
						</div>
						<div className='align-items-center justify-content-between d-flex'>
							<h4 className='mb-0'>
								<Link
									to={'/images'}
									className='text-decoration-none text-dark'
								>
									<Icon icon='ic:round-arrow-back' />
								</Link>{' '}
								Upload Files
							</h4>
							<button
								type='button'
								className='btn btn-primary'
								onClick={upload}
							>
								Submit
							</button>
						</div>
					</div>
					<div
						class={` p-2 pt-0 mt-1 ${
							files.length > 0 ? 'col-lg-6' : 'col-lg-12'
						}  col-12 mb-3`}
						style={{ top: '0' }}
					>
						<div
							className='mx-auto   '
							style={{
								padding: '2em',
								height: '500px',
								border: '1px dashed grey',
							}}
						>
							<label
								htmlFor='file'
								class='form-label d-flex align-items-center justify-content-center w-100 h-100 text-center '
							>
								<div>
									<Icon
										icon='ph:upload'
										width={100}
										className='mx-auto d-block'
									/>
									Upload Images
								</div>
							</label>
							<input
								type='file'
								hidden
								multiple='multiple'
								onChange={uploadHandeler}
								id='file'
								placeholder=''
								required
							/>
						</div>
					</div>{' '}
					<div class=' p-2 mt-1 pt-1 col-lg-6  col-12 mb-3'>
						{files && files.length > 0 && (
							<table class='table  upload-files-table rounded-2 overflow-hidden table-dark'>
								<thead>
									<tr>
										<th scope='col'>Name</th>
										<th scope='col'>Type</th>
										<th scope='col'>Size</th>
										<th scope='col'></th>
									</tr>
								</thead>
								<tbody>
									{files.map((item, index) => (
										<tr>
											<td>{item.name}</td>
											<td>{item.type}</td>
											<td>{String(item.size * 0.000001).slice(0, 4)} mb</td>
											<td>
												<Icon
													onClick={() => removeFile(item.name)}
													icon='iconoir:cancel'
													width={22}
													color='red'
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default UploadImages
