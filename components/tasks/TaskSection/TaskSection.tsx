import styles from './TaskSection.module.scss';
import { TaskDescription } from '../TaskDescription/TaskDescription';
import { TaskAction } from '../TaskAction/TaskAction';
import { useState } from 'react';
import EnlargeIcon from '../../../public/enlarge-icon.svg';
import ShrinkIcon from '../../../public/shrink-icon.svg';
import clsx from 'clsx';
import { TaskStatusBadge } from '../TaskStatusBadge/TaskStatusBadge';
import { TaskTypeBadge } from '../TaskTypeBadge/TaskTypeBadge';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import { TaskAttemptBadge } from '../TaskAttemptBadge/TaskAttemptBadge';
import { TaskNav } from '../TaskNav/TaskNav';
import { TaskDoneBadge } from '../TaskDoneBadge/TaskDoneBadge';
import { TaskComments } from '../TaskComments/TaskComments';
import { TaskStatus } from '../../../api/tasks';
import { IModuleVersion } from '../../../api/modules';
import { Comment, TaskType } from '../../../lib/utils/types';
import { TaskBadges } from '../TaskBadges/TaskBadges';

interface TaskSectionProps {
  task: { name: string; type: TaskType; description: string };
  attempt: {
    status: TaskStatus;
    attempt_number: number | null;
    score: number | null;
  };
  comments: Comment[];
  module: IModuleVersion;
  isActionLocked?: boolean;
}

export const TaskSection = ({
  task,
  attempt,
  module,
  comments,
  isActionLocked,
}: TaskSectionProps) => {
  console.log('task section attempt: ', attempt);
  const [isDescriptionView, setIsDescriptionView] = useState(true);
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);

  const toggleFullScreenMode = () => {
    setIsFullScreenMode(prev => !prev);
  };

  const moduleName = `Module ${module.module_number}`;

  return (
    <main
      className={clsx(
        styles.wrapper,
        isFullScreenMode && styles.wrapperFullScreen
      )}
    >
      <p className={styles.taskModule}>{moduleName}</p>
      <div className={styles.taskHeader}>
        <h2 className={styles.taskTitle}>{task.name}</h2>
        <button
          onClick={toggleFullScreenMode}
          className={styles.fullScreenButton}
          aria-hidden
        >
          {isFullScreenMode ? <ShrinkIcon /> : <EnlargeIcon />}
        </button>
      </div>
      <div className={styles.taskBadges}>
        <TaskTypeBadge type={task.type} />
        <TaskStatusBadge status={attempt.status} />
        {task.type !== 'info' && attempt.attempt_number && (
          <TaskAttemptBadge attempt={attempt.attempt_number} />
        )}
        {task.type === 'info' ? (
          <TaskDoneBadge />
        ) : (
          attempt.score && (
            <TaskScoreBadge text={'Score'} score={attempt.score} isCircle />
          )
        )}
      </div>
      <TaskNav
        setIsDescriptionView={setIsDescriptionView}
        isDescriptionView={isDescriptionView}
      />
      {isDescriptionView ? (
        <TaskDescription
          locked={attempt.status === 'upcoming'}
          description={task.description}
        />
      ) : (
        <TaskComments comments={comments} />
      )}
      {!isActionLocked && attempt.status !== 'upcoming' && (
        <TaskAction type={task.type} />
      )}
    </main>
  );
};
