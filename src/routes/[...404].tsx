import { A } from '@solidjs/router';

export default function NotFound() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-5xl mt-16 mb-8 font-medium font-jost select-none">Not Found</h1>
      <p class="my-4 font-jost">
        <A href="/" class="underline">
          Home Page
        </A>
      </p>
    </main>
  );
}
