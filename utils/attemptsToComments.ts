import { IAttempt, ISingleAttempt } from '../api/attempts';
import { Comment } from '../lib/types';

export function attemptToComments(attempt: ISingleAttempt): Comment[] {
  return attempt.comment && attempt.evaluation_date
    ? [
        {
          author: {
            name: attempt.teacher.user.name,
            surname: attempt.teacher.user.surname,
            image: attempt.teacher.user.image,
          },
          attempt_score: attempt.score,
          content: attempt.comment,
          attempt_number: attempt.attempt_number,
          attempt_id: attempt.id,
          date: attempt.evaluation_date,
        },
      ]
    : [];
}

export function attemptsToComments(attempts: IAttempt[]): Comment[] {
  return attempts
    .filter(a => !!a.comment)
    .map(attempt => ({
      author: {
        name: attempt.teacher.user.name,
        surname: attempt.teacher.user.surname,
        image: attempt.teacher.user.image,
      },
      attempt_id: attempt.attempt_id,
      attempt_number: attempt.attempt_number,
      attempt_score: attempt.score,
      date: attempt.evaluation_date,
      content: attempt.comment!,
    }));
}
