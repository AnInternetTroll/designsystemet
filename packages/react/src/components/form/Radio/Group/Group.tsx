import type { ChangeEventHandler, ReactNode } from 'react';
import React, { forwardRef, createContext, useId } from 'react';
import cn from 'classnames';

import type { FieldsetProps } from '../../Fieldset';
import { Fieldset } from '../../Fieldset';
import type { RadioProps } from '../Radio';

import classes from './Group.module.css';

export type RadioGroupContextProps = {
  name?: string;
  value?: string | ReadonlyArray<string> | number;
  defaultValue?: string | ReadonlyArray<string> | number;
  required?: boolean;
} & Pick<RadioProps, 'onChange'>;

export const RadioGroupContext = createContext<RadioGroupContextProps | null>(
  null,
);

export type RadioGroupProps = {
  /** Collection of `Radio` components */
  children?: ReactNode;
  /** Controlled state for `Radio` */
  value?: string | ReadonlyArray<string> | number;
  /** Default checked `Radio` */
  defaultValue?: string | ReadonlyArray<string> | number;
  /** Callback event with changed `Radio` */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Toggle if collection of `Radio` are required  */
  required?: boolean;
  /** Orientation of `Radio` components.
   * @note Only use `horizontal` for when you have two options and short labels
   */
  inline?: boolean;
} & Omit<FieldsetProps, 'onChange'>;

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      onChange,
      children,
      value,
      readOnly,
      defaultValue,
      name,
      size = 'medium',
      required,
      inline,
      ...rest
    },
    ref,
  ) => {
    const nameId = useId();

    return (
      <Fieldset
        {...rest}
        readOnly={readOnly}
        size={size}
        className={cn(rest.className)}
        ref={ref}
      >
        <RadioGroupContext.Provider
          value={{
            value,
            defaultValue,
            name: name ?? `radiogroup-name-${nameId}`,
            onChange,
            required,
          }}
        >
          <div className={cn(classes[size], inline && classes.inline)}>
            {children}
          </div>
        </RadioGroupContext.Provider>
      </Fieldset>
    );
  },
);
