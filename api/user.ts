import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';

type Options = {
  cookie: string;
};

export interface IUserDetails {
  role: 'student' | 'teacher';
  name: string | null;
  surname: string | null;
  bio: string | null;
  image: string | null;
  email: string | null;
  cohort_name: string;
}

export const getUserDetails = async ({
  cookie,
}: Options): Promise<IUserDetails> => {
  const { data } = await axios.get(apiPath('user/details'), {
    headers: { cookie },
  });
  return data;
};
