import { A } from '@solidjs/router';
import Counter from '~/components/Counter';

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-5">
      <h1 class="max-6-xs text-4xl text-sky-700 font-thin uppercase mt-10 mb-2">Regex Generator</h1>
      <Counter />
      <p class="mt-8">
        Visit{' '}
        <a href="https://solidjs.com" target="_blank" class="text-sky-600 hover:underline">
          solidjs.com
        </a>{' '}
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <span>Home</span>
        {' - '}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>{' '}
      </p>
    </main>
  );
}
