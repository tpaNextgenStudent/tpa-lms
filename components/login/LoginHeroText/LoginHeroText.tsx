import styles from './LoginHeroText.module.scss';
import { HandleBold } from '../../common/HandleBold/HandleBold';
import { Fragment } from 'react';

interface LoginHeroTextProps {
  titleLines?: string[];
  description?: string;
}

export const LoginHeroText = ({
  titleLines,
  description,
}: LoginHeroTextProps) => {
  return (
    <div className={styles.wrapper}>
      {titleLines && titleLines.length > 0 && (
        <h1 className={styles.title}>
          {titleLines.map(line => (
            <Fragment key={line}>
              <HandleBold key={line}>{line}</HandleBold>
              <br />
            </Fragment>
          ))}
        </h1>
      )}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};
