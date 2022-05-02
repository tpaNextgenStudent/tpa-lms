import styles from '../components/notFoundPage/notFoundPage.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { CTAButton } from '../components/common/CTAButton/CTAButton';
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();
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
          <span className={styles.titleIntro}>Oops!</span>
          <span className={styles.titleCode}>404</span>
          <span className={styles.titleContent}>Something went wrong</span>
        </h1>
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
        <div className={styles.buttonWrapper}>
          <CTAButton
            text="Back to home page"
            onClick={() => {
              router.push('/');
            }}
          />
        </div>
      </main>
    </div>
  );
}
