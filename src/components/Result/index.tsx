import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import perl from 'highlight.js/lib/languages/perl';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import scala from 'highlight.js/lib/languages/scala';
import { writeClipboard } from '@solid-primitives/clipboard';

import 'highlight.js/styles/xcode.min.css';
import './index.less';
import { throttle } from 'lodash-es';
import clsx from 'clsx';
import { createSignal } from 'solid-js';

// Then register the languages you need
/**
 * @Supported
 * 'JavaScript', 'PHP', 'Perl', 'Python', 'Ruby', 'Java', 'C++', 'C#', 'Golang', 'Rust', 'Scala',
 */
hljs.registerLanguage('regex_only', javascript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('php', php);
hljs.registerLanguage('perl', perl);
hljs.registerLanguage('python', python);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('java', java);
hljs.registerLanguage('c++', cpp);
hljs.registerLanguage('c#', csharp);
hljs.registerLanguage('golang', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('scala', scala);

interface Props {
  lang: string;
  content?: string;
}

const createCopiedAnimation = (duration: number) => {
  const [copied, setCopied] = createSignal(false);
  let timer: NodeJS.Timeout | null = null;

  const play = () => {
    setCopied(true);

    timer && clearTimeout(timer);

    timer = setTimeout(() => {
      setCopied(false);
      timer = null;
    }, duration);
  };

  return { copied, play };
};

export default function Result(props: Props) {
  const preprocessed = () => {
    return (
      props.content
        ?.replace(/^```.*?$/gm, '')
        .replace(/^```$/gm, '')
        .trim() || ''
    );
  };

  const highlightCode = () => {
    return hljs.highlight(preprocessed(), { language: props.lang.toLowerCase().replace(' ', '_') || 'regexp_only' })
      .value;
  };

  const { copied, play } = createCopiedAnimation(1000);

  const copy = throttle((code: string) => {
    writeClipboard(code)
      .then(() => {
        play();
      })
      .catch(() => {});
  }, 1000);

  return (
    <>
      {!preprocessed() ? (
        <div class="skeleton box-base rounded-lg border-none h-[50px]" />
      ) : (
        <div class="result box-base border-none h-auto p-0 rounded-lg relative">
          <pre class="text-left p-4 h-auto text-xs leading-normal overflow-auto">
            {/* eslint-disable-next-line solid/no-innerhtml */}
            <code class="whitespace-pre-wrap" innerHTML={highlightCode()} />
          </pre>
          <button
            class="absolute bg-black/[0.08] top-[9px] right-[9px] btn btn-ghost btn-sm btn-square border-none shadow-inherit"
            onClick={() => copy(preprocessed())}
          >
            <label class="pointer-events-none swap swap-flip text-9xl">
              <input class="pointer-events-none" type="checkbox" checked={copied()} />
              <XIconCopy class={clsx(['swap-off'])} />
              <XIconCopied class={clsx(['swap-on'])} />
            </label>
          </button>
        </div>
      )}
    </>
  );
}
