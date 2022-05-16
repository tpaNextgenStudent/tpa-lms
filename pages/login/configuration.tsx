import { InfoView } from '../../components/common/InfoView/InfoView';
import { useAutoRefresh } from '../../lib/hooks/useAutoRefresh';
import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';
import { getUserInOrganisation } from '../../apiHelpers/github';

export default function ConfigurationPage() {
  const { refresh } = useAutoRefresh();

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
    />
  );
}

export const getServerSideProps = withServerSideAuth()(
  async ({ req, params }) => {
    const authCookie = req.headers.cookie as string;

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
