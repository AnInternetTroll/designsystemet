import React, { forwardRef, type HTMLAttributes } from 'react';
import cn from 'classnames';

import classes from './Card.module.css';

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, ...rest }, ref) => (
    <div
      {...rest}
      className={cn(classes.header, rest.className)}
      ref={ref}
    >
      {children}
    </div>
  ),
);
