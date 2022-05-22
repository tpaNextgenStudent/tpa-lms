import styles from './GradesLegend.module.scss';
import { GradeCell } from '../../common/tables/GradeCell/GradeCell';
import clsx from 'clsx';

interface GradesLegendProps {
  className?: string;
}

export const GradesLegend = ({ className }: GradesLegendProps) => {
  return (
    <section
      data-cypress="GradesLegend"
      className={clsx(styles.wrapper, className)}
    >
      <p className={styles.legendItem}>
        <span>Number of attempts</span>
        <span className={styles.attempts}>1,2,3...</span>
      </p>
      <p className={styles.legendItem}>
        <span>Pass</span>
        <GradeCell grade={{ status: 'approved', score: 2 }} />
        <GradeCell grade={{ status: 'approved', score: 3 }} />
      </p>
      <p className={styles.legendItem}>
        <span>Failed</span>
        <GradeCell grade={{ status: 'approved', score: 1 }} />
      </p>
      <p className={styles.legendItem}>
        <span>Info task</span>
        <GradeCell grade={{ status: 'approved', score: null }} />
      </p>
      <p className={styles.legendItem}>
        <span>Waiting for assessment</span>
        <GradeCell grade={{ status: 'in review', score: null }} />
      </p>
      <p className={styles.legendItem}>
        <span>Upcoming</span>
        <GradeCell grade={{ status: 'upcoming', score: null }} />
      </p>
    </section>
  );
};
