import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { HandleCode } from '../HandleCode/HandleCode';

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <ReactMarkdown
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
