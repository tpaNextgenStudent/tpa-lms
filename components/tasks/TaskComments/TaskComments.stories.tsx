import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskComments } from './TaskComments';
import { sampleComments } from '../../../lib/constants';

export default {
  title: 'Tasks/TaskComments',
  component: TaskComments,
} as ComponentMeta<typeof TaskComments>;

const Template: ComponentStory<typeof TaskComments> = args => (
  <TaskComments {...args} />
);

export const Default = Template.bind({});
Default.args = {
  comments: sampleComments,
};
