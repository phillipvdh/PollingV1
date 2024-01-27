import { ReceiveQuestions, AnswerQuestion, SaveQuestion } from '../actions/questions';

function option(state = {}, action) {
  switch (action.type) {

    case AnswerQuestion:
      const { authedUser } = action;
      const { votes } = state;

      return { ...state, votes: votes.concat([authedUser]) };
  }
}

function questionX(state = {}, action) {
  switch (action.type) {

    case AnswerQuestion:
      const { answer } = action;

      return { ...state, [answer]: option(state[answer], action) };
  }
}

export default function questions(state = {}, action) {
  switch (action.type) {

    case ReceiveQuestions:

      return { ...state, ...action.questions };

    case AnswerQuestion:
      const { qid } = action;

      return { ...state, [qid]: questionX(state[qid], action) };

    case SaveQuestion:
      const { question } = action;
      const { id } = question;

      return { ...state, [id]: question };

    default: return state;
  }
}