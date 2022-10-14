import { c as useSupabaseClient, v as useSubdomain, t as useSubdomainProfile, f as useAsyncData } from "../server.mjs";
import { defineComponent, resolveComponent, unref, useSSRContext } from "vue";
import "vue-router";
import "destr";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "ohmyfetch";
import "ufo";
import "#internal/nitro";
import "hookable";
import "unctx";
import "h3";
import "defu";
import "@vue/shared";
import "@tiptap/vue-3";
import "@tiptap/core";
import "@tiptap/extension-text";
import "@tiptap/extension-heading";
import "prosemirror-state";
import "prosemirror-view";
import "@tiptap/extension-focus";
import "@tiptap/extension-history";
import "@tiptap/starter-kit";
import "@tiptap/extension-underline";
import "@tiptap/extension-image";
import "@tiptap/suggestion";
import "tippy.js";
import "@tiptap/extension-code";
import "@tiptap/extension-code-block";
import "@tiptap/extension-code-block-lowlight";
import "lowlight";
import "highlight.js/lib/languages/css";
import "highlight.js/lib/languages/javascript";
import "highlight.js/lib/languages/typescript";
import "highlight.js/lib/languages/xml";
import "linkifyjs";
import "@vueuse/integrations/useFocusTrap";
import "events";
import "debug";
import "util";
import "crypto";
import "url";
import "bufferutil";
import "buffer";
import "utf-8-validate";
import "http";
import "https";
import "typedarray-to-buffer";
import "yaeti";
import "cookie-es";
import "ohash";
import "prosemirror-utils";
import "prosemirror-model";
import "prosemirror-transform";
import "@vueform/multiselect";
import "string-strip-html";
import "slugify";
import "date-fns";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[siteId]",
  __ssrInlineRender: true,
  setup(__props) {
    const client = useSupabaseClient();
    const subdomain = useSubdomain();
    const profile = useSubdomainProfile();
    useAsyncData("profile", async () => {
      const { data, error } = await client.from("profiles").select("*").or(`username.eq.${subdomain.value}, subdomain.eq.${subdomain.value}`).maybeSingle();
      profile.value = data;
      return data;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = resolveComponent("NuxtPage");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(profile)) {
        _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      } else {
        _push(`<div class="text-4xl my-20 font-bold text-center">Page not found</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/[siteId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_siteId_.a6c6f82c.js.map
