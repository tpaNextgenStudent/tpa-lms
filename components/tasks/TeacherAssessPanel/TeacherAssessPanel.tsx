import styles from './TeacherAssessPanel.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import { useCallback, useState } from 'react';
import { TeacherAssessForm } from '../TeacherAssessForm/TeacherAssessForm';
import { AssessValue } from '../../../schemas/assessSchema';

interface TeacherAssessPanelProps {}

export const TeacherAssessPanel = ({}: TeacherAssessPanelProps) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const openPanel = () => {
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      {isPanelOpen ? (
        <TeacherAssessForm closePanel={closePanel} />
      ) : (
        <CTAButton
          text="Assess"
          className={styles.assessButton}
          onClick={openPanel}
        />
      )}
      <div className={styles.nextTaskBar}>
        <p className={styles.tasksLeftText}>
          You have <strong>5 tasks</strong> to assess
        </p>
        <CTAButton
          className={styles.nextTaskButton}
          text="Next Task"
          styleType="secondary"
        />
      </div>
    </div>
  );
};
