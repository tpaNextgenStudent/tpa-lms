import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskScoreBadge } from './TaskScoreBadge';

export default {
  title: 'Tasks/Badges/TaskScoreBadge',
  component: TaskScoreBadge,
} as ComponentMeta<typeof TaskScoreBadge>;

const Template: ComponentStory<typeof TaskScoreBadge> = args => (
  <TaskScoreBadge {...args} />
);

export const Default = Template.bind({});
Default.args = {
  score: 3,
};

export const WithBorder = Template.bind({});
WithBorder.args = {
  score: 3,
  withBorder: true,
};

export const WithText = Template.bind({});
WithText.args = {
  score: 3,
  withText: true,
};

export const WithBorderAndText = Template.bind({});
WithBorderAndText.args = {
  score: 3,
  withBorder: true,
  withText: true,
};
