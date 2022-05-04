import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';
import { getUserModules } from '../../../../apii/modules';

export default function CohortProgressIndex() {
  return null;
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ req, res }) => {
    const authCookie = req.headers.cookie as string;

    try {
      const modules = await getUserModules({ cookie: authCookie });
      const firstModule = modules[0];

      if (!firstModule) {
        return {
          notFound: true,
        };
      }

      return {
        redirect: {
          permanent: false,
          destination: `/teacher/cohort/progress/${firstModule.module_version_id}`,
        },
      };
    } catch {
      return {
        notFound: true,
      };
    }
  }
);
