import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export type SizedHTMLElement = Pick<
  HTMLElement,
  'getBoundingClientRect'
> | null;

export function useElementSize() {
  const [size, setSize] = useState<[number, number]>([0, 0]);
  const elementRef = useRef<SizedHTMLElement>(null);

  const ref = useCallback((element: SizedHTMLElement) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      setSize([rect.width, rect.height]);
    }

    elementRef.current = element;
  }, []);

  useLayoutEffect(() => {
    function handleResize() {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setSize([rect.width, rect.height]);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { size, ref };
}
