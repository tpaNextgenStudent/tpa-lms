import styles from './CodeAction.module.scss';
import ClipboardIcon from '../../../public/clipboard-icon.svg';

const sampleUrl =
  'https://github.com/tpa-nextgen/modules-master/blob/master/outlines/model_with_classes_1/task_formative_01.md';

interface CodeLinesProps {
  lines: string[];
}

export const CodeAction = () => {
  return (
    <div className={styles.codeActionWrapper}>
      <div className={styles.codeActionBlock}>
        <p className={styles.codeText}>How to start</p>
        <CodeLines
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
  );
};

const CodeLines = ({ lines }: CodeLinesProps) => {
  return (
    <div className={styles.codeWrapper}>
      <code className={styles.codeBlock}>
        {lines.map((value, index) => {
          return (
            <pre className={styles.codeLine} key={value}>
              <span>{value}</span>
              <button
                onClick={() => copyToClipboard(value)}
                title="Copy to clipboard"
                style={{ top: `calc(8px + ${index * 24}px)` }}
                className={styles.clipboardButton}
              >
                <ClipboardIcon />
              </button>
            </pre>
          );
        })}
      </code>
    </div>
  );
};

const copyToClipboard = async (value: string) => {
  await navigator.clipboard.writeText(value);
};
