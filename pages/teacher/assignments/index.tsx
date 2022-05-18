import { InferPagePropsType } from '../../../lib/types';
import { Layout } from '../../../components/common/Layout/Layout';
import { Table } from '../../../components/common/tables/Table/Table';
import {
  columns,
  mapAssignmentsToTableData,
} from '../../../lib/tables/teacher/assignments/assignments';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { getTeacherAssignments } from '../../../apiHelpers/assignments';
import { EmptyStateView } from '../../../components/common/EmptyStateView/EmptyStateView';

export default function AssignmentsIndex({
  user,
  assignments,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      user={user}
      headerTitle="Assignments"
      title="Assignments"
      description="Students' tasks to be reviewed by you."
      actionsNumber={assignments.length}
    >
      {assignments.length > 0 ? (
        <Table data={assignments} columns={columns} />
      ) : (
        <EmptyStateView
          imgSrc="/img/no-assignments-robot.png"
          message="No assignments to be reviewed"
        />
      )}
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ req, user }) => {
    const authCookie = req.headers.cookie as string;
    const rawAssignments = await getTeacherAssignments({ cookie: authCookie });
    const assignments = mapAssignmentsToTableData(rawAssignments);

    return { props: { user, assignments } };
  }
);
