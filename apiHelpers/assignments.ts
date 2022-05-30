import { apiPath } from '../utils/apiPath';
import axios from 'axios';
import { IUser } from './user';
import { TaskType, TaskStatus, IProfile } from '../lib/types';

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
    user: IUser;
    profile: IProfile;
  };
}
export const fetchTeacherAssignments = async (): Promise<IAssignment[]> => {
  const { data } = await axios.get(apiPath(`teacher/assignments`));
  return data;
};

export const getTeacherAssignmentsByStudent = async (
  assignmentId: string,
  { cookie }: Options
): Promise<IAssignment[]> => {
  const { data } = await axios.get(
    apiPath(`teacher/assignments/student/${assignmentId}`),
    {
      headers: { cookie },
    }
  );

  return data;
};

export const fetchTeacherAssignmentsByStudent = async (
  assignmentId: string
): Promise<IAssignment[]> => {
  const { data } = await axios.get(
    apiPath(`teacher/assignments/student/${assignmentId}`)
  );

  return data;
};
