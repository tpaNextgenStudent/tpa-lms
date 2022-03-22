import { publicRuntimeConfig } from '../runtimeConfig';

export const apiPath = (endpoint: string) => {
  return `${publicRuntimeConfig.BASE_URL}/api/${endpoint}`;
};
