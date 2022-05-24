import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoginHeroText } from './LoginHeroText';

export default {
  title: 'Login/LoginHeroText',
  component: LoginHeroText,
} as ComponentMeta<typeof LoginHeroText>;

const Template: ComponentStory<typeof LoginHeroText> = args => (
  <LoginHeroText {...args} />
);

export const Default = Template.bind({});
Default.args = {
  titleLines: [
    'Welcome to TechPlayAcademy! 👋',
    '*Learn a professional approach*',
    '*to building software*',
    '*products*',
  ],
  description: 'Start your journey with signing in using your GitHub account.',
};
