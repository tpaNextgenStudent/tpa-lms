import { ReactNode, useCallback, useState } from 'react';
import styles from './Layout.module.scss';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { User } from '../../../lib/utils/types';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  user: User;
  title: string;
  description?: string;
  actionsNumber?: number;
  cohortName?: string;
}

export const Layout = ({
  children,
  user,
  title,
  description,
  actionsNumber,
  cohortName,
}: LayoutProps) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const openMobileNav = useCallback(() => {
    setIsMobileNavOpen(true);
  }, []);

  const closeMobileNav = useCallback(() => {
    setIsMobileNavOpen(false);
  }, []);
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.wrapper}>
        <Sidebar
          closeMobileNav={closeMobileNav}
          isMobileNavOpen={isMobileNavOpen}
          user={user}
          cohortName={cohortName}
        />
        <div className={styles.mainWrapper}>
          <Header
            openMobileNav={openMobileNav}
            title={title}
            description={description}
            user={user}
            actionsNumber={actionsNumber}
          />
          <div className={styles.contentWrapper}>{children}</div>
        </div>
      </div>
    </>
  );
};
