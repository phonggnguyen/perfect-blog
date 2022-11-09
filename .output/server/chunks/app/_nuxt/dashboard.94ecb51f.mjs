import { u as useState, a as useSupabaseUser, b as useSupabaseClient } from '../server.mjs';
import { ref } from 'vue';
import { u as useMagicKeys } from './index.769825b9.mjs';
import { r as removeVietnameseTones } from './functions.0aa32198.mjs';

const useProfile = () => useState("profile", () => null);
const useProfileSave = (payload) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();
  const isSaving = ref(false);
  const save = async () => {
    var _a, _b, _c, _d;
    isSaving.value = true;
    console.log("save profile settings", payload.value);
    console.log("save profile user", user.value);
    const isFacebook = ((_a = user.value) == null ? void 0 : _a.app_metadata.provider) === "facebook";
    console.log({ isFacebook });
    if (isFacebook) {
      payload.value.avatar_url = (_b = user.value) == null ? void 0 : _b.user_metadata.avatar_url;
      payload.value.username = removeVietnameseTones((_c = user.value) == null ? void 0 : _c.user_metadata.name).replaceAll(" ", "").toLowerCase();
    }
    const { data } = await client.from("profiles").upsert({ ...payload.value, id: (_d = user.value) == null ? void 0 : _d.id }).single();
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

export { useProfileSave as a, useProfile as u };
//# sourceMappingURL=dashboard.94ecb51f.mjs.map
