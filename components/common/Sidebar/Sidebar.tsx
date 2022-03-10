import Link from 'next/link';
import styles from './Sidebar.module.scss';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import TasksIcon from '../../../public/tasks-icon.svg';
import ScoresIcon from '../../../public/scores-icon.svg';
import ProgressIcon from '../../../public/progress-icon.svg';
import CrossIcon from '../../../public/cross-icon.svg';
import Image from 'next/image';
import { User } from '../../../lib/utils/types';

const dashboardLinks = {
  teacher: [
    { path: '/assignments', label: 'Assignments', Icon: TasksIcon },
    {
      path: '/cohort/progress',
      label: 'Cohort Progress',
      Icon: ProgressIcon,
    },
    {
      path: '/curriculum',
      label: 'Curriculum',
      Icon: ScoresIcon,
    },
  ],
  student: [
    { path: '/tasks', label: 'My Tasks', Icon: TasksIcon },
    {
      path: '/scores',
      label: 'My Scores',
      Icon: ScoresIcon,
    },
    {
      path: '/cohort/progress',
      label: 'Cohort Progress',
      Icon: ProgressIcon,
    },
  ],
};

interface SidebarProps {
  closeMobileNav: () => void;
  isMobileNavOpen: boolean;
  user: User;
}

export const Sidebar = ({
  closeMobileNav,
  isMobileNavOpen,
  user,
}: SidebarProps) => {
  const { pathname: currentPath } = useRouter();
  return (
    <div
      className={clsx(
        styles.sideBarWrapper,
        isMobileNavOpen && styles.sideBarWrapperOpen
      )}
    >
      <div className={styles.logoLinkWrapper}>
        <Link href="/">
          <a className={styles.logoLink}>
            <Image
              className={styles.logo}
              src="/tpa_logo.svg"
              alt="Tech Play Academy logo"
              objectFit="contain"
              width={208}
              height={20}
            />
          </a>
        </Link>
      </div>
      <nav className={styles.navWrapper}>
        <ul className={styles.navList}>
          {dashboardLinks[user.role].map(({ path, label, Icon }) => (
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
