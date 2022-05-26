import { ReactNode, useCallback, useState } from 'react';
import styles from './Layout.module.scss';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { IUserDetails } from '../../../apiHelpers/user';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  user: IUserDetails;
  headerTitle: string;
  title: string;
  titleTemplate?: string;
  headerDescription?: string;
  actionsNumber?: number;
  withHeaderPrevButton?: boolean;
  parentPage?: { title: string; link: string };
}

export const Layout = ({
  children,
  user,
  headerTitle,
  title,
  titleTemplate = 'TPA | {title}',
  headerDescription,
  actionsNumber,
  withHeaderPrevButton = false,
  parentPage,
}: LayoutProps) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const openMobileNav = useCallback(() => {
    setIsMobileNavOpen(true);
  }, []);

  const closeMobileNav = useCallback(() => {
    setIsMobileNavOpen(false);
  }, []);

  const titleToShow = titleTemplate.replace(/{title}/g, title);

  return (
    <>
      <Head>
        <title>{titleToShow}</title>
      </Head>
      <div className={styles.wrapper}>
        <Sidebar
          closeMobileNav={closeMobileNav}
          isMobileNavOpen={isMobileNavOpen}
          role={user.role}
          cohortName={user.cohort_name}
        />
        <div className={styles.mainWrapper}>
          <Header
            parentPage={parentPage}
            withPrevButton={withHeaderPrevButton}
            openMobileNav={openMobileNav}
            title={headerTitle}
            description={headerDescription}
            user={user}
            actionsNumber={actionsNumber}
          />
          <div className={styles.contentWrapper}>{children}</div>
        </div>
      </div>
    </>
  );
};
