import { Mermaid } from '../Mermaid/Mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { HTMLAttributes, ReactNode } from 'react';

interface HandleCode {
  className?: string;
  inline?: boolean;
  children: ReactNode & ReactNode[];
  codeElementProps: HTMLAttributes<HTMLOrSVGElement>;
}

export const HandleCode = ({
  className,
  inline = false,
  children,
  codeElementProps,
}: HandleCode) => {
  const match = /language-(\w+)/.exec(className || '');

  if (!inline && match) {
    const lang = match[1];

    if (lang === 'marmaid') {
      return <Mermaid chart={String(children)} />;
    }

    return (
      <SyntaxHighlighter
        style={materialDark}
        language={match[1]}
        PreTag="div"
        {...codeElementProps}
      >
        {children}
      </SyntaxHighlighter>
    );
  }

  return (
    <code className={className} {...codeElementProps}>
      {children}
    </code>
  );
};
