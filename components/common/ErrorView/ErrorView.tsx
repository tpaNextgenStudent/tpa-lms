import styles from './ErrorView.module.scss';
import { CTAButton } from '../CTAButton/CTAButton';
import Link from 'next/link';
import { HandleBold } from '../HandleBold/HandleBold';
import { RobotBugAnimation } from '../RobotBugAnimation/RobotBugAnimation';
import Head from 'next/head';
import SvgLogo from '../../../public/svg/tpa-logo.svg';

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
    <>
      <Head>
        <title>TPA | Error {code && `- ${code}`}</title>
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
    </>
  );
};
