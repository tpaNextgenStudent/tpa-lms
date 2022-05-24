import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfileUserInfo } from './ProfileUserInfo';

export default {
  title: 'Common/ProfileUserInfo',
  component: ProfileUserInfo,
} as ComponentMeta<typeof ProfileUserInfo>;

const Template: ComponentStory<typeof ProfileUserInfo> = args => (
  <div style={{ marginTop: 50 }}>
    <ProfileUserInfo {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  login: 'JohnDoe',
  avatar: 'https://unsplash.it/200/200',
  bio: 'I love TypeScript!',
  joinDate: '1 April 2022',
  name: 'John Doe',
};
