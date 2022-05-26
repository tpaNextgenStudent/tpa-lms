import { apiPath } from '../utils/apiPath';
import axios from 'axios';
import { Curriculum } from '@prisma/client';

type Options = {
  cookie: string;
};

export interface IsUserInOrganisationData {
  userInOrganisation: boolean;
  reposCreated: boolean;
}

export const getUserInOrganisation = async ({
  cookie,
}: Options): Promise<IsUserInOrganisationData> => {
  const { data } = await axios.get(apiPath('github/userInOrganisation'), {
    headers: { cookie },
  });
  return data;
};

export interface CreateUserReposData {
  updatedCurriculum: Curriculum;
}

export const createUserRepos = async (): Promise<CreateUserReposData> => {
  const { data } = await axios.get(apiPath('github/createRepos'));
  return data;
};
