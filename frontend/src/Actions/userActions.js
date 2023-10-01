import axios from 'axios'

import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	VERIFY_OTP_FAIL,
	VERIFY_OTP_REQUEST,
	VERIFY_OTP_SUCCESS,
	GET_LOGED_IN_USER_FAIL,
	GET_LOGED_IN_USER_REQUEST,
	GET_LOGED_IN_USER_SUCCESS,
	USER_SIGNUP_FAIL,
	USER_SIGNUP_REQUEST,
	USER_SIGNUP_SUCCESS,
} from '../Constants/userConstants.js'

export const checkUserLogin =
	(email, password, navigate) => async (dispatch) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			dispatch({ type: USER_LOGIN_REQUEST })

			const { data } = await axios.post(
				'/api/user/login',
				{ email, password },
				config
			)

			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			})
			navigate('/verify')
		} catch (error) {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

export const verifyUserwithOTP =
	(email, otp, hash, navigate) => async (dispatch, getState) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			dispatch({ type: VERIFY_OTP_REQUEST })

			const { data } = await axios.post(
				'/api/user/verify',
				{ email, hash, otp },
				config
			)

			dispatch({
				type: VERIFY_OTP_SUCCESS,
				payload: data,
			})
			localStorage.setItem(
				'authUser',
				JSON.stringify(getState().userAuth.authDetails)
			)
			navigate('/')
		} catch (error) {
			dispatch({
				type: VERIFY_OTP_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

export const signUpUser =
	(name, email, password, navigate) => async (dispatch, getState) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			dispatch({ type: USER_SIGNUP_REQUEST })

			const { data } = await axios.post(
				'/api/user/signup',
				{ name, email, password },
				config
			)

			dispatch({
				type: USER_SIGNUP_SUCCESS,
				payload: data,
			})

			navigate('/login')
		} catch (error) {
			dispatch({
				type: USER_SIGNUP_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

export const getLogedInUserDetails = () => async (dispatch, getState) => {
	try {
		const {
			userAuth: {
				authDetails: { token },
			},
		} = getState()
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}

		dispatch({ type: GET_LOGED_IN_USER_REQUEST })

		const { data } = await axios.get('/api/user/user-details', config)

		dispatch({
			type: GET_LOGED_IN_USER_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_LOGED_IN_USER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
