export const sampleUser = {
  cohort_name: 'TPA-TOYOTA-05',
  bio: 'I love TypeScript',
  name: 'John',
  surname: 'Doe',
  image: 'https://unsplash.it/200/200',
  github_login: 'johndoe',
  role: 'student' as const,
  email: 'johndoe@gmail.com',
};

export const sampleComments = [
  {
    author: {
      name: 'John',
      surname: 'Doe',
      login: 'johndoe',
      image: 'https://unsplash.it/200/200',
    },
    attempt_number: 1,
    attempt_score: 3,
    date: '1 April 2022',
    attempt_id: 'attemptId',
    content: 'Good job!',
  },
  {
    author: {
      name: 'Harry',
      surname: 'Maguire',
      login: 'Maguire',
      image: 'https://unsplash.it/150/150',
    },
    attempt_number: 1,
    attempt_score: 1,
    date: '1 April 2022',
    attempt_id: 'attemptId',
    content: 'Try again!',
  },
];
