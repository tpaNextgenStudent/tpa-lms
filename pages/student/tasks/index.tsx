import { GetServerSidePropsContext } from 'next';
import { getUserModules } from '../../../api/modules';

export default function TasksIndex() {
  return null;
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  try {
    const modules = await getUserModules({
      cookie: req.headers.cookie as string,
    });

    const currentModule = modules[0];

    return {
      redirect: {
        permanent: false,
        destination: `/student/tasks/${currentModule.id}`,
      },
    };
  } catch (e) {}

  return {
    notFound: true,
  };
}
