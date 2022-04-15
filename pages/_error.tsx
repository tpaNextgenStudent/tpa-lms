import { NextPageContext } from 'next';
import { ErrorView } from '../components/common/ErrorView/ErrorView';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

export default function Error({
  statusCode,
}: ReturnType<typeof Error.getInitialProps>) {
  const router = useRouter();
  const { title, description, withHomeRedirect } = statusToMessage(statusCode);

  const buttonSettings = withHomeRedirect
    ? {
        text: 'Go back to home page',
        onClick: () => router.push('/'),
      }
    : {
        text: 'Back to login page',
        onClick: async () => {
          await signOut();
          await router.push('/');
        },
      };

  return (
    <ErrorView
      title={title}
      description={description}
      primaryButton={buttonSettings}
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
  withHomeRedirect?: boolean;
} {
  if (!status)
    return {
      title: `*Something went wrong*`,
      description: 'Go back to the login page and try again.',
    };
  if (status === 404)
    return {
      title: '*404 Not found*',
      description: 'This page does not exist!',
      withHomeRedirect: true,
    };

  return {
    title: `*Something went wrong (code: ${status})*`,
    description: 'Go back to the login page and try again.',
  };
}
