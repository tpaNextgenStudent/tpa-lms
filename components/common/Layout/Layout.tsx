import { ReactNode, useCallback, useState } from 'react';
import styles from './Layout.module.scss';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { IUserDetails } from '../../../api/user';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  user: IUserDetails;
  title: string;
  description?: string;
  actionsNumber?: number;
  cohortName?: string;
  headerPrevButton?: { pageName: string; pageLink: string };
}

export const Layout = ({
  children,
  user,
  title,
  description,
  actionsNumber,
  cohortName,
  headerPrevButton,
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
        <title>{title}</title>
      </Head>
      <div className={styles.wrapper}>
        <Sidebar
          closeMobileNav={closeMobileNav}
          isMobileNavOpen={isMobileNavOpen}
          user={user}
        />
        <div className={styles.mainWrapper}>
          <Header
            prevButton={headerPrevButton}
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
