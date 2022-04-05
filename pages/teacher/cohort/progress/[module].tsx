import { GetServerSidePropsContext } from 'next';
import { getFakeData } from '../../../../lib/mocks/getFakeData';
import { InferPagePropsType, Task } from '../../../../lib/utils/types';
import { Layout } from '../../../../components/common/Layout/Layout';
import { ModuleSelect } from '../../../../components/common/ModuleSelect/ModuleSelect';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';
import { Table } from '../../../../components/common/tables/Table/Table';
import {
  CohortProgressData,
  getCohortProgressColumns,
} from '../../../../lib/tables/teacher/cohort-progress/cohort-progress';
import faker from '@faker-js/faker';

export default function CohortProgressIndex({
  user,
  module,
  modules,
  progress,
}: InferPagePropsType<typeof getServerSideProps>) {
  console.log(progress);
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`/teacher/cohort/progress/${e.target.value}`);
  };
  return null;
  // return (
  //   <Layout
  //     user={user}
  //     title="Cohort Progress"
  //     description="Stundets's progress grouped by modules."
  //     cohortName={'TPA - TOYOTA - 05'}
  //   >
  //     <div>
  //       {/*<ModuleSelect*/}
  //       {/*  modules={modules}*/}
  //       {/*  module={module}*/}
  //       {/*  handleChange={handleChange}*/}
  //       {/*/>*/}
  //     </div>
  //     <Table data={progress} columns={getCohortProgressColumns(module.tasks)} />
  //   </Layout>
  // );
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
        permanent: false,
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

  return {
    props: {
      user,
      module,
      modules: data.modules,
      progress: getFakeProgress(module.tasks),
    },
  };
}

function getFakeProgress(tasks: Task[]): CohortProgressData[] {
  const students = [
    {
      name: 'Paulina Pogorzelska',
      username: 'pogorzelska',
      img: 'https://unsplash.it/75/75/',
    },
    {
      name: 'Patryk Górka',
      username: 'gorka',
      img: 'https://unsplash.it/50/50/',
    },
    {
      name: 'Łukasz Matuszczak',
      username: 'matuszczak',
      img: 'https://unsplash.it/25/25',
    },
    {
      name: 'Mateusz Supel',
      username: 'supel',
      img: 'https://unsplash.it/100/100',
    },
    {
      name: 'Magdalena Misiak',
      username: 'misiak',
      img: 'https://unsplash.it/150/150',
    },
  ];

  return students.map(({ name, username, img }) => {
    return {
      student: { name, username, img },
      ...tasks
        .map((task, index) => {
          return {
            [`task_${index + 1}`]: faker.random.arrayElement([1, 2, 3]),
          };
        })
        .reduce((acc, curr) => {
          const [key, val] = Object.entries(curr)[0];
          acc[key] = val;
          return acc;
        }, {}),
      profile: { link: '/teacher/cohort/progress' },
    };
  });
}
