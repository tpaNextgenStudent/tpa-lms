import { Layout } from '../../components/common/Layout/Layout';
import { GetServerSidePropsContext } from 'next';
import { getFakeData } from '../../lib/mocks/getFakeData';
import { InferPagePropsType } from '../../lib/utils/types';
import { StudentScoresTable } from '../../components/scores/StudentScoresTable/StudentScoresTable';
import faker from '@faker-js/faker';

export default function ScoresIndex({
  user,
  scores,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="My Scores" user={user}>
      <StudentScoresTable data={scores} />
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const data = await getFakeData();

  const user = data.user;

  const scores = [];

  for (let i = 0; i < 20; i++) {
    const sd = `${faker.datatype.number({
      min: 1,
      max: 28,
    })} ${faker.date.month()}`;
    const rd = `${faker.datatype.number({
      min: 1,
      max: 28,
    })} ${faker.date.month()}`;

    const taskName = faker.company.catchPhrase();

    const mn = faker.company.bsNoun();
    const moduleName = `${mn[0].toUpperCase()}${mn.slice(1)}`;

    const taskType = faker.random.arrayElement([
      'info',
      'image',
      'quiz',
      'code',
    ]);

    const attempts = faker.random.arrayElement([1, 2, 3]);
    const score = faker.random.arrayElement([1, 2, 3]);

    const reviewedBy = faker.random.arrayElement([
      {
        name: 'Go Kubo',
        img: 'https://unsplash.it/75/75/',
      },
      {
        name: 'Łukasz Matuszczak',
        img: 'https://unsplash.it/100/100',
      },
    ]);

    scores.push({
      submission_date: sd,
      review_date: rd,
      module: moduleName,
      task: taskName,
      task_type: taskType,
      attempts: attempts,
      score: score,
      reviewed_by: reviewedBy,
      view: { link: '/scores' },
    });
  }

  return { props: { user, scores } };
}
