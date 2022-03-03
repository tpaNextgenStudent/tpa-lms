import styles from './Header.module.scss';
import { User } from '../../../lib/mocks';
import ArrowDown from '../../../public/arrow-down.svg';

interface HeaderProps {
  title: string;
  user: User;
}

export const Header = ({ title, user }: HeaderProps) => {
  const fullName = `${user.firstname} ${user.lastname}`;
  return (
    <header className={styles.headerWrapper}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.userWrapper}>
        <img className={styles.userAvatar} src={user.image} alt="Avatar" />
        <p className={styles.userName}>{fullName}</p>
        <span className={styles.settingsIcon} aria-hidden>
          <ArrowDown />
        </span>
      </div>
    </header>
  );
};
