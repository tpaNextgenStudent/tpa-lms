import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GradesLegend } from './GradesLegend';

export default {
  title: 'Teacher/GradesLegend',
  component: GradesLegend,
  parameters: { controls: { exclude: ['className'] } },
} as ComponentMeta<typeof GradesLegend>;

const Template: ComponentStory<typeof GradesLegend> = args => (
  <GradesLegend {...args} />
);

export const Default = Template.bind({});
Default.args = {};
