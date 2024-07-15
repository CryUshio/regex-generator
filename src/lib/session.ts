import { AuthSessionMissingError } from '@supabase/supabase-js';
import cookie from 'cookie';
import { getRequestEvent } from 'solid-js/web';
import supabase from '~/services/supabase';

export const getSession = async () => {
  const ev = getRequestEvent();
  const cookies = cookie.parse(ev?.request.headers.get('cookie') || '') as Partial<{
    access_token: string;
    refresh_token: string;
  }>;

  if (!cookies.access_token || !cookies.refresh_token) {
    return null;
  }

  await supabase.auth.setSession({
    access_token: cookies.access_token,
    refresh_token: cookies.refresh_token,
  });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    return null;
  }

  console.info('skr: session resolved', session?.expires_in);

  return session;
};

export const getSessionWithValidation = async () => {
  const session = await getSession();

  if (!session) {
    throw new AuthSessionMissingError();
  }

  return session;
};
