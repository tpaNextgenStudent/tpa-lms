import styles from './UserNameCell.module.scss';
import Image from 'next/image';
import { BlockedLink } from '../../BlockedLink/BlockedLink';

interface UserNameCellProps {
  profileLink?: string;
  name: string;
  img: string | null;
  login: string | null;
}

export const UserNameCell = ({
  img,
  name,
  login,
  profileLink,
}: UserNameCellProps) => {
  return (
    <div data-cypress="UserNameCell" className={styles.userCellWrapper}>
      <div className={styles.userImgWrapper}>
        {img && (
          <Image
            width={32}
            height={32}
            layout="fixed"
            objectFit="cover"
            className={styles.userImg}
            src={img}
            alt={name}
          />
        )}
      </div>
      <BlockedLink
        isBlocked={!profileLink}
        href={profileLink}
        className={styles.userNameWrapper}
      >
        <p data-cypress="UserName" className={styles.userName}>
          {name}
        </p>
        {login && <p className={styles.userLogin}>#{login}</p>}
      </BlockedLink>
    </div>
  );
};
