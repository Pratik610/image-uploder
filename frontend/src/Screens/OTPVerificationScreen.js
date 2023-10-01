import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import OtpInput from 'react-otp-input'
import { verifyUserwithOTP } from '../Actions/userActions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const OTPVerificationScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [otp, setOtp] = useState('')

	const userLogin = useSelector((state) => state.userLogin)
	const { login } = userLogin

	const userAuth = useSelector((state) => state.userAuth)
	const { error } = userAuth

	useEffect(() => {
		if (!login) {
			navigate('/login')
		}
	}, [login])

	const verify = (e) => {
		e.preventDefault()
		dispatch(
			verifyUserwithOTP(login.email, otp.toUpperCase(), login.hash, navigate)
		)
	}

	useEffect(() => {
		if (error) {
			toast.error('Invalid OTP')
		}
	}, [error])

	return (
		login && (
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
								<h1>Enter OTP</h1>
								<p>
									We have sent you and OTP on <b>{login.email}</b>
								</p>

								<form
									onSubmit={verify}
									className='form w-100 mt-lg-5'
								>
									{' '}
									<OtpInput
										value={otp}
										onChange={setOtp}
										numInputs={6}
										shouldAutoFocus={true}
										inputStyle={{
											width: '50px',
											height: '50px',
											textTransform: 'uppercase',
										}}
										containerStyle={{}}
										renderSeparator={<span className='me-2'> </span>}
										renderInput={(props) => <input {...props} />}
									/>
									<button
										type='submit'
										className='btn btn-dark mt-5 rounded-0 w-100 p-3'
										style={{ boxShadow: '-4px 4px grey', fontWeight: '600' }}
									>
										Verify
									</button>
								</form>
								{/* <p className='text-muted text-center mt-4'>
							Allready have and account <Link to='/login'>Login</Link>
						</p> */}
							</div>
						</div>
					</div>
				</div>
			</>
		)
	)
}

export default OTPVerificationScreen
