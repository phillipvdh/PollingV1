import { ReceiveUsers, UpdateUsersAnswers, UpdateUsersQuestions } from '../actions/users';

function userAnswer(state = {}, action) {

  const { qid, answer } = action;
  const { answers } = state;

  return { ...state, answers: { ...answers, [qid]: answer } };
}

function userQuestion(state = {}, action) {

  const { id } = action;
  const { questions } = state;

  return { ...state, questions: questions.concat(id) };
}

export default function users(state = {}, action) {
  switch (action.type) {

    case ReceiveUsers: { return { ...state, ...action.users }; }

    case UpdateUsersAnswers: {

      const { authedUser } = action;
      return { ...state, [authedUser]: userAnswer(state[authedUser], action) };
    }

    case UpdateUsersQuestions: {

      const { authedUser } = action;
      return { ...state, [authedUser]: userQuestion(state[authedUser], action) };
    }

    default: return state;
  }
}