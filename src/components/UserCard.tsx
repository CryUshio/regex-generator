/* eslint-disable max-lines-per-function */
import { JSX, createSignal, useContext } from 'solid-js';
import clsx from 'clsx';
import supabase from '~/services/supabase';
import { Context } from '~/context';

type Props = {
  children: JSX.Element;
};

export default function UserCard(props: Props) {
  const [open, setOpen] = createSignal(true);
  const { store } = useContext(Context);

  return (
    <>
      <div onClick={() => setOpen(!open())}>{props.children}</div>
      <div
        class={clsx([
          'modal-container overflow-hidden absolute top-[54px] right-4 card w-96 bg-base-100 rounded-lg shadow-xl',
          { open: open() },
        ])}
      >
        <section class="card-body p-0 gap-0 text-color-primary">
          <header class="font-semibold px-5 p-3 flex items-center justify-between border-b item-divider">
            <span>Welcome! {store.session?.user.user_metadata?.name}</span>
            <button class="btn btn-ghost btn-square btn-sm" onClick={() => setOpen(false)}>
              <XIconClose />
            </button>
          </header>
          <section class="px-2 py-2">
            <ul>
              <li />
              <li>
                <button class="btn btn-ghost w-full justify-start" onClick={() => supabase.auth.signOut()}>
                  Sign out
                </button>
                <p class="flex items-center px-4 pt-2 pb-4 text-color-secondary">
                  {store.session?.user.user_metadata?.email}
                </p>
              </li>
            </ul>
          </section>
        </section>
      </div>
    </>
  );
}
