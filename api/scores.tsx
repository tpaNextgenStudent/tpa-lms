import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { IUser } from './user';
import { TaskType } from '../lib/utils/types';

type Options = {
  cookie: string;
};

export interface IScore {
  attempt: {
    id: string;
    score: number;
    answer: string;
    comment: string | null;
    attempt_number: number;
    submission_date: string;
    evaluation_date: string;
    teacher: { user: IUser };
  };
  task_name: string;
  task_type: TaskType;
  module_name: string;
}

export const getUserScores = async ({ cookie }: Options): Promise<IScore[]> => {
  const { data } = await axios.get(apiPath(`student/scores`), {
    headers: { cookie },
  });
  return data;
};
