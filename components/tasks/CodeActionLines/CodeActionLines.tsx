import styles from './CodeActionLines.module.scss';
import { useEffect, useRef, useState } from 'react';
import TickIcon from '../../../public/svg/tick-icon.svg';
import ClipboardIcon from '../../../public/svg/clipboard-icon.svg';

interface CodeActionLinesProps {
  lines: string[];
  onCopyClick: () => void;
}

interface CodeLineProps {
  value: string;
  index: number;
  onCopyClick: () => void;
}

export const CodeActionLines = ({
  lines,
  onCopyClick,
}: CodeActionLinesProps) => {
  return (
    <div className={styles.codeWrapper}>
      <code className={styles.codeBlock}>
        {lines.map((value, index) => {
          return (
            <CodeLine
              onCopyClick={onCopyClick}
              key={value}
              value={value}
              index={index}
            />
          );
        })}
      </code>
    </div>
  );
};

const CodeLine = ({ value, index, onCopyClick }: CodeLineProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  const handleClick = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    timeoutIdRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    onCopyClick();
  };

  return (
    <pre className={styles.codeLine} key={value} data-testid="code-action-line">
      <span data-testid="code-action-line-value">{value}</span>
      <button
        onClick={handleClick}
        title={isCopied ? 'Copied' : 'Copy to clipboard'}
        style={{ top: `calc(${index * 24}px)` }}
        className={styles.clipboardButton}
        data-testid="code-action-line-button"
      >
        {isCopied ? <TickIcon /> : <ClipboardIcon />}
      </button>
    </pre>
  );
};
