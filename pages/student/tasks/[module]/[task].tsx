import { Layout } from '../../../../components/common/Layout/Layout';
import { GetServerSidePropsContext } from 'next';
import { InferPagePropsType } from '../../../../lib/utils/types';
import { TasksMenu } from '../../../../components/tasks/TasksMenu/TasksMenu';
import styles from '../../../../components/tasks/tasksPage/tasksPage.module.scss';
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
### Overview
All programs require one or more classes that act as a model for the world. For example, a program to track student test scores might have \`Student\`, \`Course\`, and \`Grade\` classes. Our real-world concerns, students and their grades, are inside the program as classes. We represent each student as an instance, or object, of the \`Student\` class.

This is *object-oriented programming* because programs are built around objects and their interactions. An object contains **state** and **behavior**.

<img src=https://i.imgur.com/HIBlxMV.png height=300>

Classes are a blueprint for objects. Blueprints detail the general structure. For example, all students have an \`ID\`, all courses can enroll a student, etc. An instance is the thing itself. *This* student has an \`ID\` of \`42\`, this course enrolled that student, etc.

### Target outcomes of this task
After this lesson you will be able to describe what Object Oriented Programming is.

### Working example
Let’s review with another example, a savings account at a bank.

What should a savings account know?

* The balance of money available.

What should a savings account do?

* Deposit money.
* Withdraw money.

<img src=https://i.imgur.com/su0aaTV.png height=300>

Imagine two people have accounts that are instances of the SavingsAccount class. They share behavior (how they deposit and withdraw) but have individual state (their balances), and even with the same balance amount these accounts are separate entities

\`\`\`dart
class Store {  
  // new method: constructor!
  Store() {
    
  }
}

class Car {
  // Constructor method
  Car();
}

void main() {
  print("Start of the main method.");
  
  // create the instance below
  
  // print the instance below
}
\`\`\`

# Task 

1. Watch video about [Object Oriented Programming](https://www.youtube.com/watch?v=CqlM7JjnAi4).
3. Read article about [OOP](https://www.educative.io/blog/object-oriented-programming#what-is).
2. Do you like Squid Game ? Read this article about [OOP explained with the Kdrama Squid Game](https://medium.com/geekculture/oop-explained-with-the-kdrama-squid-game-ee87637751f7).

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

`;
}
