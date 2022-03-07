import { GetServerSidePropsContext } from 'next';
import { getFakeData } from '../../lib/mocks/getFakeData';

export default function TasksIndex() {
  return null;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  //just for data mocking case, we fetch all the data at once using api routes,
  //normally we will access all data using prisma client
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

  //user haven't picked module,
  //find 'in progress' task and redirect user to this task's page
  const nextTask = data.usersTasks.find(task => task.status === 'in progress');

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
