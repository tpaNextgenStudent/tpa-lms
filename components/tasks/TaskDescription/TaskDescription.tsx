import styles from './TaskDescription.module.scss';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { HandleCode } from '../../common/markdown/HandleCode/HandleCode';

interface TaskDescriptionProps {
  description: string;
}

export const TaskDescription = ({ description }: TaskDescriptionProps) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.content}>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ inline, className, children, ...props }) {
              return (
                <HandleCode
                  className={className}
                  inline={inline}
                  codeElementProps={props}
                  {...props}
                >
                  {children}
                </HandleCode>
              );
            },
          }}
        >
          {description}
        </ReactMarkdown>
      </div>
    </article>
  );
};
