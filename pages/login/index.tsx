import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const Router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      Router.push('/');
    }
  }, [session]);

  const sendPost = async () => {
    const response = await fetch('api/login/details/23', { method: 'POST' });
    console.log(2, response);
  };

  return !session ? (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => sendPost()}>SEND POST</button>
    </>
  ) : (
    ''
  );
}
