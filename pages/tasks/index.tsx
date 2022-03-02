import { Layout } from '../../components/common/Layout/Layout';
import { db } from '../../lib/mocks';
import { GetServerSidePropsContext } from 'next';
import { InferPagePropsType } from '../../lib/utils/types';

export default function Tasks({
  user,
  cohort,
  module,
  modules,
  tasks,
}: InferPagePropsType<typeof getServerSideProps>) {
  console.log({ user, cohort, modules, module, tasks });
  return (
    <Layout user={user}>
      <p>tasks content</p>
    </Layout>
  );
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
  const pickedModuleId = 'mid';

  //cohort modules from prisma relation
  const modules = userCohort.modules;

  //use currently picked module
  const module = modules.find(m => m.id === pickedModuleId);

  //todo: if module is not picked, redirect to the one with 'in progress' task
  if (!module) {
    return {
      props: { user, cohort: null, module: null, modules, tasks: [] },
    };
  }

  //get tasks from selected module and their ids
  const moduleTasks = module.tasks;
  const moduleTasksIds = module.tasks.map(t => t.id);

  //get user's tasks from UserTask table with matching task's ids from current module
  const usersTasks = db.usersTasks;
  const userTasks = usersTasks
    .filter(ut => ut.userId === user.id && moduleTasksIds.includes(ut.taskId))
    //we don't have to map it with prisma, it will be connected with relation
    .map(ut => ({ ...ut, task: moduleTasks.find(t => t.id === ut.taskId) }));

  return {
    props: { user, cohort: userCohort, module, modules, tasks: userTasks },
  };
}
