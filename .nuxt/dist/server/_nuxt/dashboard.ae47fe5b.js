import { u as useState, b as useSupabaseUser, c as useSupabaseClient, d as useMagicKeys, r as removeVietnameseTones } from "../server.mjs";
import { ref } from "vue";
import "vue-router";
import "destr";
const useProfile = () => useState("profile", () => null);
const useProfileSave = (payload) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();
  const isSaving = ref(false);
  const save = async () => {
    var _a;
    isSaving.value = true;
    console.log("save profile settings", payload.value);
    console.log("save profile user", user.value);
    const isFacebook = user.value.app_metadata.provider === "facebook";
    console.log({ isFacebook });
    if (isFacebook) {
      payload.value.avatar_url = user.value.user_metadata.avatar_url;
      payload.value.username = removeVietnameseTones(user.value.user_metadata.name).replaceAll(" ", "").toLowerCase();
    }
    const { data } = await client.from("profiles").upsert({ ...payload.value, id: (_a = user.value) == null ? void 0 : _a.id }).single();
    console.log({ data });
    isSaving.value = false;
  };
  useMagicKeys({
    passive: false,
    onEventFired(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && e.type === "keydown") {
        e.preventDefault();
        save();
      }
    }
  });
  return {
    save,
    isSaving
  };
};
export {
  useProfileSave as a,
  useProfile as u
};
//# sourceMappingURL=dashboard.ae47fe5b.js.map
