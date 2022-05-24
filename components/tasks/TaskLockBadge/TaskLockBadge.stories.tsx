import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskLockBadge } from './TaskLockBadge';

export default {
  title: 'Tasks/TaskLockBadge',
  component: TaskLockBadge,
} as ComponentMeta<typeof TaskLockBadge>;

const Template: ComponentStory<typeof TaskLockBadge> = args => (
  <TaskLockBadge {...args} />
);

export const Default = Template.bind({});
