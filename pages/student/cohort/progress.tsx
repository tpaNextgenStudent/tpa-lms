import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/utils/types';
import { Table } from '../../../components/common/tables/Table/Table';
import { columns } from '../../../lib/tables/student/cohort-progress/cohort-progress';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../../api/user';
import { getCohortProgress } from '../../../api/cohort';
import { EmptyStateView } from '../../../components/common/EmptyStateView/EmptyStateView';

export default function CohortProgress({
  user,
  progress,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      headerTitle="Cohort Progress"
      title="Cohort Progress"
      description="See your teammates and how they are doing with their tasks."
      user={user}
    >
      {progress.length < 1 ? (
        <EmptyStateView
          message="No cohort progress"
          imgSrc="/img/no-assignments-robot.png"
        />
      ) : (
        <Table data={progress} columns={columns} />
      )}
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('student')(
  async ({ req, res }) => {
    const authCookie = req.headers.cookie as string;
    const user = await getUserDetails({ cookie: authCookie });

    const p = await getCohortProgress({ cookie: authCookie });

    const progress = p.map(
      ({ student, task_name, task_type, module_position }) => {
        const studentName = [student.user.name, student.user.surname]
          .filter(n => n)
          .join(' ');
        return {
          student: {
            name: studentName,
            login: student.profile.login,
            img: student.user.image,
          },
          module: `Module ${module_position}`,
          task_name,
          task_type,
        };
      }
    );

    return { props: { user, progress } };
  }
);
