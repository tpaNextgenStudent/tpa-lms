import { GetServerSidePropsContext } from 'next';
import { InferPagePropsType } from '../../lib/utils/types';
import { ErrorView } from '../../components/common/ErrorView/ErrorView';
import { ERROR_TYPE_MESSAGE } from '../../lib/constants';

export default function ErrorPage({
  error,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <ErrorView
      title={'*Something went wrong*'}
      description={error}
      primaryButton={{ text: 'Contact Support', onClick: () => {} }}
    />
  );
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const errorType = ctx.query.error as keyof typeof ERROR_TYPE_MESSAGE;
  return {
    props: { error: ERROR_TYPE_MESSAGE[errorType] },
  };
}
