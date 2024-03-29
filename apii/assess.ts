import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { AssessValue } from '../schemas/assessSchema';
import { ISingleAttempt } from './attempts';

export const postTeacherAssessment = async (
  attemptId: string,
  { body }: { body: AssessValue }
): Promise<ISingleAttempt> => {
  const { data } = await axios.post(
    apiPath(`teacher/assess/attempt/${attemptId}`),
    body
  );
  return data;
};

type Options = {
  cookie: string;
};

export const getNextTeacherAssessmentTask = async (
  attemptId: string,
  { cookie }: Options
): Promise<{
  next_attempt_id: string | null;
  assessments_number: number;
} | null> => {
  try {
    const { data } = await axios.get(
      apiPath(`teacher/next/assignment/${attemptId}`),
      {
        headers: { cookie },
      }
    );
    return data;
  } catch {
    return null;
  }
};
