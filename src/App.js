import { handleInitialData } from './actions/shared'
import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { LoadingBar } from 'react-redux-loading-bar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../src/components/Dashboard'
import Navbar from '../src/components/Navbar'
import PollPage from '../src/components/PollPage'
import NewPoll from '../src/components/NewPoll'
import Leaderboard from '../src/components/Leaderboard'
import Login from '../src/components/Login'
import './app.css'

const App = (props) => {
	const { loading } = props

	useEffect(() => {
		props.dispatch(handleInitialData())
	}, [loading])

	return (
		<Fragment>
			<LoadingBar />
			<div className='app-container'>
				<Navbar />
				{loading === true ? (<Login />) : (
					<Routes>
						<Route exact path='/' element={<Dashboard />} />
						<Route path='/questions/:question_id' element={<PollPage />} />
						<Route path='/add' element={<NewPoll />} />
						<Route path='/leaderboard' element={<Leaderboard />} />
					</Routes>
				)}
			</div>
		</Fragment>
	)
}

const mapStateToProps = ({ authedUser }) => ({ loading: authedUser === null })

export default connect(mapStateToProps)(App)