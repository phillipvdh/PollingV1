const Board = (props) => {
	const { avatar, name, numQanswered, numQasked } = props

	return (
		<div className='board container-fluid'>
			<div className='board-l'>
				<img
					src={avatar}
					alt={`${name.toLowerCase()} avatar`}
					width='40'
					height='40'
				/>
				<p>{name}</p>
			</div>
			<div className='board-r'>
				<p>Questions: {numQasked}</p>
				<p>Answers: {numQanswered}</p>
			</div>
		</div>
	)
}

export default Board