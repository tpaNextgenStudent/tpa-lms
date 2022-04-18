import styles from './Header.module.scss';
import { IUserDetails } from '../../../api/user';
import ArrowLeftIcon from '../../../public/svg/arrow-left.svg';
import MenuIcon from '../../../public/svg/menu-icon.svg';
import { UserNav } from '../UserNav/UserNav';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  description?: string;
  actionsNumber?: number;
  user: IUserDetails;
  openMobileNav: () => void;
  withPrevButton: boolean;
  parentPage?: { title: string; link: string };
}

export const Header = ({
  title,
  user,
  openMobileNav,
  description,
  actionsNumber,
  withPrevButton,
  parentPage,
}: HeaderProps) => {
  const { back } = useRouter();
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
          {withPrevButton && (
            <button
              className={styles.prevLink}
              onClick={back}
              aria-label="Go back"
            >
              <ArrowLeftIcon />
            </button>
          )}
          <h1 className={styles.title}>
            {parentPage && (
              <Link href={parentPage.link}>
                <a className={styles.titlePrevPage}>{parentPage.title}</a>
              </Link>
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
