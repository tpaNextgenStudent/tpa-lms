import { InferPagePropsType } from '../../../../lib/types';
import { Layout } from '../../../../components/common/Layout/Layout';
import { Table } from '../../../../components/common/tables/Table/Table';
import {
  getTeacherCohortProgressColumns,
  mapProgressToTableData,
} from '../../../../lib/tables/teacher/cohort-progress/cohort-progress';
import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';
import { getTeacherCohortProgress } from '../../../../apiHelpers/cohort';
import { GradesLegend } from '../../../../components/teacher/GradesLegend/GradesLegend';
import { getUserModules } from '../../../../apiHelpers/modules';
import { SingleValue } from 'react-select';
import { OptionType } from '../../../../components/common/CustomSelect/CustomSelect';
import { useRouter } from 'next/router';

export default function CohortProgressIndex({
  user,
  progressTableData,
  numOfTasksInModule,
  modules,
  module,
}: InferPagePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const onModuleChange = (option: SingleValue<OptionType>) => {
    if (option?.value) {
      router.push(`/teacher/cohort/progress/${option.value}`);
    }
  };
  return (
    <Layout
      user={user}
      title="Cohort Progress"
      headerTitle="Cohort Progress"
      description="Students' progress grouped by modules."
    >
      <GradesLegend />
      <Table
        data={progressTableData}
        columns={getTeacherCohortProgressColumns({
          numOfTasksInModule,
          modules,
          module,
          onModuleChange,
        })}
        colGap={26}
      />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ req, params, user }) => {
    const authCookie = req.headers.cookie as string;
    const { module: moduleId } = params! as {
      module: string;
    };

    const [modules, rawProgress] = await Promise.all([
      getUserModules({ cookie: authCookie }),
      getTeacherCohortProgress(moduleId, {
        cookie: authCookie,
      }),
    ]);

    const module = modules.find(m => m.module_version_id === moduleId)!;

    const numOfTasksInModule = Math.max(
      ...rawProgress.map(({ tasks }) => tasks.length)
    );

    const progressTableData = mapProgressToTableData(rawProgress);
    return {
      props: { user, modules, module, numOfTasksInModule, progressTableData },
    };
  }
);
