import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { HandleCode } from '../HandleCode/HandleCode';
import styles from './MarkdownContent.module.scss';

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <ReactMarkdown
      className={styles.markdown}
      rehypePlugins={[rehypeRaw]}
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
