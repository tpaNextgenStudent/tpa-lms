import { getSession, signIn } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { LoginLayout } from '../../components/login/LoginLayout/LoginLayout';
import { LoginHeroText } from '../../components/login/LoginHeroText/LoginHeroText';
import styles from '../../components/login/loginPage/loginPage.module.scss';
import { CTAButton } from '../../components/common/CTAButton/CTAButton';
import { InferPagePropsType } from '../../lib/types';
import { ErrorView } from '../../components/common/ErrorView/ErrorView';
import { useRouter } from 'next/router';
import { useIsLoading } from '../../lib/hooks/loadingContext';
import { getUserInOrganisation } from '../../apiHelpers/github';
import { getUserDetails } from '../../apiHelpers/user';

export default function Login({
  error,
}: InferPagePropsType<typeof getServerSideProps>) {
  const { setIsLoading } = useIsLoading();

  const loginWithGithub = async () => {
    setIsLoading(true);
    await signIn('github', {});
  };

  const router = useRouter();
  if (error) {
    return (
      <ErrorView
        title="*Something went wrong.*"
        description="Please, go back and log in again."
        button={{
          text: 'Back to login page',
          onClick: () => {
            router.push('/login');
          },
        }}
      />
    );
  }
  return (
    <LoginLayout title="TPA - Login">
      <LoginHeroText
        titleLines={[
          'Welcome to TechPlayAcademy! 👋',
          '*Learn a professional approach*',
          '*to building software*',
          '*products*',
        ]}
        description="Start your journey with signing in using your GitHub account."
      />
      <div className={styles.ctaButtonWrapper}>
        <CTAButton text="Login with GitHub" onClick={loginWithGithub} />
      </div>
    </LoginLayout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  if (session) {
    const authCookie = ctx.req.headers.cookie as string;
    const user = await getUserDetails({ cookie: authCookie });
    if (user.role === 'teacher') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const { userInOrganisation, resposCreated } = await getUserInOrganisation({
      cookie: authCookie,
    });
    if (!userInOrganisation) {
      return {
        redirect: {
          destination: '/login/invitation',
          permanent: false,
        },
      };
    }
    if (!resposCreated) {
      return {
        redirect: {
          destination: '/login/configuration',
          permanent: false,
        },
      };
    }
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const error = ctx.query.error || null;
  return {
    props: {
      error,
    },
  };
}
