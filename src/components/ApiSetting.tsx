import { Portal } from 'solid-js/web';
import IconItem from './IconItem';
import Select from './Select';
import { createApiSettingStorage } from '~/storages/api-settings';

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
    label: 'GPT 3.5(0301)',
    value: 'gpt-3.5-0301',
  },
  {
    label: 'GPT 3.5(0613)',
    value: 'gpt-3.5-0613',
  },
  {
    label: 'GPT 3.5(0125)',
    value: 'gpt-3.5-0125',
  },
  {
    label: 'GPT 4',
    value: 'gpt-4-turbo',
  },
];

export default function ApiSetting(props: Props) {
  const [store, setStore] = createApiSettingStorage();

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
        <dialog id="api_key_setting_modal" class="modal">
          <div class="modal-box absolute top-[12.5%] max-h-[75%]">
            <h3 class="font-bold text-lg">Api Setting</h3>
            <p class="flex gap-2 mt-4">
              <Select
                class="w-48"
                options={MODEL_LIST}
                defaultValue={store.model}
                onChange={(value) => setStore({ model: value })}
              />
            </p>
            <p class="flex gap-2 mt-4">
              <input
                type="text"
                class="input input-bordered w-full"
                value={store.apiKey}
                spellcheck={false}
                onBlur={(e) => setStore({ apiKey: e.target.value })}
                placeholder="Api key here"
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
