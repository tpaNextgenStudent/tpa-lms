import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InfoAction } from './InfoAction';
import { LoadingProvider } from '../../../lib/hooks/loadingContext';

export default {
  title: 'Tasks/InfoAction',
  component: InfoAction,
  parameters: { controls: { exclude: ['sizeRef'] } },
} as ComponentMeta<typeof InfoAction>;

const Template: ComponentStory<typeof InfoAction> = args => (
  <LoadingProvider>
    <InfoAction {...args} />
  </LoadingProvider>
);

export const Default = Template.bind({});
Default.args = {
  task: {
    id: 'taskId',
    name: 'Task Name',
    description: 'Task description',
    link: 'https://github.com/path/to/repository/with/task',
    type: 'code',
  },
};
