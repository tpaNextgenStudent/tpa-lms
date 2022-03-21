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

  return !session ? (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  ) : (
    ''
  );
}
