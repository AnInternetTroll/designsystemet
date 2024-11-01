import type { Meta } from '@storybook/react';
import type { UseRadioGroupProps } from './useRadioGroup';

export const UseRadioGroup = (props: UseRadioGroupProps) => null;

export default {
  title: 'Komponenter/Radio/useRadioGroup',
  tags: ['!dev'], // Hide from sidebar as documented in https://storybook.js.org/docs/writing-stories/tags
  component: UseRadioGroup,
  argTypes: {
    name: {
      table: { type: { summary: 'string' } },
      description:
        'Name of all radios. If no name is passed, a autogenerated name will be created.',
    },
    value: {
      description: 'Value of selected radio',
      table: { defaultValue: { summary: '' }, type: { summary: 'string' } },
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Disabled state of all radios',
    },
    readOnly: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Read only state of all radios',
    },
  },
} as Meta;
