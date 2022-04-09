import styles from './TaskBadges.module.scss';
import { TaskTypeBadge } from '../TaskTypeBadge/TaskTypeBadge';
import { TaskStatusBadge } from '../TaskStatusBadge/TaskStatusBadge';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import { TaskDoneBadge } from '../TaskDoneBadge/TaskDoneBadge';
import { TaskStatus } from '../../../api/tasks';
import { TaskType } from '../../../lib/utils/types';
import {
  TaskAttemptBadge,
  TaskAttemptBadgeStyleType,
} from '../TaskAttemptBadge/TaskAttemptBadge';
import clsx from 'clsx';
import { Fragment } from 'react';

type BadgeType = 'type' | 'status' | 'attempt' | 'score';

interface TaskBadgesConfig {
  score?: {
    withText?: boolean;
    withBorder?: boolean;
  };
  attempt?: {
    styleType?: TaskAttemptBadgeStyleType;
  };
}

interface TaskBadgesProps {
  task: { name: string; type: TaskType; description: string };
  attempt: {
    status: TaskStatus;
    attempt_number: number | null;
    score: number | null;
  };
  className?: string;
  badges?: BadgeType[];
  config?: TaskBadgesConfig;
}

export const TaskBadges = ({
  task,
  attempt,
  className,
  badges = ['type', 'status', 'score'],
  config,
}: TaskBadgesProps) => {
  const isInfoType = task.type === 'info';

  const typeToComponentArr = {
    type: () => <TaskTypeBadge type={task.type} />,
    status: () => <TaskStatusBadge status={attempt.status} />,
    score: () =>
      isInfoType ? (
        <TaskDoneBadge />
      ) : (
        attempt.score && (
          <TaskScoreBadge
            score={attempt.score}
            withText={config?.score?.withText}
            withBorder={config?.score?.withBorder}
          />
        )
      ),
    attempt: () =>
      typeof attempt.attempt_number === 'number' && (
        <TaskAttemptBadge
          attempt={attempt.attempt_number}
          styleType={config?.attempt?.styleType}
        />
      ),
  };

  return (
    <div className={clsx(styles.taskBadgesWrapper, className)}>
      {badges?.map((type, index) => {
        return <Fragment key={index}>{typeToComponentArr[type]()}</Fragment>;
      })}
    </div>
  );
};
