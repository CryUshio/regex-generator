import { RequestMiddleware } from '@solidjs/start/middleware';
import { getSession } from '~/lib/session';

/** Not support async middleware */
export default ((event) => {
  // getSession();
  // const url = new URL(event.request.url);
  // if (!session && /^api/.test(url.pathname)) {
  //   return { code: 401 };
  // }
  // return session;
}) satisfies RequestMiddleware;
