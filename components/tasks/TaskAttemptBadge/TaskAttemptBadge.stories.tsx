import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskAttemptBadge } from './TaskAttemptBadge';

export default {
  title: 'Tasks/TaskAttemptBadge',
  component: TaskAttemptBadge,
} as ComponentMeta<typeof TaskAttemptBadge>;

const Template: ComponentStory<typeof TaskAttemptBadge> = args => (
  <TaskAttemptBadge {...args} />
);

export const Default = Template.bind({});
Default.args = {
  attempt: 1,
};

export const Circle = Template.bind({});
Circle.args = {
  attempt: 1,
  styleType: 'circle',
};

export const TextOutside = Template.bind({});
TextOutside.args = {
  attempt: 1,
  styleType: 'text-outside',
};
