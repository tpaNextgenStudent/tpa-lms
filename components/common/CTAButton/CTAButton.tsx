import styles from './CTAButton.module.scss';
import { CSSProperties } from 'react';
import clsx from 'clsx';

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
      className={clsx(styles.button, disabled && styles.buttonDisabled)}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
