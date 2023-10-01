import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import {
	userLoginReducer,
	userOTPAuthReducer,
	userDetailsReducer,
	userSignupReducer,
} from './Reducers/userReducers.js'

import { getAllImagesReducer } from './Reducers/imageReducers.js'

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userAuth: userOTPAuthReducer,
	userDetails: userDetailsReducer,
	getAllImages: getAllImagesReducer,
	userSignup: userSignupReducer,
})

const userAuthFromStorage = localStorage.getItem('authUser')
	? JSON.parse(localStorage.getItem('authUser'))
	: {}

const initialState = {
	userAuth: {
		authDetails: userAuthFromStorage,
	},
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,

	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
