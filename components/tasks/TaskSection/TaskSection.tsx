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
import { TaskStatus } from '../../../api/tasks';
import { IModuleVersion } from '../../../api/modules';
import { TaskType } from '../../../lib/utils/types';

interface TaskSectionProps {
  task: { name: string; type: TaskType; description: string };
  attempt: { status: TaskStatus; attempt_number: number; score: number | null };
  attempts: {
    attempt_id: string;
    comment: string | null;
    evaluation_date: string;
    attempt_number: number;
    score: number | null;
    teacher: {
      user: {
        name: string | null;
        surname: string | null;
        image: string | null;
      };
    };
  }[];
  module: IModuleVersion;
  isActionLocked?: boolean;
}

export const TaskSection = ({
  task,
  attempt,
  module,
  attempts,
  isActionLocked,
}: TaskSectionProps) => {
  const [isDescriptionView, setIsDescriptionView] = useState(true);
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
        <TaskStatusBadge status={attempt.status} />
        <TaskTypeBadge type={task.type} />
        {task.type !== 'info' && (
          <TaskAttemptBadge text={'Attempt'} attempt={attempt.attempt_number} />
        )}
        {task.type === 'info' ? (
          <TaskDoneBadge />
        ) : (
          attempt.score && (
            <TaskScoreBadge text={'Score'} score={attempt.score} />
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
        <TaskComments attempts={attempts} />
      )}
      {!isActionLocked && attempt.status !== 'upcoming' && (
        <TaskAction type={task.type} />
      )}
    </main>
  );
};
