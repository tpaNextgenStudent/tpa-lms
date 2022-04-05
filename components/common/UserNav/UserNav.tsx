import styles from './UserNav.module.scss';
import Image from 'next/image';
import ArrowDown from '../../../public/arrow-down.svg';
import Link from 'next/link';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useClickOutside } from '../../../lib/useClickOutside';
import { IUserDetails } from '../../../api/user';

interface UserNavProps {
  user: IUserDetails;
}

export const UserNav = ({ user }: UserNavProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenByClick, setIsDropdownOpenByClick] = useState(false);

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

  const fullName = `${user.name} ${user.surname}`;

  return (
    <div onMouseLeave={handleMouseLeave} className={styles.userWrapper}>
      <Image
        className={styles.userAvatar}
        width={40}
        height={40}
        src={user.image!}
        alt="Avatar"
      />
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
            <button className={styles.userNavLogoutButton}>Log out</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
