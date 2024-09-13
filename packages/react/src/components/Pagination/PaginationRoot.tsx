import { Slot } from '@radix-ui/react-slot';
import { type HTMLAttributes, createContext, forwardRef } from 'react';

import type { PaginationProps } from './Pagination';

type PaginationContextProps = {
  size: NonNullable<PaginationRootProps['size']>;
  compact: boolean;
};

export const PaginationContext = createContext<PaginationContextProps>({
  size: 'md',
  compact: false,
});

export type PaginationRootProps = {
  /**
   * Sets the screen reader label for the Pagination area
   * @default 'Sidenavigering'
   */
  'aria-label'?: string;
  /**
   * Sets the size of the component
   * @default md
   */
  size?: PaginationProps['size'];
  /**
   * Sets how compact the component will be. If true, only 5 steps will show.
   * @default false
   */
  compact?: boolean;
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * @default false
   */
  asChild?: boolean;
} & HTMLAttributes<HTMLElement>;

export const PaginationRoot = forwardRef<HTMLElement, PaginationRootProps>(
  function PaginationRoot(
    {
      'aria-label': ariaLabel = 'Sidenavigering',
      asChild,
      compact = false,
      size = 'md',
      ...rest
    },
    ref,
  ) {
    const Component = asChild ? Slot : 'nav';

    return (
      <PaginationContext.Provider value={{ size, compact }}>
        <Component aria-label={ariaLabel} ref={ref} {...rest} />
      </PaginationContext.Provider>
    );
  },
);
