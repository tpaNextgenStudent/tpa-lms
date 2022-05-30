import { InferPagePropsType } from '../../../../lib/types';
import { Layout } from '../../../../components/common/Layout/Layout';
import { Table } from '../../../../components/common/tables/Table/Table';
import {
  getTeacherCohortProgressColumns,
  mapProgressToTableData,
} from '../../../../lib/tables/teacher/cohort-progress/cohort-progress';
import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';
import { fetchTeacherCohortProgress } from '../../../../apiHelpers/cohort';
import { GradesLegend } from '../../../../components/teacher/GradesLegend/GradesLegend';
import { fetchUserModules } from '../../../../apiHelpers/modules';
import { SingleValue } from 'react-select';
import { OptionType } from '../../../../components/common/CustomSelect/CustomSelect';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner/LoadingSpinner';
import { useMemo } from 'react';

export default function CohortProgressIndex({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { module: moduleId } = router.query as {
    module: string;
  };

  const {
    data: modules,
    refetch: refetchModules,
    isFetching: isModulesFetching,
  } = useQuery('modules', fetchUserModules);
  const module =
    modules && modules.find(m => m.module_version_id === moduleId)!;

  const {
    data: rawProgress,
    refetch: refetchProgress,
    isFetching: isProgressFetching,
  } = useQuery(['cohort-progress', moduleId], () =>
    fetchTeacherCohortProgress(moduleId)
  );
  const refetchAll = async () => {
    await refetchModules();
    await refetchProgress();
  };

  const numOfTasksInModule = useMemo(
    () =>
      rawProgress && Math.max(...rawProgress.map(({ tasks }) => tasks.length)),
    [rawProgress]
  );

  const progressTableData = useMemo(
    () => rawProgress && mapProgressToTableData(rawProgress),
    rawProgress
  );

  const onModuleChange = (option: SingleValue<OptionType>) => {
    if (option?.value) {
      router.push(`/teacher/cohort/progress/${option.value}`);
    }
  };

  const isLoading = isModulesFetching || isProgressFetching;
  return (
    <Layout
      user={user}
      title="Cohort Progress"
      headerTitle="Cohort Progress"
      headerDescription="Students' progress grouped by modules."
    >
      {rawProgress && modules && module && numOfTasksInModule ? (
        <>
          <GradesLegend />
          <Table
            data={progressTableData!}
            columns={getTeacherCohortProgressColumns({
              numOfTasksInModule,
              modules,
              module,
              onModuleChange,
            })}
          />
        </>
      ) : (
        <LoadingSpinner isLoading={isLoading} refetch={refetchAll} />
      )}
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ user }) => {
    return {
      props: { user },
    };
  }
);
