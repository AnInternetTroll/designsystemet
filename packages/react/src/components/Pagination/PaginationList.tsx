import { Slot } from '@radix-ui/react-slot';
import cl from 'clsx/lite';
import { type HTMLAttributes, forwardRef, useContext } from 'react';

import { PaginationContext } from './PaginationRoot';

export type PaginationListProps = {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * @default false
   */
  asChild?: boolean;
} & Omit<HTMLAttributes<HTMLUListElement>, 'size'>;

export const PaginationList = forwardRef<HTMLUListElement, PaginationListProps>(
  function PaginationList({ asChild, className, ...rest }, ref) {
    const { size } = useContext(PaginationContext);
    const Component = asChild ? Slot : 'ul';

    return (
      <Component
        className={cl('ds-pagination', className)}
        data-size={size}
        ref={ref}
        {...rest}
      />
    );
  },
);
