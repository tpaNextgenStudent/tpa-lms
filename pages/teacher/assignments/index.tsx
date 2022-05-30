import { InferPagePropsType } from '../../../lib/types';
import { Layout } from '../../../components/common/Layout/Layout';
import { Table } from '../../../components/common/tables/Table/Table';
import {
  columns,
  mapAssignmentsToTableData,
} from '../../../lib/tables/teacher/assignments/assignments';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { fetchTeacherAssignments } from '../../../apiHelpers/assignments';
import { EmptyStateView } from '../../../components/common/EmptyStateView/EmptyStateView';
import NoAssignmentsRobotImg from '../../../public/img/no-assignments-robot.png';
import { useQuery } from 'react-query';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner/LoadingSpinner';

export default function AssignmentsIndex({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  const {
    data: rawAssignments,
    refetch,
    isFetching,
  } = useQuery('assignments', fetchTeacherAssignments);

  const assignments =
    rawAssignments && mapAssignmentsToTableData(rawAssignments);

  return (
    <Layout
      user={user}
      headerTitle="Assignments"
      title="Assignments"
      headerDescription="Students' tasks to be reviewed by you."
      actionsNumber={assignments?.length || 0}
    >
      {assignments ? (
        assignments.length > 0 ? (
          <Table data={assignments} columns={columns} />
        ) : (
          <EmptyStateView
            imgSrc={NoAssignmentsRobotImg}
            message="No assignments to be reviewed"
          />
        )
      ) : (
        <LoadingSpinner isLoading={isFetching} refetch={refetch} />
      )}
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ user }) => {
    return { props: { user } };
  }
);
