import styles from './TaskSection.module.scss';
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
import { TaskNav } from '../TaskNav/TaskNav';
import { TaskDoneBadge } from '../TaskDoneBadge/TaskDoneBadge';
import { TaskComments } from '../TaskComments/TaskComments';
import { ITask } from '../../../api/tasks';
import { IModule } from '../../../api/modules';

interface TaskSectionProps {
  task: ITask;
  module: IModule;
  isActionLocked?: boolean;
}

export const TaskSection = ({
  task,
  module,
  isActionLocked,
}: TaskSectionProps) => {
  const [isDescriptionView, setIsDescriptionView] = useState(true);
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);

  const lastAttempt = task.attempts[task.attempts.length - 1];

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
        <TaskStatusBadge status={task.status} />
        <TaskTypeBadge type={task.type} />
        {task.type !== 'info' && (
          <TaskAttemptBadge text={'Attempt'} attempt={task.attempts.length} />
        )}
        {lastAttempt &&
          (task.type === 'info' ? (
            <TaskDoneBadge />
          ) : (
            <TaskScoreBadge text={'Score'} score={lastAttempt.score} />
          ))}
      </div>
      <TaskNav
        setIsDescriptionView={setIsDescriptionView}
        isDescriptionView={isDescriptionView}
      />
      {isDescriptionView ? (
        <TaskDescription
          locked={task.status === 'upcoming'}
          description={task.description}
        />
      ) : (
        <TaskComments attempts={task.attempts} />
      )}
      {!isActionLocked && task.status !== 'upcoming' && (
        <TaskAction task={task} />
      )}
    </main>
  );
};
