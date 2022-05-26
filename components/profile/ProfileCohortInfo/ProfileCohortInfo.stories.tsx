import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfileCohortInfo } from './ProfileCohortInfo';

export default {
  title: 'Common/ProfileCohortInfo',
  component: ProfileCohortInfo,
} as ComponentMeta<typeof ProfileCohortInfo>;

const Template: ComponentStory<typeof ProfileCohortInfo> = args => (
  <ProfileCohortInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'tpa-toyota-05',
  progressLink: '/',
  numberOfStudents: 17,
};

export const WithoutLink = Template.bind({});
WithoutLink.args = {
  name: 'tpa-toyota-05',
  numberOfStudents: 17,
};
