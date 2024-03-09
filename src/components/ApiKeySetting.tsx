import { JSX, createSignal } from 'solid-js';
import { Portal } from 'solid-js/web';
import IconItem from './IconItem';
import Select from './Select';

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

interface Props {}

const MODEL_LIST = [
  {
    label: 'GPT 3.5',
    value: 'gpt-3.5-turbo',
  },
  {
    label: 'GPT 4',
    value: 'gpt-4-turbo',
  },
];

export default function ApiKeySetting(props: Props) {
  const [model, setModel] = createSignal('');
  const [apiKey, setApiKey] = createSignal('');

  const submit = () => {};

  return (
    <>
      <IconItem
        classNames="text-2xl"
        onClick={() => {
          // @ts-ignore
          document.querySelector('#api_key_setting_modal')?.showModal();
        }}
      >
        <XIconKey />
      </IconItem>
      <Portal>
        <dialog id="api_key_setting_modal" class="modal relative top-[-25%]">
          <div class="modal-box">
            <h3 class="font-bold text-lg">ApiKey Setting</h3>
            {/* <p class="py-4">Press ESC key or click the button below to close</p> */}
            <p class="flex gap-2 mt-4">
              <Select options={MODEL_LIST} onChange={(value) => setModel(value)} />
              <input
                type="text"
                class="input input-bordered w-full max-w-xs"
                onBlur={(e) => setApiKey(e.target.value)}
              />
            </p>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn" onClick={submit}>
                  Done
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </Portal>
    </>
  );
}
