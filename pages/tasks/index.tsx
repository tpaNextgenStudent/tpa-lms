import { db } from '../../lib/mocks';
import { GetServerSidePropsContext } from 'next';

export default function TasksIndex() {
  return null;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  //get user id from next auth, and fetch all his data using prisma.user.findFirst
  const user = db.user;

  //probably accessible when we declare that we want to include (populate) cohort relation
  const cohorts = db.cohorts;
  const userCohort = cohorts.find(c => c.id === user.cohortId);

  //if user has no cohort, inform him that he has to ask a teacher for link
  if (!userCohort) {
    return {
      props: { user, cohort: null, module: null, modules: [], tasks: [] },
    };
  }

  //user haven't picked module,
  //find 'in progress' task and redirect user to this task's page
  return {
    redirect: {
      permanent: true,
      destination: '/tasks/mid/task_id1',
    },
  };
}
