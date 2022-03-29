import { apiPath } from '../lib/utils/apiPath';
import axios from 'axios';
import { Module } from '@prisma/client';

type Options = {
  cookie: string;
};

export interface IModule extends Module {
  position: number;
}

export const getUserModules = async ({
  cookie,
}: Options): Promise<IModule[]> => {
  const { data } = await axios.get(apiPath('modules'), {
    headers: { cookie },
  });
  return data;
};
