import { InfoView } from '../../components/common/InfoView/InfoView';
import { useAutoRefresh } from '../../lib/hooks/useAutoRefresh';
import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';
import {
  createUserRepos,
  getUserInOrganisation,
} from '../../apiHelpers/github';
import { MechanicRobotAnimation } from '../../components/common/MechanicRobotAnimation/MechanicRobotAnimation';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function ConfigurationPage() {
  const { refresh } = useAutoRefresh(20);
  const router = useRouter();

  useEffect(() => {
    const createRepos = async () => {
      try {
        await createUserRepos();
        toast('Repositories successfully created!', { type: 'success' });
        router.push('/');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            return toast('Please wait, repositories are being created...', {
              type: 'info',
            });
          }
          return toast('There was an error while creating repositories!', {
            type: 'error',
          });
        }
      }
    };
    createRepos();
  }, [router]);

  return (
    <InfoView
      tabTitle="Configuring Repositories"
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

    const { userInOrganisation, reposCreated } = await getUserInOrganisation({
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

    if (reposCreated) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  }
);
