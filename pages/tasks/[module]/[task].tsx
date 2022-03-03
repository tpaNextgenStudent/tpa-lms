import { Layout } from '../../../components/common/Layout/Layout';
import { db } from '../../../lib/mocks';
import { GetServerSidePropsContext } from 'next';
import { InferPagePropsType } from '../../../lib/utils/types';
import { TasksMenu } from '../../../components/tasks/TasksMenu/TasksMenu';
import styles from '../../../components/tasks/tasks-page/tasksPage.module.scss';
import { TaskSection } from '../../../components/tasks/TaskSection/TaskSection';

export default function Tasks({
  user,
  cohort,
  module,
  modules,
  tasks,
  task,
}: InferPagePropsType<typeof getServerSideProps>) {
  console.log(task);
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
  //get user id from next auth, and fetch all his data using prisma.user.findFirst
  const user = db.user;

  //probably accessible when we declare that we want to include (populate) cohort relation
  const cohorts = db.cohorts;
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
  const usersTasks = db.usersTasks;
  const userTasks = usersTasks
    .filter(ut => ut.userId === user.id && moduleTasksIds.includes(ut.taskId))
    //we don't have to map it with prisma, it will be connected with relation
    .map(ut => ({ ...ut, task: moduleTasks.find(t => t.id === ut.taskId) }));

  console.log(userTasks);

  const pickedTaskId = ctx.query.task;

  const currentTask = usersTasks.find(t => t.taskId === pickedTaskId);
  if (!currentTask) {
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
        ...currentTask,
        task: moduleTasks.find(t => t.id === currentTask.taskId),
      },
    },
  };
}
