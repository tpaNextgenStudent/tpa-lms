import { IAttempt, ISingleAttempt } from '../apiHelpers/attempts';
import { Comment } from '../lib/types';
import { isUserObjectValid } from './isUserObjectValid';

const tpaBotUser = {
  id: null,
  name: 'TPA - BOT',
  surname: '',
  image: '/img/tpa-bot-avatar.png',
  login: null,
};

export function attemptToComments({
  deprecated,
  evaluation_date,
  id,
  attempt_number,
  score,
  comment,
  teacher,
}: ISingleAttempt): Comment[] {
  if (deprecated && evaluation_date) {
    return [
      createDeprecatedComment({
        attempt_id: id,
        attempt_number: attempt_number,
        score: score,
        evaluation_date: evaluation_date,
      }),
    ];
  }
  return comment && evaluation_date
    ? [
        {
          author: isUserObjectValid(teacher)
            ? {
                id: teacher.user.id,
                name: teacher.user.name,
                surname: teacher.user.surname,
                image: teacher.user.image,
                login: teacher.profile.login,
              }
            : tpaBotUser,
          attempt_score: score,
          content: comment,
          attempt_number: attempt_number,
          attempt_id: id,
          date: evaluation_date,
        },
      ]
    : [];
}

export function attemptsToComments(attempts: IAttempt[]): Comment[] {
  return attempts.map(
    ({
      attempt_id,
      attempt_number,
      comment,
      teacher,
      evaluation_date,
      score,
      deprecated,
    }) => {
      return deprecated
        ? createDeprecatedComment({
            attempt_id: attempt_id,
            attempt_number: attempt_number,
            score: score,
            evaluation_date: evaluation_date,
          })
        : {
            author: isUserObjectValid(teacher)
              ? {
                  id: teacher.user.id,
                  name: teacher.user.name,
                  surname: teacher.user.surname,
                  image: teacher.user.image,
                  login: teacher.profile.login,
                }
              : tpaBotUser,
            attempt_id: attempt_id,
            attempt_number: attempt_number,
            attempt_score: score,
            date: evaluation_date,
            content: comment!,
          };
    }
  );
}

function createDeprecatedComment(attempt: {
  attempt_id: string;
  attempt_number: number;
  score: number | null;
  evaluation_date: string;
}): Comment {
  return {
    author: tpaBotUser,
    attempt_id: attempt.attempt_id,
    attempt_number: attempt.attempt_number,
    attempt_score: attempt.score,
    date: attempt.evaluation_date,
    content:
      '**You uploaded a newer version of this task before the teacher could assess this one.**',
  };
}
