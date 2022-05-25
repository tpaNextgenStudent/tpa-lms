import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskTypeBadge } from './TaskTypeBadge';

export default {
  title: 'Tasks/Badges/TaskTypeBadge',
  component: TaskTypeBadge,
} as ComponentMeta<typeof TaskTypeBadge>;

const Template: ComponentStory<typeof TaskTypeBadge> = args => (
  <TaskTypeBadge {...args} />
);

export const Code = Template.bind({});
Code.args = {
  type: 'code',
};

export const Info = Template.bind({});
Info.args = {
  type: 'info',
};
