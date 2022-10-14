import { serverSupabaseClient } from "../services/serverSupabaseClient.mjs";
export const serverSupabaseUser = async (event) => {
  const client = serverSupabaseClient(event);
  if (!event.context._token) {
    return null;
  }
  const { user: supabaseUser, error } = await client.auth.api.getUser(event.context._token);
  event.context._user = error ? null : supabaseUser;
  return event.context._user;
};
