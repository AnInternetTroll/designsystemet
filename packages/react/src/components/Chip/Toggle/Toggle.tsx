import type { ButtonHTMLAttributes } from 'react';
import { forwardRef, useContext } from 'react';
import { CheckmarkIcon } from '@navikt/aksel-icons';
import cl from 'clsx/lite';

import { Paragraph } from '../../Typography';
import { ChipGroupContext } from '../Group/Group';

export type ToggleChipProps = {
  /**
   * Enables check mark icon
   */
  checkmark?: boolean;
  /**
   * Changes Chip size and gap between chips.
   * @default 'md'
   */
  size?: ChipGroupContext['size'];
  /**
   * Toggles `aria-pressed` and visual-changes
   * */
  selected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ToggleChip = forwardRef<HTMLButtonElement, ToggleChipProps>(
  (
    {
      children,
      selected = false,
      checkmark = true,
      size = 'md',
      className,
      ...rest
    }: ToggleChipProps,
    ref,
  ) => {
    const shouldDisplayCheckmark = checkmark && selected;
    const group = useContext(ChipGroupContext);

    return (
      <button
        ref={ref}
        type='button'
        aria-pressed={selected}
        className={cl(
          `fds-focus`,
          `fds-chip--button`,
          `fds-chip--${group?.size || size}`,
          shouldDisplayCheckmark && `fds-chip--spacing`,
          className,
        )}
        {...rest}
      >
        <Paragraph
          asChild
          size={group?.size || size}
          variant='short'
        >
          <span className={`fds-chip__label`}>
            {shouldDisplayCheckmark && (
              <CheckmarkIcon
                className={`fds-chip__checkmark-icon`}
                aria-hidden
              />
            )}
            <span>{children}</span>
          </span>
        </Paragraph>
      </button>
    );
  },
);

ToggleChip.displayName = 'ChipToggle';
