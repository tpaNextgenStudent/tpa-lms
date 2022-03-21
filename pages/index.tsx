import { useSession, signIn, signOut } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';

export default function Component() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      Router.push('/login');
    }
  }, [session]);

  const sendPost = async () => {
    const response = await fetch('api/user/details', {
      method: 'POST',
      body: JSON.stringify({ name: 'a', surname: 'b', bio: 'c' }),
    });
  };

  return session ? (
    <div>
      <div>Signed in</div>
      <button onClick={() => sendPost()}>SEND POST</button>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  ) : (
    ''
  );
}
