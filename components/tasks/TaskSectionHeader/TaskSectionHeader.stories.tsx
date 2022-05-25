import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskSectionHeader } from './TaskSectionHeader';
import { sampleTask } from '../../../lib/constants';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Tasks/TaskSectionHeader',
  component: TaskSectionHeader,
} as ComponentMeta<typeof TaskSectionHeader>;

const Template: ComponentStory<typeof TaskSectionHeader> = args => (
  <TaskSectionHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  task: sampleTask,
  isFullScreenMode: false,
  toggleFullScreenMode: action('toggleFullScreenMode'),
};

export const FullScreen = Template.bind({});
FullScreen.args = {
  task: sampleTask,
  isFullScreenMode: true,
  toggleFullScreenMode: action('toggleFullScreenMode'),
};
