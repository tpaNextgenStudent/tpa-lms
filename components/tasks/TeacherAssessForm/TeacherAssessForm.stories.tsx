import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TeacherAssessForm } from './TeacherAssessForm';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Teacher/TeacherAssessForm',
  component: TeacherAssessForm,
} as ComponentMeta<typeof TeacherAssessForm>;

const Template: ComponentStory<typeof TeacherAssessForm> = args => (
  <TeacherAssessForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  closePanel: action('closePanel'),
};
