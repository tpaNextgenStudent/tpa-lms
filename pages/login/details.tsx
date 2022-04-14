import { LoginDetailsForm } from '../../components/login/LoginDetailsForm/LoginDetailsForm';
import { LoginLayout } from '../../components/login/LoginLayout/LoginLayout';
import { LoginHeroText } from '../../components/login/LoginHeroText/LoginHeroText';
import axios from 'axios';
import { apiPath } from '../../lib/utils/apiPath';
import { withServerSideAuth } from '../../lib/auth/withServerSideAuth';
import { useRouter } from 'next/router';
import { UserDetails } from '../../schemas/userDetailsSchema';

export default function LoginDetails() {
  const router = useRouter();

  const onSubmit = async (data: UserDetails) => {
    console.log(data);
    // try {
    //   await axios.post(apiPath('user/details'), data);
    //   await router.push('/');
    // } catch (err: unknown) {
    //   if (axios.isAxiosError(err)) {
    //     console.log(err.response?.data);
    //   }
    // }
  };

  return (
    <LoginLayout>
      <LoginHeroText
        titleLines={['*Well done!*']}
        description="Tell other students a few words about yourself."
      />
      <LoginDetailsForm onSubmit={onSubmit} />
    </LoginLayout>
  );
}

// export const getServerSideProps = withServerSideAuth(async ctx => {
//   try {
//     const { data: user } = await axios.get(apiPath('user/details'), {
//       headers: {
//         cookie: ctx.req.headers.cookie as string,
//       },
//     });
//
//     const areDetailsFilled = [user.name, user.surname, user.bio].every(
//       x => !!x
//     );
//
//     if (areDetailsFilled) {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: false,
//         },
//       };
//     }
//   } catch (err: unknown) {
//     if (axios.isAxiosError(err)) {
//       console.log(err.response?.statusText);
//     }
//   }
//
//   return { props: {} };
// });
