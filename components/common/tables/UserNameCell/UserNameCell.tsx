import styles from './UserNameCell.module.scss';
import Image from 'next/image';

interface UserNameCellProps {
  name: string;
  img: string | null;
  login: string | null;
}

export const UserNameCell = ({ img, name, login }: UserNameCellProps) => {
  return (
    <div className={styles.userCellWrapper}>
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
  );
};
