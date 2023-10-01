import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getLogedInUserDetails } from '../Actions/userActions'

const Sidebar = ({ active }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { login, error, loading } = userLogin

	const userDetails = useSelector((state) => state.userDetails)
	const { userInfo } = userDetails

	const userAuth = useSelector((state) => state.userAuth)
	const {
		authDetails,
		error: userAuthError,
		loading: userAuthLoading,
	} = userAuth

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		}
	}, [authDetails, userInfo])

	return (
		<div
			className='sidebar   text-light '
			style={{
				height: '100vh',
				overflowY: 'auto',
			}}
		>
			<div className='mt-0 pt-3  ps-4 '>
				<h3 className=' '>LOGO</h3>
			</div>
			<hr />
			<div className='sidebar-links  p-2 pt-0 mt-4 '>
				<Link
					to={'/'}
					className={`d-flex  text-decoration-none text-light sidebar-item mt-3   p-3 ${
						active === 1 && 'active-link'
					}`}
				>
					<Icon
						className='me-3'
						icon='akar-icons:dashboard'
						width={20}
					/>
					<span>Overview</span>
				</Link>
				<Link
					to={'/images'}
					className={`d-flex  text-decoration-none text-light sidebar-item mt-3   p-3 ${
						active === 2 && 'active-link'
					}`}
				>
					<Icon
						className='me-3'
						icon='icomoon-free:files-empty'
						width={20}
					/>

					<span>Files</span>
				</Link>
			</div>
		</div>
	)
}

export default Sidebar
