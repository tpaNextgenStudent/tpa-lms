import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfileTeacherInfo } from './ProfileTeacherInfo';

export default {
  title: 'Common/ProfileTeacherInfo',
  component: ProfileTeacherInfo,
} as ComponentMeta<typeof ProfileTeacherInfo>;

const Template: ComponentStory<typeof ProfileTeacherInfo> = args => (
  <ProfileTeacherInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'John Doe',
  avatar: null,
};
