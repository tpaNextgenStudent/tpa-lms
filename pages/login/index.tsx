import { getSession, signIn, useSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { LoginLayout } from '../../components/login/LoginLayout/LoginLayout';
import { LoginHeroText } from '../../components/login/LoginHeroText/LoginHeroText';
import styles from '../../components/login/loginPage/loginPage.module.scss';
import { CTAButton } from '../../components/common/CTAButton/CTAButton';
import { ERROR_TYPE_MESSAGE } from '../../lib/constants';
import { InferPagePropsType } from '../../lib/utils/types';
import { ErrorView } from '../../components/common/ErrorView/ErrorView';

const loginWithGithub = async () => {
  await signIn('github', {});
};

export default function Login({
  error,
}: InferPagePropsType<typeof getServerSideProps>) {
  if (error) {
    return (
      <ErrorView
        title="*Something went wrong*"
        description={error}
        button={{ text: 'Contact Support', onClick: () => {} }}
      />
    );
  }
  return (
    <LoginLayout
      fixedButton={{
        text: 'Login with github',
        onClick: loginWithGithub,
      }}
    >
      <LoginHeroText
        title="*Name, learning platform* whenever you want"
        description="There will be some text about halftone"
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
        permanent: true,
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
