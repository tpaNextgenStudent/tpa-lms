import { ErrorView } from '../../components/common/ErrorView/ErrorView';
import { useRouter } from 'next/router';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <ErrorView
      title="*Something went wrong.*"
      description="Please, go back and log in again."
      primaryButton={{
        text: 'Back to login page',
        onClick: () => {
          router.push('/login');
        },
      }}
    />
  );
}
