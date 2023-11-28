import React, { forwardRef, type HTMLAttributes } from 'react';
import cn from 'classnames';

import classes from './Card.module.css';

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, ...rest }, ref) => (
    <div
      {...rest}
      className={cn(classes.content, rest.className)}
      ref={ref}
    >
      {children}
    </div>
  ),
);
