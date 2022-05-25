import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskSectionModuleInfo } from './TaskSectionModuleInfo';
import { sampleModule } from '../../../lib/constants';

export default {
  title: 'Tasks/TaskSectionModuleInfo',
  component: TaskSectionModuleInfo,
} as ComponentMeta<typeof TaskSectionModuleInfo>;

const Template: ComponentStory<typeof TaskSectionModuleInfo> = args => (
  <TaskSectionModuleInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  module: sampleModule,
};
