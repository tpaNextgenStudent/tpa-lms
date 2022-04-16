import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { AssessValue } from '../schemas/assessSchema';
import { ISingleAttempt } from './attempts';

type Options = {
  body: AssessValue;
};

export const postTeacherAssessment = async (
  attemptId: string,
  { body }: Options
): Promise<ISingleAttempt> => {
  const { data } = await axios.post(
    apiPath(`teacher/assess/attempt/${attemptId}`),
    body
  );
  return data;
};
