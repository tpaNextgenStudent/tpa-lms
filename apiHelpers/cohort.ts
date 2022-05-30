import { apiPath } from '../utils/apiPath';
import axios from 'axios';
import { IProfile, TaskStatus, TaskType } from '../lib/types';
import { IUser } from './user';

type Options = {
  cookie: string;
};

export interface IProgressItem {
  student: { user: IUser | null; profile: IProfile };
  module_name: string;
  module_position: number;
  task_name: string;
  task_position: number;
  task_type: TaskType;
}

export const fetchCohortProgress = async (): Promise<IProgressItem[]> => {
  const { data } = await axios.get(apiPath('progress/cohort'));
  return data;
};

export interface ITeacherProgressTask {
  id: string;
  score: number | null;
  answer: string | null;
  status: TaskStatus;
  position: number;
  attempt_id: string | null;
  attempt_number: number | null;
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

export const fetchTeacherCohortProgress = async (
  moduleId: string
): Promise<ITeacherProgressItem[]> => {
  const { data } = await axios.get(
    apiPath(`teacher/cohort/scores/module/${moduleId}`)
  );
  return data;
};

export interface ITeacherSingleStudentScores {
  user: IUser;
  profile: IProfile;
  tasks_in_modules: {
    tasks: ITeacherProgressTask[];
    position: number;
    module_id: string;
  }[];
}

export const fetchTeacherSingleStudentScores = async (
  assignmentId: string
): Promise<ITeacherSingleStudentScores> => {
  const { data } = await axios.get(
    apiPath(`teacher/scores/student/${assignmentId}`)
  );
  return data.student;
};
