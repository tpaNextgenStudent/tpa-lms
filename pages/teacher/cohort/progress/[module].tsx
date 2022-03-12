import { GetServerSidePropsContext } from 'next';
import { getFakeData } from '../../../../lib/mocks/getFakeData';
import { InferPagePropsType } from '../../../../lib/utils/types';
import { Layout } from '../../../../components/common/Layout/Layout';
import { ModuleSelect } from '../../../../components/common/ModuleSelect/ModuleSelect';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';

export default function CohortProgressIndex({
  user,
  module,
  modules,
}: InferPagePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`/teacher/cohort/progress/${e.target.value}`);
  };
  return (
    <Layout
      user={user}
      title="Cohort Progress"
      description="Stundets's progress grouped by modules."
      cohortName={'TPA - TOYOTA - 05'}
    >
      <div>
        <ModuleSelect
          modules={modules}
          module={module}
          handleChange={handleChange}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const data = await getFakeData();

  const user = data.user;

  const cohorts = data.cohorts;
  const userCohort = cohorts.find(c => c.id === user.cohortId);

  //if user has no cohort, inform him that he has to ask a teacher for link
  if (!userCohort) {
    return {
      redirect: {
        permanent: true,
        destination: '/join-to-cohort-error',
      },
    };
  }

  const pickedModuleId = ctx.query.module;

  const module = data.modules.find(m => m.id === pickedModuleId);

  if (!module) {
    return {
      notFound: true,
    };
  }

  return { props: { user, module, modules: data.modules } };
}

function getFakeProgress() {}
