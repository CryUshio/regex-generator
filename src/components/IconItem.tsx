import { JSX } from 'solid-js';

interface Props {
  classNames?: string;
  onClick?: () => void;
  children: JSX.Element;
}

export default function IconItem(props: Props) {
  const { classNames = '' } = props;

  return (
    <button
      class={
        'h-8 w-8 flex items-center justify-center rounded-md transition duration-100 ease-linear hover:bg-white/10 active:bg-white/20 ' +
        classNames
      }
      onClick={() => props.onClick?.()}
    >
      {props.children}
    </button>
  );
}
