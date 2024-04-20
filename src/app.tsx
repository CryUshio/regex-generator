import './polyfill/promise-with-resolvers';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start';
import { Suspense, onCleanup, onMount } from 'solid-js';
import Footer from './components/Footer';
import { Context, initialValue } from './context';
import { syncToCookie } from './common/cookie';
import Nav from '~/components/Nav';
import './app.less';

export default function App() {
  /** createResource has bug when hydrating */
  onMount(() => {
    const disposer = syncToCookie((session) => initialValue.setStore({ session, sessionInitialized: true }));

    onCleanup(() => disposer());
  });

  return (
    <div class="h-screen min-w-[768px]">
      <Router
        root={(props) => (
          <Context.Provider value={initialValue}>
            <>
              <Nav class="fixed top-0 inset-x-0" />
              <div class="grow flex flex-col min-h-full" style={{ 'padding-top': 'var(--header-height)' }}>
                <div class="grow">
                  <Suspense>{props.children}</Suspense>
                </div>
                <Footer />
              </div>
            </>
          </Context.Provider>
        )}
      >
        <FileRoutes />
      </Router>
    </div>
  );
}
