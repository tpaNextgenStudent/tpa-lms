import { apiPath } from '../utils/apiPath';
import axios from 'axios';
import { TaskStatus, TaskType } from '../lib/types';

type Options = {
  cookie: string;
};

export interface ITask {
  task_data: {
    id: string;
    type: TaskType;
    position: number;
    name: string;
    description: string;
    link: string | null;
  };
  last_attempt: {
    score: number | null;
    answer: string | null;
    status: TaskStatus;
    position: number;
    attempt_id: string | null;
    attempt_number: number | null;
    github_link: string;
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

export const fetchUserTasksByModule = async (
  moduleId: string
): Promise<ITask[]> => {
  const { data } = await axios.get(apiPath(`tasks/module/${moduleId}`));
  return data;
};

export interface ICurrentTask {
  module_id: string;
  task_id: string;
}

export const getCurrentTask = async ({
  cookie,
}: Options): Promise<ICurrentTask> => {
  const { data } = await axios.get(apiPath(`student/task/current`), {
    headers: { cookie },
  });
  return data;
};
