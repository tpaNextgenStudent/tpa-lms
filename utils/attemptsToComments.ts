import { IAttempt, ISingleAttempt } from '../apiHelpers/attempts';
import { Comment } from '../lib/types';

export function attemptToComments(attempt: ISingleAttempt): Comment[] {
  return attempt.comment && attempt.evaluation_date
    ? [
        {
          author: {
            id: attempt.teacher.user.id,
            name: attempt.teacher.user.name,
            surname: attempt.teacher.user.surname,
            image: attempt.teacher.user.image,
            login: attempt.teacher.profile.login,
          },
          attempt_score: attempt.score,
          content: attempt.comment,
          attempt_number: attempt.attempt_number,
          attempt_id: attempt.id,
          date: attempt.evaluation_date,
          // deprecated: attempt.deprecated,
        },
      ]
    : [];
}

export function attemptsToComments(attempts: IAttempt[]): Comment[] {
  return attempts
    .filter(a => !!a.comment)
    .map(attempt => ({
      author: {
        id: attempt.teacher.user.id,
        name: attempt.teacher.user.name,
        surname: attempt.teacher.user.surname,
        image: attempt.teacher.user.image,
        login: attempt.teacher.profile.login,
      },
      attempt_id: attempt.attempt_id,
      attempt_number: attempt.attempt_number,
      attempt_score: attempt.score,
      date: attempt.evaluation_date,
      content: attempt.comment!,
    }));
}

function createDepracatedComment(attempt: {
  attempt_id: string;
  attempt_number: number;
  score: number;
  evaluation_date: string;
  comment: string;
}): Comment {
  return {
    author: {
      id: null,
      name: 'TPA - BOT',
      surname: '',
      image: 'tpa-bot-avatar.png',
      login: null,
    },
    attempt_id: attempt.attempt_id,
    attempt_number: attempt.attempt_number,
    attempt_score: attempt.score,
    date: attempt.evaluation_date,
    content: attempt.comment,
  };
}
