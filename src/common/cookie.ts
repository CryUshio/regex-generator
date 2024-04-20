import { Session } from '@supabase/supabase-js';
import cookie from 'cookie';
import supabase from '~/services/supabase';

export const ACCESS_TOKEN = 'access_token';

export const REFRESH_TOKEN = 'refresh_token';

const REFRESH_TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60;

/** Automatically set and clear cookies for browser */
export const syncToCookie = (onChange?: (session: Session | null) => void) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((ev, session) => {
    console.info('skr: ev', ev, session, location, import.meta.env.PROD);
    onChange?.(session);

    const options: cookie.CookieSerializeOptions = {
      domain: import.meta.env.PROD ? import.meta.env.VITE_SITE_DOMAIN : 'localhost',
      secure: import.meta.env.PROD,
      sameSite: 'lax',
    };

    if (session) {
      document.cookie = cookie.serialize(ACCESS_TOKEN, session.access_token, {
        ...options,
        maxAge: session.expires_in,
      });
      document.cookie = cookie.serialize(REFRESH_TOKEN, session.refresh_token, {
        ...options,
        maxAge: REFRESH_TOKEN_EXPIRE_TIME,
      });
    } else {
      document.cookie = cookie.serialize(ACCESS_TOKEN, '', {
        ...options,
        maxAge: 0,
      });
      document.cookie = cookie.serialize(REFRESH_TOKEN, '', {
        ...options,
        maxAge: 0,
      });
    }
  });

  return () => subscription.unsubscribe();
};
