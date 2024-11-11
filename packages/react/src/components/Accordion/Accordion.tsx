import type { Color } from '@digdir/designsystemet-react/colors';
import cl from 'clsx/lite';
import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export type AccordionProps = {
  /**
   * Accordion background color
   * @default neutral
   */
  'data-color'?: 'subtle' | Color;
  /**
   * Show border
   * @default false
   **/
  border?: boolean;
  /** Instances of `Accordion.Item` */
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Accordion component, contains `Accordion.Item` components.
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(
    { border = false, 'data-color': color = 'neutral', className, ...rest },
    ref,
  ) {
    return (
      <div
        className={cl('ds-accordion-group', className)}
        data-border={border || undefined} /* Fallback to  */
        data-color={color}
        ref={ref}
        {...rest}
      />
    );
  },
);
