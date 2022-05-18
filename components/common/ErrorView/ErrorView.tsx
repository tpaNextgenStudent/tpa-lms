import styles from './ErrorView.module.scss';
import { CTAButton } from '../CTAButton/CTAButton';
import Image from 'next/image';
import Link from 'next/link';
import { HandleBold } from '../HandleBold/HandleBold';
import { RobotBugAnimation } from '../RobotBugAnimation/RobotBugAnimation';

interface ErrorViewProps {
  description: string;
  title?: string;
  code?: number;
  button?: { text: string; onClick: () => void };
}

export const ErrorView = ({
  title = '*Oops!*',
  description,
  code,
  button,
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
        <h1 className={styles.title}>
          <span className={styles.titleIntro}>
            <HandleBold>{title}</HandleBold>
          </span>
          {code && <span className={styles.titleCode}>{404}</span>}
          <span className={styles.titleContent}>
            <HandleBold>{description}</HandleBold>
          </span>
        </h1>
        <RobotBugAnimation />
        {button && (
          <div className={styles.buttonWrapper}>
            <CTAButton text={button.text} onClick={button.onClick} />
          </div>
        )}
      </main>
    </div>
  );
};
