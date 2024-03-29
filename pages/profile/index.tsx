import { Layout } from '../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../lib/utils/types';
import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';
import { getUserDetails, UserRole } from '../../apii/user';
import { ProfileBanner } from '../../components/profile/ProfileBanner/ProfileBanner';
import { ProfileUserInfo } from '../../components/profile/ProfileUserInfo/ProfileUserInfo';
import { ProfileCohortInfo } from '../../components/profile/ProfileCohortInfo/ProfileCohortInfo';
import { ProfileTeacherInfo } from '../../components/profile/ProfileTeacherInfo/ProfileTeacherInfo';

export default function UserProfileIndex({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  const userName = [user.name, user.surname].filter(n => !!n).join(' ');
  return (
    <Layout
      withHeaderPrevButton
      headerTitle="My Profile"
      title="My Profile"
      user={user}
    >
      <ProfileBanner />
      <ProfileUserInfo
        name={userName}
        login={user.github_login}
        bio={user.bio}
        joinDate="2022-03-31T22:00:00.000Z"
        avatar={user.image}
      />
      <ProfileCohortInfo
        name={user.cohort_name}
        numberOfStudents={17}
        progressLink={getCohortProgressLink(user.role)}
      />
      {user.role === 'student' && (
        <ProfileTeacherInfo name={'Go Kubo'} avatar={null} />
      )}
    </Layout>
  );
}

function getCohortProgressLink(role: UserRole) {
  switch (role) {
    case 'student':
      return '/student/cohort/progress';
    case 'teacher':
      return '/teacher/cohort/progress';
  }
}

export const getServerSideProps = withServerSideAuth()(async ({ req, res }) => {
  const authCookie = req.headers.cookie as string;
  const user = await getUserDetails({ cookie: authCookie });
  console.log(user);
  return { props: { user } };
});
