import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleSaveQuestion } from '../actions/questions'

const NewPoll = (props) => {
	const { authedUser, dispatch } = props
	const navigate = useNavigate()

	const initialQuestionObject = {
		author: authedUser,
		optionOneText: '',
		optionTwoText: '',
	}

	const [question, setQuestion] = useState(initialQuestionObject)
	const [disabled, setDisabled] = useState(true)

	const checkInput = () => {
		if (question.optionOneText !== '' && question.optionTwoText !== '') {
			setDisabled(false)
		}
	}

	useEffect(() => {
		checkInput()
	}, [question])

	const handlePollSubmit = (e) => {
		e.preventDefault()

		dispatch(handleSaveQuestion(question)).then(() => {
			setQuestion(initialQuestionObject)
			setDisabled(true)
			navigate('/')
		})
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setQuestion({ ...question, [name]: value })
	}

	return (
		<div className='new-poll background'>
			<form onSubmit={handlePollSubmit} className='poll-form container-fluid poll'>
				<h1 className='poll-heading py-3'>
					<strong>NEW POLL - WOULD YOU RATHER</strong></h1>
				<div>
					<input
						data-testid='test-option-one'
						name='optionOneText'
						value={question.optionOneText}
						onChange={handleInputChange}
						className='input-col py-3'
						type='text' />
					<span className='poll-text'>or</span>
				</div>

				<div>
					<input
						data-testid='test-option-two'
						name='optionTwoText'
						value={question.optionTwoText}
						onChange={handleInputChange}
						className='input-col py-3'
						type='text' />
					<span className='poll-text'>?</span>
				</div>
				<div className='py-4'>
					<button
						data-testid='test-submit-button'
						disabled={disabled}
						className='add-button'>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
							<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
						</svg>Add Poll
					</button>
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = ({ authedUser }) => {
	return { authedUser }
}

export default connect(mapStateToProps)(NewPoll)