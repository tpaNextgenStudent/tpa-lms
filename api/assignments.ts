import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { IUser, UserRole } from './user';
import { TaskType, TaskStatus } from '../lib/utils/types';

type Options = {
  cookie: string;
};

export interface IAssignment {
  id: string;
  assignment_id: string;
  task_id: string;
  score: number | null;
  answer: string | null;
  comment: string | null;
  attempt_number: number;
  teacher_assigment_id: string;
  submission_date: string;
  evaluation_date: string | null;
  status: TaskStatus;
  module_number: number;
  task_number: number;
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
  student: {
    id: string;
    cohort_id: string;
    user_id: string;
    role: UserRole;
    user: IUser;
  };
}

export const getTeacherAssignments = async ({
  cookie,
}: Options): Promise<IAssignment[]> => {
  const { data } = await axios.get(apiPath(`teacher/assignments`), {
    headers: { cookie },
  });
  return data;
};
