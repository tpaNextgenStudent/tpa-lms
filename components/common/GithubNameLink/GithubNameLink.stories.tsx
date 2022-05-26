import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GithubNameLink } from './GithubNameLink';

export default {
  title: 'Common/GithubNameLink',
  component: GithubNameLink,
  parameters: {
    controls: { exclude: ['className'] },
  },
} as ComponentMeta<typeof GithubNameLink>;

const Template: ComponentStory<typeof GithubNameLink> = args => (
  <GithubNameLink {...args} />
);

export const Default = Template.bind({});
Default.args = {
  login: 'JohnDoe',
};
