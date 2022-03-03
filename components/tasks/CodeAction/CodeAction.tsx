import styles from './CodeAction.module.scss';

export const CodeAction = () => {
  return (
    <div className={styles.codeActionWrapper}>
      <div className={styles.codeActionBlock}>
        <p className={styles.codeText}>How to start</p>
        <code className={styles.codeGitCommands}>
          <pre>git clone some_url</pre>
          <pre>git checkout -b my-branch</pre>
        </code>
      </div>
      <div className={styles.codeActionBlock}>
        <p className={styles.codeText}>Submit your work</p>
        <code className={styles.codeGitCommands}>
          <pre>git commit -a -m {"'solution'"}</pre>
          <pre>git push origin my-branch</pre>
        </code>
      </div>
    </div>
  );
};
