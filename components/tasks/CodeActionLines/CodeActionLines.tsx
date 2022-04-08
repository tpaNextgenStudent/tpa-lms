import styles from './CodeActionLines.module.scss';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import TickIcon from '../../../public/tick-icon.svg';
import ClipboardIcon from '../../../public/clipboard-icon.svg';

interface CodeActionLinesProps {
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void;
  lines: string[];
}

interface CodeLineProps {
  value: string;
  index: number;
}

export const CodeActionLines = ({
  lines,
  onMouseEnter,
}: CodeActionLinesProps) => {
  return (
    <div className={styles.codeWrapper} onMouseEnter={onMouseEnter}>
      <code className={styles.codeBlock}>
        {lines.map((value, index) => {
          return <CodeLine key={value} value={value} index={index} />;
        })}
      </code>
    </div>
  );
};

const CodeLine = ({ value, index }: CodeLineProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  const handleCopyClick = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    timeoutIdRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return (
    <pre className={styles.codeLine} key={value}>
      <span>{value}</span>
      <button
        onClick={() => handleCopyClick(value)}
        title={isCopied ? 'Copied' : 'Copy to clipboard'}
        style={{ top: `calc(${index * 24}px)` }}
        className={styles.clipboardButton}
      >
        {isCopied ? <TickIcon /> : <ClipboardIcon />}
      </button>
    </pre>
  );
};
