import { A, useNavigate } from '@solidjs/router';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      class="shrink-0 px-8 flex items-center justify-center text-sm"
      style={{
        height: 'var(--footer-height)',
        'background-color': 'var(--item-normal-bg-alpha)',
        color: 'var(--text-color-placeholder)',
      }}
    >
      <p>
        Copyright 2023-{new Date().getFullYear()} Regex Generator powered by AI models -{' '}
        <A href="/policy" class="underline hover:text-gray-900">
          Privacy Policy
        </A>{' '}
        -{' '}
        <A href="/terms-of-service" class="underline hover:text-gray-900">
          Terms of Service
        </A>
      </p>
    </footer>
  );
}
