import { JSX, createSignal } from 'solid-js';
import IconItem from './IconItem';

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

interface Props {}

export default function ThemeToggler(props: Props) {
  const [theme, setTheme] = createSignal<Theme>(Theme.Light);
  const isActive = (themeName: Theme) => theme() === themeName;

  const changeTheme = (target: Theme) => {
    setTheme(target);
    document.body.setAttribute('data-theme', target);
  };

  return (
    <IconItem classNames="text-2xl">
      {isActive(Theme.Light) && (
        <XIconLightMode
          onClick={() => {
            changeTheme(Theme.Dark);
          }}
        />
      )}
      {isActive(Theme.Dark) && (
        <XIconDarkMode
          onClick={() => {
            changeTheme(Theme.Light);
          }}
        />
      )}
    </IconItem>
  );
}
