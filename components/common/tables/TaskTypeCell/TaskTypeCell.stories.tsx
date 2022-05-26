import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskTypeCell } from './TaskTypeCell';

export default {
  title: 'Tables/TaskTypeCell',
  component: TaskTypeCell,
} as ComponentMeta<typeof TaskTypeCell>;

const Template: ComponentStory<typeof TaskTypeCell> = args => (
  <TaskTypeCell {...args} />
);

export const Code = Template.bind({});
Code.args = {
  type: 'code',
};

export const Info = Template.bind({});
Info.args = {
  type: 'info',
};
