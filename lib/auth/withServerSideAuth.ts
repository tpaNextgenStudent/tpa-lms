import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/react';

export const withServerSideAuth =
  <Props>(
    handler: (
      ctx: GetServerSidePropsContext
    ) =>
      | GetServerSidePropsResult<Props>
      | Promise<GetServerSidePropsResult<Props>>
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
