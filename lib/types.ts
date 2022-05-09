import { Redirect } from 'next/types';

export type InferPagePropsType<T> = T extends (
  ...args: readonly any[]
) => Promise<
  | { props: infer P | Promise<infer P> }
  | { notFound: true }
  | {
      redirect: Redirect;
    }
>
  ? NonNullable<P>
  : never;

interface CommentAuthor {
  name: string | null;
  surname: string | null;
  image: string | null;
}

export interface Comment {
  attempt_id: string;
  content: string;
  date: string;
  attempt_number: number;
  attempt_score: number | null;
  author: CommentAuthor;
}

export type TaskType = 'code' | 'quiz' | 'image' | 'info';
export type TaskStatus = 'upcoming' | 'in progress' | 'approved' | 'in review';

export type IProfile = {
  profile_id: string;
  login: string;
  role: string;
  provider_account_id: string;
};
