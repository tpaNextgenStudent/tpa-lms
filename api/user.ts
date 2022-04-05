import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';

type Options = {
  cookie: string;
};

export interface IUser {
  id: string;
  name: string | null;
  surname: string | null;
  bio: string | null;
  email: string | null;
  emailVerified: boolean | null;
  image: string | null;
}

export interface IUserDetails {
  name: string | null;
  surname: string | null;
  bio: string | null;
  image: string | null;
  email: string | null;
  cohort_name: string;
  github_login: string;
  role: 'student' | 'teacher';
}

export const getUserDetails = async ({
  cookie,
}: Options): Promise<IUserDetails> => {
  const { data } = await axios.get(apiPath('user/details'), {
    headers: { cookie },
  });
  return data;
};
