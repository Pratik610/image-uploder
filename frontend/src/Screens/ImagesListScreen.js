import React, { useEffect } from 'react'
import { getAllImagesDetails } from '../Actions/imageActions'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import axios from 'axios'
import { Icon } from '@iconify/react'
import storage from '../firebaseConfig.js'
import { ref, getDownloadURL } from 'firebase/storage'
const ImagesListScreen = () => {
	const dispatch = useDispatch()

	const getAllImages = useSelector((state) => state.getAllImages)
	const { images } = getAllImages

	const userAuth = useSelector((state) => state.userAuth)
	const {
		authDetails,
		error: userAuthError,
		loading: userAuthLoading,
	} = userAuth

	useEffect(() => {
		dispatch(getAllImagesDetails())
	}, [])

	const downloadFile = (fileStorageName) => {
		getDownloadURL(ref(storage, `/files/${fileStorageName}`))
			.then((url) => {
				// `url` is the download URL for 'images/stars.jpg'

				// This can be downloaded directly:
				const xhr = new XMLHttpRequest()
				xhr.responseType = 'blob'
				xhr.onload = (event) => {
					const blob = xhr.response
				}
				xhr.open('GET', url)
				xhr.send()

				// Or inserted into an <img> element
				const img = document.getElementById('myimg')
				img.setAttribute('src', url)
			})
			.catch((error) => {
				// Handle any errors
			})
	}

	const deleteFile = async (id) => {
		if (window.confirm('Are you Sure you want to delete this file')) {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${authDetails.token}`,
					},
				}
				const { data } = await axios.post(
					'/api/image/delete-file',
					{ id },
					config
				)
				if (data) {
					dispatch(getAllImagesDetails())
					toast.warning('File Deleted')
				}
			} catch (error) {
				console.log(error)
			}
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
				<div className='col-10 dashboard-content p-4'>
					<div className='d-flex justify-content-between align-items-center'>
						<h4 className='mb-0'>Your Images</h4>
						<Link
							to='/upload'
							className='btn btn-primary'
						>
							<Icon
								style={{ fontSize: '20px' }}
								icon='ion:add'
							/>{' '}
							Add More
						</Link>
					</div>
					<hr />
					{images ? (
						images.data.length > 0 ? (
							<table class='table table-hover'>
								<thead>
									<tr className=''>
										<th scope='col'>#</th>
										<th scope='col'>Image</th>
										<th scope='col'>File Name</th>
										<th scope='col'>Type</th>
										<th scope='col'>Size</th>
										<th scope='col'></th>
										<th scope='col'></th>
									</tr>
								</thead>
								<tbody>
									{images.data.map((item, index) => (
										<tr style={{ cursor: 'pointer' }}>
											<th scope='row'>{index + 1}</th>
											<td>
												<img
													src={item.url}
													style={{ height: '50px', width: '100px' }}
													alt='uploaded-img'
													className='img-fluid'
												/>
											</td>
											<td>{item.fileName}</td>
											<td>{item.fileType}</td>
											<td>{String(item.fileSize * 0.000001).slice(0, 4)} mb</td>
											<td>
												<Icon
													icon='iconoir:cancel'
													width={32}
													onClick={() => deleteFile(item._id)}
													color='red'
												/>
											</td>
											<td>
												<a
													href={item.url}
													download={true}
													target='_blank'
													rel='noreferrer'
												>
													<Icon
														width={30}
														onClick={() => downloadFile(item.fileStorageName)}
														color='green'
														icon='ph:download-light'
													/>
												</a>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div
								class=' position-absolute mt-1'
								role='status'
								style={{
									top: '50%',
									left: '50%',
									translate: '-50% -50%',

									fontSize: '1em',
								}}
							>
								<h3>You Have Not Uploaded any Images</h3>
								<p className='text-center'>
									Please add Images <Link to={'/upload'}>Here</Link>
								</p>
							</div>
						)
					) : (
						<div
							class='spinner-border position-absolute mt-1'
							role='status'
							style={{
								top: '50%',
								left: '50%',
								translate: '-50% -50%',
								width: '40px',
								height: '40px',
								fontSize: '1em',
							}}
						>
							<span class='visually-hidden'>Loading...</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ImagesListScreen
