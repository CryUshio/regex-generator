import { JSX, createSignal } from 'solid-js';
import IconItem from './IconItem';

enum Theme {
  Light,
  Dark,
}

interface Props {}

export default function ThemeToggler(props: Props) {
  const [theme, setTheme] = createSignal<Theme>(Theme.Light);
  const isActive = (themeName: Theme) => theme() === themeName;

  return (
    <IconItem classNames="text-2xl">
      {isActive(Theme.Light) && (
        <XIconLightMode
          onClick={() => {
            setTheme(Theme.Dark);
          }}
        />
      )}
      {isActive(Theme.Dark) && (
        <XIconDarkMode
          onClick={() => {
            setTheme(Theme.Light);
          }}
        />
      )}
    </IconItem>
  );
}
