import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TasksMenu } from './TasksMenu';
import {
  sampleAttempts,
  sampleModules,
  sampleTasks,
} from '../../../lib/constants';

export default {
  title: 'Tasks/TasksMenu',
  component: TasksMenu,
} as ComponentMeta<typeof TasksMenu>;

const Template: ComponentStory<typeof TasksMenu> = args => (
  <TasksMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  task: { task_data: sampleTasks[0], last_attempt: sampleAttempts[0] },
  tasksPathPrefix: '/student/tasks',
  module: sampleModules[0],
  modules: sampleModules,
  tasks: [
    { task_data: sampleTasks[0], last_attempt: sampleAttempts[0] },
    { task_data: sampleTasks[1], last_attempt: sampleAttempts[1] },
  ],
};
