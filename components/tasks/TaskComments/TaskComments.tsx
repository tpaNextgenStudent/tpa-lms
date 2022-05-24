import styles from './TaskComments.module.scss';
import Image from 'next/image';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import { TaskAttemptBadge } from '../TaskAttemptBadge/TaskAttemptBadge';
import { MarkdownContent } from '../../common/markdown/MarkdownContent/MarkdownContent';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Comment } from '../../../lib/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EmptyStateView } from '../../common/EmptyStateView/EmptyStateView';
import NoCommentsRobotImg from '../../../public/img/no-comments-robot.png';
import dayjs from 'dayjs';
import { TaskComment } from '../TaskComment/TaskComment';
dayjs.extend(relativeTime);

interface TaskCommentsProps {
  comments: Comment[];
}

export const TaskComments = ({ comments }: TaskCommentsProps) => {
  if (comments.length < 1) {
    return (
      <EmptyStateView
        imgSrc={NoCommentsRobotImg}
        message="Here you will see comments"
      />
    );
  }

  return (
    <div data-cypress="TaskComments" className={styles.wrapper}>
      <div className={styles.content}>
        <ul>
          {comments.map(comment => {
            return <TaskComment key={comment.attempt_id} comment={comment} />;
          })}
        </ul>
      </div>
    </div>
  );
};
