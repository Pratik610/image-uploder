import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { checkUserLogin } from '../Actions/userActions.js'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getLogedInUserDetails } from '../Actions/userActions'

const LoginScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userLogin = useSelector((state) => state.userLogin)
	const { login, error, loading } = userLogin

	const userAuth = useSelector((state) => state.userAuth)
	const {
		authDetails,
		error: userAuthError,
		loading: userAuthLoading,
	} = userAuth

	const userDetails = useSelector((state) => state.userDetails)
	const { userInfo } = userDetails

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const submit = (e) => {
		e.preventDefault()
		dispatch(checkUserLogin(email.trim(), password.trim(), navigate))
	}

	useEffect(() => {
		if (authDetails && authDetails.token) {
			dispatch(getLogedInUserDetails())
		}
	}, [])

	useEffect(() => {
		if (userInfo) {
			navigate('/')
		}
	}, [userInfo, navigate])

	useEffect(() => {
		if (error) {
			toast.error('Invalid Username or Password')
		}
	}, [error])

	return (
		<>
			{authDetails && authDetails.token ? (
				<div
					className='w-100 position-absolute bg-light'
					style={{ height: '100vh', zIndex: '5' }}
				>
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
				</div>
			) : (
				<>
					<ToastContainer
						position='top-center'
						autoClose={2000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						theme='dark'
					/>
					<div
						className='container-fluid p-0  d-flex align-items-center justify-content-center'
						style={{ height: '100vh' }}
					>
						<div
							className='row  w-100'
							style={{ height: '100%' }}
						>
							<div
								className='col-7 p-3'
								style={{
									backgroundSize: 'cover',
									backgroundPosition: 'center',
									backgroundImage:
										'url("https://ar-euro.s3.ap-south-1.amazonaws.com/website_images/wallpaperflare.com_wallpaper.jpg")',
								}}
							></div>
							<div className='col-5  d-flex align-items-center'>
								<div className='w-75  mx-auto'>
									<h1>Welcome Back :)</h1>
									<p>We are really happy to see you again</p>

									<form
										onSubmit={submit}
										className='form mt-lg-5'
									>
										<div class='form-floating mb-4'>
											<input
												type='email'
												value={email}
												onChange={(e) => setEmail(e.target.value.trim())}
												class='form-control'
												id='floatingInput'
												placeholder='name@example.com'
											/>
											<label for='floatingInput'>Email address</label>
										</div>
										<div class='form-floating'>
											<input
												type='password'
												value={password}
												onChange={(e) =>
													setPassword(e.target.value.trimStart())
												}
												class='form-control'
												id='floatingPassword'
												placeholder='Password'
											/>
											<label for='floatingPassword'>Password</label>
										</div>

										<button
											type='submit'
											disabled={loading ? true : false}
											className='btn btn-dark mt-5 rounded-0 w-100 p-3'
											style={{ boxShadow: '-4px 4px grey', fontWeight: '600' }}
										>
											{loading ? (
												<div
													class='spinner-border mt-1'
													role='status'
													style={{
														width: '20px',
														height: '20px',
														fontSize: '0.5em',
													}}
												>
													<span class='visually-hidden'>Loading...</span>
												</div>
											) : (
												'Login'
											)}
										</button>
									</form>
									<p className='text-muted text-center mt-4'>
										Don't have an account? <Link to={'/signup'}>Sign Up</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default LoginScreen
