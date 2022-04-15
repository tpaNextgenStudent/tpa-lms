import Link from 'next/link';
import styles from './Sidebar.module.scss';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import TasksIcon from '../../../public/svg/tasks-icon.svg';
import ScoresIcon from '../../../public/svg/scores-icon.svg';
import ProgressIcon from '../../../public/svg/progress-icon.svg';
import CrossIcon from '../../../public/svg/cross-icon.svg';
import AssignmentsIcon from '../../../public/svg/assignments-icon.svg';
import CurriculumIcon from '../../../public/svg/curriculum-icon.svg';
import Image from 'next/image';
import { IUserDetails } from '../../../api/user';

const dashboardLinks = {
  teacher: [
    {
      path: '/teacher/assignments',
      label: 'Assignments',
      Icon: AssignmentsIcon,
    },
    {
      path: '/teacher/cohort/progress',
      label: 'Cohort Progress',
      Icon: ProgressIcon,
    },
    {
      path: '/teacher/curriculum',
      label: 'Curriculum',
      Icon: CurriculumIcon,
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
                src="/svg/tpa-logo.svg"
                alt="Tech Play Academy logo"
                objectFit="contain"
                width={208}
                height={20}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.sidebarContentWrapper}>
        {user.role === 'teacher' && (
          <span className={styles.cohortName}>{user.cohort_name}</span>
        )}
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
    </div>
  );
};
