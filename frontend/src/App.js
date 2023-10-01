import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen'
import OTPVerificationScreen from './Screens/OTPVerificationScreen'
import UploadImages from './Screens/UploadImages'
import ImagesListScreen from './Screens/ImagesListScreen'
import SignUpScreen from './Screens/SignUpScreen'
function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					index
					element={<HomeScreen />}
				/>
				<Route
					path='/login'
					element={<LoginScreen />}
				/>
				<Route
					path='/signup'
					element={<SignUpScreen />}
				/>
				<Route
					path='/verify'
					element={<OTPVerificationScreen />}
				/>
				<Route
					path='/images'
					element={<ImagesListScreen />}
				/>
				<Route
					path='/upload'
					element={<UploadImages />}
				/>
			</Routes>
		</Router>
	)
}

export default App
