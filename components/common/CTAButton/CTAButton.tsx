import styles from './CTAButton.module.scss';
import { CSSProperties } from 'react';

interface CTAButtonProps {
  text: string;
  disabled?: boolean;
  extraStyles?: CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const CTAButton = ({
  text,
  extraStyles,
  type = 'button',
  disabled = false,
  onClick,
}: CTAButtonProps) => {
  return (
    <button
      type={type}
      style={extraStyles}
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
