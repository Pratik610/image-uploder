import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getLogedInUserDetails } from '../Actions/userActions'
import Sidebar from '../Components/Sidebar'
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
} from 'chart.js'
import { USER_LOGOUT } from '../Constants/userConstants'
import { Doughnut, Line } from 'react-chartjs-2'
import { getAllImagesDetails } from '../Actions/imageActions'
import { Icon } from '@iconify/react'
import ChartDataLabels from 'chartjs-plugin-datalabels'
const HomeScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const userAuth = useSelector((state) => state.userAuth)
	const { authDetails } = userAuth

	const getAllImages = useSelector((state) => state.getAllImages)
	const { images } = getAllImages
	const userDetails = useSelector((state) => state.userDetails)
	const { userInfo } = userDetails
	ChartJS.register(
		ArcElement,
		Tooltip,
		Legend,
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		ChartDataLabels,
		Title
	)

	const logout = () => {
		localStorage.removeItem('authUser')
		dispatch({ type: USER_LOGOUT })
	}

	useEffect(() => {
		if (!images) {
			dispatch(getAllImagesDetails())
		}
	}, [images])

	console.log()
	return (
		<div className='container-fluid'>
			<div className='row '>
				<div className='col-2 p-0 '>
					<Sidebar active={1} />
				</div>
				<div className='col-10 dashboard-content'>
					{images ? (
						images.data.length > 0 ? (
							<div className='row'>
								{userInfo && (
									<div className='col-12 mt-3'>
										<div className='d-flex align-items-center justify-content-between'>
											<h3>Hi, {userInfo.name}</h3>
											<button
												className='btn btn-dark rounded-0'
												onClick={logout}
											>
												{' '}
												<Icon
													color='white'
													width={22}
													className='me-2'
													icon='material-symbols:logout-sharp'
												/>
												Logout
											</button>
										</div>
										<hr />
									</div>
								)}

								<div className='col-12 row'>
									<div className='col-3 p-3  '>
										<div
											className='dashborad-card  p-4'
											style={{
												borderTopRightRadius: '10px',
												borderBottomRightRadius: '10px',
												borderLeft: '4px solid blue',
												boxShadow: '2px 2px 8px lightgrey',
											}}
										>
											<div className='d-flex justify-content-between'>
												<div>
													<h6 className='text-muted'>Total Storage used</h6>
													<h4 className='fw-bold  '>
														{images ? (
															<p>
																{String(
																	images?.data?.reduce(
																		(acc, item) =>
																			acc + parseInt(item.fileSize),
																		0
																	) * 0.000001
																).slice(0, 4)}{' '}
																mb
															</p>
														) : (
															'- -'
														)}
													</h4>
												</div>
												<div>
													<Icon
														width={40}
														icon='ic:twotone-storage'
													/>
												</div>
											</div>
										</div>
									</div>
									<div className='col-3 p-3  '>
										<div
											className='dashborad-card  p-4'
											style={{
												borderTopRightRadius: '10px',
												borderBottomRightRadius: '10px',
												borderLeft: '4px solid #58eb34',
												boxShadow: '2px 2px 8px lightgrey',
											}}
										>
											<div className='d-flex justify-content-between'>
												<div>
													<h6 className='text-muted'>Total Files Stored</h6>
													<h4 className='fw-bold  '>
														{images ? <p>{images?.data?.length}</p> : '- -'}
													</h4>
												</div>
												<div>
													{images && (
														<div>
															<Icon
																width={40}
																icon='ph:folder-fill'
															/>
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className='col-8 mt-4'>
									<div
										className=' p-4'
										style={{ boxShadow: '2px 2px 8px lightgrey' }}
									>
										{images && (
											<Line
												options={{
													plugins: {
														title: {
															display: true,
															text: 'Monthly Uploads',
														},
														legend: {
															display: false,
														},
													},
												}}
												data={{
													labels: [
														'Jan',
														'Feb',
														'Mar',
														'Apr',
														'May',
														'Jun',
														'Jul',
														'Aug',
														'Sep',
														'Oct',
														'Nov',
														'Dec',
													],
													datasets: [
														{
															label: 'Files Uploaded',
															data: [
																images.data.filter(
																	(item) =>
																		new Date(
																			item.createdAt.slice(0, 9)
																		).getMonth() === 1
																).length,
																images.data.filter(
																	(item) =>
																		new Date(
																			item.createdAt.slice(0, 9)
																		).getMonth() === 2
																).length,
																images.data.filter(
																	(item) =>
																		new Date(
																			item.createdAt.slice(0, 9)
																		).getMonth() === 3
																).length,
																images.data.filter(
																	(item) =>
																		new Date(
																			item.createdAt.slice(0, 9)
																		).getMonth() === 4
																).length,
																images.data.filter(
																	(item) =>
																		new Date(
																			item.createdAt.slice(0, 9)
																		).getMonth() === 5
																).length,
																images.data.filter(
																	(item) =>
																		new Date(
																			item.createdAt.slice(0, 9)
																		).getMonth() === '6/'
																).length,
																images.data.filter(
																	(item) =>
																		new Date(item.createdAt)
																			.toLocaleString(undefined, {
																				timeZone: 'Asia/Kolkata',
																			})
																			.slice(0, 2) === '7/'
																).length,
																images.data.filter(
																	(item) =>
																		new Date(item.createdAt)
																			.toLocaleString(undefined, {
																				timeZone: 'Asia/Kolkata',
																			})
																			.slice(0, 2) === '8/'
																).length,
																images.data.filter(
																	(item) =>
																		new Date(item.createdAt)
																			.toLocaleString(undefined, {
																				timeZone: 'Asia/Kolkata',
																			})
																			.slice(0, 1) == '9'
																).length,
																images.data.filter(
																	(item) =>
																		new Date(item.createdAt)
																			.toLocaleString(undefined, {
																				timeZone: 'Asia/Kolkata',
																			})
																			.slice(0, 2) == 10
																).length,
																images.data.filter(
																	(item) =>
																		new Date(item.createdAt)
																			.toLocaleString(undefined, {
																				timeZone: 'Asia/Kolkata',
																			})
																			.slice(0, 2) == 11
																).length,
																images.data.filter(
																	(item) =>
																		new Date(
																			item.createdAt.slice(0, 9)
																		).getMonth() === 12
																).length,
															],
															backgroundColor: ['#003860'],
															borderColor: '#003860',
															borderWidth: 2,
															tension: 0.15,
														},
													],
												}}
											/>
										)}
									</div>
								</div>
								<div
									className='col-4 p-4 mt-4'
									style={{ boxShadow: '2px 2px 8px lightgrey' }}
								>
									{images && (
										<Doughnut
											data={{
												labels: ['png', 'gif', 'jpg'],
												datasets: [
													{
														label: 'Files',
														data: [
															images.data.filter(
																(item) => item.fileType == 'image/png'
															).length,
															images.data.filter(
																(item) => item.fileType == 'image/gif'
															).length,
															images.data.filter(
																(item) =>
																	item.fileType == 'image/jpeg' ||
																	item.fileType == 'image/jpg'
															).length,
														],
														backgroundColor: ['#003860', '#80CAFF', '#36A2EB'],

														borderWidth: 1,
													},
												],
											}}
											options={{
												plugins: {
													title: {
														display: true,
														text: 'Image Type',
														padding: {
															top: 10,
															bottom: 30,
														},
													},
													legend: {
														display: false,
													},
													datalabels: {
														color: '#ffffff',
														formatter: (value) => {
															return (
																Number(
																	(value / images.data.length) * 100
																).toFixed(2) + '%'
															)
														},
														font: {
															size: 16,
														},
													},
												},
											}}
										/>
									)}
								</div>
							</div>
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
								<h3>We Dont Have Any Data Available</h3>
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

export default HomeScreen
