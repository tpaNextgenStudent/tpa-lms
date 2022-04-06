import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { TaskType } from '../lib/utils/types';
import { IUser } from './user';

type Options = {
  cookie: string;
};

export interface IAttempt {
  attempt_id: string;
  task_data: {
    id: string;
    curriculum_id: string;
    module_version_id: string;
    type: TaskType;
    position: number;
    name: string;
    description: string;
    link: string;
  };
  score: number | null;
  answer: string | null;
  comment: string | null;
  attempt_number: number;
  submission_date: string;
  evaluation_date: string;
  teacher: {
    user: IUser;
  };
}

export interface ISingleAttempt {
  id: string;
  assignment_id: string;
  task_id: string;
  score: number;
  answer: string;
  comment: string | null;
  attempt_number: number;
  teacher_assigment_id: string;
  submission_date: string;
  evaluation_date: string;
  task: {
    id: string;
    curriculum_id: string;
    module_version_id: string;
    type: TaskType;
    position: number;
    name: string;
    description: string;
    link: string;
  };
  teacher: {
    user: IUser;
  };
  module_number: number;
}

export const getAttemptsByTask = async (
  taskId: string,
  { cookie }: Options
): Promise<IAttempt[]> => {
  const { data } = await axios.get(apiPath(`attempts/task/${taskId}`), {
    headers: { cookie },
  });
  return data.attempts;
};

export const getAttemptById = async (
  attemptId: string,
  { cookie }: Options
): Promise<ISingleAttempt> => {
  const { data } = await axios.get(apiPath(`attempt/${attemptId}`), {
    headers: { cookie },
  });
  return data;
};
