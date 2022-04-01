import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/react';

export const withServerSideAuth =
  <P>(
    handler: (
      ctx: GetServerSidePropsContext
    ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
  ) =>
  async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx);
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return handler(ctx);
  };
