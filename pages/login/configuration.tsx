import { useRouter } from 'next/router';
import { InfoView } from '../../components/common/InfoView/InfoView';

export default function ConfigurationPage() {
  const router = useRouter();

  return (
    <InfoView
      title={[
        '*We are setting up a space for you.*',
        '*It might take up to a few minutes.*',
      ]}
      description="Thank you for your patience."
      button={{
        text: 'Refresh',
        onClick: () => {
          router.reload();
        },
      }}
    />
  );
}
