export default function TeacherIndex() {
  return null;
}

export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: `/teacher/assignments`,
    },
  };
};
