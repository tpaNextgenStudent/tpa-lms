import styles from './ProfileBanner.module.scss';
import Image from 'next/image';

interface ProfileBannerProps {}

export const ProfileBanner = ({}: ProfileBannerProps) => {
  return (
    <div data-cypress="ProfileBanner" className={styles.bannerWrapper}>
      <Image
        src="/img/profile-code-bg.png"
        layout="fill"
        alt=""
        objectFit="cover"
        quality={100}
      />
    </div>
  );
};
