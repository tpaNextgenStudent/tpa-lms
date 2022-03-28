import styles from './TaskDoneBadge.module.scss';
import TickIcon from '../../../public/tick-icon.svg';

interface TaskDoneBadgeProps {}

export const TaskDoneBadge = ({}: TaskDoneBadgeProps) => {
  return (
    <span className={styles.wrapper}>
      <span className={styles.svgWrapper}>
        <TickIcon />
      </span>
    </span>
  );
};
