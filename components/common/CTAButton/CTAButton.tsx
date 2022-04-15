import styles from './CTAButton.module.scss';
import clsx from 'clsx';

interface CTAButtonProps {
  text: string;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  styleType?: 'primary' | 'secondary';
}

export const CTAButton = ({
  text,
  type = 'button',
  disabled = false,
  onClick,
  className,
  styleType = 'primary',
}: CTAButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styleType === 'secondary' && styles.buttonSecondary,
        disabled && styles.buttonDisabled,
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
