import styles from './TaskSection.module.scss';
import { TaskDescription } from '../TaskDescription/TaskDescription';
import { TaskAction } from '../TaskAction/TaskAction';
import { useState } from 'react';
import EnlargeIcon from '../../../public/svg/enlarge-icon.svg';
import ShrinkIcon from '../../../public/svg/shrink-icon.svg';
import clsx from 'clsx';
import { TaskComments } from '../TaskComments/TaskComments';
import { TaskStatus } from '../../../api/tasks';
import { IModuleVersion } from '../../../api/modules';
import { Comment, TaskType } from '../../../lib/utils/types';
import { TaskBadges } from '../TaskBadges/TaskBadges';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import { useRouter } from 'next/router';
import { TeacherAssessPanel } from '../TeacherAssessPanel/TeacherAssessPanel';
import { ViewParamTabsSection } from '../../common/ViewParamTabsSection/ViewParamTabsSection';

interface TaskSectionProps {
  task: {
    id: string;
    name: string;
    type: TaskType;
    description: string;
    link: string | null;
  };
  attempt?: {
    status: TaskStatus;
    attempt_number: number | null;
    score: number | null;
    answer: null | string;
  };
  comments?: Comment[];
  module: IModuleVersion;
  isTaskActionVisible?: boolean;
  isPassAgainVisible?: boolean;
  isTeacherAssessPanelVisible?: boolean;
  nextAttempt?: { next_attempt_id: string | null; assessments_number: number };
}

export const TaskSection = ({
  task,
  attempt,
  module,
  comments,
  isTaskActionVisible = false,
  isPassAgainVisible = false,
  isTeacherAssessPanelVisible = false,
  nextAttempt,
}: TaskSectionProps) => {
  const router = useRouter();
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);

  const toggleFullScreenMode = () => {
    setIsFullScreenMode(prev => !prev);
  };

  const moduleNumber = `Module ${module.module_number}`;

  return (
    <main
      data-cypress="TaskSection"
      className={clsx(
        styles.wrapper,
        isFullScreenMode && styles.wrapperFullScreen
      )}
    >
      <p data-cypress="TaskSectionModuleName" className={styles.taskModule}>
        <span className={styles.taskModuleNumber}>{moduleNumber}</span>
        <span className={styles.taskModuleName}>{module.name}</span>
      </p>
      <div className={styles.taskHeader}>
        <h2 data-cypress="TaskSectionTaskTitle" className={styles.taskTitle}>
          {task.name}
        </h2>
        <button
          data-cypress="TaskSectionFullScreenButton"
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
        config={{ score: { withText: true, withBorder: true } }}
      />
      <ViewParamTabsSection
        tabs={{
          description: (
            <>
              <TaskDescription
                answer={attempt?.answer}
                locked={attempt?.status === 'upcoming'}
                description={task.description}
              />
              {isTaskActionVisible && <TaskAction task={task} />}
            </>
          ),
          comments: comments && <TaskComments comments={comments} />,
        }}
      />
      {isPassAgainVisible && (
        <div
          data-cypress="TaskSectionTryAgainBar"
          className={styles.tryAgainBar}
        >
          <CTAButton
            onClick={() => {
              router.push(
                `/student/tasks/${module.module_version_id}/${task.id}`
              );
            }}
            text="Pass one more time"
          />
        </div>
      )}
      {isTeacherAssessPanelVisible && (
        <TeacherAssessPanel nextAttempt={nextAttempt} />
      )}
    </main>
  );
};
