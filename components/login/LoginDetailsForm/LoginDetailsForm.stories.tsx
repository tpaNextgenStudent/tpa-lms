import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoginDetailsForm } from './LoginDetailsForm';

export default {
  title: 'Login/LoginDetailsForm',
  component: LoginDetailsForm,
  parameters: { controls: { exclude: ['onSubmit'] } },
} as ComponentMeta<typeof LoginDetailsForm>;

const Template: ComponentStory<typeof LoginDetailsForm> = args => (
  <LoginDetailsForm {...args} />
);

export const Default = Template.bind({});
