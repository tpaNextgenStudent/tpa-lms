import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { Task } from '@prisma/client';

type Options = {
  cookie: string;
};

export interface IModuleVersion {
  module_number: number;
  module_version_id: string;
  name: string;
}

export const getUserModules = async ({
  cookie,
}: Options): Promise<IModuleVersion[]> => {
  const { data } = await axios.get(apiPath('modules'), {
    headers: { cookie },
  });
  return data;
};
