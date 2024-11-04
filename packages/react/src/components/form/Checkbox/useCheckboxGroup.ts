import { useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';

export type UseCheckboxGroupProps = {
  /** Set disabled state of all checkboxes */
  disabled?: boolean;
  /** Shared error message for all checkboxes */
  error?: ReactNode;
  /** Name of all checkboxes.
   * @default string of auto-generated name
   */
  name?: string;
  /** Set read only state of all checkboxes */
  readOnly?: boolean;
  /** Set required state of all checkboxes */
  required?: boolean;
  /** Array of values of selected checkboxes */
  value?: string[];
  /** Callback when selected checkboxes changes */
  onChange?: (
    nextValue: string[],
    currentValue: string[],
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
};

export function useCheckboxGroup({
  error,
  name,
  onChange,
  value = [],
  ...rest
}: UseCheckboxGroupProps = {}) {
  const [currentValue, setValue] = useState(value);
  const nameFallback = useId();
  const validationId = useId();
  const getInputs = (checked: boolean) =>
    document.querySelectorAll<HTMLInputElement>(
      `input[type="checkbox"][name="${name || nameFallback}"]${checked ? ':checked' : ':not(:checked)'}`,
    );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = Array.from(getInputs(true), ({ value }) => value);
    setValue(nextValue);
    onChange?.(nextValue, currentValue, event);
  };

  return {
    value: currentValue,
    setValue,
    getCheckboxProps: (value: string) => ({
      'aria-describedby': error ? validationId : undefined,
      'aria-invalid': Boolean(error) || undefined,
      checked: currentValue.includes(value),
      name: name || nameFallback,
      onChange: handleChange,
      value,
      ...rest,
    }),
    getIndeterminateProps: () => {
      const ref = useRef<HTMLInputElement>(null);

      useEffect(() => {
        if (!ref.current) return;
        const checked = !!getInputs(true).length;
        const unchecked = !!getInputs(false).length;
        ref.current.indeterminate = unchecked && checked;
        ref.current.checked = !unchecked && checked;
      });

      return {
        ref,
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          const checked = !!ref.current?.checked;
          for (const input of getInputs(!checked)) input.checked = checked;
          handleChange(event);
        },
      };
    },
    validationMessageProps: {
      children: error,
      id: validationId,
    },
  };
}
