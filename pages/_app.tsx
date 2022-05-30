import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../lib/styles/global.scss';
import '../lib/styles/gmfStyles.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingProvider } from '../lib/hooks/loadingContext';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <QueryClientProvider client={queryClient}>
        <LoadingProvider>
          <Component {...pageProps} />
          <ToastContainer closeOnClick={false} position="bottom-left" />
        </LoadingProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
