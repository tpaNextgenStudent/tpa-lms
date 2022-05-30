import styles from './TeacherAssessPanel.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import { useState } from 'react';
import { TeacherAssessForm } from '../TeacherAssessForm/TeacherAssessForm';
import { useRouter } from 'next/router';

interface TeacherAssessPanelProps {
  nextAttempt?: {
    next_attempt_id: string | null;
    assessments_number: number;
  } | null;
}

export const TeacherAssessPanel = ({
  nextAttempt,
}: TeacherAssessPanelProps) => {
  const router = useRouter();

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const openPanel = () => {
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const hasNextTask =
    nextAttempt?.next_attempt_id && nextAttempt.assessments_number > 1;

  return (
    <div data-cypress="TeacherAssessPanel" className={styles.wrapper}>
      {isPanelOpen ? (
        <TeacherAssessForm
          closePanel={closePanel}
          openSelectToTop={!hasNextTask}
        />
      ) : (
        <CTAButton
          text="Assess"
          className={styles.assessButton}
          onClick={openPanel}
        />
      )}
      {hasNextTask && (
        <div className={styles.nextTaskBar}>
          <p className={styles.tasksLeftText}>
            You have{' '}
            <strong>
              {nextAttempt.assessments_number - 1}{' '}
              {`task${nextAttempt.assessments_number - 1 > 1 ? 's' : ''}`}
            </strong>{' '}
            to assess
          </p>
          <CTAButton
            onClick={() =>
              router.push(`/teacher/assignments/${nextAttempt.next_attempt_id}`)
            }
            className={styles.nextTaskButton}
            text="Next Task"
            styleType="secondary"
          />
        </div>
      )}
    </div>
  );
};
