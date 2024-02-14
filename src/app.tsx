// @refresh reload
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start';
import { Suspense } from 'solid-js';
import Nav from '~/components/Nav';
import './app.css';

export default function App() {
  return (
    <div class="h-screen" style={{ 'min-width': '768px' }}>
      <Router
        root={(props) => (
          <>
            <Nav />
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </div>
  );
}
