import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskDescription } from './TaskDescription';

export default {
  title: 'Tasks/TaskDescription',
  component: TaskDescription,
} as ComponentMeta<typeof TaskDescription>;

const Template: ComponentStory<typeof TaskDescription> = args => (
  <TaskDescription {...args} />
);

export const Default = Template.bind({});
Default.args = {
  description: `\nTask description content`,
  answer: 'https://github.com/link/to/answer',
  isLocked: false,
};

export const WithoutAnswer = Template.bind({});
WithoutAnswer.args = {
  description: `\nTask description content`,
  isLocked: false,
};

export const Locked = Template.bind({});
Locked.args = {
  description: `\nTask description content`,
  answer: 'https://github.com/link/to/answer',
  isLocked: true,
};
