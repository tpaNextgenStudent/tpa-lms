import { LoginDetailsForm } from '../../components/login/LoginDetailsForm/LoginDetailsForm';
import { LoginLayout } from '../../components/login/LoginLayout/LoginLayout';
import { LoginHeroText } from '../../components/login/LoginHeroText/LoginHeroText';
import axios from 'axios';
import { apiPath } from '../../lib/utils/apiPath';
import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';

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

    if (areDetailsFilled) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.statusText);
    }
  }

  return { props: {} };
});
