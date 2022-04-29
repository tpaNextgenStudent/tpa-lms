import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';

export default function StudentIndex() {
  return null;
}

export const getServerSideProps = withServerSideAuth('student')(async () => {
  return {
    redirect: {
      permanent: false,
      destination: `/student/tasks`,
    },
  };
});
