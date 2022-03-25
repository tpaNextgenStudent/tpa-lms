import { useEffect, RefObject } from 'react';

export const useClickOutside = (
  ref: RefObject<Element>,
  onClick: (e: MouseEvent) => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ref.current &&
        ref.current !== e.target &&
        !ref.current.contains(e.target as Node)
      ) {
        onClick(e);
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [ref, onClick]);
};
