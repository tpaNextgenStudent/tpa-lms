import { InferPagePropsType } from '../../../../../lib/types';
import { Layout } from '../../../../../components/common/Layout/Layout';
import { Table } from '../../../../../components/common/tables/Table/Table';
import { withServerSideAuth } from '../../../../../lib/auth/withServerSideAuth';
import { GradesLegend } from '../../../../../components/teacher/GradesLegend/GradesLegend';
import { ProfileBanner } from '../../../../../components/profile/ProfileBanner/ProfileBanner';
import { ProfileUserInfo } from '../../../../../components/profile/ProfileUserInfo/ProfileUserInfo';
import { fetchTeacherSingleStudentScores } from '../../../../../apiHelpers/cohort';
import {
  getTeacherStudentProgressColumns,
  mapStudentProgressToTableData,
} from '../../../../../lib/tables/teacher/cohort-student-progress/cohort-student-progress';
import { ViewParamTabsSection } from '../../../../../components/common/ViewParamTabsSection/ViewParamTabsSection';
import { fetchTeacherAssignmentsByStudent } from '../../../../../apiHelpers/assignments';
import { mapStudentAssignmentsToTableData } from '../../../../../lib/tables/teacher/student-assignments/student-assignments';
import { columns } from '../../../../../lib/tables/teacher/student-assignments/student-assignments';
import styles from '../../../../../components/pagesStyles/singleStudentProgressPage.module.scss';
import { EmptyStateView } from '../../../../../components/common/EmptyStateView/EmptyStateView';
import NoAssignmentsRobotImg from '../../../../../public/img/no-assignments-robot.png';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { LoadingSpinner } from '../../../../../components/common/LoadingSpinner/LoadingSpinner';
import { useMemo } from 'react';

export default function CohortProgressIndex({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { assignment: assignmentId } = router.query as {
    assignment: string;
  };
  const {
    data: singleStudentScores,
    refetch: refetchStudentScores,
    isFetching: isStudentScoresFetching,
  } = useQuery(['single-student-scores', assignmentId], () =>
    fetchTeacherSingleStudentScores(assignmentId)
  );

  const {
    data: rawStudentAssignments,
    isFetching: isStudentAssignmentsFetching,
    refetch: refetchStudentAssignments,
  } = useQuery(['student-assignments', assignmentId], () =>
    fetchTeacherAssignmentsByStudent(assignmentId)
  );

  const studentAssignmentsTableData = useMemo(
    () =>
      rawStudentAssignments &&
      mapStudentAssignmentsToTableData(rawStudentAssignments),
    [rawStudentAssignments]
  );

  const refetchAll = async () => {
    await refetchStudentScores();
    await refetchStudentAssignments();
  };

  const tasks_in_modules = singleStudentScores?.tasks_in_modules;

  const maxNumOfTasks = useMemo(
    () =>
      tasks_in_modules &&
      Math.max(...tasks_in_modules.map(m => m.tasks.length)),
    [tasks_in_modules]
  );

  const studentScoresTableData = useMemo(
    () => tasks_in_modules && mapStudentProgressToTableData(tasks_in_modules),
    [tasks_in_modules]
  );

  const student = singleStudentScores && {
    user: singleStudentScores.user,
    profile: singleStudentScores.profile,
  };

  const userName =
    student &&
    [student.user.name, student.user.surname].filter(n => !!n).join(' ');

  const isLoading = isStudentScoresFetching || isStudentAssignmentsFetching;
  return (
    <Layout
      user={user}
      parentPage={{
        title: 'Cohort Progress',
        link: '/teacher/cohort/progress',
      }}
      withHeaderPrevButton
      title="Cohort Progress"
      headerTitle={userName || '...'}
    >
      {student &&
      studentAssignmentsTableData &&
      studentScoresTableData &&
      maxNumOfTasks ? (
        <>
          <ProfileBanner />
          <ProfileUserInfo
            name={userName!}
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
                  />
                ) : (
                  <EmptyStateView
                    imgSrc={NoAssignmentsRobotImg}
                    message="No assignments to be reviewed"
                  />
                ),
            }}
          />
        </>
      ) : (
        <LoadingSpinner isLoading={isLoading} refetch={refetchAll} />
      )}
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ user }) => {
    return {
      props: {
        user,
      },
    };
  }
);
