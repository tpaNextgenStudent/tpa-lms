import styles from './TaskComments.module.scss';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Comment } from '../../../lib/types';
import { EmptyStateView } from '../../common/EmptyStateView/EmptyStateView';
import NoCommentsRobotImg from '../../../public/img/no-comments-robot.png';
import dayjs from 'dayjs';
import { TaskComment } from '../TaskComment/TaskComment';
import { LoadingSpinner } from '../../common/LoadingSpinner/LoadingSpinner';
import { useQuery } from 'react-query';
import { fetchAttemptsByTask } from '../../../apiHelpers/attempts';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { attemptsToComments } from '../../../utils/attemptsToComments';
dayjs.extend(relativeTime);

interface TaskCommentsProps {
  comments: Comment[];
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

export const TaskCommentsLazy = () => {
  const router = useRouter();
  const { task: taskId } = router.query! as {
    task: string;
  };
  const {
    data: attempts,
    refetch,
    isFetching,
  } = useQuery(['attempts', taskId], () => fetchAttemptsByTask(taskId));

  const comments = useMemo(
    () => attempts && attemptsToComments(attempts),
    [attempts]
  );

  if (!comments) {
    return <LoadingSpinner isLoading={isFetching} refetch={refetch} />;
  }

  if (!isFetching && comments.length < 1) {
    return (
      <EmptyStateView
        imgSrc={NoCommentsRobotImg}
        message="Here you will see comments"
      />
    );
  }

  return <CommentsList comments={comments} />;
};
