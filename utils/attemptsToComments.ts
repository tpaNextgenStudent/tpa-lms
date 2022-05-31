import { IAttempt, ISingleAttempt } from '../apiHelpers/attempts';
import { Comment } from '../lib/types';

export function attemptToComments(attempt: ISingleAttempt): Comment[] {
  if (attempt.deprecated && attempt.evaluation_date) {
    return [
      createDepracatedComment({
        attempt_id: attempt.id,
        attempt_number: attempt.attempt_number,
        score: attempt.score,
        evaluation_date: attempt.evaluation_date,
      }),
    ];
  }
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
        },
      ]
    : [];
}

export function attemptsToComments(attempts: IAttempt[]): Comment[] {
  return attempts.map(attempt => {
    return attempt.deprecated
      ? createDepracatedComment({
          attempt_id: attempt.attempt_id,
          attempt_number: attempt.attempt_number,
          score: attempt.score,
          evaluation_date: attempt.evaluation_date,
        })
      : {
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
        };
  });
}

function createDepracatedComment(attempt: {
  attempt_id: string;
  attempt_number: number;
  score: number | null;
  evaluation_date: string;
}): Comment {
  return {
    author: {
      id: null,
      name: 'TPA - BOT',
      surname: '',
      image: '/img/tpa-bot-avatar.png',
      login: null,
    },
    attempt_id: attempt.attempt_id,
    attempt_number: attempt.attempt_number,
    attempt_score: attempt.score,
    date: attempt.evaluation_date,
    content:
      '**You uploaded a newer version of this task before the teacher could assess this one.**',
  };
}
