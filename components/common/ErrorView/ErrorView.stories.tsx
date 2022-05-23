import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ErrorView } from './ErrorView';

export default {
  title: 'Layout/ErrorView',
  component: ErrorView,
} as ComponentMeta<typeof ErrorView>;

const Template: ComponentStory<typeof ErrorView> = args => (
  <ErrorView {...args} />
);

export const Base = Template.bind({});
Base.args = {
  title: '*Oops!*',
  description: '*Something went wrong*',
  button: { text: 'Back to home page', onClick: () => {} },
  code: 404,
};
Base.story = {
  parameters: {
    nextRouter: {
      pathname: '/student/tasks/[module]/[task]',
    },
  },
};
