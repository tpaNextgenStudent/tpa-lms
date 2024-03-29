import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../lib/styles/global.scss';
import '../lib/styles/gmfStyles.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingProvider } from '../lib/hooks/loadingContext';

export default function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <LoadingProvider>
        <AnyComponent {...pageProps} />
        <ToastContainer closeOnClick={false} position="bottom-left" />
      </LoadingProvider>
    </SessionProvider>
  );
}
