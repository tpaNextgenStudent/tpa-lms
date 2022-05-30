import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/types';
import { Table } from '../../../components/common/tables/Table/Table';
import {
  columns,
  mapStudentScoresToTableData,
} from '../../../lib/tables/student/my-scores/my-scores';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { fetchUserScores } from '../../../apiHelpers/scores';
import { EmptyStateView } from '../../../components/common/EmptyStateView/EmptyStateView';
import NoAssignmentsRobotImg from '../../../public/img/no-assignments-robot.png';
import { useQuery } from 'react-query';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner/LoadingSpinner';

export default function ScoresIndex({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  const {
    data: rawScores,
    refetch,
    isFetching,
  } = useQuery('scores', fetchUserScores);

  const scores = rawScores && mapStudentScoresToTableData(rawScores);

  return (
    <Layout
      headerTitle="My Scores"
      title="My Scores"
      headerDescription="Track your scores. You can get 1 - don't give up, try again! 2 and 3 - well done, you are ready to go with the next task!"
      user={user}
    >
      {scores ? (
        scores.length < 1 ? (
          <EmptyStateView
            imgSrc={NoAssignmentsRobotImg}
            message="You have no scores yet"
          />
        ) : (
          <Table columns={columns} data={scores} />
        )
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
