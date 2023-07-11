import type { ButtonHTMLAttributes } from 'react';
import React, { forwardRef } from 'react';
import cn from 'classnames';
import { CheckmarkIcon } from '@navikt/aksel-icons';

import type { OverridableComponent } from '../../types/OverridableComponent';

import classes from './Chip.module.css';
import { ChipButton, type ChipButtonProps } from './_ChipButton';

export type ChipProps = ChipButtonProps & {
  /**
   * Condition if the check mark icon should be displayed
   */
  checkmark?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Chip: OverridableComponent<ChipProps, HTMLButtonElement> =
  forwardRef(
    (
      {
        children,
        checkmark = false,
        selected = false,
        size = 'small',
        ...rest
      },
      ref,
    ) => {
      const shouldDisplayCheckmark = checkmark && selected;
      return (
        <ChipButton
          {...rest}
          size={size}
          ref={ref}
          selected={selected}
          className={cn(
            { [classes.spacing]: shouldDisplayCheckmark },
            rest.className,
          )}
        >
          {shouldDisplayCheckmark && (
            <CheckmarkIcon
              className={classes.checkmarkIcon}
              aria-hidden
            />
          )}
          <span>{children}</span>
        </ChipButton>
      );
    },
  );
