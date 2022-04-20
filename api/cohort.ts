import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { TaskType } from '../lib/utils/types';
import { IUser } from './user';

type Options = {
  cookie: string;
};

export interface IProgressItem {
  user: IUser;
  module_name: string;
  module_position: number;
  task_name: string;
  task_position: number;
  task_type: TaskType;
}

export const getCohortProgress = async ({
  cookie,
}: Options): Promise<IProgressItem[]> => {
  const { data } = await axios.get(apiPath('progress/cohort'), {
    headers: { cookie },
  });
  return data;
};
