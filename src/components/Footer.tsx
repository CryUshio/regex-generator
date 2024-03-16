export default function Footer() {
  return (
    <footer
      class="shrink-0 px-8 flex items-center justify-center text-sm"
      style={{
        height: 'var(--footer-height)',
        'background-color': 'var(--item-normal-bg-alpha)',
        color: 'var(--text-color-secondary)',
      }}
    >
      <p>Copyright 2023-{new Date().getFullYear()} Regex Generator powered by AI models</p>
    </footer>
  );
}
