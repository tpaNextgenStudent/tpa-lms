import styles from './LoginHeroText.module.scss';
import { HandleBold } from '../../common/HandleBold/HandleBold';

interface LoginHeroTextProps {
  title?: string;
  description?: string;
}

export const LoginHeroText = ({ title, description }: LoginHeroTextProps) => {
  return (
    <div className={styles.wrapper}>
      {title && (
        <h1 className={styles.title}>
          <HandleBold>{title}</HandleBold>
        </h1>
      )}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};
