import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { NativeSelect } from './NativeSelect';

export default {
  title: 'Kjernekomponenter/NativeSelect',
  component: NativeSelect,
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Normal: StoryFn<typeof NativeSelect> = (args) => (
  <NativeSelect {...args}>
    <option value='blank'>Velg &hellip;</option>
    <option value='everest'>Mount Everest</option>
    <option value='aconcagua'>Aconcagua</option>
    <option value='denali'>Denali</option>
    <option value='kilimanjaro'>Kilimanjaro</option>
    <option value='elbrus'>Elbrus</option>
    <option value='vinson'>Mount Vinson</option>
    <option value='puncakjaya'>Puncak Jaya</option>
    <option value='kosciuszko'>Mount Kosciuszko</option>
  </NativeSelect>
);

Normal.args = {
  label: 'Velg et fjell',
};

export const Disabled: StoryFn<typeof NativeSelect> = (args) => (
  <NativeSelect {...args}>
    <option value='blank'>Velg &hellip;</option>
    <option value='everest'>Mount Everest</option>
    <option value='aconcagua'>Aconcagua</option>
    <option value='denali'>Denali</option>
    <option value='kilimanjaro'>Kilimanjaro</option>
    <option value='elbrus'>Elbrus</option>
    <option value='vinson'>Mount Vinson</option>
    <option value='puncakjaya'>Puncak Jaya</option>
    <option value='kosciuszko'>Mount Kosciuszko</option>
  </NativeSelect>
);

Disabled.args = {
  label: 'Velg et fjell',
  disabled: true,
};

export const Error: StoryFn<typeof NativeSelect> = (args) => (
  <NativeSelect {...args}>
    <option value='blank'>Velg &hellip;</option>
    <option value='everest'>Mount Everest</option>
    <option value='aconcagua'>Aconcagua</option>
    <option value='denali'>Denali</option>
    <option value='kilimanjaro'>Kilimanjaro</option>
    <option value='elbrus'>Elbrus</option>
    <option value='vinson'>Mount Vinson</option>
    <option value='puncakjaya'>Puncak Jaya</option>
    <option value='kosciuszko'>Mount Kosciuszko</option>
  </NativeSelect>
);

Error.args = {
  label: 'Velg et fjell',
  isValid: false,
};

export const Multiple: StoryFn<typeof NativeSelect> = (args) => (
  <NativeSelect {...args}>
    <option value='everest'>Mount Everest</option>
    <option value='aconcagua'>Aconcagua</option>
    <option value='denali'>Denali</option>
    <option value='kilimanjaro'>Kilimanjaro</option>
    <option value='elbrus'>Elbrus</option>
    <option value='vinson'>Mount Vinson</option>
    <option value='puncakjaya'>Puncak Jaya</option>
    <option value='kosciuszko'>Mount Kosciuszko</option>
  </NativeSelect>
);

Multiple.args = {
  label: 'Velg fjell',
  multiple: true,
};
