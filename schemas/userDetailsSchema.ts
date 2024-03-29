import { object, string, TypeOf } from 'yup';

export const userDetailsSchema = object({
  name: string().required(),
  surname: string().required(),
  bio: string().required(),
});

export type UserDetails = TypeOf<typeof userDetailsSchema>;
