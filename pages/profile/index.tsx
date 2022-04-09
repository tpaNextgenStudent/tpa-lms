import { Layout } from '../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../lib/utils/types';
import dayjs from 'dayjs';
import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../api/user';
import { ProfileBanner } from '../../components/profile/ProfileBanner/ProfileBanner';

export default function UserProfileIndex({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout headerPrevButton={{ pageLink: '/' }} title="My Profile" user={user}>
      <ProfileBanner />
      <p>{user.role}</p>
      <p>{user.name}</p>
      <p>{user.surname}</p>
      <p>{user.github_login}</p>
      <p>{user.bio}</p>
      <p>{user.cohort_name}</p>
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth(async ({ req, res }) => {
  const authCookie = req.headers.cookie as string;
  const user = await getUserDetails({ cookie: authCookie });
  return { props: { user } };
});
