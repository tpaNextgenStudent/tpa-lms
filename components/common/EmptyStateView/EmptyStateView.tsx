import styles from './EmptyStateView.module.scss';
import Image from 'next/image';
import { HandleBold } from '../HandleBold/HandleBold';

interface EmptyStateViewProps {
  imgSrc?: string;
  message?: string;
}

export const EmptyStateView = ({ imgSrc, message }: EmptyStateViewProps) => {
  return (
    <div className={styles.wrapper}>
      {imgSrc && (
        <div className={styles.imgWrapper}>
          <Image
            src={imgSrc}
            alt=""
            width={240}
            height={240}
            layout="responsive"
            quality={100}
            objectFit="contain"
            objectPosition="center"
          />
        </div>
      )}
      {message && (
        <p className={styles.text}>
          <HandleBold>{message}</HandleBold>
        </p>
      )}
    </div>
  );
};
