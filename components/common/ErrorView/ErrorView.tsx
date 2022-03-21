import styles from './ErrorView.module.scss';
import { CTAButton } from '../CTAButton/CTAButton';
import { HandleBold } from '../HandleBold/HandleBold';
import Image from 'next/image';
import BgStripesIcon from '../../../public/bg_stripes.svg';

interface ErrorViewProps {
  title: string;
  description: string;
  button?: { text: string; onClick: () => void };
}

export const ErrorView = ({ title, description, button }: ErrorViewProps) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <Image
            src="/tpa_logo.svg"
            alt="Tech Play Academy Logo"
            width={208}
            height={20}
          />
        </div>
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
          {button && (
            <div className={styles.ctaButtonWrapper}>
              <CTAButton onClick={button.onClick} text={button.text} />
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
