import { GetServerSidePropsContext } from 'next';
import { getUserTasksByModule } from '../../../../api/tasks';

export default function Module() {
  return null;
}

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const moduleId = params!.module as string;
  try {
    const tasks = await getUserTasksByModule(moduleId, {
      cookie: req.headers.cookie as string,
    });

    const currentTask = tasks[0];

    return {
      redirect: {
        permanent: true,
        destination: `/student/tasks/${moduleId}/${currentTask.id}`,
      },
    };
  } catch (e) {}

  return {
    notFound: true,
  };
}
