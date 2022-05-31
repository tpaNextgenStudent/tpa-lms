import styles from './TaskComments.module.scss';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Comment } from '../../../lib/types';
import { EmptyStateView } from '../../common/EmptyStateView/EmptyStateView';
import NoCommentsRobotImg from '../../../public/img/no-comments-robot.png';
import dayjs from 'dayjs';
import { TaskComment } from '../TaskComment/TaskComment';
import { LoadingSpinner } from '../../common/LoadingSpinner/LoadingSpinner';
dayjs.extend(relativeTime);

interface TaskCommentsProps {
  comments: Comment[];
}

interface TaskCommentsLazyProps {
  comments: { data?: Comment[]; refetch: () => void; isLoading: boolean };
}

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList = ({ comments }: CommentsListProps) => (
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

export const TaskComments = ({ comments }: TaskCommentsProps) => {
  if (comments.length < 1) {
    return (
      <EmptyStateView
        imgSrc={NoCommentsRobotImg}
        message="Here you will see comments"
      />
    );
  }

  return <CommentsList comments={comments} />;
};

export const TaskCommentsLazy = ({
  comments: { data, refetch, isLoading },
}: TaskCommentsLazyProps) => {
  if (!data) {
    return <LoadingSpinner isLoading={isLoading} refetch={refetch} />;
  }

  if (!isLoading && data.length < 1) {
    return (
      <EmptyStateView
        imgSrc={NoCommentsRobotImg}
        message="Here you will see comments"
      />
    );
  }

  return <CommentsList comments={data} />;
};
