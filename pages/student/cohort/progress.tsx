import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/utils/types';
import { Table } from '../../../components/common/tables/Table/Table';
import { columns } from '../../../lib/tables/student/cohort-progress/cohort-progress';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../../api/user';
import { getCohortProgress } from '../../../api/cohort';

export default function CohortProgress({
  user,
  progress,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      title="Cohort Progress"
      description="See your teammates and how they are doing with their tasks."
      user={user}
    >
      <Table data={progress} columns={columns} />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('student')(
  async ({ req, res }) => {
    const authCookie = req.headers.cookie as string;
    const user = await getUserDetails({ cookie: authCookie });

    const p = await getCohortProgress({ cookie: authCookie });

    const progress = p.map(
      ({ user, module_name, task_name, task_type, module_position }) => {
        const userName = [user.name, user.surname].filter(n => n).join(' ');
        return {
          student: {
            name: userName,
            login: user.email,
            img: user.image,
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
