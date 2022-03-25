import styles from './TaskSection.module.scss';
import { Module, Task, UserTask } from '../../../lib/utils/types';
import { TaskDescription } from '../TaskDescription/TaskDescription';
import { TaskAction } from '../TaskAction/TaskAction';
import { useState } from 'react';
import EnlargeIcon from '../../../public/enlarge-icon.svg';
import CrossIcon from '../../../public/cross-icon.svg';
import clsx from 'clsx';
import { TaskStatusBadge } from '../TaskStatusBadge/TaskStatusBadge';
import { TaskTypeBadge } from '../TaskTypeBadge/TaskTypeBadge';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import { TaskAttemptBadge } from '../TaskAttemptBadge/TaskAttemptBadge';

interface TaskSectionProps {
  task: UserTask & { task: Task };
  module: Module;
}

export const TaskSection = ({
  task: { task, status, score, attempts },
  module,
}: TaskSectionProps) => {
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);

  const toggleFullScreenMode = () => {
    setIsFullScreenMode(prev => !prev);
  };

  return (
    <main
      className={clsx(
        styles.wrapper,
        isFullScreenMode && styles.wrapperFullScreen
      )}
    >
      <p className={styles.taskModule}>{module.name}</p>
      <div className={styles.taskHeader}>
        <h2 className={styles.taskTitle}>{task.name}</h2>
        <button
          onClick={toggleFullScreenMode}
          className={styles.fullScreenButton}
          aria-hidden
        >
          {isFullScreenMode ? <CrossIcon /> : <EnlargeIcon />}
        </button>
      </div>
      <div className={styles.taskBadges}>
        <TaskStatusBadge status={status} />
        <TaskTypeBadge type={task.type} />
        <TaskAttemptBadge text={'Attempt'} attempt={attempts.length} />
        {score && <TaskScoreBadge text={'Score'} score={score} />}
      </div>
      <div className={styles.descriptionHeaderWrapper}>
        <h2 className={styles.descriptionHeader}>Description</h2>
      </div>
      <TaskDescription description={task.description} />
      <TaskAction task={task} />
    </main>
  );
};
