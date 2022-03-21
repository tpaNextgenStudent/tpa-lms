import { LoginDetailsForm } from '../../components/login/LoginDetailsForm/LoginDetailsForm';
import { LoginLayout } from '../../components/login/LoginLayout/LoginLayout';
import { LoginHeroText } from '../../components/login/LoginHeroText/LoginHeroText';
import { CTAButton } from '../../components/common/CTAButton/CTAButton';

export default function LoginDetails() {
  return (
    <LoginLayout>
      <LoginHeroText
        title="Something went wrong"
        description="There will be some text about issue"
      />
      <CTAButton text="Contact support" />
    </LoginLayout>
  );
}
