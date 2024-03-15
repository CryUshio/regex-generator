import { APIEvent } from '@solidjs/start/server/types';
import { OpenAI } from 'openai';
import { setResponseStatus } from 'vinxi/http';

export interface OpenAiChatCompletionReq {
  lang: string;
  prompt: string;
  model: string;
  apiKey: string;
}

export type ChatCompletionChunk = OpenAI.ChatCompletionChunk;

const SYSTEM_MSG = `## Role:
- You are a regex master. Incorporate the latest version of the user-specified language, covering all possible syntax of that language (including but not limited to destructuring assignment), to complete regex replacement.

## Goal:
- Match the beginning and end according to the situation.
- Answer with code only.

## Hint:
- You may use npm packages that have been verified to exist.
`;

export const POST = async (event: APIEvent) => {
  // get request body
  const body: OpenAiChatCompletionReq = await new Response(event.request.body).json();

  // console.info('skr: body', body, event.clientAddress);

  const preprocessedLang = body.lang === 'Regex only' ? 'regular expressions only' : body.lang;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${body.apiKey}`,
    },
    body: JSON.stringify({
      model: body.model,
      temperature: 0,
      stream: true,
      user: event.clientAddress,
      max_tokens: 1000,
      messages: [
        {
          role: 'system',
          content: SYSTEM_MSG,
        },
        {
          role: 'user',
          content: `- Language: ${preprocessedLang}\n- Requirement: ${body.prompt}`,
        },
      ],
    } satisfies OpenAI.ChatCompletionCreateParamsStreaming),
  });

  if (!response.ok) {
    let text = '';

    try {
      text = await response.text();
    } catch (error) {}

    setResponseStatus(500);

    return text;
  }

  return response;
};
