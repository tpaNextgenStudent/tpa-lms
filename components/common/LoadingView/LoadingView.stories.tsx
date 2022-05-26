import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoadingView } from './LoadingView';

export default {
  title: 'Layout/LoadingView',
  component: LoadingView,
} as ComponentMeta<typeof LoadingView>;

const Template: ComponentStory<typeof LoadingView> = args => (
  <LoadingView {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isLoading: true,
  children: 'Content in background',
};
