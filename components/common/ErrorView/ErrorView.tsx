import styles from './ErrorView.module.scss';
import { CTAButton } from '../CTAButton/CTAButton';
import { HandleBold } from '../HandleBold/HandleBold';
import Image from 'next/image';
import BgStripesIcon from '../../../public/svg/bg-stripes.svg';
import Link from 'next/link';

interface ErrorViewProps {
  title: string;
  description: string;
  primaryButton?: { text: string; onClick: () => void };
  secondaryButton?: { text: string; onClick: () => void };
}

export const ErrorView = ({
  title,
  description,
  primaryButton,
  secondaryButton,
}: ErrorViewProps) => {
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
            />
          </a>
        </Link>
      </header>
      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>
            <HandleBold>{title}</HandleBold>
          </h1>
          <p className={styles.description}>
            <HandleBold>{description}</HandleBold>
          </p>
        </div>
        <div className={styles.buttonSection}>
          {(primaryButton || secondaryButton) && (
            <div className={styles.ctaButtonWrapper}>
              {primaryButton && (
                <CTAButton
                  onClick={primaryButton.onClick}
                  text={primaryButton.text}
                />
              )}
              {secondaryButton && (
                <CTAButton
                  styleType="secondary"
                  onClick={secondaryButton.onClick}
                  text={secondaryButton.text}
                />
              )}
            </div>
          )}
          <div className={styles.svgWrapper}>
            <BgStripesIcon />
          </div>
        </div>
      </main>
    </div>
  );
};
