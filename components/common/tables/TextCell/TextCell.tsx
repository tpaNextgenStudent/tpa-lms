import styles from './TextCell.module.scss';
import { HandleBold } from '../../HandleBold/HandleBold';

interface TextCellProps {
  value: string;
  id?: string;
  maxWidth?: number;
  isBolded?: boolean;
}

export const TextCell = ({
  value,
  id,
  maxWidth = 256,
  isBolded = true,
}: TextCellProps) => {
  return (
    <div
      id={id}
      data-cypress={id}
      title={value}
      style={{ ['--maxWidth' as any]: `${maxWidth}px` }}
      className={styles.wrapper}
    >
      <HandleBold>{isBolded ? `*${value}*` : value}</HandleBold>
    </div>
  );
};
