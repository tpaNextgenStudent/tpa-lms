import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/utils/types';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../../api/user';
import { getAttemptById } from '../../../api/attempts';

export default function ScoresIndex({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="Assignments" user={user} withHeaderPrevButton>
      <p>single assignment to check</p>
    </Layout>
  );
}
export const getServerSideProps = withServerSideAuth(
  async ({ req, params }) => {
    const { assignment: assignmentId } = params! as {
      assignment: string;
    };

    const authCookie = req.headers.cookie as string;
    const user = await getUserDetails({ cookie: authCookie });

    const attempt = await getAttemptById(assignmentId, { cookie: authCookie });

    return {
      props: {
        user,
      },
    };
  }
);
