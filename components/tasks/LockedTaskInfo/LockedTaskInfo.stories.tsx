import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LockedTaskInfo } from './LockedTaskInfo';

export default {
  title: 'Common/LockedTaskInfo',
  component: LockedTaskInfo,
} as ComponentMeta<typeof LockedTaskInfo>;

const Template: ComponentStory<typeof LockedTaskInfo> = args => (
  <LockedTaskInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content: 'Finish previous task to unlock this content',
};
