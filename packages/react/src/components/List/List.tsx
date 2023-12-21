import type { HTMLAttributes, ReactNode } from 'react';
import React, { useId, useMemo } from 'react';
import cl from 'clsx';

import type { HeadingProps } from '../Typography';
import { Heading, Paragraph } from '../Typography';

import classes from './List.module.css';

const HEADING_SIZE_MAP: {
  [key in NonNullable<ListProps['size']>]: HeadingProps['size'];
} = {
  small: 'xxsmall',
  medium: 'xsmall',
  large: 'small',
} as const;

export type ListProps = {
  /**
   * The type of list to render.
   * @default ul
   */
  as?: 'ul' | 'ol';
  /** Changes text sizing
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Heading above the list
   */
  heading?: ReactNode;
  /**
   * Level of the heading
   * @default 2
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
} & HTMLAttributes<HTMLDivElement>;

export const List = ({
  children,
  as = 'ul',
  size = 'medium',
  heading,
  headingLevel = 2,
  ...rest
}: ListProps) => {
  const headingId = useId();

  const headingSize = useMemo(() => HEADING_SIZE_MAP[size], [size]);

  return (
    <div {...rest}>
      {heading && (
        <Heading
          size={headingSize}
          level={headingLevel}
          id={headingId}
          className={classes.heading}
        >
          {heading}
        </Heading>
      )}
      <Paragraph
        as={as}
        size={size}
        className={cl(classes.list)}
        role='list'
        {...(heading ? { 'aria-labelledby': headingId } : {})}
      >
        {children}
      </Paragraph>
    </div>
  );
};
