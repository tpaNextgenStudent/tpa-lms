import { ReactNode } from 'react';
import Image from 'next/image';
import styles from './LoginLayout.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import BgStripesIcon from '../../../public/bg_stripes.svg';

interface LoginLayoutProps {
  children: ReactNode;
  headerButton?: { text: string; onClick: () => void };
}

export const LoginLayout = ({ children, headerButton }: LoginLayoutProps) => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
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
            <CTAButton
              text={headerButton.text}
              onClick={headerButton.onClick}
            />
          )}
        </header>
        <main className={styles.main}>{children}</main>
      </div>
      <section className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          <Image
            layout="responsive"
            src={'/app_screen.png'}
            width={547}
            height={389}
            className={styles.image}
          />
        </div>
        <div className={styles.svgWrapper} aria-hidden>
          <BgStripesIcon />
        </div>
      </section>
    </div>
  );
};
