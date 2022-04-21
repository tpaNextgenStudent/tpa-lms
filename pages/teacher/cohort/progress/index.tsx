import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';

export default function CohortProgressIndex() {
  return null;
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ req, res }) => {
    const authCookie = req.headers.cookie as string;

    try {
      // const modules = await getUserModules({ cookie: authCookie });

      const firstModule = true;
      const moduleId = 'cl1gs22ai03987ks6d0gsive8';

      if (!firstModule) {
        return {
          notFound: true,
        };
      }

      return {
        redirect: {
          permanent: false,
          destination: `/teacher/cohort/progress/${moduleId}`,
        },
      };
    } catch {
      return {
        notFound: true,
      };
    }
  }
);
