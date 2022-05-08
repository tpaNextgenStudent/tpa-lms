import { useRouter } from 'next/router';
import { ErrorView } from '../components/common/ErrorView/ErrorView';

export default function NotFound() {
  const router = useRouter();
  return (
    <ErrorView
      code={404}
      description="*Something went wrong*"
      button={{ text: 'Back to home page', onClick: () => router.push('/') }}
    />
  );
}
