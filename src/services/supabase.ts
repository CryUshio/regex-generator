import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // persistSession: false, // All our access is from server, so no need to persist the session to browser's local storage
  },
});

export const setSession = async () => {
  await supabase.auth.setSession({
    access_token:
      'eyJhbGciOiJIUzI1NiIsImtpZCI6IjJPNGwxVktvUFZnQ1BPWWkiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEyNjc4MjU0LCJpYXQiOjE3MTI2NzQ2NTQsImlzcyI6Imh0dHBzOi8vZHhkcnhuenBhdXdsZmtoY3Z1ZWkuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImRiZDE5NzU4LTkxOWItNDllNS1hMjA2LWY0OThlYWQ1ZGE4MSIsImVtYWlsIjoiaGNoMTE1MTI5MTE4MkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiLCJ0d2l0dGVyIl19LCJ1c2VyX21ldGFkYXRhIjp7ImF2YXRhcl91cmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLdE1QaE9WMWpZNzhvSTJfNTJmTjJGNXFpWjdsQ0JzWDNrOU4zVS05cHdudFVqOF9VPXM5Ni1jIiwiZW1haWwiOiJoY2gxMTUxMjkxMTgyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiJVc2hpbyBTaGl6dWt1IiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwibmFtZSI6IlVzaGlvIFNoaXp1a3UiLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLdE1QaE9WMWpZNzhvSTJfNTJmTjJGNXFpWjdsQ0JzWDNrOU4zVS05cHdudFVqOF9VPXM5Ni1jIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiVXNoaW9TaGl6dWt1IiwicHJvdmlkZXJfaWQiOiIxMDcyOTU3MzYyNTkzMjI3MDMwOTYiLCJzdWIiOiIxMDcyOTU3MzYyNTkzMjI3MDMwOTYiLCJ1c2VyX25hbWUiOiJVc2hpb1NoaXp1a3UifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTcxMjY3NDY1NH1dLCJzZXNzaW9uX2lkIjoiYTkxZjJlZjMtOThhMS00ZTFiLWJmNDctMjJjMGY5MzI5OTBmIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.PDNUeL0j2eEVKqil4GJcOkfYMKGwHmFzSrINuOlp0pE',
    refresh_token: 'OZtYhreEU2hfF6_MN8cRIQ',
  });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  console.info('skr: session', session, error);

  return session;
};

export default supabase;
