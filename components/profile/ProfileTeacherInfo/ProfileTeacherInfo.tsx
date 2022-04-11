import styles from './ProfileTeacherInfo.module.scss';
import Image from 'next/image';

interface ProfileTeacherInfoProps {
  name: string;
  avatar: string | null;
}

export const ProfileTeacherInfo = ({
  name,
  avatar,
}: ProfileTeacherInfoProps) => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.header}>Teacher</h2>
      <div className={styles.teacherWrapper}>
        <div className={styles.imgWrapper}>
          <Image
            src={avatar || '/svg/user.svg'}
            alt={`${name} avatar`}
            width={64}
            height={64}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <span className={styles.name}>{name}</span>
      </div>
    </section>
  );
};
