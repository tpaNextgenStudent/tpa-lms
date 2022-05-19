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
    <section data-cypress="ProfileCohortInfo" className={styles.wrapper}>
      <h2 className={styles.header}>Cohort</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Cohort name</th>
            <th className={styles.th}>Number of students</th>
            {progressLink && <th className={styles.th} />}
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tr}>
            <td
              data-cypress="ProfileCohortName"
              className={clsx(styles.td, styles.cohortName)}
            >
              {name}
            </td>
            <td data-cypress="ProfileCohortNumOfStudents" className={styles.td}>
              {numberOfStudents}
            </td>
            {progressLink && (
              <td className={styles.td}>
                <Link href={progressLink}>
                  <a
                    data-cypress="ProfileCohortProgressLink"
                    className={styles.progressLink}
                  >
                    Go to cohort progress
                  </a>
                </Link>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </section>
  );
};
