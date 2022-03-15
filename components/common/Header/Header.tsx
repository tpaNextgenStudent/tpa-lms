import styles from './Header.module.scss';
import { User } from '../../../lib/utils/types';
import ArrowDown from '../../../public/arrow-down.svg';
import MenuIcon from '../../../public/menu-icon.svg';
import Image from 'next/image';

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
  const fullName = `${user.firstname} ${user.lastname}`;
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
      <div className={styles.userWrapper}>
        <Image
          className={styles.userAvatar}
          width={40}
          height={40}
          src={user.image!}
          alt="Avatar"
        />
        <p className={styles.userName}>{fullName}</p>
        <span className={styles.settingsIcon} aria-hidden>
          <ArrowDown />
        </span>
      </div>
    </header>
  );
};
