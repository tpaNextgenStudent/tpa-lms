import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { Task, Attempt } from '@prisma/client';
import { TaskType } from '../lib/utils/types';

type Options = {
  cookie: string;
};

type Teacher = {
  legalName: string;
  surname: string;
  image: string;
};

export type TaskStatus = 'upcoming' | 'in progress' | 'approved' | 'in review';

export interface ITask {
  task_data: {
    id: string;
    type: TaskType;
    position: number;
    name: string;
    description: string;
  };
  last_attempt: {
    score: number;
    answer: string;
    status: TaskStatus;
    position: number;
    attempt_id: string;
    attempt_number: number;
  };
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
