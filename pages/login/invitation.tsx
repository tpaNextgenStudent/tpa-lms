import { InfoView } from '../../components/common/InfoView/InfoView';
import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';
import { getUserInOrganisation } from '../../apiHelpers/github';
import { useAutoRefresh } from '../../lib/hooks/useAutoRefresh';
import { PaperPlaneRobotAnimation } from '../../components/common/PaperPlaneRobotAnimation/PaperPlaneRobotAnimation';

export default function InvitationPage() {
  const { refresh } = useAutoRefresh(20);

  return (
    <InfoView
      tabTitle="Accept Invitation"
      title="*You have been invited to Tech Play Academy.*"
      description="To get to our organization, please, *confirm your email address*."
      button={{
        text: 'Refresh',
        onClick: refresh,
      }}
    >
      <PaperPlaneRobotAnimation />
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

    const { userInOrganisation, reposCreated } = await getUserInOrganisation({
      cookie: authCookie,
    });

    if (!userInOrganisation) {
      return {
        props: {},
      };
    }

    if (!reposCreated) {
      return {
        redirect: {
          destination: '/login/configuration',
          permanent: false,
        },
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
