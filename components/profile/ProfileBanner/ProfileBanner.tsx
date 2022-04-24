import styles from './ProfileBanner.module.scss';
import Image from 'next/image';

interface ProfileBannerProps {}

export const ProfileBanner = ({}: ProfileBannerProps) => {
  return (
    <div data-cypress="ProfileBanner" className={styles.bannerWrapper}>
      <Image
        src="/profile-code-bg.png"
        width={208}
        height={121}
        layout="fixed"
        alt=""
        objectFit="contain"
      />
    </div>
  );
};
