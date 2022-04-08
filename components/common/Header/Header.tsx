import styles from './Header.module.scss';
import { IUserDetails } from '../../../api/user';
import ArrowLeftIcon from '../../../public/arrow-left.svg';
import MenuIcon from '../../../public/menu-icon.svg';
import { UserNav } from '../UserNav/UserNav';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  description?: string;
  actionsNumber?: number;
  user: IUserDetails;
  openMobileNav: () => void;
  prevButton?: { pageName: string; pageLink: string };
}

export const Header = ({
  title,
  user,
  openMobileNav,
  description,
  actionsNumber,
  prevButton,
}: HeaderProps) => {
  return (
    <header className={styles.headerWrapper}>
      <button
        onClick={openMobileNav}
        className={styles.mobileBurgerMenuButton}
        aria-label={'Open menu'}
      >
        <MenuIcon />
      </button>
      <div className={styles.textWrapper}>
        <div className={styles.titleWrapper}>
          {prevButton && (
            <Link href={prevButton.pageLink} aria-label="Go back">
              <a className={styles.prevLink}>
                <ArrowLeftIcon />
              </a>
            </Link>
          )}
          <h1 className={styles.title}>
            {prevButton && (
              <span className={styles.titlePrevPage}>
                {prevButton.pageName}
              </span>
            )}
            <span>{title}</span>
          </h1>
          {actionsNumber && (
            <span className={styles.actionsNumber}>{actionsNumber}</span>
          )}
        </div>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <UserNav user={user} />
    </header>
  );
};
