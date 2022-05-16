import { apiPath } from '../utils/apiPath';
import axios from 'axios';

type Options = {
  cookie: string;
};

export type UserRole = 'teacher' | 'student';

export interface IsUserInOrganisation {
  userInOrganisation: boolean;
  resposCreated: boolean;
}

export const getUserInOrganisation = async ({
  cookie,
}: Options): Promise<IsUserInOrganisation> => {
  const { data } = await axios.get(apiPath('github/userInOrganisation'), {
    headers: { cookie },
  });
  return data;
};
