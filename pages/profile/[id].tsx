import { Layout } from '../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../lib/types';
import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';
import { fetchUserDetailsById, UserRole } from '../../apiHelpers/user';
import { ProfileBanner } from '../../components/profile/ProfileBanner/ProfileBanner';
import { ProfileUserInfo } from '../../components/profile/ProfileUserInfo/ProfileUserInfo';
import { ProfileCohortInfo } from '../../components/profile/ProfileCohortInfo/ProfileCohortInfo';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { LoadingSpinner } from '../../components/common/LoadingSpinner/LoadingSpinner';

export default function UserProfileIndex({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { id: userId } = router.query as {
    id: string;
  };

  const {
    data: profileUser,
    refetch,
    isLoading,
  } = useQuery(['profileUser', userId], () => fetchUserDetailsById(userId));

  const userName =
    profileUser &&
    [profileUser.name, profileUser.surname].filter(n => !!n).join(' ');
  return (
    <Layout
      withHeaderPrevButton
      headerTitle={userName || '...'}
      title={userName || '...'}
      titleTemplate={'TPA | Profile | {title}'}
      user={user}
    >
      {profileUser ? (
        <>
          <ProfileBanner />
          <ProfileUserInfo
            name={userName!}
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
        </>
      ) : (
        <LoadingSpinner isLoading={isLoading} refetch={refetch} />
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

export const getServerSideProps = withServerSideAuth()(async ({ user }) => {
  return { props: { user } };
});
