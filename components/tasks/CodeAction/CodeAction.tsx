import styles from './CodeAction.module.scss';
import ClipboardIcon from '../../../public/clipboard-icon.svg';
import TickIcon from '../../../public/tick-icon.svg';
import { useEffect, useRef, useState, MouseEvent, useCallback } from 'react';
import { Toast } from '../../common/Toast/Toast';
import { useRouter } from 'next/router';

const sampleUrl =
  'https://github.com/tpa-nextgen/modules-master/blob/master/outlines/model_with_classes_1/task_formative_01.md';

interface CodeLinesProps {
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void;
  lines: string[];
}

interface CodeLineProps {
  value: string;
  index: number;
}

export const CodeAction = () => {
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [isHoverDisabled, setIsHoverDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsHoverDisabled(false);
  }, [router.asPath]);

  const handleCloneHover = useCallback(() => {
    if (isHoverDisabled) return;
    setIsWarningVisible(true);
    setIsHoverDisabled(true);
  }, [isHoverDisabled]);

  const handleToastClose = useCallback(() => {
    setIsWarningVisible(false);
  }, []);

  return (
    <div className={styles.wrapper}>
      {isWarningVisible && (
        <Toast
          onCloseClick={handleToastClose}
          message="Remember we count the number of your attempts. Before submitting the task,please, review it thoroughly."
        />
      )}
      <div className={styles.codeActionWrapper}>
        <div className={styles.codeActionBlock}>
          <p className={styles.codeText}>How to start</p>
          <CodeLines
            onMouseEnter={handleCloneHover}
            lines={[`git clone ${sampleUrl}`, 'git checkout -b my-branch']}
          />
        </div>
        <div className={styles.codeActionBlock}>
          <p className={styles.codeText}>Submit your work</p>
          <CodeLines
            lines={[`git commit -a -m solution`, 'git push origin my-branch']}
          />
        </div>
      </div>
    </div>
  );
};

const CodeLines = ({ lines, onMouseEnter }: CodeLinesProps) => {
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
        style={{ top: `calc(8px + ${index * 24}px)` }}
        className={styles.clipboardButton}
      >
        {isCopied ? <TickIcon /> : <ClipboardIcon />}
      </button>
    </pre>
  );
};
