import { _saveQuestion, _saveQuestionAnswer } from '../utilities/_DATA';


describe('_saveQuestion', () => {
  test('returns saved question', async () => {
    const question = { optionOneText: 'optionOne', optionTwoText: 'optionTwo', author: 'author name' };

    const real = await _saveQuestion(question);
    const { optionOne, optionTwo, author } = real;
    const option1 = optionOne.text;
    const option2 = optionTwo.text;

    expect(option1).toBe('optionOne');
    expect(option2).toBe('optionTwo');
    expect(author).toBe('author name');
  });
});

describe('_saveQuestion', () => {
  test('returns error', async () => {
    const question = { optionOneText: null, optionTwoText: null, author: null };
    await expect(_saveQuestion(question)).rejects.toEqual
      ('Please provide optionOneText, optionTwoText, and author');
  });
});

describe('_saveQuestionAnswer', () => {
  test('returns saved answer', async () => {
    const answers = { answer: 'optionOne', qid: '8xf0y6ziyjabvozdd253nd', authedUser: 'chrisbrady' };
    const { questions, users } = await _saveQuestionAnswer(answers);
    expect(questions[answers.qid][answers.answer].votes.includes(answers.authedUser)).toBe(true);
    expect(users[answers.authedUser].answers[answers.qid] === answers.answer).toBe(true);
  });
});

describe('_saveQuestionAnswer', () => {
  test('returns error', async () => {
    const answers = { answers: null, qid: null, authedUser: null };
    await expect(_saveQuestionAnswer(answers)).rejects.toEqual
      ('Please provide authedUser, qid, and answer');
  });
});
