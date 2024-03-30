// @refresh reload
import './polyfill/promise-with-resolvers';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start';
import { Suspense, onMount } from 'solid-js';
import Footer from './components/Footer';
import Nav from '~/components/Nav';
import './app.less';

export default function App() {
  return (
    <div class="h-screen" style={{ 'min-width': '768px' }}>
      <Router
        root={(props) => (
          <>
            <Nav class="fixed top-0 inset-x-0" />
            <div class="grow flex flex-col min-h-full" style={{ 'padding-top': 'var(--header-height)' }}>
              <div class="grow">
                <Suspense>{props.children}</Suspense>
              </div>
              <Footer />
            </div>
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </div>
  );
}
