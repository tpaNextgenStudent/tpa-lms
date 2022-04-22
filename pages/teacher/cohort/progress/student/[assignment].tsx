import { InferPagePropsType } from '../../../../../lib/utils/types';
import { Layout } from '../../../../../components/common/Layout/Layout';
import { Table } from '../../../../../components/common/tables/Table/Table';
import { withServerSideAuth } from '../../../../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../../../../api/user';
import { GradesLegend } from '../../../../../components/teacher/GradesLegend/GradesLegend';
import { ProfileBanner } from '../../../../../components/profile/ProfileBanner/ProfileBanner';
import { ProfileUserInfo } from '../../../../../components/profile/ProfileUserInfo/ProfileUserInfo';
import { getTeacherSingleStudentScores } from '../../../../../api/cohort';
import {
  getTeacherStudentProgressColumns,
  mapStudentProgressToTableData,
} from '../../../../../lib/tables/teacher/cohort-student-progress/cohort-student-progress';
import { ViewParamTabsSection } from '../../../../../components/common/ViewParamTabsSection/ViewParamTabsSection';

export default function CohortProgressIndex({
  user,
  student,
  studentTableData,
}: InferPagePropsType<typeof getServerSideProps>) {
  console.log(student);
  const userName = [student.user.name, student.user.surname]
    .filter(n => !!n)
    .join(' ');

  return (
    <Layout
      user={user}
      parentPage={{
        title: 'Cohort Progress',
        link: '/teacher/cohort/progress',
      }}
      withHeaderPrevButton
      title={'User name'}
    >
      <ProfileBanner />
      <ProfileUserInfo
        name={userName}
        login={student.profile.login}
        avatar={student.user.image}
        bio={student.user.bio}
      />
      <ViewParamTabsSection
        tabs={{
          scores: (
            <>
              <GradesLegend />
              <Table
                data={studentTableData}
                columns={getTeacherStudentProgressColumns(8)}
                colGap={26}
              />
            </>
          ),
          'tasks to be assigned': <span>tasks to be assigned</span>,
        }}
      />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ req, params }) => {
    const authCookie = req.headers.cookie as string;
    const { assignment: assignmentId } = params! as {
      assignment: string;
    };

    try {
      const user = await getUserDetails({ cookie: authCookie });
      const {
        user: studentUser,
        profile,
        tasks_in_modules,
      } = await getTeacherSingleStudentScores(assignmentId, {
        cookie: authCookie,
      });

      const studentTableData = mapStudentProgressToTableData(tasks_in_modules);

      return {
        props: {
          user,
          student: { user: studentUser, profile },
          studentTableData,
        },
      };
    } catch {
      return { notFound: true };
    }
  }
);
