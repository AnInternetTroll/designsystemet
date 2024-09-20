import { forwardRef, useContext } from 'react';

import type { ButtonProps } from '../Button';
import { Button } from '../Button/Button';

import { PaginationContext } from './PaginationRoot';

export type PaginationButtonProps = {
  /**
   * Toggle button as active
   * @default false
   */
  isActive?: boolean;
} & Omit<ButtonProps, 'icon' | 'loading' | 'size'>;

export const PaginationButton = forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(function PaginationButton({ isActive, ...rest }, ref) {
  const { size } = useContext(PaginationContext);

  return (
    <Button
      aria-current={isActive}
      ref={ref}
      size={size}
      variant={isActive ? 'primary' : 'tertiary'}
      {...rest}
    />
  );
});
