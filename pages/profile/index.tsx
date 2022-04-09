import { Layout } from '../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../lib/utils/types';
import dayjs from 'dayjs';
import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../api/user';
import { ProfileBanner } from '../../components/profile/ProfileBanner/ProfileBanner';
import { ProfileUserInfo } from '../../components/profile/ProfileUserInfo/ProfileUserInfo';
import { ProfileCohortInfo } from '../../components/profile/ProfileCohortInfo/ProfileCohortInfo';

export default function UserProfileIndex({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  const userName = [user.name, user.surname].filter(n => !!n).join(' ');
  return (
    <Layout headerPrevButton={{ pageLink: '/' }} title="My Profile" user={user}>
      <ProfileBanner />
      <ProfileUserInfo
        name={userName}
        login={user.github_login}
        bio={user.bio}
        joinDate="2022-03-31T22:00:00.000Z"
        avatar={user.image}
      />
      <ProfileCohortInfo name={user.cohort_name} numberOfStudents={17} />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth(async ({ req, res }) => {
  const authCookie = req.headers.cookie as string;
  const user = await getUserDetails({ cookie: authCookie });
  return { props: { user } };
});
