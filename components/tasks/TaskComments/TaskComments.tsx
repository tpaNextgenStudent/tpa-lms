import styles from './TaskComments.module.scss';
import { IAttempt } from '../../../api/tasks';
import Image from 'next/image';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import { TaskAttemptBadge } from '../TaskAttemptBadge/TaskAttemptBadge';
import { MarkdownContent } from '../../common/markdown/MarkdownContent/MarkdownContent';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.extend(relativeTime);

interface TaskCommentsProps {
  attempts: IAttempt[];
}

export const TaskComments = ({ attempts }: TaskCommentsProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <ul>
          {attempts.map(attempt => {
            const teacherName = `${attempt.teacher.legalName} ${attempt.teacher.surname}`;
            return (
              <li key={attempt.comment} className={styles.commentsListItem}>
                <div className={styles.commentHeader}>
                  <div className={styles.teacher}>
                    <div className={styles.teacherImgWrapper}>
                      <Image
                        className={styles.teacherImg}
                        src={attempt.teacher.image}
                        width={32}
                        height={32}
                        layout={'fixed'}
                        alt={`${teacherName} avatar`}
                      />
                    </div>
                    <span className={styles.teacherName}>{teacherName}</span>
                  </div>
                  <span className={styles.time}>
                    {dayjs(attempt.assessment_date).fromNow()}
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
                    {attempt.status === 'in review' && (
                      <span className={styles.underAssessmentBadge}>
                        Version under assesment
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.commentContent}>
                  <MarkdownContent content={attempt.comment} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
