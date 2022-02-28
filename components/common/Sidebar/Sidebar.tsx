import Link from 'next/link';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <div className={styles.sideBarWrapper}>
      <Link href="/">
        <a className={styles.logoWrapper}>
          <img src="" alt="Logo" />
        </a>
      </Link>
      <button className={styles.contactButton}>Contact with buddy</button>
      <nav className={styles.navWrapper}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/">
              <a className={styles.navLink}>Dashboard</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/">
              <a className={styles.navLink}>My Tasks</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/">
              <a className={styles.navLink}>My Scores</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/">
              <a className={styles.navLink}>Placeholder</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
