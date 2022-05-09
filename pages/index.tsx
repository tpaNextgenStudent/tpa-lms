import { withServerSideAuth } from '../lib/auth/withServerSideAuth';

export default function Component() {
  return null;
}

export const getServerSideProps = withServerSideAuth()(async ctx => {
  const user = ctx.user;
  const { name, surname, bio, role } = user;
  const areDetailsFilled = name && surname && bio;

  if (!areDetailsFilled) {
    return {
      redirect: {
        destination: '/login/details',
        permanent: false,
      },
    };
  }

  if (role === 'student') {
    return {
      redirect: {
        destination: '/student',
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: '/teacher',
      permanent: false,
    },
  };
});
