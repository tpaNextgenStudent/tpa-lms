import { InferPagePropsType } from '../../../lib/utils/types';
import { Layout } from '../../../components/common/Layout/Layout';
import { Table } from '../../../components/common/tables/Table/Table';
import {
  AssignmentsData,
  columns,
} from '../../../lib/tables/teacher/assignments/assignments';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../../api/user';
import { getTeacherAssignments } from '../../../api/assignments';
import dayjs from 'dayjs';

export default function AssignmentsIndex({
  user,
  assignments,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      user={user}
      title={'Assignments'}
      description="Students' tasks to be reviewed by you."
      actionsNumber={assignments.length}
    >
      <Table data={assignments} columns={columns} isFullWidth />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth(async ({ req, res }) => {
  const authCookie = req.headers.cookie as string;
  const user = await getUserDetails({ cookie: authCookie });

  const rawAssignments = await getTeacherAssignments({ cookie: authCookie });

  const assignments: AssignmentsData[] = rawAssignments.map(a => {
    return {
      submission_date: dayjs(a.submission_date).format('DD MMM YYYY'),
      student: {
        name: a.student.user.name,
        login: a.student.user.email,
        img: a.student.user.image,
      },
      module: `Module ${a.module_number}`,
      task: a.task.name,
      task_type: a.task.type,
      attempt: a.attempt_number,
      check: { id: a.id },
    };
  });

  return { props: { user, assignments } };
});
