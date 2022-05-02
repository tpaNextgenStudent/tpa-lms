import { InferPagePropsType } from '../../../../../lib/types';
import { Layout } from '../../../../../components/common/Layout/Layout';
import { Table } from '../../../../../components/common/tables/Table/Table';
import { withServerSideAuth } from '../../../../../lib/auth/withServerSideAuth';
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
import styles from '../../../../../components/teacher/cohort/progress/student/singleStudentProgressPage.module.scss';
import { EmptyStateView } from '../../../../../components/common/EmptyStateView/EmptyStateView';

export default function CohortProgressIndex({
  user,
  student,
  studentScoresTableData,
  studentAssignmentsTableData,
  maxNumOfTasks,
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
      title="Cohort Progress"
      headerTitle={userName}
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
              <GradesLegend className={styles.gradesLegendWrapper} />
              <Table
                id="student-scores-table"
                data={studentScoresTableData}
                columns={getTeacherStudentProgressColumns(maxNumOfTasks)}
                colGap={26}
              />
            </>
          ),
          'tasks to be assigned':
            studentAssignmentsTableData.length > 0 ? (
              <Table
                id="student-tasks-to-be-assigned-table"
                className={styles.toAssignTableWrapper}
                data={studentAssignmentsTableData}
                columns={columns}
                colGap={26}
              />
            ) : (
              <EmptyStateView
                imgSrc="/img/no-assignments-robot.png"
                message="No assignments to be reviewed"
              />
            ),
        }}
      />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ req, params, user }) => {
    const authCookie = req.headers.cookie as string;
    const { assignment: assignmentId } = params! as {
      assignment: string;
    };

    const [
      { user: studentUser, profile, tasks_in_modules },
      rawStudentAssignments,
    ] = await Promise.all([
      getTeacherSingleStudentScores(assignmentId, {
        cookie: authCookie,
      }),
      getTeacherAssignmentsByStudent(assignmentId, {
        cookie: authCookie,
      }),
    ]);

    const maxNumOfTasks = Math.max(
      ...tasks_in_modules.map(m => m.tasks.length)
    );

    const studentScoresTableData =
      mapStudentProgressToTableData(tasks_in_modules);

    const studentAssignmentsTableData = mapStudentAssignmentsToTableData(
      rawStudentAssignments
    );

    return {
      props: {
        user,
        student: { user: studentUser, profile },
        maxNumOfTasks,
        studentScoresTableData,
        studentAssignmentsTableData,
      },
    };
  }
);
