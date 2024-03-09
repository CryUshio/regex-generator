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
      class={'size-8 icon-item ' + classNames}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        props.onClick?.();
      }}
    >
      {props.children}
    </button>
  );
}
