import { useSupabaseUser } from "../composables/useSupabaseUser.mjs";
import { useSupabaseClient } from "../composables/useSupabaseClient.mjs";
import { useSupabaseToken } from "../composables/useSupabaseToken.mjs";
import { defineNuxtPlugin } from "#imports";
export default defineNuxtPlugin(async () => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();
  const token = useSupabaseToken();
  if (!token.value) {
    return;
  }
  const { user: supabaseUser, error } = await client.auth.api.getUser(token.value);
  if (error) {
    token.value = null;
    user.value = null;
  } else {
    user.value = supabaseUser;
  }
});
