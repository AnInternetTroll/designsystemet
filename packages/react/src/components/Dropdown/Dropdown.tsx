import cl from 'clsx/lite';
import { forwardRef } from 'react';

import type { Placement } from '@floating-ui/react';
import type { DefaultProps } from '../../types';
import type { Merge } from '../../utilities';
import { Popover } from '../Popover';
import type { PopoverProps } from '../Popover';

export type DropdownProps = Merge<
  DefaultProps & Omit<PopoverProps, 'variant'>,
  {
    /** The placement of the dropdown
     * @default bottom-end
     */
    placement?: Placement;
  }
>;

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  function DropdownContent(
    { placement = 'bottom-end', className, ...rest },
    ref,
  ) {
    return (
      <Popover
        className={cl('ds-dropdown', className)}
        placement={placement}
        ref={ref}
        {...rest}
      />
    );
  },
);
