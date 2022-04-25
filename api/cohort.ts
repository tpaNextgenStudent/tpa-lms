import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { IProfile, TaskType } from '../lib/utils/types';
import { IUser } from './user';
import { TaskStatus } from './tasks';

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

export interface ITeacherProgressTask {
  id: string;
  score: number | null;
  answer: string | null;
  status: TaskStatus;
  position: number;
  attempt_id: string;
  attempt_number: number;
}

export interface ITeacherProgressItem {
  student: {
    user: IUser;
    profile: IProfile;
    assignment_id: string;
  };
  tasks: ITeacherProgressTask[];
}

export const getTeacherCohortProgress = async (
  moduleId: string,
  { cookie }: Options
): Promise<ITeacherProgressItem[]> => {
  const { data } = await axios.get(
    apiPath(`teacher/cohort/scores/module/${moduleId}`),
    {
      headers: { cookie },
    }
  );
  return data;
};
