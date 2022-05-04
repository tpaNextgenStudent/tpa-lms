import styles from './UserNav.module.scss';
import Image from 'next/image';
import ArrowDown from '../../../public/svg/arrow-down.svg';
import Link from 'next/link';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useClickOutside } from '../../../lib/hooks/useClickOutside';
import { IUserDetails } from '../../../apii/user';
import { signOut } from 'next-auth/react';
import { useIsLoading } from '../../../lib/hooks/loadingContext';

interface UserNavProps {
  user: IUserDetails;
}

export const UserNav = ({ user }: UserNavProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenByClick, setIsDropdownOpenByClick] = useState(false);
  const { setIsLoading } = useIsLoading();

  const handleClickOutside = () => {
    setIsDropdownOpenByClick(false);
  };

  useClickOutside(buttonRef, handleClickOutside);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleClick = () => {
    setIsDropdownOpenByClick(prev => !prev);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleBlur = () => {
    setIsDropdownOpen(false);
  };

  const handleLogoutClick = async () => {
    setIsLoading(true);
    await signOut();
  };

  const fullName = [user.name, user.surname].filter(n => !!n).join(' ');

  return (
    <div
      data-cypress="UserNav"
      onMouseLeave={handleMouseLeave}
      className={styles.userWrapper}
    >
      {user.image && (
        <div className={styles.userAvatar}>
          <Image
            className={styles.userAvatar}
            width={40}
            height={40}
            layout="fixed"
            src={user.image!}
            alt="Avatar"
          />
        </div>
      )}
      <p className={styles.userName}>{fullName}</p>
      <button
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className={styles.settingsIcon}
        aria-hidden
      >
        <ArrowDown />
      </button>
      <div
        className={clsx(
          styles.userNavDropdown,
          (isDropdownOpenByClick || isDropdownOpen) &&
            styles.userNavDropdownOpen
        )}
      >
        <ul
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.userNavList}
        >
          <li className={styles.userNavListItem}>
            <Link href="/profile">
              <a className={styles.userNavLink}>My profile</a>
            </Link>
          </li>
          <li className={styles.userNavListItem}>
            <button
              onClick={handleLogoutClick}
              className={styles.userNavLogoutButton}
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
