import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskComment } from './TaskComment';
import { sampleComments } from '../../../lib/constants';

export default {
  title: 'Tasks/TaskComment',
  component: TaskComment,
} as ComponentMeta<typeof TaskComment>;

const Template: ComponentStory<typeof TaskComment> = args => (
  <TaskComment {...args} />
);

export const Default = Template.bind({});
Default.args = {
  comment: sampleComments[0],
};
