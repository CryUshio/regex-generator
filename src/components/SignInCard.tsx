/* eslint-disable max-lines-per-function */
import { JSX, createEffect, createSignal, useContext } from 'solid-js';
import clsx from 'clsx';
import { Provider } from '@supabase/supabase-js';
import supabase from '~/services/supabase';
import { Context } from '~/context';

type Props = {
  children: JSX.Element;
};

export default function SignInCard(props: Props) {
  const [open, setOpen] = createSignal(true);
  const [loading, setLoading] = createSignal(false);
  const { store } = useContext(Context);

  createEffect(() => {
    if (store.session) {
      setLoading(false);
      setOpen(false);
    }
  });

  async function signInWithOAuth(provider: Provider) {
    if (loading()) {
      return;
    }

    setLoading(true);
    const { data, error } = await signIn(provider);

    error && setLoading(false);
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{props.children}</div>
      <div
        class={clsx([
          'modal-container overflow-hidden absolute top-[54px] right-4 card w-96 bg-base-100 rounded-lg shadow-xl',
          { open: open() },
        ])}
      >
        <section class="card-body p-0 gap-0 text-color-primary">
          {loading() && (
            <div
              class="absolute top-0 left-0 w-[150%] h-[4px] animation-line-loading rounded-sm"
              style={{ 'background-color': 'var(--brand-color-blue)' }}
            />
          )}
          <header class="font-semibold px-5 p-3 flex items-center justify-between border-b item-divider">
            <span>Sign in to your account</span>
            <button class="btn btn-ghost btn-square btn-sm" onClick={() => setOpen(false)}>
              <XIconClose />
            </button>
          </header>
          <section class="px-2 py-2">
            <ul>
              <li>
                <button class="btn btn-ghost w-full justify-start" onClick={() => signInWithOAuth('google')}>
                  <XIconGoogleColorful /> Sign in with Google
                </button>
              </li>
              <li>
                <button class="btn btn-ghost w-full justify-start" onClick={() => signInWithOAuth('github')}>
                  <XIconGithubFilled /> Sign in with Github
                </button>
              </li>
              <li>
                <button class="btn btn-ghost w-full justify-start" onClick={() => signInWithOAuth('twitter')}>
                  <XIconTwitterColorful /> Sign in with Twitter
                </button>
              </li>
              <li>
                <button class="btn btn-ghost w-full justify-start" onClick={() => signInWithOAuth('discord')}>
                  <XIconDiscord /> Sign in with Discord
                </button>
              </li>
            </ul>
          </section>
        </section>
      </div>
    </>
  );
}

async function signIn(provider: Provider) {
  console.info('skr: url', location.host);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      skipBrowserRedirect: true,
      redirectTo: new URL(`/auth?provider=${provider}`, location.origin).toString(),
    },
  });

  console.info('skr: auth', data, error);

  data.url && window.open(data.url);

  return { data, error };
}
