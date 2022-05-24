import styles from './ProfileUserInfo.module.scss';
import Image from 'next/image';
import GhIcon from '../../../public/svg/gh-icon.svg';
import dayjs from 'dayjs';
import { GithubNameLink } from '../../common/GithubNameLink/GithubNameLink';

interface ProfileUserInfoProps {
  name: string;
  login: string;
  avatar: string | null;
  bio: string | null;
  joinDate?: string;
}

export const ProfileUserInfo = ({
  name,
  login,
  avatar,
  bio,
  joinDate,
}: ProfileUserInfoProps) => {
  return (
    <section data-cypress="ProfileUserInfo" className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <Image
          src={avatar || '/svg/user.svg'}
          alt={`${name} avatar`}
          width={152}
          height={152}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.aboutWrapper}>
        <div className={styles.nameWrapper}>
          <h2 data-cypress="ProfileUserName" className={styles.name}>
            {name}
          </h2>
          <GithubNameLink login={login} />
        </div>
        {bio && (
          <p data-cypress="ProfileUserBio" className={styles.bio}>
            {bio}
          </p>
        )}
      </div>
      {joinDate && (
        <p className={styles.joinDate}>
          You joined:{' '}
          <strong data-cypress="ProfileUserJoinDate">
            {dayjs(joinDate).format('D MMMM, YYYY')}
          </strong>
        </p>
      )}
    </section>
  );
};
