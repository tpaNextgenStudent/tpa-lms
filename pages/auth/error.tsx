import { GetServerSidePropsContext } from 'next';
import { InferPagePropsType } from '../../lib/utils/types';
import { ErrorView } from '../../components/common/ErrorView/ErrorView';

export default function ErrorPage({
  error,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <ErrorView
      title={'*Something went wrong*'}
      description={error}
      button={{ text: 'ContactSupport', onClick: () => {} }}
    />
  );
}

const ERROR = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied: 'Access denied. There was an error while logging in.',
  Verification: 'The token has expired or has already been used',
  Default: 'Error while authorization',
};

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const errorType = ctx.query.error as keyof typeof ERROR;
  return {
    props: { error: ERROR[errorType] },
  };
}
