import styles from './InfoView.module.scss';
import { CTAButton } from '../CTAButton/CTAButton';
import Image from 'next/image';
import Link from 'next/link';
import { HandleBold } from '../HandleBold/HandleBold';
import { Fragment, ReactNode } from 'react';

interface InfoViewProps {
  description: string;
  title: string | string[];
  button?: { text: string; onClick: () => void };
  children?: ReactNode;
}

export const InfoView = ({
  title,
  description,
  button,
  children,
}: InfoViewProps) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logoWrapper} aria-label="Home page link">
            <Image
              src="/svg/tpa-logo.svg"
              alt="Tech Play Academy Logo"
              width={208}
              height={20}
              layout="fixed"
            />
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
  );
};
