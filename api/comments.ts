import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { TaskType } from '../lib/utils/types';

type Options = {
  cookie: string;
};

export interface IComment {
  id: string;
  score: number;
  answer: string;
  comment: string;
  attempt_number: number;
  submission_date: string;
  evaluation_date: string;
  teacher: { id: string; cohort_id: string; user_id: string; role: 'teacher' };
  student: { id: string; cohort_id: string; user_id: string; role: 'student' };
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
}

export const getCommentsByTask = async (
  taskId: string,
  { cookie }: Options
): Promise<IComment[]> => {
  const { data } = await axios.get(apiPath(`comments/task/${taskId}`), {
    headers: { cookie },
  });
  return data;
};
