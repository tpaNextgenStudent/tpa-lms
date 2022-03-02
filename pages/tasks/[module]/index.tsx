import { db } from '../../../lib/mocks';
import { GetServerSidePropsContext } from 'next';

export default function Module() {
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

  //get selected module from url
  const pickedModuleId = ctx.query.module;

  //user haven't picked a task
  //try to find 'in progress' task in this module
  //if all tasks are 'done', get first task from the module

  return {
    redirect: {
      permanent: true,
      destination: '/tasks/mid/task_id1',
    },
  };
}
