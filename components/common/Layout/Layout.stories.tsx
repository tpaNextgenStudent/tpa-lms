import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from './Layout';
import { LoadingProvider } from '../../../lib/hooks/loadingContext';

export default {
  title: 'Layout/Main Layout',
  component: Layout,
  decorators: [
    Story => (
      <LoadingProvider>
        <Story />
      </LoadingProvider>
    ),
  ],
} as ComponentMeta<typeof Layout>;

const sampleUser = {
  cohort_name: 'TPA-TOYOTA-05',
  bio: 'I love TypeScript',
  name: 'Patryk',
  surname: 'Górka',
  image: '',
  github_login: 'patrykbunix',
  role: 'student' as const,
  email: 'patrykbunix@gmail.com',
};

const Template: ComponentStory<typeof Layout> = args => (
  <Layout {...args}>
    <p>page body here</p>
  </Layout>
);

export const Student = Template.bind({});
Student.args = {
  user: sampleUser,
  title: 'Tab title',
  headerTitle: 'My Tasks',
  headerDescription: 'Find all of yours tasks divided into modules.',
  withHeaderPrevButton: false,
};
Student.story = {
  parameters: {
    nextRouter: {
      pathname: '/student/tasks/[module]/[task]',
    },
  },
};

export const DetailsPage = Template.bind({});
DetailsPage.args = {
  user: sampleUser,
  title: 'Tab title',
  parentPage: { title: 'My Scores', link: '/student/scores' },
  headerTitle: 'Translate to a box diagram',
  withHeaderPrevButton: true,
};
DetailsPage.story = {
  parameters: {
    nextRouter: {
      pathname: '/student/tasks/[module]/[task]',
    },
  },
};

export const Teacher = Template.bind({});
Teacher.args = {};

Teacher.args = {
  user: { ...sampleUser, role: 'teacher' },
  title: 'Tab title',
  headerTitle: 'Assignments',
  headerDescription: "Students' tasks to be reviewed by you.",
  withHeaderPrevButton: false,
  actionsNumber: 10,
};

Teacher.story = {
  parameters: {
    nextRouter: {
      pathname: '/teacher/assignments',
    },
  },
};
