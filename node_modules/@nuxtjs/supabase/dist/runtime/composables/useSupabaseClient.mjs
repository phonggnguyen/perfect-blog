import { createClient } from "@supabase/supabase-js";
import { useSupabaseToken } from "./useSupabaseToken.mjs";
import { useRuntimeConfig, useNuxtApp } from "#imports";
export const useSupabaseClient = () => {
  const nuxtApp = useNuxtApp();
  const token = useSupabaseToken();
  const { supabase: { url, key, client: options } } = useRuntimeConfig().public;
  if (!nuxtApp._supabaseClient) {
    nuxtApp._supabaseClient = createClient(url, key, options);
    if (nuxtApp.ssrContext) {
      nuxtApp._supabaseClient.auth.setAuth(token.value);
    }
  }
  return nuxtApp._supabaseClient;
};
