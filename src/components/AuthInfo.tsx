import { useNavigate, useSearchParams } from '@solidjs/router';
import { AuthError } from '@supabase/supabase-js';
import { JSXElement, createSignal, onMount } from 'solid-js';
import IconLoading from './IconLoading';
import supabase from '~/services/supabase';

const map: Record<string, JSXElement> = {
  google: <XIconGoogleColorful class="size-16" />,
  github: <XIconGithubFilled class="size-16" />,
  twitter: <XIconTwitterColorful class="size-16" />,
  discord: <XIconDiscord class="size-16" />,
};

export default function AuthInfo() {
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<AuthError | null>(null);
  const [params] = useSearchParams<{ provider: string }>();
  const navigate = useNavigate();

  onMount(async () => {
    const user = await supabase.auth.getUser();

    console.info('skr: authentication', user);

    setLoading(false);
    setError(user.error);

    // session && supabase.auth.setSession(session);

    if (user.data && !user.error) {
      setTimeout(() => {
        console.info('skr: redirect');
        navigate('/', { replace: true });
      }, 1000);
    }
  });

  const info = () => {
    if (loading()) {
      return 'Authentication...';
    }

    return error() ? `Authentication failed: ${error()?.status}` : 'Redirecting...';
  };

  const provider = () => {
    return map[params.provider || ''] || <XIconAppStore class="size-16 text-gray-300" />;
  };

  return (
    <section class="flex flex-col items-center gap-8 mx-auto pt-[25vh] max-w-3xl text-gray-950 textcolor-primary p-5 text-center text-lg">
      <p class="flex gap-4">
        {provider()}
        <IconLoading class="size-16" />
        <img class="size-16" src="/favicon.png" alt="Regex Generator AI" />
      </p>
      <p class="text-color-primary">{info()}</p>
    </section>
  );
}
