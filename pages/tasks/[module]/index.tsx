import { GetServerSidePropsContext } from 'next';
import { getFakeData } from '../../../lib/mocks/getFakeData';

export default function Module() {
  return null;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const data = await getFakeData();

  //get user id from next auth, and fetch all his data using prisma.user.findFirst
  const user = data.user;

  //probably accessible when we declare that we want to include (populate) cohort relation
  const cohorts = data.cohorts;
  const userCohort = cohorts.find(c => c.id === user.cohortId);

  //if user has no cohort, inform him that he has to ask a teacher for link
  if (!userCohort) {
    return {
      redirect: {
        permanent: true,
        destination: '/join-to-cohort-error',
      },
    };
  }

  //get selected module from url
  const pickedModuleId = ctx.query.module;
  //validate picked module, return 404 when not found

  const currentModule = data.modules.find(m => m.id === pickedModuleId);

  if (!currentModule) {
    return {
      notFound: true,
    };
  }

  //user haven't picked a task
  //todo: try to find 'in progress' task in this module
  //if all tasks are 'done', get first task from the module
  const moduleTasksIds = currentModule.tasks.map(t => t.id);

  const nextTask = data.usersTasks.find(task =>
    moduleTasksIds.includes(task.taskId)
  );

  if (nextTask) {
    const task = data.tasks.find(t => t.id === nextTask.taskId);

    if (task) {
      return {
        redirect: {
          permanent: true,
          destination: `/tasks/${task.moduleId}/${nextTask.id}`,
        },
      };
    }
  }

  return {
    notFound: true,
  };
}
