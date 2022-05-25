import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskStatusBadge } from './TaskStatusBadge';

export default {
  title: 'Tasks/Badges/TaskStatusBadge',
  component: TaskStatusBadge,
} as ComponentMeta<typeof TaskStatusBadge>;

const Template: ComponentStory<typeof TaskStatusBadge> = args => (
  <TaskStatusBadge {...args} />
);

export const Upcoming = Template.bind({});
Upcoming.args = {
  status: 'upcoming',
};

export const InProgress = Template.bind({});
InProgress.args = {
  status: 'in progress',
};

export const InReview = Template.bind({});
InReview.args = {
  status: 'in review',
};

export const Approved = Template.bind({});
Approved.args = {
  status: 'approved',
};
