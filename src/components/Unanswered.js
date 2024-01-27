import { connect } from 'react-redux';
import Author from './Author';
import formatDate from '../utilities/formatDate'
import { handleAnswerQuestion } from '../actions/questions';
import { updateUsersAnswers } from '../actions/users';

const Unanswered = (props) => {
  const { poll, users, authedUser } = props;
  const { id, author, optionOne, optionTwo, timestamp } = poll;
  const avatar = users[author].avatarURL;
  const name = users[author].name;
  const date = formatDate(timestamp);
  const chooseOption = (e) => {
    const answer = e.target.value;
    const qid = id;

    props.dispatch(handleAnswerQuestion({ authedUser, qid, answer }));
    props.dispatch(updateUsersAnswers({ authedUser, qid, answer }));
  };

  return (
    <div className="container-fluid poll">
      <div className="row">
        <div className="col col-md-11 poll-heading">
          <strong>WOULD YOU RATHER</strong>
          <div
            data-testid='test-radiobuttons'
            className='radiobuttons'
            onChange={chooseOption}
          >
            <div className='poll-text'>
              <input type='radio' name='options' value='optionOne' />
              {optionOne.text}
              <span> or</span>
            </div>{' '}
            <div className='poll-text'>
              <input type='radio' name='options' value='optionTwo' />
              {optionTwo.text}
              <span> ?</span>
            </div>
          </div>
        </div>
        <div className="col-md-1 poll-right">
          <Author name={name} date={date} avatar={avatar} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }, { poll }) => {
  return { users, poll, authedUser };
};

export default connect(mapStateToProps)(Unanswered);