import { InfoView } from '../../components/common/InfoView/InfoView';
import { useAutoRefresh } from '../../lib/hooks/useAutoRefresh';
import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';
import {
  createUserRepos,
  getUserInOrganisation,
} from '../../apiHelpers/github';
import { MechanicRobotAnimation } from '../../components/common/MechanicRobotAnimation/MechanicRobotAnimation';

export default function ConfigurationPage() {
  const { refresh } = useAutoRefresh(10);

  return (
    <InfoView
      title={[
        '*We are setting up a space for you.*',
        '*It might take up to a few minutes.*',
      ]}
      description="Thank you for your patience."
      button={{
        text: 'Refresh',
        onClick: refresh,
      }}
    >
      <MechanicRobotAnimation />
    </InfoView>
  );
}

export const getServerSideProps = withServerSideAuth()(
  async ({ req, user }) => {
    const authCookie = req.headers.cookie as string;

    if (user.role === 'teacher') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const { userInOrganisation, resposCreated } = await getUserInOrganisation({
      cookie: authCookie,
    });

    if (!userInOrganisation) {
      return {
        redirect: {
          destination: '/login/invitation',
          permanent: false,
        },
      };
    }

    if (!resposCreated) {
      await createUserRepos({ cookie: authCookie });
      return {
        props: {},
      };
    }

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
);
