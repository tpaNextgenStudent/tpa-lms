import styles from './TaskComment.module.scss';
import Image from 'next/image';
import dayjs from 'dayjs';
import Link from 'next/link';
import { TaskAttemptBadge } from '../TaskAttemptBadge/TaskAttemptBadge';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import { MarkdownContent } from '../../common/markdown/MarkdownContent/MarkdownContent';
import { Comment } from '../../../lib/types';
import { useRouter } from 'next/router';

interface TaskCommentProps {
  comment: Comment;
}

export const TaskComment = ({ comment }: TaskCommentProps) => {
  const { asPath } = useRouter();

  const content = parseCommentMessage(comment.content);

  const versionLink = `/student/tasks/attempt/${comment.attempt_id}`;
  const authorName = [comment.author.name, comment.author.surname]
    .filter(n => !!n)
    .join(' ');
  return (
    <li className={styles.commentsListItem}>
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
          {comment.attempt_id && !asPath.includes(comment.attempt_id) && (
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
        <MarkdownContent content={content} />
      </div>
    </li>
  );
};

interface DartError {
  testID: string;
  error: string;
}

function isDartError(error: unknown): error is DartError {
  return (
    error !== null &&
    typeof error === 'object' &&
    'testID' in error &&
    'error' in error
  );
}

function parseCommentMessage(comment: string) {
  try {
    const parsed = JSON.parse(comment);

    if (Array.isArray(parsed)) {
      const m = parsed.map(obj => {
        if (isDartError(obj)) {
          return obj.error
            .replaceAll(' '.repeat(10), '')
            .replaceAll(' '.repeat(12), '')
            .replaceAll('\\n', '\n\n');
        }
        return '';
      });
      return m.join('<hr/>');
    }
    return parsed;
  } catch {
    return comment;
  }
}
