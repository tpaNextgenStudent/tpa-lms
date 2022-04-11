import styles from './TaskSection.module.scss';
import { TaskDescription } from '../TaskDescription/TaskDescription';
import { TaskAction } from '../TaskAction/TaskAction';
import { useState } from 'react';
import EnlargeIcon from '../../../public/svg/enlarge-icon.svg';
import ShrinkIcon from '../../../public/svg/shrink-icon.svg';
import clsx from 'clsx';
import { TaskNav } from '../TaskNav/TaskNav';
import { TaskComments } from '../TaskComments/TaskComments';
import { TaskStatus } from '../../../api/tasks';
import { IModuleVersion } from '../../../api/modules';
import { Comment, TaskType } from '../../../lib/utils/types';
import { TaskBadges } from '../TaskBadges/TaskBadges';
import { CTAButton } from '../../common/CTAButton/CTAButton';

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
      <TaskBadges
        task={task}
        attempt={attempt}
        className={styles.taskBadges}
        badges={['type', 'status', 'attempt', 'score']}
        config={{ score: { withText: true } }}
      />
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
      {attempt.score && attempt.score < 3 && (
        <div className={styles.tryAgainBar}>
          <CTAButton text="Pass one more time" />
        </div>
      )}
    </main>
  );
};
