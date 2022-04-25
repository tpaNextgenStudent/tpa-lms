import { GetServerSidePropsContext } from 'next';
import { InferPagePropsType } from '../../lib/utils/types';
import { ErrorView } from '../../components/common/ErrorView/ErrorView';
import { ERROR_TYPE_MESSAGE } from '../../lib/constants';
import { useRouter } from 'next/router';

export default function ErrorPage({
  error,
}: InferPagePropsType<typeof getServerSideProps>) {
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

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const errorType = ctx.query.error as keyof typeof ERROR_TYPE_MESSAGE;
  return {
    props: { error: ERROR_TYPE_MESSAGE[errorType] },
  };
}
