import styles from './Box.module.scss';
import { HandleBold } from '../HandleBold/HandleBold';

interface BoxProps {
  text?: string;
  color: string;
  shadow?: string;
}

export const Box = ({ color, text, shadow }: BoxProps) => {
  return (
    <div className={styles.wrapper}>
      <div
        style={{ ['--color' as string]: color, ['--shadow' as string]: shadow }}
        className={styles.box}
      />
      <p className={styles.text}>
        <HandleBold>
          {text ? `${text}: *${shadow || color}*` : shadow || color}
        </HandleBold>
      </p>
    </div>
  );
};
