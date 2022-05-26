import styles from './CodeAction.module.scss';
import { useEffect, useState, useCallback } from 'react';
import { Toast } from '../../common/Toast/Toast';
import { useRouter } from 'next/router';
import { CodeActionLines } from '../CodeActionLines/CodeActionLines';
import { TaskStatus, TaskType } from '../../../lib/types';
import { ITask } from '../../../apiHelpers/tasks';

interface CodeActionProps {
  github_link: string;
  sizeRef?: (element: HTMLElement | null) => void;
}

export const CodeAction = ({ github_link, sizeRef }: CodeActionProps) => {
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
    <div data-cypress="CodeAction" ref={sizeRef} className={styles.wrapper}>
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
            lines={[
              `git clone ${github_link}`,
              'git checkout -b solution-branch',
            ]}
          />
        </div>
        <div className={styles.codeActionBlock}>
          <p className={styles.codeText}>Submit your work</p>
          <CodeActionLines
            onCopyClick={onCopyClick}
            lines={[
              `git commit -a -m solution`,
              'git push -u origin solution-branch',
            ]}
          />
        </div>
      </div>
    </div>
  );
};
