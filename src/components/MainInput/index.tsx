import { createEffect, createSignal } from 'solid-js';
import clsx from 'clsx';
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

  const submit = () => {
    if (prompt() === '') {
      return setErr(true);
    }

    props.onSubmit?.({ lang: lang(), prompt: prompt() });
  };

  /** load localStorage in client */
  createEffect(() => {
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
        onChange={(e) => {
          setErr(false);
          setPrompt(e.target.value);
        }}
        onBlur={() => setErr(false)}
        onFocus={() => setErr(false)}
        onKeyPress={(e) => {
          if (e.key !== 'Enter') {
            return;
          }

          setPrompt(e.currentTarget.value);
          e.currentTarget.blur();
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
