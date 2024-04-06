import { useLocation } from '@solidjs/router';
import clsx from 'clsx';
import IconItem from './IconItem';
import ApiSetting from './ApiSetting';
import SignInCard from './SignInCard';
// import ThemeToggler from '../ThemeToggler';

type Props = {
  class?: string;
};

export default function Nav(props: Props) {
  const location = useLocation();
  const active = (path: string) =>
    path === location.pathname ? 'border-sky-200' : 'border-transparent hover:border-sky-600';

  return (
    <header
      class={clsx(['box-border px-5 flex shrink-0 items-center text-white text-base', props.class])}
      style={{ 'background-color': '#030C15', height: 'var(--header-height)' }}
    >
      <a href="/">
        <img class="size-8" src="/favicon.png" alt="Regex Generator AI" />
      </a>
      <ul class="flex grow items-center p-3 text-gray-200">
        {/* <li class={`border-b-2 ${active('/')} mx-1.5 sm:mx-6`}>
          <a href="/">Home</a>
        </li>
        <li class={`border-b-2 ${active('/about')} mx-1.5 sm:mx-6`}>
          <a href="/about">More</a>
        </li> */}
      </ul>
      <ul class="flex items-center gap-4">
        <li>
          <ApiSetting />
        </li>
        {/* <li>
          <ThemeToggler />
        </li> */}
        <li>
          <IconItem
            onClick={() => {
              window.open('https://github.com/CryUshio/regex-generator', '__blank');
            }}
          >
            <XIconGithub class="text-2xl text-white" />
          </IconItem>
        </li>
        {/* <li>
          <button class="h-8 flex items-center px-2 ml-2 rounded-md border border-white text-white transition duration-100 ease-linear hover:bg-white hover:text-gray-950 active:bg-white/90 active:border-white/90">
            <XIconLove class="mr-1 text-lg text-red-500" />
            <span>Sponsor project</span>
          </button>
        </li> */}
        <li>
          <SignInCard>
            <button class="h-8 flex items-center px-2 ml-2 rounded-md border border-white text-white transition duration-100 ease-linear hover:bg-white hover:text-gray-950 active:bg-white/90 active:border-white/90">
              <span>Sign in</span>
            </button>
          </SignInCard>
        </li>
      </ul>
    </header>
  );
}
