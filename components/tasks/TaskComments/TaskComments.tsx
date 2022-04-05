import styles from './TaskComments.module.scss';
import Image from 'next/image';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import { TaskAttemptBadge } from '../TaskAttemptBadge/TaskAttemptBadge';
import { MarkdownContent } from '../../common/markdown/MarkdownContent/MarkdownContent';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { IComment } from '../../../api/comments';
dayjs.extend(relativeTime);

interface TaskCommentsProps {
  comments: IComment[];
}

export const TaskComments = ({ comments }: TaskCommentsProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <ul>
          {comments.map(comment => {
            const teacherName = `${comment.teacher.id} ${comment.teacher.id}`;
            return (
              <li key={comment.id} className={styles.commentsListItem}>
                <div className={styles.commentHeader}>
                  <div className={styles.teacher}>
                    <div className={styles.teacherImgWrapper}>
                      {/*<Image*/}
                      {/*  className={styles.teacherImg}*/}
                      {/*  src={comment.teacher.id}*/}
                      {/*  width={32}*/}
                      {/*  height={32}*/}
                      {/*  layout={'fixed'}*/}
                      {/*  alt={`${teacherName} avatar`}*/}
                      {/*/>*/}
                    </div>
                    <span className={styles.teacherName}>{teacherName}</span>
                  </div>
                  <span className={styles.time}>
                    {dayjs(comment.evaluation_date).fromNow()}
                  </span>
                  <div className={styles.attemptBadges}>
                    {comment.score && (
                      <TaskScoreBadge
                        isCircle
                        score={comment.score}
                        text="Score"
                      />
                    )}
                    <TaskAttemptBadge
                      isCircle
                      attempt={comment.attempt_number}
                      text="Attempt"
                    />
                    {!comment.score && (
                      <span className={styles.underAssessmentBadge}>
                        Version under assesment
                      </span>
                    )}
                  </div>
                </div>
                <MarkdownContent content={comment.comment} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
