import { ReactNode } from 'react';
import Image from 'next/image';
import styles from './LoginLayout.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import clsx from 'clsx';
import Head from 'next/head';
import appScreenImg from '../../../public/img/app_screen.png';
import loginBgImg from '../../../public/img/login-bg.png';
import SvgLogo from '../../../public/svg/tpa-logo.svg';

interface LoginLayoutProps {
  children: ReactNode;
  fixedButton?: { text: string; onClick: () => void };
  title: string;
}

export const LoginLayout = ({
  children,
  fixedButton,
  title,
}: LoginLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.pageWrapper}>
        {fixedButton && (
          <div className={styles.fixedButtonWrapper}>
            <CTAButton text={fixedButton.text} onClick={fixedButton.onClick} />
          </div>
        )}
        <div className={styles.contentBackgroundWrapper}>
          <div className={styles.contentWrapper}>
            <header className={styles.header}>
              <div
                className={styles.logoWrapper}
                role="img"
                aria-label="Tech Play Academy Logo"
              >
                <SvgLogo />
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
                src={appScreenImg}
                priority
                placeholder="blur"
                width={547}
                height={389}
                className={styles.image}
                alt="Screen of Tech Play Academy LMS app"
              />
            </div>
          </section>
          <div className={styles.bgImgWrapper} aria-hidden>
            <Image
              src={loginBgImg}
              priority
              placeholder="blur"
              layout="responsive"
              height={420}
              width={720}
              alt=""
              quality={100}
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};
