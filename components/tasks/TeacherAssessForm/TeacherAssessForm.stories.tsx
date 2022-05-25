import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TeacherAssessForm } from './TeacherAssessForm';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Teacher/TeacherAssessForm',
  component: TeacherAssessForm,
} as ComponentMeta<typeof TeacherAssessForm>;

const Template: ComponentStory<typeof TeacherAssessForm> = args => (
  <div style={{ height: 350, display: 'flex', alignItems: 'flex-end' }}>
    <div
      style={{
        position: 'relative',
        marginTop: 'auto',
        width: '100%',
      }}
    >
      <TeacherAssessForm {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  closePanel: action('closePanel'),
};
