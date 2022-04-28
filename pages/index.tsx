import { apiPath } from '../utils/apiPath';
import axios from 'axios';
import { withServerSideAuth } from '../lib/auth/withServerSideAuth';

export default function Component() {
  return null;
}

export const getServerSideProps = withServerSideAuth()(async ctx => {
  const { data: user } = await axios.get(apiPath('user/details'), {
    headers: {
      cookie: ctx.req.headers.cookie as string,
    },
  });

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
