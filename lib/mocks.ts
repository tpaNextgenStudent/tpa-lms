export interface User {
  id: string;
  name?: string;
  firstname?: string;
  lastname?: string;
  bio?: string;
  email?: string;
  image?: string;
}

const mockedUser: User = {
  id: '35hk3hrkjh43kj5h',
  name: 'PatrykBuniX',
  firstname: 'Patryk',
  lastname: 'Górka',
  bio: 'Frontend developer in love with TypeScript and Next.js',
  email: 'patrykbunix@gmail.com',
  image: 'https://unsplash.it/100/100',
};

export const db = { user: mockedUser };
