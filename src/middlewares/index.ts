import { createMiddleware } from '@solidjs/start/middleware';
import auth from './auth';

export default createMiddleware({
  onRequest: [auth],
});
