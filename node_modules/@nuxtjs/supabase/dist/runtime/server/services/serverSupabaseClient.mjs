import { createClient } from "@supabase/supabase-js";
import { useCookie } from "h3";
import { useRuntimeConfig } from "#imports";
export const serverSupabaseClient = (event) => {
  const { supabase: { url, key, client: clientOptions, cookies: cookieOptions } } = useRuntimeConfig().public;
  if (!event.context._supabaseClient) {
    const supabaseClient = createClient(url, key, clientOptions);
    const token = useCookie(event, `${cookieOptions.name}-access-token`);
    supabaseClient.auth.setAuth(token);
    event.context._supabaseClient = supabaseClient;
    event.context._token = token;
  }
  return event.context._supabaseClient;
};
