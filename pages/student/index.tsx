export default function StudentIndex() {
  return null;
}

export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: `/student/tasks`,
    },
  };
};
