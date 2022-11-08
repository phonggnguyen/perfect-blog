import { c as useSupabaseClient, f as useAsyncData, g as __nuxt_component_1, q as _sfc_main$1 } from "../server.mjs";
import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import "vue-router";
import "destr";
import { u as useCustomHead } from "./head.1997bdc2.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
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
  __name: "posts",
  __ssrInlineRender: true,
  setup(__props) {
    const client = useSupabaseClient();
    const { data, pending } = useAsyncData("posts", async () => {
      const { data: data2 } = await client.from("posts").select("*, profiles(avatar_url, name,username, domains (url, active))").eq("active", true).order("created_at", { ascending: false });
      console.log("data", data2);
      return data2;
    });
    const { data: tags } = useAsyncData("tags", async () => {
      const { data: data2 } = await client.from("tags_view").select("*");
      return data2;
    });
    useCustomHead("Explore all posts");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Loader = __nuxt_component_1;
      const _component_PostCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-12" }, _attrs))}><h1 class="text-4xl font-semibold">Posts</h1><div class="flex flex-col-reverse md:flex-row"><div class="w-full">`);
      if (unref(pending)) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_Loader, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<ul><!--[-->`);
        ssrRenderList(unref(data), (post) => {
          _push(`<li class="my-4">`);
          _push(ssrRenderComponent(_component_PostCard, { post }, null, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      }
      _push(`</div><aside class="md:ml-6 md:w-60 mt-3 flex-shrink-0"><h5 class="text-xl font-medium">Tags</h5><ul class="mt-4 p-4 bg-light-600 rounded-xl flex flex-col space-y-2"><!--[-->`);
      ssrRenderList(unref(tags), (tag) => {
        _push(`<li class="flex justify-between items-center"><div class="text-sm">${ssrInterpolate(tag.name)}</div><div class="text-xs px-1 py-0.5 flex items-center bg-gray-200 font-medium rounded">${ssrInterpolate(tag.count)}</div></li>`);
      });
      _push(`<!--]--></ul></aside></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/posts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=posts.76d94c10.js.map
