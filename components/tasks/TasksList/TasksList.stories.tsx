import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TasksList } from './TasksList';
import {
  sampleAttempts,
  sampleModule,
  sampleTasks,
} from '../../../lib/constants';

export default {
  title: 'Tasks/TasksList',
  component: TasksList,
} as ComponentMeta<typeof TasksList>;

const Template: ComponentStory<typeof TasksList> = args => (
  <TasksList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  module: sampleModule,
  tasks: [
    { task_data: sampleTasks[0], last_attempt: sampleAttempts[0] },
    { task_data: sampleTasks[1], last_attempt: sampleAttempts[1] },
  ],
  tasksPathPrefix: '/student/tasks',
  currentTask: { task_data: sampleTasks[0], last_attempt: sampleAttempts[0] },
};
