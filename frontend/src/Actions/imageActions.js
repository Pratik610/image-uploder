import axios from 'axios'
import {
	GET_USER_IMAGES_FAIL,
	GET_USER_IMAGES_REQUEST,
	GET_USER_IMAGES_SUCCESS,
} from '../Constants/imageConstants'
export const getAllImagesDetails = () => async (dispatch, getState) => {
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

		dispatch({ type: GET_USER_IMAGES_REQUEST })

		const { data } = await axios.get('/api/image/', config)

		dispatch({
			type: GET_USER_IMAGES_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_USER_IMAGES_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
