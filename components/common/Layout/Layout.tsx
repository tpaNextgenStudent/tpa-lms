import { ReactNode } from 'react';
import styles from './Layout.module.scss';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { User } from '../../../lib/mocks';

interface LayoutProps {
  children: ReactNode;
  user: User;
}

export const Layout = ({ children, user }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.mainWrapper}>
        <Header title={'My Tasks'} user={user} />
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    </div>
  );
};
