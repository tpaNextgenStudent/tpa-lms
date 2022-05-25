import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from './Box';
import colors from '../../../lib/styles/variables/colors.module.scss';

export default {
  title: 'Styles/Colors',
  component: Box,
} as ComponentMeta<typeof Box>;

const colorGroups = [
  {
    name: 'main',
    colors: [
      { name: 'purplePrimary', value: colors.purplePrimary },
      { name: 'purpleSecondary', value: colors.purpleSecondary },
      { name: 'fontPrimary', value: colors.fontPrimary },
      { name: 'fontSecondary', value: colors.fontSecondary },
    ],
  },
  {
    name: 'Background & Strokes',
    colors: [
      { name: 'bgMain', value: colors.bgMain },
      { name: 'strokeMain', value: colors.strokeMain },
      { name: 'strokeLines', value: colors.strokeLines },
      { name: 'bgInactive', value: colors.bgInactive },
    ],
  },
  {
    name: 'Statuses',
    colors: [
      { name: 'statusFontGreen', value: colors.statusFontGreen },
      { name: 'statusFontOrange', value: colors.statusFontOrange },
      { name: 'statusFontBlue', value: colors.statusFontBlue },
      { name: 'statusFontRed', value: colors.statusFontRed },
      { name: 'statusBgGreen', value: colors.statusBgGreen },
      { name: 'statusBgOrange', value: colors.statusBgOrange },
      { name: 'statusBgBlue', value: colors.statusBgBlue },
      { name: 'statusBgRed', value: colors.statusBgRed },
    ],
  },
];

const Template: ComponentStory<typeof Box> = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {colorGroups.map(({ name, colors }) => (
        <div key={name}>
          <h3
            style={{
              textTransform: 'uppercase',
              marginBottom: 16,
              marginTop: 48,
            }}
          >
            {name}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: 48,
            }}
            key={name}
          >
            {colors.map(color => (
              <Box key={color.name} color={color.value} text={color.name} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const Default = Template.bind({});
