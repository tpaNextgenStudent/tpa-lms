import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserNameCell } from './UserNameCell';

export default {
  title: 'Tables/UserNameCell',
  component: UserNameCell,
  parameters: { controls: { exclude: ['img'] } },
} as ComponentMeta<typeof UserNameCell>;

const Template: ComponentStory<typeof UserNameCell> = args => (
  <UserNameCell {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'John Doe',
  login: 'johndoe',
  id: 'userId',
};

export const WithoutId = Template.bind({});
WithoutId.args = {
  name: 'John Doe',
  login: 'johndoe',
};
