import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from './Box';
import shadowsVars from '../../../lib/styles/variables/shadows.module.scss';

export default {
  title: 'Styles/Shadows',
  component: Box,
} as ComponentMeta<typeof Box>;

const shadows = [
  { name: 'primary', value: shadowsVars.primary },
  { name: 'secondary', value: shadowsVars.secondary },
  { name: 'navbar', value: shadowsVars.navbar },
  { name: 'image', value: shadowsVars.image },
];

const Template: ComponentStory<typeof Box> = () => {
  return (
    <div>
      <h3
        style={{
          textTransform: 'uppercase',
          marginBottom: 16,
          marginTop: 48,
        }}
      >
        shadows
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 48,
        }}
      >
        {shadows.map(shadow => (
          <Box
            key={shadow.name}
            color="white"
            shadow={shadow.value}
            text={shadow.name}
          />
        ))}
      </div>
    </div>
  );
};

export const Default = Template.bind({});
