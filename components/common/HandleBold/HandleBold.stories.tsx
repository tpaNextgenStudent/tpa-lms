import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HandleBold } from './HandleBold';

export default {
  title: 'Utils/HandleBold',
  component: HandleBold,
} as ComponentMeta<typeof HandleBold>;

const Template: ComponentStory<typeof HandleBold> = args => (
  <HandleBold {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Text is *bolded* :D',
};
