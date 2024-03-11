/* eslint-disable max-lines-per-function */
import { createEffect, createSignal, onMount } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import { defaults } from 'lodash-es';
import { ChatCompletionChunk, OpenAiChatCompletionReq } from './api/openai/chat-completions';
import MainInput from '~/components/MainInput';
import Result from '~/components/Result';
import { createApiSettingStorage } from '~/storages/api-settings';
import { DONE_FLAG, parseChunkBuffer, readChunks } from '~/common/http-utils';

type SearchParams = {
  lang: string;
  prompt: string;
};

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams<SearchParams>();
  const [store] = createApiSettingStorage();
  const [loading, setLoading] = createSignal(false);
  const [result, setResult] = createSignal('');
  const [lang, setLang] = createSignal('');

  // onMount(() => {
  //   if (searchParams?.prompt) {
  //     onSubmit(defaults(searchParams as Required<SearchParams>, { lang: lang() }));
  //   }
  // });

  const onSubmit = async (params: SearchParams) => {
    const { lang, prompt } = params;

    setLoading(true);
    setResult('');
    setLang(lang);
    setSearchParams({ lang, prompt });

    const streamResponse = await fetch('/api/openai/chat-completions', {
      method: 'POST',
      body: JSON.stringify({
        ...params,
        model: store.model.value,
        apiKey: store.apiKey,
      } satisfies OpenAiChatCompletionReq),
    }).catch((e) => {
      setResult(String(e));
    });

    if (!streamResponse || !streamResponse.ok) {
      // console.info('skr: streamResponse err');
      setLoading(false);

      if (streamResponse) {
        const err = await streamResponse.json();

        return setResult(JSON.stringify(err, null, 2));
      }

      return setResult('Network error.');
    }

    const reader = streamResponse.body?.getReader();

    if (!reader) {
      setLoading(false);

      return setResult('Parse error.');
    }

    const updateResult = (res: ChatCompletionChunk) => {
      setResult((r) => r + (res.choices[0]?.delta?.content || ''));
    };

    let isDone = false;
    const parser = parseChunkBuffer((dataJson) => {
      // console.info('skr: dataJson', dataJson, isDone);
      if (isDone || dataJson === DONE_FLAG) {
        isDone = true;

        return;
      }

      try {
        const data = JSON.parse(dataJson);

        updateResult(data);
      } catch (e: any) {
        // console.info('skr: err', e);

        isDone = true;

        return setResult('Parse error.');
      }
    });

    try {
      const textDecoder = new TextDecoder();

      for await (const chunk of readChunks(reader)) {
        parser(textDecoder.decode(chunk));
      }
    } catch (error) {
      // console.info('skr: parse err', error);
    }

    setLoading(false);
  };

  return (
    <main class="text-center mx-auto text-gray-950 textcolor-primary p-5">
      <h1 class="max-6-xs text-4xl mt-20 mb-12" style={{ 'font-family': 'Jost' }}>
        Regex Generator
      </h1>
      <section class="pt-5 flex justify-center">
        <MainInput defaultValue={searchParams?.prompt} onSubmit={onSubmit} disabled={loading()} />
      </section>
      {(loading() || result()) && (
        <section class="pt-5 flex justify-center">
          <Result lang={lang()} content={result()} />
        </section>
      )}
    </main>
  );
}
