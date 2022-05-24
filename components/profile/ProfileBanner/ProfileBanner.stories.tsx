import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfileBanner } from './ProfileBanner';

export default {
  title: 'Common/ProfileBanner',
  component: ProfileBanner,
} as ComponentMeta<typeof ProfileBanner>;

const Template: ComponentStory<typeof ProfileBanner> = args => (
  <ProfileBanner {...args} />
);

export const Default = Template.bind({});
