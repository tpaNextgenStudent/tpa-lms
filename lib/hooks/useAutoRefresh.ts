import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useAutoRefresh = (seconds = 10) => {
  const router = useRouter();
  useEffect(() => {
    const tId = setTimeout(() => router.reload(), seconds * 1000);
    return () => clearTimeout(tId);
  }, [router, seconds]);

  return { refresh: router.reload };
};
