import { useLocation } from '@solidjs/router';
import IconItem from './IconItem';
import ApiKeySetting from './ApiKeySetting';
// import ThemeToggler from '../ThemeToggler';

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path === location.pathname ? 'border-sky-200' : 'border-transparent hover:border-sky-600';

  return (
    <nav class="box-border h-16 px-5 flex items-center text-white text-base" style={{ 'background-color': '#030C15' }}>
      <img class="size-8" src="/favicon.png" alt="" />
      <ul class="flex grow items-center p-3 text-gray-200">
        <li class={`border-b-2 ${active('/')} mx-1.5 sm:mx-6`}>
          <a href="/">Home</a>
        </li>
        <li class={`border-b-2 ${active('/about')} mx-1.5 sm:mx-6`}>
          <a href="/about">More</a>
        </li>
      </ul>
      <ul class="flex items-center gap-3">
        <li>
          <ApiKeySetting />
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
        <li>
          <button class="h-8 flex items-center px-2 ml-2 rounded-md border border-white text-white transition duration-100 ease-linear hover:bg-white hover:text-gray-950 active:bg-white/90 active:border-white/90">
            <XIconLove class="mr-1 text-lg text-red-500" />
            <span>Sponsor project</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
