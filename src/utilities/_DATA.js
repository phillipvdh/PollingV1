let users = {
  chrisbrady: {
    id: 'chrisbrady',
    password: 'password123',
    name: 'Chris Brady',
    avatarURL:
      'https://api.dicebear.com/7.x/adventurer/svg?seed=Abby',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne',
      '6ni6ok3ym7mf1p33lnez': 'optionOne',
      am8ehyc8byjqgar0jgpub9: 'optionTwo',
      loxhs1bqm25b708cmbf3g: 'optionTwo',
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
  },
  angelalavene: {
    id: 'angelalavene',
    password: 'abc321',
    name: 'Angela Lavene',
    avatarURL:
      'https://api.dicebear.com/7.x/adventurer/svg?seed=Bailey',
    answers: {
      vthrdm985a262al8qx3do: 'optionOne',
      xj352vofupe1dqz9emx13r: 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  stacyclark: {
    id: 'stacyclark',
    password: 'xyz123',
    name: 'Stacey Clark',
    avatarURL: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Missy',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
      vthrdm985a262al8qx3do: 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionOne',
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
  billythompson: {
    id: 'billythompson',
    password: 'pass246',
    name: 'Billy Thompson',
    avatarURL:
      'https://api.dicebear.com/7.x/adventurer/svg?seed=Sugar',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
    },
    questions: [],
  },
};

// QUESTIONS
let questions = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'chrisbrady',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['chrisbrady'],
      text: 'Build our new application with Javascript',
    },
    optionTwo: {
      votes: [],
      text: 'Build our new application with Typescript',
    },
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'stacyclark',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'hire more frontend developers',
    },
    optionTwo: {
      votes: ['stacyclark', 'chrisbrady'],
      text: 'hire more backend developers',
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'chrisbrady',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'conduct a release retrospective 1 week after a release',
    },
    optionTwo: {
      votes: ['chrisbrady'],
      text: 'conduct release retrospectives quarterly',
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'angelalavene',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'have code reviews conducted by peers',
    },
    optionTwo: {
      votes: ['chrisbrady'],
      text: 'have code reviews conducted by managers',
    },
  },
  vthrdm985a262al8qx3do: {
    id: 'vthrdm985a262al8qx3do',
    author: 'angelalavene',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['angelalavene'],
      text: 'take a course on ReactJS',
    },
    optionTwo: {
      votes: ['stacyclark'],
      text: 'take a course on unit testing with Jest',
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'stacyclark',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['stacyclark', 'billythompson'],
      text: 'deploy to production once every two weeks',
    },
    optionTwo: {
      votes: ['angelalavene'],
      text: 'deploy to production once every month',
    },
  },
};

// API
export function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...users }), 1000);
  });
}

export function _getQuestions() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...questions }), 1000);
  });
}

export function _getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export function _saveQuestion(question) {
  return new Promise((resolve, reject) => {
    if (
      !question.optionOneText ||
      !question.optionTwoText ||
      !question.author
    ) {
      reject('Please provide optionOneText, optionTwoText, and author');
    }

    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      };

      resolve(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
  return new Promise((resolve, reject) => {
    if (!authedUser || !qid || !answer) {
      reject('Please provide authedUser, qid, and answer');
    }

    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer,
          },
        },
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser]),
          },
        },
      };

      resolve({ users, questions });
    }, 500);
  });
}