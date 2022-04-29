export const apiPath = (endpoint: string) => {
  return `${process.env.BASE_URL}/api/${endpoint}`;
};
