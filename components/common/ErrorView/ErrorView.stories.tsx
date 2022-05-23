import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ErrorView } from './ErrorView';
import { LoadingProvider } from '../../../lib/hooks/loadingContext';

export default {
  title: 'Layout/ErrorView',
  component: ErrorView,
  decorators: [
    Story => (
      <LoadingProvider>
        <Story />
      </LoadingProvider>
    ),
  ],
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
