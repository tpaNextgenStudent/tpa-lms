import { object, string, TypeOf } from 'yup';

export const assessSchema = object({
  score: string().required(),
  comment: string().required(),
});

export type UserDetails = TypeOf<typeof assessSchema>;
