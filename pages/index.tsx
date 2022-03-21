import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';

export default function Component() {
  return null;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

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

    //todo: figure out student/teacher root page
    // return {
    //   redirect: {
    //     destination: '/student',
    //     permanent: true,
    //   },
    // };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.statusText);
    }
  }

  return {
    props: {},
  };
}
