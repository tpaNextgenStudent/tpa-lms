import styles from './TaskNav.module.scss';
import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';

interface TaskNavProps {
  setIsDescriptionView: Dispatch<SetStateAction<boolean>>;
  isDescriptionView: boolean;
}

export const TaskNav = ({
  isDescriptionView,
  setIsDescriptionView,
}: TaskNavProps) => {
  return (
    <div className={styles.taskNav}>
      <button
        onClick={() => setIsDescriptionView(true)}
        className={clsx(
          styles.taskNavButton,
          isDescriptionView && styles.taskNavButtonActive
        )}
      >
        Description
      </button>
      <button
        onClick={() => setIsDescriptionView(false)}
        className={clsx(
          styles.taskNavButton,
          !isDescriptionView && styles.taskNavButtonActive
        )}
      >
        Comments
      </button>
    </div>
  );
};
