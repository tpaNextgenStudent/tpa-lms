import { Layout } from '../../../components/common/Layout/Layout';
import { GetServerSidePropsContext } from 'next';
import { InferPagePropsType } from '../../../lib/utils/types';
import { TasksMenu } from '../../../components/tasks/TasksMenu/TasksMenu';
import styles from '../../../components/tasks/tasks-page/tasksPage.module.scss';
import { TaskSection } from '../../../components/tasks/TaskSection/TaskSection';
import { getFakeData } from '../../../lib/mocks/getFakeData';

export default function Tasks({
  user,
  cohort,
  module,
  modules,
  tasks,
  task,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout user={user}>
      <div className={styles.tasksWrapper}>
        <TasksMenu
          modules={modules}
          module={module}
          tasks={tasks}
          task={task}
        />
        <TaskSection task={task} module={module} />
      </div>
    </Layout>
  );
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

  //cohort modules from prisma relation
  const modules = userCohort.modules;

  //use currently picked module
  const module = modules.find(m => m.id === pickedModuleId);

  if (!module) {
    return {
      notFound: true,
    };
  }

  //get tasks from selected module and their ids
  const moduleTasks = module.tasks;
  const moduleTasksIds = module.tasks.map(t => t.id);

  //get user's tasks from UserTask table with matching task's ids from current module
  const usersTasks = data.usersTasks;
  const userTasks = usersTasks
    .filter(ut => ut.userId === user.id && moduleTasksIds.includes(ut.taskId))
    //we don't have to map it with prisma, it will be connected with relation
    .map(ut => ({ ...ut, task: moduleTasks.find(t => t.id === ut.taskId)! }));

  const pickedTaskId = ctx.query.task;

  const currentUserTask = usersTasks.find(t => t.id === pickedTaskId);

  if (!currentUserTask) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
      cohort: userCohort,
      module,
      modules,
      tasks: userTasks,
      task: {
        ...currentUserTask,
        task: moduleTasks.find(t => t.id === currentUserTask.taskId)!,
      },
    },
  };
}
