import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../lib/styles/global.scss';
import '../lib/styles/gmfStyles.scss';
import { LoadingView } from '../components/common/LoadingView/LoadingView';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [router]);

  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <LoadingView isLoading={isLoading}>
        <Component {...pageProps} />
        <ToastContainer closeOnClick={false} position="bottom-left" />
      </LoadingView>
    </SessionProvider>
  );
}
