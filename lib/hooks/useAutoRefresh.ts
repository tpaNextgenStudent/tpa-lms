import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useIsLoading } from './loadingContext';

export const useAutoRefresh = (seconds?: number) => {
  const router = useRouter();
  const { setIsLoading } = useIsLoading();

  const refresh = useCallback(() => {
    setIsLoading(true);
    router.reload();
  }, [router, setIsLoading]);

  useEffect(() => {
    if (seconds) {
      const tId = setTimeout(refresh, seconds * 1000);
      return () => clearTimeout(tId);
    }
  }, [refresh, seconds]);

  return { refresh };
};
