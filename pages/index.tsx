import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

export default function Component() {
  return null;
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
  return {
    props: {},
  };
}
