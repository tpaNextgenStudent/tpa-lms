import { Layout } from '../../../../components/common/Layout/Layout';
import { GetServerSidePropsContext } from 'next';
import { InferPagePropsType } from '../../../../lib/utils/types';
import { TasksMenu } from '../../../../components/tasks/TasksMenu/TasksMenu';
import styles from '../../../../components/tasks/tasks-page/tasksPage.module.scss';
import { TaskSection } from '../../../../components/tasks/TaskSection/TaskSection';
import { getFakeData } from '../../../../lib/mocks/getFakeData';

export default function Tasks({
  user,
  cohort,
  module,
  modules,
  tasks,
  task,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="My Tasks" user={user}>
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

  const task = {
    ...currentUserTask,
    task: {
      ...moduleTasks.find(t => t.id === currentUserTask.taskId)!,
      description: getMarkdown(),
    },
  };

  const taskMDX = task.task.description;

  return {
    props: {
      user,
      cohort: userCohort,
      module,
      modules,
      tasks: userTasks,
      task: { ...task, description: taskMDX },
    },
  };
}

function getMarkdown() {
  return `
  # Hiding properties - Task
  
  \`\`\`marmaid
  sequenceDiagram
  Alice->>John: Hello John, how are you?
  loop Healthcheck
  John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts!
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!
  \`\`\`

<img src="https://unsplash.it/100/100" height=350 style="border: 2px solid">

Everytime when you want to order Uber driver you have information about possible types of car:

* UberX
* Uber Pets
* and so on...

But till you decide on specific type you don't know much about car and driver. These datas are hidden. 

1. Write a class UberCar with properties:
* uber type
* price
* time to pick-up (in minutes)
* driver
* car model
* registration number

2. Write a function which takes a list of uber cars (List<UberCar>) and return a Map<String, UberCar> where:
* key is a uber type
* value is a car with the shortest time to pick up for that uber type

Example:

\`\`\`dart 
List<UberCar> cars = [
    UberCar('UberX', 12.35, 7, 'John Driver', 'Toyota', 'PO 123'),
    UberCar('UberX', 18.00, 3, 'Mary Lee', 'BMW', 'PO 991'),
    UberCar('UberX', 17.02, 4, 'Mark Zack', 'Toyota', 'PP 8881'),
    UberCar('Uber Pets', 12.12, 17, 'Kate Kate', 'Kia', 'PO 888'),
    UberCar('UberX', 8.50, 8, 'Luke Ok', 'Mazda', 'XO 288'),
];

Map<String, UberCar> selectedTypes = sortCarsByType(cars);
\`\`\`

In results \`selectedTypes\` should hold following values:

\`\`\`dart
{
    'UberX': UberCar('UberX', 18.00, 3, 'Mary Lee', 'BMW', 'PO 991'),
    'Uber Pets': UberCar('Uber Pets', 12.12, 17, 'Kate Kate', 'Kia', 'PO 888')
}
\`\`\`

3. Decide which values should be private.

`;
}
