import styles from './Header.module.scss';

interface HeaderProps {
  title: string;
  user: { name: string };
}

export const Header = ({ title, user }: HeaderProps) => {
  return (
    <header className={styles.headerWrapper}>
      <h1 className={styles.title}>{title}</h1>
      <button className={styles.bell}>bell</button>
      <div className={styles.userWrapper}>
        <img className={styles.userAvatar} src="" alt="Avatar" />
        <p className={styles.userName}>{user.name}</p>
      </div>
    </header>
  );
};
