import { A } from '@solidjs/router';
import Counter from '~/components/Counter';
import Input from '~/components/Input';

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-950 textcolor-primary p-5">
      <h1 class="max-6-xs text-4xl mt-20 mb-4" style={{ 'font-family': 'Jost' }}>
        Regex Generator
      </h1>
      <section class="pt-5">
        <Input />
      </section>
    </main>
  );
}
