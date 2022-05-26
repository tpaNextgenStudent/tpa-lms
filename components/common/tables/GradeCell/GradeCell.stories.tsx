import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GradeCell } from './GradeCell';

export default {
  title: 'Tables/GradeCell',
  component: GradeCell,
} as ComponentMeta<typeof GradeCell>;

const Template: ComponentStory<typeof GradeCell> = args => (
  <GradeCell {...args} />
);

export const Upcoming = Template.bind({});
Upcoming.args = {
  grade: { score: null, attempt_number: 0, status: 'upcoming' },
};

export const Approved = Template.bind({});
Approved.args = {
  grade: { score: null, attempt_number: 1, status: 'approved' },
};

export const Approved2 = Template.bind({});
Approved2.args = {
  grade: { score: 2, attempt_number: 1, status: 'approved' },
};

export const Approved3 = Template.bind({});
Approved3.args = {
  grade: { score: 3, attempt_number: 2, status: 'approved' },
};

export const InReview = Template.bind({});
InReview.args = {
  grade: { score: null, attempt_number: 1, status: 'in review' },
};

export const Failed = Template.bind({});
Failed.args = {
  grade: { score: 1, attempt_number: 3, status: 'in progress' },
};
