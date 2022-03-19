import { getSession, signIn, useSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { LoginLayout } from '../../components/login/LoginLayout/LoginLayout';
import { LoginHeroText } from '../../components/login/LoginHeroText/LoginHeroText';
import styles from '../../components/login/login-page/loginPage.module.scss';
import { CTAButton } from '../../components/common/CTAButton/CTAButton';

const loginWithGithub = async () => {
  await signIn('github', {});
};

export default function Login() {
  const sendPost = async () => {
    const response = await fetch('api/login/details/23', { method: 'POST' });
    console.log(2, response);
  };

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
  return {
    props: {},
  };
}
