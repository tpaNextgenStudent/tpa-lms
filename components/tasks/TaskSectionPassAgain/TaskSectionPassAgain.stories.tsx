import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskSectionPassAgain } from './TaskSectionPassAgain';
import { sampleModule, sampleTask } from '../../../lib/constants';

export default {
  title: 'Tasks/TaskSectionPassAgain',
  component: TaskSectionPassAgain,
} as ComponentMeta<typeof TaskSectionPassAgain>;

const Template: ComponentStory<typeof TaskSectionPassAgain> = args => (
  <TaskSectionPassAgain {...args} />
);

export const Default = Template.bind({});
Default.args = {
  task: sampleTask,
  module: sampleModule,
};
