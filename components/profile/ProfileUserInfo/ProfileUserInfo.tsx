import styles from './ProfileUserInfo.module.scss';
import Image from 'next/image';
import GhIcon from '../../../public/svg/gh-icon.svg';
import dayjs from 'dayjs';

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
          <a
            data-cypress="ProfileUserGithubLink"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.ghLink}
            href={`https://github.com/${login}`}
          >
            <span className={styles.ghIcon} role="img" aria-label="Github icon">
              <GhIcon />
            </span>
            <span className={styles.login}>{login}</span>
          </a>
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
