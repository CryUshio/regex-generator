import { createSignal } from 'solid-js';
import Select from '../Select';

import './index.less';

interface Props {
  onSubmit?: (form: { lang: string; prompt: string }) => void;
}

const OPTIONS = ['None', 'JavaScript', 'PHP', 'Perl', 'Python', 'Ruby', 'Java', 'C++', 'C#', 'Golang', 'Rust', 'Scala'];

export default function MainInput(props: Props) {
  const [lang, setLang] = createSignal('None');
  const [prompt, setPrompt] = createSignal('');

  const submit = () => {
    props.onSubmit?.({ lang: lang(), prompt: prompt() });
  };

  return (
    <div class="main-input input input-bordered border-none h-12 p-0 rounded-lg flex align-center relative">
      {/* <SelectPart class="p-1" /> */}
      <Select class="p-1" options={OPTIONS} onChange={(value) => setLang(value)} />
      <input
        type="text"
        class="w-full bg-transparent"
        placeholder="Match email addresses or..."
        onChange={(e) => setPrompt(e.target.value)}
      />
      {/* <div class="p-1">
        <button class="btn btn-ghost border-none shadow-inherit px-2">
          <XIconClose />
        </button>
      </div> */}
      <div class="p-1">
        <button class="btn border-none shadow-inherit px-2" onClick={submit}>
          <XIconCheck />
        </button>
      </div>
    </div>
  );
}
