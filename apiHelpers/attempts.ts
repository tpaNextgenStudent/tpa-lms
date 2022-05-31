import { apiPath } from '../utils/apiPath';
import axios from 'axios';
import { IProfile, TaskStatus, TaskType } from '../lib/types';
import { IUser } from './user';

export interface IAttempt {
  attempt_id: string;
  task_data: {
    id: string;
    curriculum_id: string;
    module_version_id: string;
    type: TaskType;
    summative: boolean;
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
    profile: IProfile;
  };
}

export interface ISingleAttempt {
  id: string;
  task_id: string;
  score: number | null;
  answer: string | null;
  task: {
    id: string;
    curriculum_id: string;
    module_version_id: string;
    type: TaskType;
    summative: boolean;
    position: number;
    name: string;
    description: string;
    link: string | null;
  };
  comment: string | null;
  attempt_number: number;
  submission_date: string;
  evaluation_date: string | null;
  status: TaskStatus;
  student: {
    user: IUser;
    profile: IProfile;
  };
  teacher: {
    user: IUser;
    profile: IProfile;
  };
  module_number: number;
  task_number: number;
}

export const fetchAttemptsByTask = async (
  taskId: string
): Promise<IAttempt[]> => {
  const { data } = await axios.get(apiPath(`attempts/task/${taskId}`));
  return data.attempts;
};

export const fetchAttemptById = async (
  attemptId: string
): Promise<ISingleAttempt> => {
  const { data } = await axios.get(apiPath(`attempt/${attemptId}`));
  console.log('-–––––––––––––––LOG-START-–––––––––––––––');
  console.log(data);
  console.log('-–––––––––––––––LOG-END---–––––––––––––––');
  return data;
};
