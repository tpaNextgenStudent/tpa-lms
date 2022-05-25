import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TasksListItem } from './TasksListItem';
import {
  sampleAttempts,
  sampleModule,
  sampleTasks,
} from '../../../lib/constants';

export default {
  title: 'Tasks/TasksListItem',
  component: TasksListItem,
} as ComponentMeta<typeof TasksListItem>;

const Template: ComponentStory<typeof TasksListItem> = args => (
  <TasksListItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  task: { task_data: sampleTasks[0], last_attempt: sampleAttempts[0] },
  module: sampleModule,
  isActive: true,
  tasksPathPrefix: '/student/tasks',
};
