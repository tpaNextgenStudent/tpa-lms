import { ReactNode } from 'react';
import Image from 'next/image';
import styles from './LoginLayout.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import BgStripesIcon from '../../../public/svg/bg-stripes.svg';
import clsx from 'clsx';

interface LoginLayoutProps {
  children: ReactNode;
  fixedButton?: { text: string; onClick: () => void };
}

export const LoginLayout = ({ children, fixedButton }: LoginLayoutProps) => {
  return (
    <div className={styles.pageWrapper}>
      {fixedButton && (
        <div className={styles.fixedButtonWrapper}>
          <CTAButton text={fixedButton.text} onClick={fixedButton.onClick} />
        </div>
      )}
      <div className={styles.contentBackgroundWrapper}>
        <div className={styles.contentWrapper}>
          <header className={styles.header}>
            <div className={styles.logoWrapper}>
              <Image
                src="/svg/tpa-logo.svg"
                alt="Tech Play Academy Logo"
                width={208}
                height={20}
              />
            </div>
          </header>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
      <div className={styles.imageSectionBackgroundWrapper}>
        <section
          className={clsx(
            styles.imageSection,
            fixedButton && styles.imageSectionWithFixedButton
          )}
        >
          <div className={styles.imageWrapper}>
            <Image
              layout="responsive"
              src={'/app_screen.png'}
              width={547}
              height={389}
              className={styles.image}
              alt="Screen of Tech Play Academy LMS app"
            />
          </div>
          <div className={styles.svgOverflowWrapper}>
            <div className={styles.svgWrapper} aria-hidden>
              <BgStripesIcon />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
