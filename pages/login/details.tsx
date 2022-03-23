import { LoginDetailsForm } from '../../components/login/LoginDetailsForm/LoginDetailsForm';
import { LoginLayout } from '../../components/login/LoginLayout/LoginLayout';
import { LoginHeroText } from '../../components/login/LoginHeroText/LoginHeroText';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { apiPath } from '../../lib/utils/apiPath';

export default function LoginDetails() {
  return (
    <LoginLayout>
      <LoginHeroText
        title="*Well done*"
        description="Last thing is to fill up 2 forms and type some of your hobbies"
      />
      <LoginDetailsForm />
    </LoginLayout>
  );
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

    if (areDetailsFilled) {
      return {
        redirect: {
          destination: '/',
          permanent: true,
        },
      };
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.statusText);
    }
  }

  return { props: {} };
}
