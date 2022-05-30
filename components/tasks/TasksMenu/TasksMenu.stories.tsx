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
  tasksPathPrefix: '/student/tasks',
};
