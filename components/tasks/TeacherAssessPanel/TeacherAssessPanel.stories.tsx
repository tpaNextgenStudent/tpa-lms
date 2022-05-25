import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TeacherAssessPanel } from './TeacherAssessPanel';

export default {
  title: 'Teacher/TeacherAssessPanel',
  component: TeacherAssessPanel,
} as ComponentMeta<typeof TeacherAssessPanel>;

const Template: ComponentStory<typeof TeacherAssessPanel> = args => (
  <TeacherAssessPanel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  nextAttempt: { next_attempt_id: 'attemptId', assessments_number: 4 },
};

export const WithoutNextTasks = Template.bind({});
WithoutNextTasks.args = {
  nextAttempt: { next_attempt_id: null, assessments_number: 0 },
};
