import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';

export default function TeacherIndex() {
  return null;
}

export const getServerSideProps = withServerSideAuth('teacher')(async () => {
  return {
    redirect: {
      permanent: false,
      destination: `/teacher/assignments`,
    },
  };
});
