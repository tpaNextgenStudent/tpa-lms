import styles from './InputErrorMessage.module.scss';
import { capitalize } from '../../../lib/utils/capitalize';

interface InputErrorMessageProps {
  message: string;
}

export const InputErrorMessage = ({ message }: InputErrorMessageProps) => {
  return <p className={styles.errorMessage}>{capitalize(message)}</p>;
};
