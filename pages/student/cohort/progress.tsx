import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/types';
import { Table } from '../../../components/common/tables/Table/Table';
import {
  columns,
  mapCohortProgressToTableData,
} from '../../../lib/tables/student/cohort-progress/cohort-progress';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { fetchCohortProgress } from '../../../apiHelpers/cohort';
import { useQuery } from 'react-query';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner/LoadingSpinner';
import { useMemo } from 'react';

export default function CohortProgress({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  const {
    data: rawProgress,
    refetch,
    isFetching,
  } = useQuery('cohort-progress', fetchCohortProgress);

  const progress = useMemo(
    () => rawProgress && mapCohortProgressToTableData(rawProgress),
    [rawProgress]
  );

  return (
    <Layout
      headerTitle="Cohort Progress"
      title="Cohort Progress"
      headerDescription="See your teammates and how they are doing with their tasks."
      user={user}
    >
      {progress ? (
        <Table data={progress} columns={columns} />
      ) : (
        <LoadingSpinner isLoading={isFetching} refetch={refetch} />
      )}
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('student')(
  async ({ user }) => {
    return { props: { user } };
  }
);
