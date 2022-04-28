import { LoginDetailsForm } from '../../components/login/LoginDetailsForm/LoginDetailsForm';
import { LoginLayout } from '../../components/login/LoginLayout/LoginLayout';
import { LoginHeroText } from '../../components/login/LoginHeroText/LoginHeroText';
import axios from 'axios';
import { apiPath } from '../../lib/utils/apiPath';
import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';
import { useRouter } from 'next/router';
import { UserDetails } from '../../schemas/userDetailsSchema';
import { toast } from 'react-toastify';
import { useIsLoading } from '../../lib/hooks/loadingContext';
import { getUserDetails } from '../../api/user';

export default function LoginDetails() {
  const router = useRouter();
  const { setIsLoading } = useIsLoading();

  const onSubmit = async (data: UserDetails) => {
    setIsLoading(true);
    try {
      await axios.post(apiPath('user/details'), data);
      toast('User details successfully updated!', {
        type: 'success',
      });
      await router.push('/');
    } catch {
      toast('There was an error while updating user details!', {
        type: 'error',
      });
    }
    setIsLoading(false);
  };

  return (
    <LoginLayout title="TPA - Login details">
      <LoginHeroText
        titleLines={['*Well done!*']}
        description="Tell other students a few words about yourself."
      />
      <LoginDetailsForm onSubmit={onSubmit} />
    </LoginLayout>
  );
}

export const getServerSideProps = withServerSideAuth()(async ctx => {
  const authCookie = ctx.req.headers.cookie as string;
  const user = await getUserDetails({ cookie: authCookie });

  const areDetailsFilled = [user.name, user.surname, user.bio].every(x => !!x);

  if (areDetailsFilled) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
});
