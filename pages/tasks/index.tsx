import { Layout } from '../../components/common/Layout/Layout';
import { db } from '../../lib/mocks';

export default function Tasks() {
  return (
    <Layout user={db.user}>
      <p>tasks content</p>
    </Layout>
  );
}
