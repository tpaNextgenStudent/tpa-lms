import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Toast } from './Toast';

export default {
  title: 'Common/Toast',
  component: Toast,
  parameters: { controls: { exclude: ['onCloseClick'] } },
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = args => <Toast {...args} />;

export const Default = Template.bind({});
Default.args = {
  message:
    'Remember we count the number of your attempts. Before submitting the task,please, review it thoroughly.',
};
