import ReactMarkdown from 'react-markdown';
import { HandleCode } from '../HandleCode/HandleCode';
import styles from './MarkdownContent.module.scss';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <ReactMarkdown
      className={clsx('markdown-body', styles.markdown)}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline, className, children, ...props }) {
          return (
            <HandleCode
              className={className}
              inline={inline}
              codeElementProps={props}
            >
              {children}
            </HandleCode>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
