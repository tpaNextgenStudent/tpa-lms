import { memo, ReactText } from 'react';

export const HandleBold = memo(({ children }: { children: ReactText }) => {
  return (
    <>
      {children
        .toString()
        .split('*')
        .map((word, i) =>
          i % 2 !== 0 ? <strong key={word}>{word}</strong> : word
        )}
    </>
  );
});
HandleBold.displayName = 'HandleBold';
