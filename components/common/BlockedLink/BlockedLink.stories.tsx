import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BlockedLink } from './BlockedLink';
import { Default } from '../GithubNameLink/GithubNameLink.stories';

export default {
  title: 'Utils/BlockedLink',
  component: BlockedLink,
  parameters: {
    controls: { exclude: ['className'] },
  },
} as ComponentMeta<typeof BlockedLink>;

const Template: ComponentStory<typeof BlockedLink> = args => (
  <BlockedLink {...args} />
);

export const Unblocked = Template.bind({});
Unblocked.args = {
  href: '/',
  isBlocked: false,
  children: 'Link to home',
};

export const Blocked = Template.bind({});
Blocked.args = {
  href: '/',
  isBlocked: true,
  children: 'Not able to click',
};
