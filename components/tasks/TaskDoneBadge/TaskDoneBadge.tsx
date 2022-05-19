import styles from './TaskDoneBadge.module.scss';
import TickIcon from '../../../public/svg/tick-icon.svg';
import clsx from 'clsx';

interface TaskDoneBadgeProps {
  withBorder?: boolean;
}

export const TaskDoneBadge = ({ withBorder = false }: TaskDoneBadgeProps) => {
  return (
    <span
      data-cypress="TaskScoreBadge"
      className={clsx(styles.wrapper, withBorder && styles.wrapperWithBorder)}
    >
      <span className={styles.svgWrapper}>
        <TickIcon />
      </span>
    </span>
  );
};
