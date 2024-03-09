import { For, createSignal } from 'solid-js';
import clickOutside from '~/directives/click-outside';

import './index.less';

interface Props {
  result?: string;
}

export default function Result(props: Props) {
  return (
    <div class="main-input input border-none min-h-12 p-0 rounded-lg relative">
      <pre>
        <code></code>
      </pre>
    </div>
  );
}
