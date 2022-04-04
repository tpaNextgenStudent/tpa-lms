import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { withServerSideAuth } from '../lib/auth/withServerSideAuth';

export default function Component() {
  return null;
}

export const getServerSideProps = withServerSideAuth(async ctx => {
  try {
    const { data: user } = await axios.get(apiPath('user/details'), {
      headers: {
        cookie: ctx.req.headers.cookie as string,
      },
    });

    const areDetailsFilled = [user.name, user.surname, user.bio].every(
      x => !!x
    );

    if (!areDetailsFilled) {
      return {
        redirect: {
          destination: '/login/details',
          permanent: false,
        },
      };
    }

    //todo: figure out student/teacher root page by role
    //for now lets assume that it's student
    return {
      redirect: {
        destination: '/student/tasks',
        permanent: false,
      },
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.statusText);
    }
  }

  return {
    props: {},
  };
});
