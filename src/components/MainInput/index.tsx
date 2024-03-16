import { createSignal, onMount } from 'solid-js';
import clsx from 'clsx';
import { sleep } from 'openai/core';
import Select from '../Select';
import { createMainInputStorage } from '~/storages/main-input';

import './index.less';

interface Props {
  defaultValue?: string;
  disabled?: boolean;
  onSubmit?: (form: { lang: string; prompt: string }) => void;
}

const OPTIONS = [
  'Regex only',
  'JavaScript',
  'PHP',
  'Perl',
  'Python',
  'Ruby',
  'Java',
  'C++',
  'C#',
  'Golang',
  'Rust',
  'Scala',
];

export default function MainInput(props: Props) {
  const [store, setStore] = createMainInputStorage();
  const [lang, setLang] = createSignal('');
  const [prompt, setPrompt] = createSignal(props.defaultValue || '');
  const [err, setErr] = createSignal(false);

  const submit = async () => {
    await sleep(0);

    if (prompt() === '') {
      return setErr(true);
    }

    /**
     * This storeThe store here seems to update more slowly,
     * resulting in the retrieval of values that are still from before the update;
     * it appears to be a bug in SolidJS.
     **/
    // props.onSubmit?.({ lang: store.lang, prompt: prompt() });
    props.onSubmit?.({ lang: lang(), prompt: prompt() });
  };

  /** Load localStorage on the client-side. */
  onMount(() => {
    setLang(store.lang);
  });

  return (
    <div
      class={clsx([
        'main-input box-base input input-bordered border-none h-12 p-0 rounded-lg flex align-center relative',
        { err: err(), disabled: props.disabled },
      ])}
    >
      <div class="p-1">
        <Select
          defaultValue={lang()}
          options={OPTIONS}
          mode="raid"
          onChange={(value) => {
            setLang(value);
            setStore({ lang: value });
          }}
        />
      </div>
      <input
        type="text"
        class="w-full bg-transparent"
        spellcheck={false}
        disabled={props.disabled}
        value={prompt()}
        placeholder={err() ? 'This is a required field.' : 'Match, test or replace something...'}
        onInput={() => err() && setErr(false)}
        onChange={(e) => setPrompt(e.target.value)}
        onBlur={() => setErr(false)}
        onFocus={() => setErr(false)}
        onKeyPress={(e) => {
          if (e.key !== 'Enter') {
            return;
          }

          setPrompt(e.currentTarget.value);
          submit();
        }}
      />
      <div class="p-1">
        <button class="btn border-none shadow-inherit px-2" disabled={props.disabled} onClick={submit}>
          <XIconCheck />
        </button>
      </div>
    </div>
  );
}
