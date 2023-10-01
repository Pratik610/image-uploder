import {
	GET_USER_IMAGES_FAIL,
	GET_USER_IMAGES_REQUEST,
	GET_USER_IMAGES_SUCCESS,
} from '../Constants/imageConstants'

export const getAllImagesReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_USER_IMAGES_SUCCESS:
			return { loading: false, images: action.payload }
		case GET_USER_IMAGES_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
