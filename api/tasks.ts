import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { Task, Attempt } from '@prisma/client';

type Options = {
  cookie: string;
};

type Teacher = {
  legalName: string;
  surname: string;
  image: string;
};

export interface IAttempt extends Attempt {
  status: 'upcoming' | 'in progress' | 'approved' | 'in review';
  teacher: Teacher;
}

export type TaskStatus = 'upcoming' | 'in progress' | 'approved' | 'in review';

export interface ITask extends Task {
  type: 'info' | 'code';
  status: TaskStatus;
  position: number;
  attempts: IAttempt[];
}

export const getUserTasksByModule = async (
  moduleId: string,
  { cookie }: Options
): Promise<ITask[]> => {
  const { data } = await axios.get(apiPath(`tasks/module/${moduleId}`), {
    headers: { cookie },
  });
  return data;
};
