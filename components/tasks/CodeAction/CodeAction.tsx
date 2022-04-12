import styles from './CodeAction.module.scss';
import { useEffect, useState, useCallback } from 'react';
import { Toast } from '../../common/Toast/Toast';
import { useRouter } from 'next/router';
import { CodeActionLines } from '../CodeActionLines/CodeActionLines';

const sampleUrl =
  'https://github.com/tpa-nextgen/modules-master/blob/master/outlines/model_with_classes_1/task_formative_01.md';

export const CodeAction = () => {
  const router = useRouter();

  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [isWarningDisabled, setIsWarningDisabled] = useState(false);

  useEffect(() => {
    setIsWarningDisabled(false);
  }, [router.asPath]);

  const handleWarningClose = useCallback(() => {
    setIsWarningVisible(false);
  }, []);

  const onCopyClick = useCallback(() => {
    if (isWarningDisabled) return;
    setIsWarningVisible(true);
    setIsWarningDisabled(true);
  }, [isWarningDisabled]);

  return (
    <div className={styles.wrapper}>
      {isWarningVisible && (
        <Toast
          onCloseClick={handleWarningClose}
          message="Remember we count the number of your attempts. Before submitting the task,please, review it thoroughly."
        />
      )}
      <div className={styles.codeActionWrapper}>
        <div className={styles.codeActionBlock}>
          <p className={styles.codeText}>How to start</p>
          <CodeActionLines
            onCopyClick={onCopyClick}
            lines={[`git clone ${sampleUrl}`, 'git checkout -b my-branch']}
          />
        </div>
        <div className={styles.codeActionBlock}>
          <p className={styles.codeText}>Submit your work</p>
          <CodeActionLines
            onCopyClick={onCopyClick}
            lines={[`git commit -a -m solution`, 'git checkout -b my-branch']}
          />
        </div>
      </div>
    </div>
  );
};
