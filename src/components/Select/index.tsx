import { For, createSignal } from 'solid-js';
import clickOutside from '~/directives/click-outside';

import './index.less';

type Option = string | { label: string; value: string };

export default function Select(props: {
  class?: string;
  options: Option[];
  defaultValue?: string;
  onChange?: (selected: string) => void;
}) {
  const [selected, setSelected] = createSignal(props.defaultValue || props.options[0]);
  const [open, setOpen] = createSignal(false);

  const getOptionLabel = (option: Option) => {
    return typeof option === 'string' ? option : option.label;
  };
  const getOptionValue = (option: Option) => {
    return typeof option === 'string' ? option : option.value;
  };

  const onClick = (selection: Option) => {
    setOpen(false);
    setSelected(selection);
    props.onChange?.(getOptionValue(selection));
  };
  const isSelected = (self: string) => self === getOptionLabel(selected());

  return (
    // @ts-ignore
    <div class={`dropdown box-border h-full ${props.class || ''}`} use:clickOutside={() => setOpen(false)}>
      <div
        role="button"
        onClick={() => setOpen(!open())}
        class="btn rounded-md h-full w-32 pl-3 pr-2 flex-nowrap gap-0 shadow-inherit overflow-hidden"
      >
        <span class="text-ellipsis grow">{getOptionLabel(selected()) || 'Select...'}</span>
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
