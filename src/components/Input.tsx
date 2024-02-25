const SelectPart = () => {
  return (
    <div class="dropdown">
      <div tabIndex={0} role="button" class="btn m-1">
        Click
      </div>
      <ul tabIndex={0} class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
};

interface Props {
  classNames?: string;
  onSubmit?: () => void;
}

export default function Input(props: Props) {
  const { classNames = '' } = props;

  return (
    <div>
      <SelectPart />
    </div>
  );
}
