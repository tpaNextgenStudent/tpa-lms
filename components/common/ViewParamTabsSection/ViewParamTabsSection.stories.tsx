import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ViewParamTabsSection } from './ViewParamTabsSection';

export default {
  title: 'Common/ViewParamTabsSection',
  component: ViewParamTabsSection,
} as ComponentMeta<typeof ViewParamTabsSection>;

const Template: ComponentStory<typeof ViewParamTabsSection> = args => (
  <ViewParamTabsSection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tabs: {
    description:
      'description content, current tab controlled by ?view query param',
    comments: 'comments content',
    extras: 'extras content',
  },
};
Default.story = {
  parameters: {
    nextRouter: {
      query: { view: undefined },
    },
  },
};

export const SecondTab = Template.bind({});
SecondTab.args = {
  tabs: {
    description: 'description content',
    comments: 'comments content, current tab controlled by ?view query param',
    extras: 'extras content',
  },
};

SecondTab.story = {
  parameters: {
    nextRouter: {
      query: { view: 'comments' },
    },
  },
};
