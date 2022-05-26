import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CustomSelect } from './CustomSelect';
import { action } from '@storybook/addon-actions';

const sampleOptions = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' },
  { label: 'Three', value: '3' },
  { label: 'Four', value: '4' },
  { label: 'Five', value: '5' },
];

const initialValue = sampleOptions[0];

export default {
  title: 'Inputs/CustomSelect',
  component: CustomSelect,
  args: { handleChange: action('select option changed') },
  argTypes: {
    value: {
      options: sampleOptions.map(({ label }) => label),
      mapping: sampleOptions.reduce((acc, curr) => {
        return { ...acc, [curr.label]: curr };
      }, {}),
    },
  },
  parameters: {
    controls: { exclude: ['className', 'handleChange'] },
  },
} as ComponentMeta<typeof CustomSelect>;

const Template: ComponentStory<typeof CustomSelect> = args => (
  <div style={{ marginTop: 200, minHeight: 300 }}>
    <CustomSelect {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  id: 'custom-select-example',
  options: sampleOptions,
  value: initialValue,
  openSelectToTop: false,
};

export const ToTop = Template.bind({});
ToTop.args = {
  id: 'custom-select-example-to-top',
  options: sampleOptions,
  value: initialValue,
  openSelectToTop: true,
};
