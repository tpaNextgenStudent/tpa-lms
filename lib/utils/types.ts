import { Redirect } from 'next/types';

export type InferPagePropsType<T> = T extends (
  ...args: readonly any[]
) => Promise<
  | { props: infer P | Promise<infer P> }
  | { notFound: true }
  | {
      redirect: Redirect;
    }
>
  ? NonNullable<P>
  : never;

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
  role: 'student' | 'teacher';
}

export interface Module {
  id: string;
  name: string;
  tasks: Task[];
}

export type TaskType = 'code' | 'quiz' | 'image' | 'info';

export interface Task {
  id: string;
  name: string;
  moduleId: string;
  type: TaskType;
  description: string; //long text
  link: null | string;
  //link for code/quiz type, otherwise null
}
type Attempt = { taskId: string; date: string };
export type TaskStatus = 'upcoming' | 'in progress' | 'approved' | 'in review';
export interface UserTask {
  id: string;
  userId: string;
  taskId: string;
  status: TaskStatus;
  attempts: Attempt[];
  comment: null | string;
  score: null | number; //grade
  answer: null | string;
  //answer is different for each task type
  //code -> link to Pull Request with response
  //quiz -> null - automatic assessment after quiz submission using webhooks
  //image -> image (probably image's url uploaded to some provider like cloudfront)
  //info -> null - it's in todo or done
}
