import Link from 'next/link';
import styles from './Sidebar.module.scss';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const dashboardLinks = [
  { path: '/', label: 'Dashboard' },
  { path: '/tasks', label: 'My Tasks' },
  { path: '/scores', label: 'My Scores' },
  { path: '/placeholder', label: 'Placeholder' },
];

export const Sidebar = () => {
  const { pathname: currentPath } = useRouter();
  return (
    <div className={styles.sideBarWrapper}>
      <Link href="/">
        <a className={styles.logoWrapper}>
          <img
            src="https://unsplash.it/250/100"
            alt="Logo"
            className={styles.logo}
          />
        </a>
      </Link>
      <nav className={styles.navWrapper}>
        <ul className={styles.navList}>
          {dashboardLinks.map(({ path, label }) => (
            <li key={path} className={styles.navItem}>
              <Link href={path}>
                <a
                  className={clsx(
                    styles.navLink,
                    path === currentPath && styles.navLinkActive
                  )}
                >
                  <span className={styles.linkIcon} aria-hidden={true} />
                  <span className={styles.linkText}>{label}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
