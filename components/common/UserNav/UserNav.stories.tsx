import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserNav } from './UserNav';
import { sampleUser } from '../../../lib/constants';
import { LoadingProvider } from '../../../lib/hooks/loadingContext';

export default {
  title: 'Common/UserNav',
  component: UserNav,
} as ComponentMeta<typeof UserNav>;

const Template: ComponentStory<typeof UserNav> = args => (
  <LoadingProvider>
    <UserNav {...args} />
  </LoadingProvider>
);

export const Default = Template.bind({});
Default.args = { user: sampleUser };
