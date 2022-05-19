import styles from './InfoView.module.scss';
import { CTAButton } from '../CTAButton/CTAButton';
import Image from 'next/image';
import Link from 'next/link';
import { HandleBold } from '../HandleBold/HandleBold';
import { Fragment, ReactNode } from 'react';
import Head from 'next/head';
import SvgLogo from '../../../public/svg/tpa-logo.svg';

interface InfoViewProps {
  description: string;
  title: string | string[];
  tabTitle: string;
  button?: { text: string; onClick: () => void };
  children?: ReactNode;
}

export const InfoView = ({
  title,
  tabTitle,
  description,
  button,
  children,
}: InfoViewProps) => {
  return (
    <>
      <Head>
        <title>TPA | {tabTitle}</title>
      </Head>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Link href="/">
            <a
              className={styles.logoWrapper}
              aria-label="Tech Play Academy Logo"
            >
              <SvgLogo />
            </a>
          </Link>
        </header>
        <main className={styles.main}>
          <h1 className={styles.title}>
            {Array.isArray(title) ? (
              title.map(line => (
                <Fragment key={line}>
                  <HandleBold>{line}</HandleBold>
                  <br />
                </Fragment>
              ))
            ) : (
              <HandleBold>{title}</HandleBold>
            )}
          </h1>
          <p className={styles.description}>
            <HandleBold>{description}</HandleBold>
          </p>
          <div className={styles.imageWrapper}>
            <Image
              src="/img/not-found-robot.png"
              alt=""
              width={285}
              height={257}
              layout="responsive"
              quality={100}
            />
          </div>
          {children}
          {button && (
            <div className={styles.buttonWrapper}>
              <CTAButton text={button.text} onClick={button.onClick} />
            </div>
          )}
        </main>
      </div>
    </>
  );
};
