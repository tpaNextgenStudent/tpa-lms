import { ReactNode } from 'react';
import Image from 'next/image';
import styles from './LoginLayout.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';

interface LoginLayoutProps {
  children: ReactNode;
  headerButton?: { text: string; onClick: () => void };
}

export const LoginLayout = ({ children, headerButton }: LoginLayoutProps) => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <Image
            src="/tpa_logo.svg"
            alt="Tech Play Academy Logo"
            width={208}
            height={20}
          />
        </div>
        {headerButton && (
          <CTAButton text={headerButton.text} onClick={headerButton.onClick} />
        )}
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
