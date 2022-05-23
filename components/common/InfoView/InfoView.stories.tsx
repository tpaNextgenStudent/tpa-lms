import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InfoView } from './InfoView';
import { MechanicRobotAnimation } from '../MechanicRobotAnimation/MechanicRobotAnimation';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Layout/InfoView',
  component: InfoView,
} as ComponentMeta<typeof InfoView>;

const Template: ComponentStory<typeof InfoView> = args => (
  <InfoView {...args}>
    <MechanicRobotAnimation />
  </InfoView>
);

export const Default = Template.bind({});
Default.args = {
  title: [
    '*We are setting up a space for you.*',
    '*It might take up to a few minutes.*',
  ],
  description: 'Thank you for your patience.',
  button: {
    text: 'Refresh',
    onClick: action('onClick'),
  },
  tabTitle: '-',
};
Default.story = {
  parameters: {
    nextRouter: {
      pathname: '/student/tasks/[module]/[task]',
    },
  },
};
