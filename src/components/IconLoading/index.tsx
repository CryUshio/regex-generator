import clsx from 'clsx';
import './index.less';

export default function IconLoading(props: { class?: string }) {
  return (
    <svg
      class={clsx(['icon-loading', props.class])}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
    >
      <circle class="icon-loading--circle" fill="var(--circle-1)" cx="5" cy="12" r="2" />
      <circle class="icon-loading--circle" fill="var(--circle-2)" cx="12" cy="12" r="2" />
      <circle class="icon-loading--circle" fill="var(--circle-3)" cx="19" cy="12" r="2" />
    </svg>
  );
}
