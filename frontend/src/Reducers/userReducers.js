import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	VERIFY_OTP_REQUEST,
	VERIFY_OTP_FAIL,
	VERIFY_OTP_SUCCESS,
	GET_LOGED_IN_USER_FAIL,
	GET_LOGED_IN_USER_REQUEST,
	GET_LOGED_IN_USER_SUCCESS,
	USER_SIGNUP_FAIL,
	USER_SIGNUP_REQUEST,
	USER_SIGNUP_SUCCESS,
	USER_LOGOUT,
} from '../Constants/userConstants.js'

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true }
		case USER_LOGIN_SUCCESS:
			return { loading: false, login: action.payload }
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const userOTPAuthReducer = (state = {}, action) => {
	switch (action.type) {
		case VERIFY_OTP_REQUEST:
			return { loading: true }
		case VERIFY_OTP_SUCCESS:
			return { loading: false, authDetails: action.payload }
		case VERIFY_OTP_FAIL:
			return { loading: false, error: action.payload }
		case USER_LOGOUT:
			return {}
		default:
			return state
	}
}

export const userDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_LOGED_IN_USER_REQUEST:
			return { loading: true }
		case GET_LOGED_IN_USER_SUCCESS:
			return { loading: false, userInfo: action.payload }
		case GET_LOGED_IN_USER_FAIL:
			return { loading: false, error: action.payload }
		case USER_LOGOUT:
			return {}
		default:
			return state
	}
}

export const userSignupReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_SIGNUP_REQUEST:
			return { loading: true }
		case USER_SIGNUP_SUCCESS:
			return { loading: false, signup: action.payload }
		case USER_SIGNUP_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
