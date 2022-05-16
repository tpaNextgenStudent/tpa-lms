import { useRouter } from 'next/router';
import { InfoView } from '../../components/common/InfoView/InfoView';

export default function InvitationPage() {
  const router = useRouter();

  return (
    <InfoView
      title="*You have been invited to Tech Play Academy.*"
      description="To get to our organization, please, *confirm your email address*."
      button={{
        text: 'Refresh',
        onClick: () => {
          router.reload();
        },
      }}
    />
  );
}
