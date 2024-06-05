import type { HTMLAttributes } from 'react';
import { Children, isValidElement, forwardRef, createContext } from 'react';
import cl from 'clsx/lite';

export type ChipGroupContext = {
  size?: 'sm' | 'md' | 'lg';
};

export const ChipGroupContext = createContext<ChipGroupContext | null>(null);

export type ChipGroupProps = {
  /**
   * Changes Chip size and gap between chips.
   * @default md
   */
  size?: ChipGroupContext['size'];
} & HTMLAttributes<HTMLUListElement>;

export const Group = forwardRef<HTMLUListElement, ChipGroupProps>(
  ({ size = 'md', children, className, ...rest }: ChipGroupProps, ref) => {
    return (
      <ul
        ref={ref}
        className={cl(
          `fds-chip--group-container`,
          `fds-chip--${size}`,
          className,
        )}
        {...rest}
      >
        <ChipGroupContext.Provider value={{ size }}>
          {Children.toArray(children).map((child, index) =>
            isValidElement(child) ? (
              <li key={`chip-${index}`}>{child}</li>
            ) : null,
          )}
        </ChipGroupContext.Provider>
      </ul>
    );
  },
);

Group.displayName = 'ChipGroup';
