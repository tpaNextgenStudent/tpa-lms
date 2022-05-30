import styles from './TaskSection.module.scss';
import { TaskDescription } from '../TaskDescription/TaskDescription';
import { TaskAction } from '../TaskAction/TaskAction';
import { useState } from 'react';
import clsx from 'clsx';
import { TaskComments } from '../TaskComments/TaskComments';
import { Comment, TaskStatus } from '../../../lib/types';
import { IModuleVersion } from '../../../apiHelpers/modules';
import { TaskBadges } from '../TaskBadges/TaskBadges';
import { TeacherAssessPanel } from '../TeacherAssessPanel/TeacherAssessPanel';
import { ViewParamTabsSection } from '../../common/ViewParamTabsSection/ViewParamTabsSection';
import { useElementSize } from '../../../lib/hooks/useElementSize';
import { TaskSectionModuleInfo } from '../TaskSectionModuleInfo/TaskSectionModuleInfo';
import { ITask } from '../../../apiHelpers/tasks';
import { TaskSectionHeader } from '../TaskSectionHeader/TaskSectionHeader';
import { TaskSectionPassAgain } from '../TaskSectionPassAgain/TaskSectionPassAgain';
import { LoadingAnimation } from '../../common/LoadingAnimation/LoadingAnimation';
import { LoadingSpinner } from '../../common/LoadingSpinner/LoadingSpinner';

interface TaskSectionProps {
  task?: ITask['task_data'];
  attempt?: {
    status: TaskStatus;
    attempt_number: number | null;
    score: number | null;
    answer: null | string;
    github_link?: string;
  } | null;
  comments?: Comment[];
  module?: IModuleVersion;
  isTaskActionVisible?: boolean;
  isPassAgainVisible?: boolean;
  isTeacherAssessPanelVisible?: boolean;
  nextAttempt?: {
    next_attempt_id: string | null;
    assessments_number: number;
  } | null;
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
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);
  const { ref, size } = useElementSize();

  const toggleFullScreenMode = () => {
    setIsFullScreenMode(prev => !prev);
  };

  return (
    <main
      data-cypress="TaskSection"
      className={clsx(
        styles.wrapper,
        isFullScreenMode && styles.wrapperFullScreen
      )}
    >
      {task && module ? (
        <>
          <TaskSectionModuleInfo module={module} />
          <TaskSectionHeader
            task={task}
            isFullScreenMode={isFullScreenMode}
            toggleFullScreenMode={toggleFullScreenMode}
          />
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
                    paddingBottom={size[1]}
                    answer={attempt?.answer}
                    isLocked={attempt?.status === 'upcoming'}
                    description={task.description}
                  />
                  {isTaskActionVisible && attempt?.status !== 'upcoming' && (
                    <TaskAction
                      sizeRef={ref}
                      type={task.type}
                      github_link={attempt?.github_link}
                    />
                  )}
                </>
              ),
              comments: comments && <TaskComments comments={comments} />,
            }}
          />
          {isPassAgainVisible && (
            <TaskSectionPassAgain module={module} task={task} />
          )}
          {isTeacherAssessPanelVisible && nextAttempt && (
            <TeacherAssessPanel nextAttempt={nextAttempt} />
          )}
        </>
      ) : (
        <div className={styles.loadingWrapper}>
          <LoadingSpinner />
        </div>
      )}
    </main>
  );
};
