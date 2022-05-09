import { ErrorView } from '../components/common/ErrorView/ErrorView';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Error() {
  const router = useRouter();

  return (
    <ErrorView
      title="*Something went wrong.*"
      description="Please, go back and log in again."
      button={{
        text: 'Back to login page',
        onClick: async () => {
          router.push('/login');
        },
      }}
    />
  );
}
