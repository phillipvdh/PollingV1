import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { _saveQuestion, _saveQuestionAnswer } from '../utilities/_DATA';
import { updateUsersQuestions } from './users';

export const ReceiveQuestions = 'ReceiveQuestions';
export const AnswerQuestion = 'AnswerQuestion';
export const SaveQuestion = 'SaveQuestion';

export function receiveQuestions(questions) {
  return { type: ReceiveQuestions, questions };
}

export function handleAnswerQuestion({ authedUser, qid, answer }) {
  return dispatch => {
    dispatch(showLoading());

    return _saveQuestionAnswer({ authedUser, qid, answer })

      .then(() => { dispatch(addAnswer({ authedUser, qid, answer })); })
      .then(() => dispatch(hideLoading()));
  };
}

export function handleSaveQuestion(question) {
  return dispatch => {
    dispatch(showLoading());

    return _saveQuestion(question)

      .then((formattedQuestion) => {
        dispatch(saveQuestion(formattedQuestion));
        dispatch(updateUsersQuestions(formattedQuestion));
      })

      .then(() => dispatch(hideLoading()))
  };
}

function addAnswer({ authedUser, qid, answer }) {
  return { type: AnswerQuestion, authedUser, qid, answer };
}

function saveQuestion(question) {
  return { type: SaveQuestion, question };
}