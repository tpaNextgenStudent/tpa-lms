import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from './Table';

export default {
  title: 'Tables/Table',
  component: Table,
  parameters: { controls: { exclude: ['id', 'className'] } },
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = args => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: [
    { Header: 'First name', accessor: 'firstname' },
    { Header: 'Last name', accessor: 'lastname' },
    { Header: 'Age', accessor: 'age' },
  ],
  data: [
    { firstname: 'Sergio', lastname: 'Aguero', age: 36 },
    { firstname: 'Kevin', lastname: 'De Bruyne', age: 26 },
    { firstname: 'Raheem', lastname: 'Sterling', age: 28 },
  ],
};
