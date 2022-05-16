import { useCallback, useLayoutEffect, useState } from 'react';

export function useElementSize() {
  const [size, setSize] = useState<[number, number]>([0, 0]);
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);

  const ref = useCallback((element: HTMLElement | null) => {
    setElementRef(element);
  }, []);

  useLayoutEffect(() => {
    const el = elementRef;

    const resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        setSize([entry.contentRect.width, entry.contentRect.height]);
      }
    });
    if (el) resizeObserver.observe(el);

    return () => {
      if (el) resizeObserver.unobserve(el);
    };
  }, [elementRef]);

  return { size, ref };
}
