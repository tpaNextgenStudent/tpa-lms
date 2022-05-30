import styles from './UserNameCell.module.scss';
import Image from 'next/image';
import { BlockedLink } from '../../BlockedLink/BlockedLink';
import clsx from 'clsx';

interface UserNameCellProps {
  id?: string;
  name: string;
  img: string | null;
  login: string | null;
  className?: string;
}

export const UserNameCell = ({
  img,
  name,
  login,
  id,
  className,
}: UserNameCellProps) => {
  return (
    <BlockedLink isBlocked={!id} href={id && `/profile/${id}`}>
      <div
        data-cypress="UserNameCell"
        className={clsx(styles.userCellWrapper, className)}
      >
        <div className={styles.userImgWrapper}>
          <Image
            width={32}
            height={32}
            layout="fixed"
            objectFit="cover"
            className={styles.userImg}
            src={img || '/svg/user.svg'}
            alt={name}
          />
        </div>
        <div className={styles.userNameWrapper}>
          <p data-cypress="UserName" className={styles.userName}>
            {name}
          </p>
          {login && <p className={styles.userLogin}>#{login}</p>}
        </div>
      </div>
    </BlockedLink>
  );
};
