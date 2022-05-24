import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoadingAnimation } from './LoadingAnimation';

export default {
  title: 'Common/LoadingAnimation',
  component: LoadingAnimation,
} as ComponentMeta<typeof LoadingAnimation>;

const Template: ComponentStory<typeof LoadingAnimation> = args => (
  <LoadingAnimation {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Big = Template.bind({});
Big.args = {
  size: 200,
};
