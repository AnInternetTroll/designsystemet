import cat1 from '@assets/img/cats/Cat 3.jpg';
import type { Meta, StoryFn } from '@storybook/react';

import { BriefcaseIcon } from '@navikt/aksel-icons';
import { Avatar } from '.';
import { Badge, Dropdown } from '../';

type Story = StoryFn<typeof Avatar>;

const meta: Meta<typeof Avatar> = {
  title: 'Komponenter/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
    customStyles: {
      display: 'flex',
      gap: 'var(--ds-spacing-2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};

export default meta;

export const Preview: Story = (args) => <Avatar {...args} />;

Preview.args = {
  'aria-label': 'Ola Nordmann',
  'data-color': 'accent',
  'data-size': 'md',
  variant: 'circle',
  children: '',
};

export const NoName: Story = () => <Avatar aria-label='Ola' />;

export const Sizes: Story = () => (
  <>
    <Avatar data-size='xs' aria-label='extra small' initials='xs' />
    <Avatar data-size='xs' aria-label='extra small' />
    <Avatar data-size='sm' aria-label='small' initials='sm' />
    <Avatar data-size='sm' aria-label='small' />
    <Avatar aria-label='default' initials='md' />
    <Avatar data-size='md' aria-label='medium' initials='md' />
    <Avatar data-size='md' aria-label='medium' />
    <Avatar data-size='lg' aria-label='large' initials='lg' />
    <Avatar data-size='lg' aria-label='large' />
  </>
);

export const ColorVariants: Story = () => (
  <>
    <Avatar data-color='accent' aria-label='color accent' />
    <Avatar data-color='neutral' aria-label='color neutral' />
    <Avatar data-color='brand1' aria-label='color brand1' />
    <Avatar data-color='brand2' aria-label='color brand2' />
    <Avatar data-color='brand3' aria-label='color brand3' />
  </>
);

export const ShapeVariants: Story = () => (
  <>
    <Avatar variant='circle' aria-label='variant circle' />
    <Avatar variant='square' aria-label='variant square' />
    <Avatar variant='circle' aria-label='Ola Nordman'>
      ON
    </Avatar>
    <Avatar variant='square' aria-label='Ola Nordman'>
      ON
    </Avatar>
  </>
);

export const WithImage: Story = () => (
  <Avatar aria-label='Ola Nordman'>
    <img src={cat1} alt='' />
  </Avatar>
);

export const InDropdown: Story = () => (
  <Dropdown.Context>
    <Dropdown.Trigger variant='tertiary'>
      <Avatar aria-label='Ola Nordmann' data-size='sm'>
        ON
      </Avatar>
      Velg Profil
    </Dropdown.Trigger>
    <Dropdown placement='bottom-end' data-size='md' open>
      <Dropdown.List>
        <Dropdown.Item>
          <Dropdown.Button>
            <Badge overlap='circle' data-color='danger' data-size='sm'>
              <Avatar aria-label='Ola Nordmann' data-size='xs'>
                ON
              </Avatar>
            </Badge>
            Ola Nordmann
          </Dropdown.Button>
        </Dropdown.Item>
        <Dropdown.Item>
          <Dropdown.Button>
            <Avatar
              data-size='xs'
              data-color='brand1'
              aria-label='Sogndal Kommune'
            >
              <BriefcaseIcon aria-hidden />
            </Avatar>
            Sogndal kommune
          </Dropdown.Button>
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  </Dropdown.Context>
);
InDropdown.parameters = {
  layout: 'fullscreen',
  customStyles: {
    height: '320px',
  },
};

export const AsLink: Story = () => (
  <a href='#'>
    <Avatar aria-label='Ola Nordmann' />
  </a>
);
