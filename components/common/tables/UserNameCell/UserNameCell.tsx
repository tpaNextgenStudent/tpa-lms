import styles from './UserNameCell.module.scss';
import Image from 'next/image';
import { BlockedLink } from '../../BlockedLink/BlockedLink';

interface UserNameCellProps {
  id?: string;
  name: string;
  img: string | null;
  login: string | null;
}

export const UserNameCell = ({ img, name, login, id }: UserNameCellProps) => {
  return (
    <BlockedLink isBlocked={!id} href={id && `/profile/${id}`}>
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
