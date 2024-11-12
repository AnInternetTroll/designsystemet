import { useMergeRefs } from '@floating-ui/react';
import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export type UseCheckboxGroupProps = {
  /**
   * Disables all checkboxes in the group.
   */
  disabled?: boolean;
  /**
   * Error message for the group.
   * If set, all checkboxes will have `aria-invalid` set to `true`.
   */
  error?: ReactNode;
  /**
   * Name of the group.
   * If not set, a random id will be generated.
   */
  name?: string;
  /**
   * Makes all checkboxes in the group read-only.
   * If set, all checkboxes will have `aria-readonly` set to `true`.
   */
  readOnly?: boolean;
  /**
   * Initial value of the group
   * @default []
   */
  value?: string[];
  /**
   * Makes all checkboxes in the group required.
   * If set, all checkboxes will have `required` set to `true`.
   */
  required?: boolean;
  /**
   * Callback that is called when the value of the group changes.
   * @param nextValue string[]
   * @param currentValue string[]
   * @returns void
   */
  onChange?: (nextValue: string[], currentValue: string[]) => void;
};

/**
 * Get anything that is set on a checkbox, but
 * remove anything that comes from the group itself.
 */
type GetCheckboxProps =
  | string
  | (Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      | 'prefix'
      | 'role'
      | 'type'
      | 'size'
      | 'aria-label'
      | 'aria-labelledby'
      | 'label'
      | 'checked'
      | 'value'
    > & {
      allowIndeterminate?: boolean;
      ref?: React.RefObject<HTMLInputElement>;
      value?: string;
    });

export function useCheckboxGroup({
  error,
  name,
  onChange,
  value = [],
  disabled,
  readOnly,
  required,
}: UseCheckboxGroupProps) {
  const [groupValue, setGroupValue] = useState(value);
  const namedId = useId();
  const errorId = useId();
  const checkboxRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const getInputs = (checked: boolean) =>
    Array.from(checkboxRefs.current.values()).filter(
      (input) => input.checked === checked,
    );

  const handleChange = () => {
    const nextGroupValue = Array.from(getInputs(true), ({ value }) => value);
    setGroupValue(nextGroupValue);
    onChange?.(nextGroupValue, groupValue);
  };

  return {
    /**
     * Current value of the group.
     */
    value: groupValue,
    /**
     * Set the value of the group.
     *
     * @param value string[]
     * @returns void
     */
    setValue: setGroupValue,
    /**
     * Props to send to the `Checkbox` component.
     * @example
     * <Checkbox {...getCheckboxProps('value')} />
     *
     * @example allow indeterminate
     * <Checkbox {...getCheckboxProps({ allowIndeterminate: true })} />
     */
    getCheckboxProps: (propsOrValue?: GetCheckboxProps) => {
      const props =
        typeof propsOrValue === 'string'
          ? { value: propsOrValue }
          : propsOrValue || {};

      const {
        allowIndeterminate = false,
        ref = undefined,
        value = '',
        ...rest
      } = props;

      const inputRef = useRef<HTMLInputElement>(null);
      const mergedRefs = useMergeRefs([ref, inputRef]);

      useEffect(() => {
        if (!allowIndeterminate || !inputRef.current) return;
        const checked = !!getInputs(true).length;
        const unchecked = !!getInputs(false).length;
        inputRef.current.indeterminate = unchecked && checked;
        inputRef.current.checked = !unchecked && checked;
        /* We can use `currentValue` as dependency here,
      since that is omly when this checkbox changes */
      }, [groupValue]);

      useEffect(() => {
        if (inputRef.current && !allowIndeterminate) {
          checkboxRefs.current.set(value, inputRef.current);
        }
        return () => {
          checkboxRefs.current.delete(value);
        };
      }, [value]);

      const indeterminateChange = () => {
        if (!inputRef.current) return;
        const checked = !!inputRef.current.checked;
        for (const input of getInputs(!checked)) {
          /* We use click to send both event and change checked state */
          input.click();
        }
      };

      return {
        /* Spread anything the user has set first */
        ...rest,
        /* Concat ours with the user prop */
        'aria-describedby': error
          ? `${errorId} ${rest['aria-describedby']}`
          : rest['aria-describedby'],
        'aria-invalid': !!error || rest['aria-invalid'],
        checked: allowIndeterminate ? undefined : groupValue.includes(value),
        name: rest.name || name || namedId,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          rest.onChange?.(e);
          if (e.defaultPrevented) return;
          allowIndeterminate && indeterminateChange();
          handleChange();
        },
        ref: mergedRefs,
        value,
        disabled: disabled || rest.disabled,
        readOnly: readOnly || rest.readOnly,
        required: required || rest.required,
      };
    },
    /**
     * Props to send to the `ValidationMessage` component.
     *
     * @example
     * <ValidationMessage {...validationMessageProps} />
     */
    validationMessageProps: {
      children: error,
      hidden: !error,
      id: errorId,
    },
  };
}
