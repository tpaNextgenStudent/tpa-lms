import styles from './Header.module.scss';
import { User } from '../../../lib/utils/types';
import ArrowDown from '../../../public/arrow-down.svg';
import MenuIcon from '../../../public/menu-icon.svg';
import Image from 'next/image';
import { UserNav } from '../UserNav/UserNav';

interface HeaderProps {
  title: string;
  description?: string;
  actionsNumber?: number;
  user: User;
  openMobileNav: () => void;
}

export const Header = ({
  title,
  user,
  openMobileNav,
  description,
  actionsNumber,
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
          <h1 className={styles.title}>{title}</h1>
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
