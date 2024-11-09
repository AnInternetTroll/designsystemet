import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

import type { DefaultProps } from 'packages/react/src/types';
import type { Merge } from 'packages/react/src/utilities';
import { Label } from '../../Label';
import { ValidationMessage } from '../../ValidationMessage';
import { Field } from '../Field';
import { Input } from '../Input';

export type RadioProps = Merge<
  DefaultProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
  {
    /** Optional aria-label */
    'aria-label'?: string;
    /** Radio label */
    label?: ReactNode;
    /** Description for field */
    description?: ReactNode;
    /** Value of the `input` element */
    value: string;
    /** Validation message for field */
    validation?: ReactNode;
    /**
     * Changes field size and paddings
     */
    'data-size'?: DefaultProps['data-size'];
  } & (
    | { 'aria-label': string; 'aria-labelledby'?: never; label?: never }
    | { 'aria-label'?: never; 'aria-labelledby'?: never; label: ReactNode }
    | { 'aria-label'?: never; 'aria-labelledby': string; label?: never }
  )
>;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { 'data-size': size, children, label, description, validation, ...rest },
  ref,
) {
  return (
    <Field data-size={size}>
      <Input type='radio' ref={ref} {...rest} />
      {!!label && <Label weight='regular'>{label}</Label>}
      {!!description && <div data-field='description'>{description}</div>}
      {!!validation && <ValidationMessage>{validation}</ValidationMessage>}
    </Field>
  );
});
