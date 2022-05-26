import styles from './CTAButton.module.scss';
import clsx from 'clsx';

interface CTAButtonProps {
  text: string;
  isDisabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  styleType?: 'primary' | 'secondary';
}

export const CTAButton = ({
  text,
  type = 'button',
  isDisabled = false,
  onClick,
  className,
  styleType = 'primary',
}: CTAButtonProps) => {
  return (
    <button
      data-cypress="CTAButton"
      data-testid="cta-button"
      type={type}
      className={clsx(
        styles.button,
        styleType === 'secondary' && styles.buttonSecondary,
        isDisabled && styles.buttonDisabled,
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
