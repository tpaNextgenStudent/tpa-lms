import styles from './LockedTaskInfo.module.scss';
import { TaskLockBadge } from '../TaskLockBadge/TaskLockBadge';
import { randomFromRange } from '../../../utils/randomFromRange';

interface LockedTaskInfoProps {
  content: string;
}

export const LockedTaskInfo = ({ content }: LockedTaskInfoProps) => {
  return (
    <>
      <p className={styles.wrapper}>
        <TaskLockBadge />
        <span className={styles.content}>{content}</span>
      </p>
      <div className={styles.lines} aria-hidden>
        {Array(5)
          .fill(null)
          .map((_, i) => {
            const width = randomFromRange(250, 720);
            return (
              <div
                className={styles.line}
                style={{ ['--width' as string]: `${width}px` }}
                key={i}
              />
            );
          })}
      </div>
    </>
  );
};
