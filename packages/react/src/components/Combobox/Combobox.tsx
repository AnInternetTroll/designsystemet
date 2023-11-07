import type { ChangeEvent, KeyboardEvent, ReactNode } from 'react';
import React, {
  forwardRef,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import {
  autoUpdate,
  flip,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import { size } from '@floating-ui/dom';

import type { TextfieldProps } from '../form/Textfield';
import { Textfield } from '../form/Textfield';

import { comboboxReducer } from './ComboboxReducer';
import { ComboboxList } from './ComboboxList';
import type { ComboboxFilter } from './types/ComboboxFilter';
import { defaultFilter } from './utils/defaultFilter';

export type ComboboxProps = {
  /** The list of all available options. */
  options: string[];

  /** Function that returns a label based on the value. Defaults to return the value itself. */
  optionLabel?: (value: string) => ReactNode;

  /**
   * Custom filter.
   * Use this to customise filtering and ordering of the options based on the input value.
   * */
  filter?: ComboboxFilter;

  /** Function that is called with the input value when it is selected from the option list. */
  onSelect?: (value: string) => void;

  /** The value of the input field. */
  value?: string;
} & TextfieldProps;

const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      filter = defaultFilter,
      onChange,
      onSelect,
      optionLabel = (value) => value,
      options,
      value = '',
      ...rest
    },
    ref,
  ) => {
    const [state, dispatch] = useReducer(comboboxReducer, {
      isOpen: false,
      activeIndex: null,
      inputValue: value,
    });

    useEffect(() => {
      dispatch({
        type: 'changeInputValue',
        inputValue: value,
      });
    }, [value]);

    const floating = useFloating<HTMLInputElement>({
      whileElementsMounted: autoUpdate,
      open: state.isOpen,
      onOpenChange: (open) => dispatch({ type: 'openOrClose', open }),
      middleware: [
        flip({ padding: 10 }),
        size({
          apply({ rects, availableHeight, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
              maxHeight: `${availableHeight}px`,
            });
          },
          padding: 10,
        }),
      ],
    });

    const { refs, context } = floating;

    const listRef = useRef<Array<HTMLLIElement | null>>([]);
    const inputRef = useMergeRefs([refs.setReference, ref]);

    const role = useRole(context, { role: 'listbox' });
    const dismiss = useDismiss(context);
    const listNav = useListNavigation(context, {
      listRef,
      activeIndex: state.activeIndex,
      onNavigate: (activeIndex) =>
        dispatch({ type: 'setActiveIndex', activeIndex }),
      virtual: true,
      loop: true,
    });

    const interactions = useInteractions([role, dismiss, listNav]);
    const { getReferenceProps } = interactions;

    const filteredOptions = useMemo(
      () => filter(state.inputValue, options),
      [filter, state.inputValue, options],
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      dispatch({
        type: 'changeInputValue',
        inputValue: event.target?.value,
      });
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (
        event.key === 'Enter' &&
        state.activeIndex != null &&
        filteredOptions[state.activeIndex]
      ) {
        handleSelect(filteredOptions[state.activeIndex]);
      }
    };

    const handleSelect = (value: string) => {
      onSelect?.(value);
      dispatch({ type: 'select', value });
    };

    return (
      <>
        <Textfield
          autoComplete='off'
          type='text'
          {...rest}
          {...getReferenceProps({
            ref: inputRef,
            onChange: handleChange,
            value: state.inputValue,
            'aria-autocomplete': 'list',
            onKeyDown: handleKeyDown,
          })}
        />
        <ComboboxList
          activeIndex={state.activeIndex}
          floating={floating}
          interactions={interactions}
          listRef={listRef}
          open={state.isOpen}
          optionLabel={optionLabel}
          options={filteredOptions}
          onSelect={handleSelect}
        />
      </>
    );
  },
);

export { Combobox as EXPERIMENTAL_Combobox };
