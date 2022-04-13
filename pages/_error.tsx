import { NextPageContext } from 'next';
import { ErrorView } from '../components/common/ErrorView/ErrorView';
import { useRouter } from 'next/router';

export default function Error({
  statusCode,
}: ReturnType<typeof Error.getInitialProps>) {
  const router = useRouter();
  const { title, description } = statusToMessage(statusCode);
  return (
    <ErrorView
      title={title}
      description={description}
      primaryButton={{
        text: 'Go back to home page',
        onClick: () => router.push('/'),
      }}
    />
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

function statusToMessage(status: number | undefined): {
  title: string;
  description: string;
} {
  if (!status) return { title: `*Error*`, description: 'An error occurred!' };
  if (status === 404)
    return {
      title: '*404 Not found*',
      description: 'This page does not exist!',
    };
  if (status >= 500)
    return {
      title: `*${status} Error*`,
      description: 'Internal Server Error :(',
    };

  return {
    title: `*${status} Error*`,
    description: 'Client-side error occurred!',
  };
}
