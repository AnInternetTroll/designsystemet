import { useMergeRefs } from '@floating-ui/react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { ValidationMessage } from '../../ValidationMessage';

export type FieldCounterProps = {
  /** Label template for when `maxCount` is exceeded
   * @default '%d tegn for mye'
   */
  over?: string;
  /** Label template for count
   * @default '%d tegn igjen'
   */
  under?: string;
  /** The maximum allowed characters. */
  maxCount: number;
};

const label = (text: string, count: number) =>
  text.replace('%d', Math.abs(count).toString());

export const FieldCounter = forwardRef<HTMLSpanElement, FieldCounterProps>(
  function FieldCounter(
    { maxCount, under = '%d tegn igjen', over = '%d tegn for mye' },
    ref,
  ) {
    const [count, setCount] = useState(0);
    const counterRef = useRef<HTMLSpanElement>(null);
    const hasExceededLimit = count > maxCount;
    const currentCount = maxCount - count;

    useEffect(() => {
      const onChange = (e: Event) => {
        const element = e.target as HTMLInputElement | HTMLTextAreaElement;
        setCount(element.value.length);
      };

      const field = counterRef.current?.closest('.ds-field');
      field?.addEventListener('input', onChange);

      return () => {
        field?.removeEventListener('input', onChange);
      };
    }, [setCount]);

    return (
      <>
        <span
          className='ds-sr-only'
          aria-live={'polite'}
          ref={useMergeRefs([ref, counterRef])}
        >
          {hasExceededLimit && label(over, count)}
        </span>
        <ValidationMessage asChild error={hasExceededLimit}>
          <span>{label(hasExceededLimit ? over : under, currentCount)}</span>
        </ValidationMessage>
      </>
    );
  },
);
