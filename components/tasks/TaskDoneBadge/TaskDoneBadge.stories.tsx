import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskDoneBadge } from './TaskDoneBadge';

export default {
  title: 'Tasks/Badges/TaskDoneBadge',
  component: TaskDoneBadge,
} as ComponentMeta<typeof TaskDoneBadge>;

const Template: ComponentStory<typeof TaskDoneBadge> = args => (
  <TaskDoneBadge {...args} />
);

export const Default = Template.bind({});
Default.args = {
  withBorder: false,
};

export const WithBorder = Template.bind({});
WithBorder.args = {
  withBorder: true,
};
