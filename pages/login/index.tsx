import { getSession, signIn } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { LoginLayout } from '../../components/login/LoginLayout/LoginLayout';
import { LoginHeroText } from '../../components/login/LoginHeroText/LoginHeroText';
import styles from '../../components/login/loginPage/loginPage.module.scss';
import { CTAButton } from '../../components/common/CTAButton/CTAButton';
import { ERROR_TYPE_MESSAGE } from '../../lib/constants';
import { InferPagePropsType } from '../../lib/utils/types';
import { ErrorView } from '../../components/common/ErrorView/ErrorView';
import { useRouter } from 'next/router';

const loginWithGithub = async () => {
  await signIn('github', {});
};

export default function Login({
  error,
}: InferPagePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  if (error) {
    return (
      <ErrorView
        title="*Something went wrong.*"
        description="Please, go back and log in again."
        primaryButton={{
          text: 'Back to login page',
          onClick: () => {
            router.push('/login');
          },
        }}
      />
    );
  }
  return (
    <LoginLayout>
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
        <CTAButton text="Login with github" onClick={loginWithGithub} />
      </div>
    </LoginLayout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const errorType = ctx.query.error;
  return {
    props: {
      error: errorType
        ? ERROR_TYPE_MESSAGE[errorType as keyof typeof ERROR_TYPE_MESSAGE]
        : null,
    },
  };
}
