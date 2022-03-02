export interface Cohort {
  id: string;
  name: string;
  inviteUrlId: string;
  modules: Module[];
  users: User[];
}

export interface User {
  id: string;
  name?: string;
  firstname?: string;
  lastname?: string;
  bio?: string;
  email?: string;
  image?: string;
  cohortId: string;
}

export interface Module {
  id: string;
  name: string;
  tasks: Task[];
}

type TaskType = 'code' | 'quiz' | 'image' | 'info';

export interface Task {
  id: string;
  name: string;
  moduleId: string;
  type: TaskType;
  description: string; //long text
  data: null | string;
  //data is a content of task which is different for each task type
  //code -> repo link
  //quiz -> quiz link
  //image -> (probably) null
  //info -> markdown text
}

type TaskStatus = 'todo' | 'done' | 'doing';
export interface UserTask {
  userId: string;
  taskId: string;
  status: TaskStatus;
  attempt: number;
  score: null | number; //grade
  answer: null | string;
  //answer is different for each task type
  //code -> null - answers posted on github
  //quiz -> null - automatic assessment after quiz submission using webhooks
  //image -> image (probably image's url uploaded to some provider like cloudfront)
  //info -> null - it's in todo or done
}

const mockedTasks: Task[] = [
  {
    id: 'task_id1',
    name: 'Translate to a box diagram',
    type: 'image',
    data: null,
    moduleId: 'mid',
    description:
      'Flutter is an app SDK for building high-performance, high-fidelity apps for iOS, Android, web and desktop from a single codebase.',
  },
  {
    id: 'task_id2',
    name: 'Flutter introduction',
    type: 'info',
    data: '### Markdown title',
    moduleId: 'mid',
    description: 'This is Flutter introduction info-type task!',
  },
  {
    id: 'task_id3',
    name: 'Flutter tour Quiz',
    type: 'quiz',
    data: 'https://link.to.quiz/quizhash',
    moduleId: 'mid',
    description: 'This is Flutter tour Quiz quiz-type task!',
  },
  {
    id: 'task_id4',
    name: 'Inheritance exercise',
    type: 'code',
    data: 'https://github.com/user/repo',
    moduleId: 'mid',
    description: 'This is Inheritance exercise code-type task!',
  },
];

const mockedModules: Module[] = [
  {
    id: 'mid',
    name: 'Basics',
    tasks: mockedTasks,
  },
];

//no way to access this before declaration

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

const mockedUsersTasks: UserTask[] = [
  {
    userId: 'userId',
    answer: null,
    attempt: 0,
    score: null,
    status: 'doing',
    taskId: 'task_id1',
  },
  {
    userId: 'userId',
    answer: null,
    attempt: 0,
    score: null,
    status: 'todo',
    taskId: 'task_id2',
  },
  {
    userId: 'userId',
    answer: null,
    attempt: 0,
    score: null,
    status: 'todo',
    taskId: 'task_id3',
  },
  {
    userId: 'userId',
    answer: null,
    attempt: 0,
    score: null,
    status: 'todo',
    taskId: 'task_id4',
  },
];

export const db = {
  user: mockedUser,
  cohorts: mockedCohorts,
  modules: mockedModules,
  usersTasks: mockedUsersTasks,
};
