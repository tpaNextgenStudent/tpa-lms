import { faker } from '@faker-js/faker';
import fs from 'fs';
import { Cohort, Module, Task, User, UserTask } from '../utils/types';

function createFakeTasks({
  moduleId,
  numOfTasks,
}: {
  moduleId: string;
  numOfTasks: number;
}): Task[] {
  const tasks: Task[] = [];
  for (let i = 0; i < numOfTasks; i++) {
    const taskId = faker.datatype.uuid();
    const taskName = faker.company.catchPhrase();
    const taskDescription = faker.lorem.lines(10);
    const taskType = faker.random.arrayElement([
      'info',
      'code',
      'image',
      'quiz',
    ] as const);
    const taskLink = ['code', 'quiz'].includes(taskType)
      ? faker.internet.url()
      : null;

    const task: Task = {
      id: taskId,
      description: taskDescription,
      type: taskType,
      moduleId,
      name: taskName,
      link: taskLink,
    };
    tasks.push(task);
  }
  return tasks;
}

function createFakeModule(): Module {
  const mn = faker.company.bsNoun();
  const moduleName = `${mn[0].toUpperCase()}${mn.slice(1)}`;

  const moduleId = mn;

  return {
    id: moduleId,
    name: moduleName,
    tasks: createFakeTasks({ moduleId, numOfTasks: 10 }),
  };
}

function createFakeModules({
  numOfModules,
}: {
  numOfModules: number;
}): Module[] {
  console.log('generating fake modules');
  const modules: Module[] = [];
  for (let i = 0; i < numOfModules; i++) {
    modules.push(createFakeModule());
  }
  return modules;
}

const mockedModules: Module[] = createFakeModules({ numOfModules: 4 });

function createFakeUserTask({
  task,
  userId,
  status,
}: {
  task: Task;
  userId: string;
  status: 'todo' | 'in progress' | 'done';
}): UserTask {
  return {
    id: faker.datatype.uuid(),
    taskId: task.id,
    userId,
    status: status,
    comment: null,
    score: null,
    answer: null,
    attempts: [],
  };
}

function createFakeUserTasks({
  modules,
  userId,
}: {
  modules: Module[];
  userId: string;
}): UserTask[] {
  const allTasks = modules.map(({ tasks }) => tasks).flat();

  const userTasks: UserTask[] = allTasks.map((task, i) =>
    createFakeUserTask({
      task,
      userId,
      status: i === 0 ? 'in progress' : 'todo',
    })
  );

  return userTasks;
}

function generateFakeJson() {
  const mockedUser: User = {
    id: 'userId',
    name: 'PatrykBuniX',
    firstname: 'Patryk',
    lastname: 'Górka',
    bio: 'Frontend developer in love with TypeScript and Next.js',
    email: 'patrykbunix@gmail.com',
    image: 'https://unsplash.it/100/100',
    cohortId: 'cohortId',
  };

  const mockedCohorts: Cohort[] = [
    {
      id: 'cohortId',
      name: 'Toyota',
      inviteUrlId: '123123',
      modules: mockedModules,
      users: [mockedUser],
    },
  ];

  const mockedUsersTasks: UserTask[] = createFakeUserTasks({
    modules: mockedModules,
    userId: mockedUser.id,
  });

  const db = {
    user: mockedUser,
    cohorts: mockedCohorts,
    modules: mockedModules,
    tasks: mockedModules.map(m => m.tasks).flat(),
    usersTasks: mockedUsersTasks,
  };

  fs.writeFileSync('./lib/mocks/data.json', JSON.stringify(db));
}

generateFakeJson();
