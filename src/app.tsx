// @refresh reload
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start';
import { Suspense } from 'solid-js';
import Footer from './components/Footer';
import Nav from '~/components/Nav';
import './app.less';

export default function App() {
  return (
    <div class="h-screen" style={{ 'min-width': '768px' }}>
      <Router
        root={(props) => (
          <div class="flex flex-col h-full">
            <Nav />
            <div class="grow flex flex-col overflow-auto">
              <div class="grow">
                <Suspense>{props.children}</Suspense>
              </div>
              <Footer />
            </div>
          </div>
        )}
      >
        <FileRoutes />
      </Router>
    </div>
  );
}
