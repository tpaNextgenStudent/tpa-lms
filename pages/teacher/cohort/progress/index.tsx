import { GetServerSidePropsContext } from 'next';
import { getFakeData } from '../../../../lib/mocks/getFakeData';

export default function CohortProgressIndex() {
  return null;
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

  //teacher haven't picked module,
  //find 'in progress' task and redirect user to this task's page
  const firstModule = userCohort.modules[0];

  if (firstModule) {
    return {
      redirect: {
        permanent: false,
        destination: `/teacher/cohort/progress/${firstModule.id}`,
      },
    };
  }

  return {
    notFound: true,
  };
}
