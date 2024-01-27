import { connect } from 'react-redux';
import formatDate from '../utilities/formatDate'
import Author from './Author';

const Answered = (props) => {
  const { poll, authedUser, users } = props;
  const { author, optionOne, optionTwo, timestamp } = poll;
  const avatar = users[author].avatarURL;
  const name = users[author].name;
  const date = formatDate(timestamp);
  const optionOneNum = optionOne.votes.length;
  const optionTwoNum = optionTwo.votes.length;
  const optionsSum = optionOneNum + optionTwoNum;
  const userChoseOptionOne = optionOne.votes.includes(authedUser);

  return (
    <div className="container-fluid poll">
      <div className="row">
        <div className="col col-md-6 poll-heading">
          <strong>WOULD YOU RATHER</strong>
          <div className='poll-text'>{optionOne.text} or </div>
          <div className='poll-text'>{optionTwo.text}?</div>
        </div>
        <div className="col col-md-5 poll-heading">
          <strong>MY ANSWER</strong>
          <div className='poll-text'>{userChoseOptionOne ? optionOne.text : optionTwo.text}</div>
          <div className='poll-text'>
            Votes: {userChoseOptionOne ? optionOneNum : optionTwoNum}
            <span className='percent'>
              {userChoseOptionOne
                ? Math.round((optionOneNum / optionsSum) * 100)
                : Math.round((optionTwoNum / optionsSum) * 100)}{' '}
              %
            </span>
          </div>
        </div>
        <div className="col-md-1 poll-right">
          <Author name={name} date={date} avatar={avatar} />
        </div>
      </div>
    </div >
  );
};

const mapStateToProps = ({ authedUser, users }, { poll }) => {
  return { authedUser, poll, users };
};

export default connect(mapStateToProps)(Answered);