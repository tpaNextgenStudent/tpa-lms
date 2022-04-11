import styles from './ProfileCohortInfo.module.scss';

interface ProfileCohortInfoProps {
  name: string;
  numberOfStudents: number;
}

export const ProfileCohortInfo = ({
  name,
  numberOfStudents,
}: ProfileCohortInfoProps) => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.header}>Cohort</h2>
      <table className={styles.table}>
        <tr className={styles.tr}>
          <th className={styles.th}>Cohort name</th>
          <th className={styles.th}>Number of students</th>
        </tr>
        <tr className={styles.tr}>
          <td className={styles.td}>{name}</td>
          <td className={styles.td}>{numberOfStudents}</td>
        </tr>
      </table>
    </section>
  );
};
