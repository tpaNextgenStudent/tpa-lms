import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useAutoRefresh = (seconds?: number) => {
  const router = useRouter();
  useEffect(() => {
    if (seconds) {
      const tId = setTimeout(() => router.reload(), seconds * 1000);
      return () => clearTimeout(tId);
    }
  }, [router, seconds]);

  return { refresh: router.reload };
};
