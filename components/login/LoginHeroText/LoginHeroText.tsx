import styles from './LoginHeroText.module.scss';

interface LoginHeroTextProps {
  title?: string;
  description?: string;
}

export const LoginHeroText = ({ title, description }: LoginHeroTextProps) => {
  return (
    <div className={styles.wrapper}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};
