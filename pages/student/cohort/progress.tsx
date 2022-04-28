import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/utils/types';
import { Table } from '../../../components/common/tables/Table/Table';
import {
  columns,
  mapCohortProgressToTableData,
} from '../../../lib/tables/student/cohort-progress/cohort-progress';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../../api/user';
import { getCohortProgress } from '../../../api/cohort';

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
      <Table data={progress} columns={columns} />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('student')(
  async ({ req, res }) => {
    const authCookie = req.headers.cookie as string;
    const user = await getUserDetails({ cookie: authCookie });

    const rawProgress = await getCohortProgress({ cookie: authCookie });
    const progress = mapCohortProgressToTableData(rawProgress);

    return { props: { user, progress } };
  }
);
