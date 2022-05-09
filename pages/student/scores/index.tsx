import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/types';
import { Table } from '../../../components/common/tables/Table/Table';
import {
  columns,
  mapStudentScoresToTableData,
} from '../../../lib/tables/student/my-scores/my-scores';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { getUserScores } from '../../../apiHelpers/scores';
import { EmptyStateView } from '../../../components/common/EmptyStateView/EmptyStateView';

export default function ScoresIndex({
  user,
  scores,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      headerTitle="My Scores"
      title="My Scores"
      description="Track your scores. You can get 1 - don't give up, try again! 2 and 3 - well done, you are ready to go with the next task!"
      user={user}
    >
      {scores.length < 1 ? (
        <EmptyStateView
          imgSrc={'/img/no-assignments-robot.png'}
          message="You have no scores yet"
        />
      ) : (
        <Table columns={columns} data={scores} isFullWidth colGap={42} />
      )}
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('student')(
  async ({ req, res, user }) => {
    const authCookie = req.headers.cookie as string;
    const rawScores = await getUserScores({ cookie: authCookie });
    const scores = mapStudentScoresToTableData(rawScores);

    return { props: { user, scores } };
  }
);
