import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CTAButton } from './CTAButton';

export default {
  title: 'Inputs/CTAButton',
  component: CTAButton,
} as ComponentMeta<typeof CTAButton>;

const Template: ComponentStory<typeof CTAButton> = args => (
  <CTAButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  text: 'Mark as read',
  styleType: 'primary',
  isDisabled: false,
  type: 'button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Mark as read',
  styleType: 'secondary',
  isDisabled: false,
  type: 'button',
};
