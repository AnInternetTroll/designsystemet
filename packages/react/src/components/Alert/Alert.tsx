import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { Color, DefaultProps } from '../../types';

export type AlertProps = {
  /**
   * Sets color and icon.
   * @default info
   */
  color?: Color;
} & HTMLAttributes<HTMLDivElement> &
  DefaultProps;

/**
 * Alerts are used to inform users about important information, warnings, errors, or success.
 * @example
 * <Alert color='info'>Dette er en informasjonsmelding</Alert>
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { color = 'info', className, ...rest },
  ref,
) {
  return (
    <div
      className={cl('ds-alert', className)}
      data-color={color}
      ref={ref}
      {...rest}
    />
  );
});
