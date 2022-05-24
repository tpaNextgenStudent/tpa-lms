import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextCell } from './TextCell';

export default {
  title: 'Tables/TextCell',
  component: TextCell,
  parameters: { controls: { exclude: ['id'] } },
} as ComponentMeta<typeof TextCell>;

const Template: ComponentStory<typeof TextCell> = args => (
  <TextCell {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: 'This text is very long so it has to break to the next line',
  isBolded: false,
};

export const Bolded = Template.bind({});
Bolded.args = {
  value: 'This text is very long so it has to break to the next line',
  isBolded: true,
};

export const LessWidth = Template.bind({});
LessWidth.args = {
  value: 'This text is very long so it has to break to the next line',
  isBolded: false,
  maxWidth: 100,
};

export const MoreWidth = Template.bind({});
MoreWidth.args = {
  value:
    'This text is very long, but container is too, so it has to break to the next line',
  isBolded: false,
  maxWidth: 700,
};
