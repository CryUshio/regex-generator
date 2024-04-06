import { JSX, createSignal, onCleanup, onMount } from 'solid-js';
import clsx from 'clsx';
import { Provider } from '@supabase/supabase-js';
import supabase from '~/services/supabase';

type Props = {
  children: JSX.Element;
};

export default function SignInCard(props: Props) {
  const [open, setOpen] = createSignal(true);
  const [loading, setLoading] = createSignal(false);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((ev, session) => {
      console.info('skr: ev', ev, session);
    });

    onCleanup(() => {
      subscription.unsubscribe();
    });
  });

  async function signInWithOAuth(provider: Provider) {
    if (loading()) {
      return;
    }

    setLoading(true);
    const { data, error } = await signIn(provider);
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{props.children}</div>
      <div
        class={clsx([
          'modal-container absolute top-[54px] right-4 card w-96 bg-base-100 rounded-lg shadow-xl',
          { open: open() },
        ])}
      >
        <section class="card-body p-0 gap-0 text-color-primary">
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
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      skipBrowserRedirect: true,
    },
  });

  console.info('skr: auth', data, error);

  return { data, error };
}
