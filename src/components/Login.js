import { connect } from 'react-redux'
import { handleLogin } from '../actions/shared'
import { Link } from 'react-router-dom'


const Login = (props) => {
	const { users, userIds } = props
	let usersArr = []
	for (let i = 0; i < userIds.length; i++) { usersArr.push(users[userIds[i]]) }
	const login = (e) => { props.dispatch(handleLogin(e.target.value)) }

	return (
		<div className='login-background'>
			<div className='logo-login'></div>
			<div className='login-form shadow-lg'>
				<div className='login-title mb-2'><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
					<path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
				</svg>Login</div>

				<select
					data-testid='test-select'
					name='login'
					onChange={(e) => login(e)}
					className='dropdown text-center'>
					<option>choose your username</option>
					{usersArr.map((user) => (
						<option key={user.id} value={user.id}>
							{user.name}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}



const mapStateToProps = ({ users }) => {
	const userIds = Object.keys(users)
	return { users, userIds }
}

export default connect(mapStateToProps)(Login)

