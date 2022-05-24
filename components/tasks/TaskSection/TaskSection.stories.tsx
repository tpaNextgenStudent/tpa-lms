import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskSection } from './TaskSection';
import {
  sampleComments,
  sampleModule,
  sampleTask,
} from '../../../lib/constants';

export default {
  title: 'Tasks/TaskSection',
  component: TaskSection,
} as ComponentMeta<typeof TaskSection>;

const Template: ComponentStory<typeof TaskSection> = args => (
  <TaskSection {...args} />
);

export const Default = Template.bind({});
const args = {
  attempt: {
    status: 'in progress' as const,
    attempt_number: 1,
    score: null,
    answer: null,
  },
  task: sampleTask,
  module: sampleModule,
  comments: [sampleComments[0]],
  nextAttempt: null,
  isTaskActionVisible: true,
};
Default.args = args;

export const CommentsTab = Template.bind({});
CommentsTab.args = args;
CommentsTab.story = {
  parameters: {
    nextRouter: {
      query: { view: 'comments' },
    },
  },
};
