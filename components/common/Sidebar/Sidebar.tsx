import Link from 'next/link';
import styles from './Sidebar.module.scss';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import TasksIcon from '../../../public/tasks-icon.svg';
import ScoresIcon from '../../../public/scores-icon.svg';
import ProgressIcon from '../../../public/progress-icon.svg';
import CrossIcon from '../../../public/cross-icon.svg';
import Image from 'next/image';
import { IUserDetails } from '../../../api/user';

const dashboardLinks = {
  teacher: [
    { path: '/teacher/assignments', label: 'Assignments', Icon: TasksIcon },
    {
      path: '/teacher/cohort/progress',
      label: 'Cohort Progress',
      Icon: ProgressIcon,
    },
    {
      path: '/teacher/curriculum',
      label: 'Curriculum',
      Icon: ScoresIcon,
    },
  ],
  student: [
    { path: '/student/tasks', label: 'My Tasks', Icon: TasksIcon },
    {
      path: '/student/scores',
      label: 'My Scores',
      Icon: ScoresIcon,
    },
    {
      path: '/student/cohort/progress',
      label: 'Cohort Progress',
      Icon: ProgressIcon,
    },
  ],
};

interface SidebarProps {
  closeMobileNav: () => void;
  isMobileNavOpen: boolean;
  user: IUserDetails;
  cohortName?: string;
}

export const Sidebar = ({
  closeMobileNav,
  isMobileNavOpen,
  user,
  cohortName,
}: SidebarProps) => {
  const { pathname: currentPath } = useRouter();
  return (
    <div
      className={clsx(
        styles.sideBarWrapper,
        isMobileNavOpen && styles.sideBarWrapperOpen
      )}
    >
      <div className={styles.logoCloseWrapper}>
        <div className={styles.closeButtonWrapper}>
          <button
            className={styles.mobileNavClose}
            onClick={closeMobileNav}
            aria-label="Close menu"
          >
            <CrossIcon />
          </button>
        </div>
        <div className={styles.logoLinkWrapper}>
          <Link href="/">
            <a className={styles.logoLink}>
              <Image
                src="/tpa_logo.svg"
                alt="Tech Play Academy logo"
                objectFit="contain"
                width={208}
                height={20}
              />
            </a>
          </Link>
        </div>
      </div>
      {cohortName && <span className={styles.cohortName}>{cohortName}</span>}
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
    </div>
  );
};
