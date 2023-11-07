import React from 'react';
import { render as renderRtl, screen } from '@testing-library/react';

import type { OverridableComponent } from '../../types/OverridableComponent';

import type { BoxProps } from './Box';
import { Box } from './Box';

const render = (
  props?: Partial<OverridableComponent<BoxProps, HTMLDivElement>>,
) =>
  renderRtl(
    <Box
      {...props}
      title='box'
    />,
  );

describe('Box', () => {
  it('should render a div with default classname', () => {
    render();
    const box = screen.getByTitle('box');

    expect(box.classList).toContain('box');
  });

  it('should render a div with correct classname when shadow is xsmall', () => {
    render({ shadow: 'xsmall' });
    const box = screen.getByTitle('box');

    expect(box.classList).toContain('xsmallShadow');
  });

  it('should render a div with correct classname when borderColor is subtle', () => {
    render({ borderColor: 'subtle' });
    const box = screen.getByTitle('box');

    expect(box.classList).toContain('subtleBorderColor');
  });

  it('should render a div with correct classname when borderRadius is small', () => {
    render({ borderRadius: 'small' });
    const box = screen.getByTitle('box');

    expect(box.classList).toContain('smallBorderRadius');
  });

  it('should render the box as a header', () => {
    render({ as: 'button' });
    const box = screen.getByTitle('box');

    expect(box.tagName).toBe('BUTTON');
  });
});
