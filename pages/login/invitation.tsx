import { InfoView } from '../../components/common/InfoView/InfoView';
import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';
import { getUserInOrganisation } from '../../apiHelpers/github';
import { useAutoRefresh } from '../../lib/hooks/useAutoRefresh';

export default function InvitationPage() {
  const { refresh } = useAutoRefresh(10);

  return (
    <InfoView
      title="*You have been invited to Tech Play Academy.*"
      description="To get to our organization, please, *confirm your email address*."
      button={{
        text: 'Refresh',
        onClick: refresh,
      }}
    />
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
        props: {},
      };
    }

    if (!resposCreated) {
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
