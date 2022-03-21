import { LoginDetailsForm } from '../../components/login/LoginDetailsForm/LoginDetailsForm';
import { LoginLayout } from '../../components/login/LoginLayout/LoginLayout';
import { LoginHeroText } from '../../components/login/LoginHeroText/LoginHeroText';

export default function LoginDetails() {
  return (
    <LoginLayout>
      <LoginHeroText
        title="*Well done*"
        description="Last thing is to fill up 2 forms and type some of your hobbies"
      />
      <LoginDetailsForm />
    </LoginLayout>
  );
}
