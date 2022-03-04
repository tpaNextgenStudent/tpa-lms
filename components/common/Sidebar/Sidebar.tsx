import Link from 'next/link';
import styles from './Sidebar.module.scss';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Logo from '../../../public/logo.svg';
import TasksIcon from '../../../public/tasks-icon.svg';
import ScoresIcon from '../../../public/scores-icon.svg';
import ProgressIcon from '../../../public/progress-icon.svg';
import CrossIcon from '../../../public/cross-icon.svg';

const dashboardLinks = [
  { path: '/tasks', label: 'My Tasks', Icon: TasksIcon },
  { path: '/scores', label: 'My Scores', Icon: ScoresIcon },
  { path: '/cohort', label: 'Cohort Progress', Icon: ProgressIcon },
];

interface SidebarProps {
  closeMobileNav: () => void;
  isMobileNavOpen: boolean;
}

export const Sidebar = ({ closeMobileNav, isMobileNavOpen }: SidebarProps) => {
  const { pathname: currentPath } = useRouter();
  return (
    <div
      className={clsx(
        styles.sideBarWrapper,
        isMobileNavOpen && styles.sideBarWrapperOpen
      )}
    >
      <Link href="/">
        <a className={styles.logoLink}>
          <span className={styles.logoWrapper}>
            <Logo />
          </span>
        </a>
      </Link>
      <nav className={styles.navWrapper}>
        <ul className={styles.navList}>
          {dashboardLinks.map(({ path, label, Icon }) => (
            <li key={path} className={styles.navItem}>
              <Link href={path}>
                <a
                  className={clsx(
                    styles.navLink,
                    currentPath.includes(path) && styles.navLinkActive
                  )}
                >
                  <span className={styles.linkIcon} aria-hidden={true}>
                    <Icon />
                  </span>
                  <span className={styles.linkText}>{label}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.closeButtonWrapper}>
        <button
          className={styles.mobileNavClose}
          onClick={closeMobileNav}
          aria-label="Close menu"
        >
          <CrossIcon />
        </button>
      </div>
    </div>
  );
};
