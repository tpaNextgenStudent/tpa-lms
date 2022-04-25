import { InferPagePropsType } from '../../../../lib/utils/types';
import { Layout } from '../../../../components/common/Layout/Layout';
import { Table } from '../../../../components/common/tables/Table/Table';
import {
  getTeacherCohortProgressColumns,
  mapProgressToTableData,
} from '../../../../lib/tables/teacher/cohort-progress/cohort-progress';
import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';
import { getTeacherCohortProgress } from '../../../../api/cohort';
import { getUserDetails } from '../../../../api/user';
import { GradesLegend } from '../../../../components/teacher/GradesLegend/GradesLegend';
import { getUserModules } from '../../../../api/modules';

export default function CohortProgressIndex({
  user,
  progress,
  numOfTasksInModule,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      user={user}
      title="Cohort Progress"
      description="Students' progress grouped by modules."
    >
      <GradesLegend />
      <Table
        data={progress}
        columns={getTeacherCohortProgressColumns(numOfTasksInModule)}
        colGap={26}
      />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ req, params }) => {
    const authCookie = req.headers.cookie as string;
    const { module: moduleId } = params! as {
      module: string;
    };

    try {
      const user = await getUserDetails({ cookie: authCookie });
      const modules = await getUserModules({ cookie: authCookie });
      const module =
        modules.find(m => m.module_version_id === moduleId) || null;
      const rawProgress = await getTeacherCohortProgress(moduleId, {
        cookie: authCookie,
      });

      const numOfTasksInModule = Math.max(
        ...rawProgress.map(({ tasks }) => tasks.length)
      );

      const progress = mapProgressToTableData(rawProgress);
      return { props: { user, progress, numOfTasksInModule } };
    } catch {
      return { notFound: true };
    }
  }
);
