import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EmptyStateView } from './EmptyStateView';
import NoAssignmentsRobotImg from '../../../public/img/no-assignments-robot.png';
import NoCommentsRobotImg from '../../../public/img/no-comments-robot.png';

export default {
  title: 'Layout/EmptyStateView',
  component: EmptyStateView,
  parameters: {
    controls: { exclude: 'imgSrc' },
  },
} as ComponentMeta<typeof EmptyStateView>;

const Template: ComponentStory<typeof EmptyStateView> = args => (
  <EmptyStateView {...args} />
);

export const NoAssignments = Template.bind({});
NoAssignments.args = {
  message: 'No assignments to be reviewed',
  imgSrc: NoAssignmentsRobotImg,
};

export const NoComments = Template.bind({});
NoComments.args = {
  message: 'Here you will see comments',
  imgSrc: NoCommentsRobotImg,
};
