import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Poll from './Poll'


const PollPage = (props) => {
	const { idsArr } = props
	const { question_id } = useParams()
	const id = question_id.replace(':question_', '')

	return (
		<div className='poll-page background'>
			<Poll id={id} />
		</div>
	)
}

const mapStateToProps = ({ questions }) => {
	const idsArr = Object.keys(questions)
	return { idsArr }
}

export default connect(mapStateToProps)(PollPage)