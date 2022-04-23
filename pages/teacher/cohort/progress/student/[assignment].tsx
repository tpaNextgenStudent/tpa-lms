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
import { getTeacherAssignmentsByStudent } from '../../../../../api/assignments';
import { mapStudentAssignmentsToTableData } from '../../../../../lib/tables/teacher/student-assignments/student-assignments';
import { columns } from '../../../../../lib/tables/teacher/student-assignments/student-assignments';

export default function CohortProgressIndex({
  user,
  student,
  studentScoresTableData,
  studentAssignmentsTableData,
}: InferPagePropsType<typeof getServerSideProps>) {
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
                data={studentScoresTableData}
                columns={getTeacherStudentProgressColumns(8)}
                colGap={26}
              />
            </>
          ),
          'tasks to be assigned': (
            <Table
              data={studentAssignmentsTableData}
              columns={columns}
              colGap={26}
            />
          ),
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
      const studentScoresTableData =
        mapStudentProgressToTableData(tasks_in_modules);

      const rawStudentAssignments = await getTeacherAssignmentsByStudent(
        assignmentId,
        {
          cookie: authCookie,
        }
      );

      const studentAssignmentsTableData = mapStudentAssignmentsToTableData(
        rawStudentAssignments
      );

      return {
        props: {
          user,
          student: { user: studentUser, profile },
          studentScoresTableData,
          studentAssignmentsTableData,
        },
      };
    } catch {
      return { notFound: true };
    }
  }
);
