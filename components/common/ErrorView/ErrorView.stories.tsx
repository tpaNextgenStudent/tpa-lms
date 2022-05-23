import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ErrorView } from './ErrorView';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Layout/ErrorView',
  component: ErrorView,
} as ComponentMeta<typeof ErrorView>;

const Template: ComponentStory<typeof ErrorView> = args => (
  <ErrorView {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: '*Oops!*',
  description: '*Something went wrong*',
  button: {
    text: 'Back to home page',
    onClick: action('onClick'),
  },
  code: 404,
};
Default.story = {
  parameters: {
    nextRouter: {
      pathname: '/student/tasks/[module]/[task]',
    },
  },
};
