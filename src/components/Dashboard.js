import { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Poll from './Poll'

const Dashboard = (props) => {
	const { authedUser, questionIds, questions } = props

	let questionsArr = []
	for (let i = 0; i < questionIds.length; i++) {
		questionsArr.push(questions[questionIds[i]])
	}

	const answeredQuestions = questionsArr.filter(
		(q) => q.optionOne.votes.includes(authedUser)
			|| q.optionTwo.votes.includes(authedUser)
	)

	const unansweredQuestions = questionsArr.filter(
		(q) => !q.optionOne.votes.includes(authedUser)
			&& !q.optionTwo.votes.includes(authedUser)
	)

	const [questionsToDisplay, setQuestionsToDisplay] = useState(unansweredQuestions)
	const [active, setActive] = useState(true)
	const showAnswered = () => {
		setQuestionsToDisplay(answeredQuestions)
		setActive(false)
	}

	const showUnanswered = () => {
		setQuestionsToDisplay(unansweredQuestions)
		setActive(true)
	}

	return (
		<div className="container-fluid background">
			<div className="row dashboard">
				<div className="col-xl-6 dashboard-buttons">
					<button
						className={active ? 'button active' : 'button'}
						onClick={showUnanswered}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
							<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
						</svg>Unanswered
					</button>

					<button
						className={!active ? 'button active' : 'button'}
						onClick={showAnswered}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
							<path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
						</svg>Answered
					</button>
				</div>
			</div>


			<div className="row dashboard">
				<div className="col-xl-12 dashboard-heading px-4">
					<ul>
						{questionsToDisplay.length > 0 ? (
							questionsToDisplay.map((q) => (
								<li key={q.id}>
									<Link to={`/questions/:question_${q.id}`} className='none'>
										<Poll id={q.id} />
									</Link>
								</li>))) : (<div>no polls available</div>)}
					</ul>
				</div>
			</div>
		</div>




	)
}

const mapStateToProps = ({ questions, authedUser }) => ({
	questionIds: Object.keys(questions).sort(
		(a, b) => questions[b].timestamp - questions[a].timestamp),
	authedUser,
	questions,
})

export default connect(mapStateToProps)(Dashboard)