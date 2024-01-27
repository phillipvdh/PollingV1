export const ReceiveUsers = 'ReceiveUsers';
export const UpdateUsersAnswers = 'UpdateUsersAnswers';
export const UpdateUsersQuestions = 'UpdateUsersQuestions';

export function receiveUsers(users) {
  return { type: ReceiveUsers, users };
}

export function updateUsersAnswers({ authedUser, qid, answer }) {
  return { type: UpdateUsersAnswers, authedUser, qid, answer };
}

export function updateUsersQuestions(question) {
  return { type: UpdateUsersQuestions, authedUser: question.author, id: question.id };
}