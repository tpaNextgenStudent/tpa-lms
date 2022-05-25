import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Box } from './Box';
import fontsVars from '../../../lib/styles/variables/fonts.module.scss';

export default {
  title: 'Styles/Fonts',
};

const fontWeights = [
  { value: fontsVars.weightRegular },
  { value: fontsVars.weightMedium },
  { value: fontsVars.weightBold },
];

const fontSizes = [
  { size: 10, lineHeight: 16 },
  { size: 12, lineHeight: 16 },
  { size: 12, lineHeight: 24 },
  { size: 14, lineHeight: 24 },
  { size: 16, lineHeight: 20 },
  { size: 16, lineHeight: 24 },
  { size: 16, lineHeight: 28 },
  { size: 24, lineHeight: 40 },
];

const Template: ComponentStory<typeof Box> = () => {
  return (
    <div>
      <h2
        style={{
          textTransform: 'uppercase',
          marginBottom: 16,
          marginTop: 48,
        }}
      >
        DM Sans
      </h2>
      <p>{'fontSize/lineHeight (px)'}</p>
      {fontSizes.map(({ size, lineHeight }) => {
        const label = `${size}/${lineHeight}`;
        return (
          <div key={label}>
            <h3 style={{ marginTop: 20, marginBottom: 5 }}>{label}</h3>
            {fontWeights.map(weight => (
              <p
                key={`${label}-${weight.value}`}
                style={{
                  fontWeight: weight.value,
                  lineHeight: `${lineHeight}px`,
                  fontSize: `${size}px`,
                }}
              >
                Placeholder text
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export const Default = Template.bind({});
