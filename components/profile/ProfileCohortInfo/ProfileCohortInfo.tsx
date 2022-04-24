import styles from './ProfileCohortInfo.module.scss';
import clsx from 'clsx';
import Link from 'next/link';

interface ProfileCohortInfoProps {
  name: string;
  numberOfStudents: number;
  progressLink?: string;
}

export const ProfileCohortInfo = ({
  name,
  numberOfStudents,
  progressLink,
}: ProfileCohortInfoProps) => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.header}>Cohort</h2>
      <table className={styles.table}>
        <tr className={styles.tr}>
          <th className={styles.th}>Cohort name</th>
          <th className={styles.th}>Number of students</th>
          {progressLink && <th className={styles.th} />}
        </tr>
        <tr className={styles.tr}>
          <td className={clsx(styles.td, styles.cohortName)}>{name}</td>
          <td className={styles.td}>{numberOfStudents}</td>
          {progressLink && (
            <td className={styles.td}>
              <Link href={progressLink}>
                <a className={styles.progressLink}>Go to cohort progress</a>
              </Link>
            </td>
          )}
        </tr>
      </table>
    </section>
  );
};
