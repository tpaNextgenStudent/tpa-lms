import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CodeAction } from './CodeAction';

export default {
  title: 'Tasks/CodeAction',
  component: CodeAction,
  parameters: { controls: { exclude: ['sizeRef'] } },
} as ComponentMeta<typeof CodeAction>;

const Template: ComponentStory<typeof CodeAction> = args => (
  <CodeAction {...args} />
);

export const Code = Template.bind({});
Code.args = {
  task: {
    id: 'taskId',
    name: 'Task Name',
    description: 'Task description',
    link: 'https://github.com/path/to/repository/with/task',
    type: 'code',
  },
};
