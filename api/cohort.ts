import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { TaskType } from '../lib/utils/types';

type Options = {
  cookie: string;
};

export interface IProgressItem {
  user: {
    id: string;
    email: string | null;
    emailVerified: boolean | null;
    image: string | null;
    name: string;
    surname: string | null;
    bio: string | null;
  };
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
