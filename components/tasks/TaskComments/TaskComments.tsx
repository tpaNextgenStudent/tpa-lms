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
import { useRouter } from 'next/router';
import { EmptyStateView } from '../../common/EmptyStateView/EmptyStateView';

interface TaskCommentsProps {
  comments: Comment[];
}

export const TaskComments = ({ comments }: TaskCommentsProps) => {
  const { asPath } = useRouter();

  if (comments.length < 1) {
    return (
      <EmptyStateView
        imgSrc="/img/no-comments-robot.png"
        message="Here you will see comments"
      />
    );
  }

  return (
    <div data-cypress="TaskComments" className={styles.wrapper}>
      <div className={styles.content}>
        <ul>
          {comments.map(comment => {
            const versionLink = `/student/scores/${comment.attempt_id}`;
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
                    {dayjs(comment.date).format('DD MMM YYYY, HH:MM a')}
                  </span>
                  <div className={styles.attemptBadges}>
                    {comment.attempt_id && !asPath.includes(versionLink) && (
                      <Link href={versionLink}>
                        <a className={styles.underAssessmentLink}>
                          Version under assessment
                        </a>
                      </Link>
                    )}
                    <TaskAttemptBadge attempt={comment.attempt_number} />
                    {comment.attempt_score && (
                      <TaskScoreBadge score={comment.attempt_score} withText />
                    )}
                  </div>
                </div>
                <div className={styles.contentWrapper}>
                  <MarkdownContent content={comment.content} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
