import styles from './TaskComments.module.scss';
import Image from 'next/image';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import { TaskAttemptBadge } from '../TaskAttemptBadge/TaskAttemptBadge';
import { MarkdownContent } from '../../common/markdown/MarkdownContent/MarkdownContent';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.extend(relativeTime);

interface TaskCommentsProps {
  attempts: {
    attempt_id: string;
    comment: string | null;
    evaluation_date: string;
    attempt_number: number;
    score: number | null;
    teacher: {
      user: {
        name: string | null;
        surname: string | null;
        image: string | null;
      };
    };
  }[];
}

export const TaskComments = ({ attempts }: TaskCommentsProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <ul>
          {attempts
            .filter(a => a.comment)
            .map(attempt => {
              const teacherName = `${attempt.teacher.user.name} ${attempt.teacher.user.surname}`;
              return (
                <li
                  key={attempt.attempt_id}
                  className={styles.commentsListItem}
                >
                  <div className={styles.commentHeader}>
                    <div className={styles.teacher}>
                      <div className={styles.teacherImgWrapper}>
                        {attempt.teacher.user.image && (
                          <Image
                            className={styles.teacherImg}
                            src={attempt.teacher.user.image}
                            width={32}
                            height={32}
                            layout={'fixed'}
                            alt={`${teacherName} avatar`}
                          />
                        )}
                      </div>
                      <span className={styles.teacherName}>{teacherName}</span>
                    </div>
                    <span className={styles.time}>
                      {dayjs(attempt.evaluation_date).fromNow()}
                    </span>
                    <div className={styles.attemptBadges}>
                      {attempt.score && (
                        <TaskScoreBadge
                          isCircle
                          score={attempt.score}
                          text="Score"
                        />
                      )}
                      <TaskAttemptBadge
                        isCircle
                        attempt={attempt.attempt_number}
                        text="Attempt"
                      />
                      {attempt.attempt_id && (
                        <span className={styles.underAssessmentBadge}>
                          Version under assesment
                        </span>
                      )}
                    </div>
                  </div>
                  <MarkdownContent content={attempt.comment!} />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
