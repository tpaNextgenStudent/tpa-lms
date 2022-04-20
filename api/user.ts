import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';

type Options = {
  cookie: string;
};

export type UserRole = 'teacher' | 'student';

export interface IUser {
  id: string;
  name: string;
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
  role: UserRole;
}

export const getUserDetails = async ({
  cookie,
}: Options): Promise<IUserDetails> => {
  const { data } = await axios.get(apiPath('user/details'), {
    headers: { cookie },
  });
  return data;
};

// axios does not work in next js middleware so we need to use native fetch there
export const fetchGetUserDetails = async ({
  cookie,
}: Options): Promise<IUserDetails> => {
  const res = await fetch(apiPath('user/details'), {
    headers: { cookie },
  });
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return await res.json();
};
