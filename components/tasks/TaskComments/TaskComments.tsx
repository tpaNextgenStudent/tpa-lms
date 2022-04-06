import styles from './TaskComments.module.scss';
import Image from 'next/image';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import { TaskAttemptBadge } from '../TaskAttemptBadge/TaskAttemptBadge';
import { MarkdownContent } from '../../common/markdown/MarkdownContent/MarkdownContent';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Comment } from '../../../lib/utils/types';
import Link from 'next/link';
dayjs.extend(relativeTime);

interface TaskCommentsProps {
  comments: Comment[];
}

export const TaskComments = ({ comments }: TaskCommentsProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <ul>
          {comments.map(comment => {
            const authorName = [comment.author.name, comment.author.surname]
              .filter(n => !!n)
              .join(' ');
            return (
              <li key={comment.attempt_id} className={styles.commentsListItem}>
                <div className={styles.commentHeader}>
                  <div className={styles.teacher}>
                    <div className={styles.teacherImgWrapper}>
                      {comment.author.image && (
                        <Image
                          className={styles.teacherImg}
                          src={comment.author.image}
                          width={32}
                          height={32}
                          layout={'fixed'}
                          alt={`${authorName} avatar`}
                        />
                      )}
                    </div>
                    <span className={styles.teacherName}>{authorName}</span>
                  </div>
                  <span className={styles.time}>
                    {dayjs(comment.date).fromNow()}
                  </span>
                  <div className={styles.attemptBadges}>
                    {comment.attempt_id && (
                      <Link href={`/student/scores/${comment.attempt_id}`}>
                        <a className={styles.underAssessmentLink}>
                          Version under assesment
                        </a>
                      </Link>
                    )}
                    {comment.attempt_score && (
                      <TaskScoreBadge
                        isCircle
                        score={comment.attempt_score}
                        text="Score"
                      />
                    )}
                    <TaskAttemptBadge attempt={comment.attempt_number} />
                  </div>
                </div>
                <MarkdownContent content={comment.content} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
