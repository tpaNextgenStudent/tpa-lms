import { Layout } from '../../components/common/Layout/Layout';

const mockedStudent = {
  name: 'Patryk Górka',
};

export default function Tasks() {
  return (
    <Layout user={mockedStudent}>
      <p>tasks content</p>
    </Layout>
  );
}
