import { ReactNode } from 'react';
import styles from './Layout.module.scss';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { User } from '../../../lib/mocks';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  user: User;
}

export const Layout = ({ children, user }: LayoutProps) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.wrapper}>
        <Sidebar />
        <div className={styles.mainWrapper}>
          <Header title={'My Tasks'} user={user} />
          <div className={styles.contentWrapper}>{children}</div>
        </div>
      </div>
    </>
  );
};
