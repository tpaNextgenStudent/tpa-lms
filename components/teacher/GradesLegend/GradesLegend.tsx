import styles from './GradesLegend.module.scss';
import { GradeCell } from '../../common/tables/GradeCell/GradeCell';

interface GradesLegendProps {}

export const GradesLegend = ({}: GradesLegendProps) => {
  return (
    <section className={styles.wrapper}>
      <p className={styles.legendItem}>
        <span>Number of attempts</span>
        <span className={styles.attempts}>1,2,3...</span>
      </p>
      <p className={styles.legendItem}>
        <span>Pass</span>
        <GradeCell
          grade={{ status: 'approved', attempt_number: 0, score: 2 }}
          isEmpty
        />
        <GradeCell
          grade={{ status: 'approved', attempt_number: 0, score: 3 }}
          isEmpty
        />
      </p>
      <p className={styles.legendItem}>
        <span>Failed</span>
        <GradeCell
          grade={{ status: 'approved', attempt_number: 0, score: 1 }}
          isEmpty
        />
      </p>
      <p className={styles.legendItem}>
        <span>Info task</span>
        <GradeCell
          grade={{ status: 'approved', attempt_number: 0, score: null }}
          isEmpty
        />
      </p>
      <p className={styles.legendItem}>
        <span>Waiting for assessment</span>
        <GradeCell
          grade={{ status: 'in review', attempt_number: 0, score: null }}
        />
      </p>
      <p className={styles.legendItem}>
        <span>Upcoming</span>
        <GradeCell
          grade={{ status: 'upcoming', attempt_number: 0, score: null }}
        />
      </p>
    </section>
  );
};
