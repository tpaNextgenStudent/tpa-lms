import { Layout } from '../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../lib/types';
import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';
import { getUserDetailsById, UserRole } from '../../apiHelpers/user';
import { ProfileBanner } from '../../components/profile/ProfileBanner/ProfileBanner';
import { ProfileUserInfo } from '../../components/profile/ProfileUserInfo/ProfileUserInfo';
import { ProfileCohortInfo } from '../../components/profile/ProfileCohortInfo/ProfileCohortInfo';

export default function UserProfileIndex({
  user,
  profileUser,
}: InferPagePropsType<typeof getServerSideProps>) {
  const userName = [profileUser.name, profileUser.surname]
    .filter(n => !!n)
    .join(' ');
  return (
    <Layout
      withHeaderPrevButton
      headerTitle={userName}
      title={userName}
      titleTemplate={'TPA | Profile | {title}'}
      user={user}
    >
      <ProfileBanner />
      <ProfileUserInfo
        name={userName}
        login={profileUser.github_login}
        bio={profileUser.bio}
        joinDate="2022-03-31T22:00:00.000Z"
        avatar={profileUser.image}
      />
      <ProfileCohortInfo
        name={profileUser.cohort_name}
        numberOfStudents={17}
        progressLink={getCohortProgressLink(profileUser.role)}
      />
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

export const getServerSideProps = withServerSideAuth()(
  async ({ req, params, user }) => {
    const authCookie = req.headers.cookie as string;
    const { id: userId } = params! as {
      id: string;
    };

    const profileUser = await getUserDetailsById(userId, {
      cookie: authCookie,
    });

    return { props: { user, profileUser } };
  }
);
