import { connect } from 'react-redux'
import Answered from './Answered'
import Unanswered from './Unanswered'

const Poll = (props) => {
	const { poll, authedUser } = props
	const { optionOne, optionTwo } = poll
	const userChoseOptionOne = optionOne.votes.includes(authedUser)
	const userChoseOptionTwo = optionTwo.votes.includes(authedUser)
	const notAnsweredYet = !userChoseOptionOne && !userChoseOptionTwo

	return (
		<div className='poll-container'>
			{notAnsweredYet ? (
				<Unanswered poll={poll} />
			) : (
				<Answered poll={poll} />
			)}
		</div>
	)
}

const mapStateToProps = ({ authedUser, questions }, { id }) => {
	const poll = questions[id]
	return { authedUser, poll }
}

export default connect(mapStateToProps)(Poll)