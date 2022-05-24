import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskBadges } from './TaskBadges';

export default {
  title: 'Tasks/TaskBadges',
  component: TaskBadges,
  parameters: { controls: { exclude: ['className'] } },
} as ComponentMeta<typeof TaskBadges>;

const Template: ComponentStory<typeof TaskBadges> = args => (
  <TaskBadges {...args} />
);

export const CodeUpcoming = Template.bind({});
CodeUpcoming.args = {
  task: { name: '', description: '', type: 'code' },
  attempt: { attempt_number: null, status: 'upcoming', score: null },
  badges: ['type', 'status', 'score'],
  config: { score: { withBorder: true } },
};

export const CodeApproved2 = Template.bind({});
CodeApproved2.args = {
  task: { name: '', description: '', type: 'code' },
  attempt: { attempt_number: 1, status: 'approved', score: 2 },
  badges: ['type', 'status', 'score'],
  config: { score: { withBorder: true } },
};

export const CodeApproved3 = Template.bind({});
CodeApproved3.args = {
  task: { name: '', description: '', type: 'code' },
  attempt: { attempt_number: 2, status: 'approved', score: 3 },
  badges: ['type', 'status', 'score'],
  config: { score: { withBorder: true } },
};

export const CodeFailed = Template.bind({});
CodeFailed.args = {
  task: { name: '', description: '', type: 'code' },
  attempt: { attempt_number: 1, status: 'in progress', score: 1 },
  badges: ['type', 'status', 'score'],
  config: { score: { withBorder: true } },
};

export const CodeInReview = Template.bind({});
CodeInReview.args = {
  task: { name: '', description: '', type: 'code' },
  attempt: { attempt_number: 1, status: 'in review', score: null },
  badges: ['type', 'status', 'score'],
  config: { score: { withBorder: true } },
};

export const InfoApproved = Template.bind({});
InfoApproved.args = {
  task: { name: '', description: '', type: 'info' },
  attempt: { attempt_number: 1, status: 'approved', score: null },
  badges: ['type', 'status', 'score'],
  config: { score: { withBorder: true } },
};

export const InfoUpcoming = Template.bind({});
InfoUpcoming.args = {
  task: { name: '', description: '', type: 'info' },
  attempt: { attempt_number: null, status: 'upcoming', score: null },
  badges: ['type', 'status', 'score'],
  config: { score: { withBorder: true } },
};

export const CustomOrder = Template.bind({});
CustomOrder.args = {
  task: { name: '', description: '', type: 'code' },
  attempt: { attempt_number: 2, status: 'approved', score: 3 },
  badges: ['score', 'type', 'attempt', 'status'],
  config: {
    score: { withBorder: true, withText: true },
    attempt: { styleType: 'circle' },
  },
};
