import { useSupabaseClient } from "../composables/useSupabaseClient.mjs";
import { useSupabaseUser } from "../composables/useSupabaseUser.mjs";
import { useSupabaseToken } from "../composables/useSupabaseToken.mjs";
import { defineNuxtPlugin } from "#imports";
export default defineNuxtPlugin(async (nuxtApp) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();
  if (!user.value) {
    const token = useSupabaseToken();
    if (token.value) {
      const { user: supabaseUser, error } = await client.auth.api.getUser(token.value);
      if (error) {
        token.value = null;
        user.value = null;
      } else {
        user.value = supabaseUser;
      }
    }
  }
  nuxtApp.hooks.hook("app:mounted", () => {
    client.auth.onAuthStateChange(async (event, session) => {
      await setServerSession(event, session);
      user.value = client.auth.user();
    });
  });
});
function setServerSession(event, session) {
  return $fetch("/api/_supabase/session", {
    method: "POST",
    body: { event, session }
  });
}
