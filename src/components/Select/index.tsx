import { For, createComputed, createEffect, createSignal, mergeProps, onMount } from 'solid-js';
import clsx from 'clsx';
import clickOutside from '~/directives/click-outside';

import './index.less';

type Option = string | { label: string; value: string };

type Props<T> = {
  class?: string;
  options: T[];
  defaultValue?: T;
  onChange?: (selected: T) => void;
};

export default function Select<T extends Option>(props: Props<T>) {
  const [selected, setSelected] = createSignal<T>();
  const [open, setOpen] = createSignal(false);

  function getOptionLabel(option?: T) {
    if (!option) {
      return '';
    }

    return typeof option === 'string' ? option : option.label;
  }

  function getDefaultValue() {
    return props.defaultValue && getOptionLabel(props.defaultValue) ? props.defaultValue : props.options[0];
  }

  const onClick = (selection: T) => {
    setOpen(false);
    setSelected(() => selection);
    props.onChange?.(selection);
  };
  const isSelected = (self: string) => self === getOptionLabel(selected());

  /** set initial value */
  createEffect(() => {
    if (selected()) {
      return;
    }

    const defaultValue = getDefaultValue();

    setSelected(() => defaultValue);
    props.onChange?.(defaultValue);
  }, props);

  return (
    // @ts-ignore
    <div class={'dropdown box-border h-full'} use:clickOutside={() => setOpen(false)}>
      <div
        role="button"
        onClick={() => setOpen(!open())}
        class={clsx([
          'btn rounded-md h-full w-32 pl-3 pr-2 flex-nowrap gap-0 shadow-inherit overflow-hidden',
          props.class,
        ])}
      >
        <span class="text-ellipsis grow">{getOptionLabel(selected()) || 'Choose ...'}</span>
        <XIconDown class="shrink-0" />
      </div>
      <ul class="dropdown-content z-[1] menu p-2 min-w-40 shadow rounded-md bg-base-100" classList={{ open: open() }}>
        <For each={props.options}>
          {(selection) => (
            <li class={isSelected(getOptionLabel(selection)) ? 'selected' : ''}>
              <a onClick={() => onClick(selection)}>{getOptionLabel(selection)}</a>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
