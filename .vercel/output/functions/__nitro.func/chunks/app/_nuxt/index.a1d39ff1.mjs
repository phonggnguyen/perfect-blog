import { c as useSupabaseClient, t as useSubdomainProfile, f as useAsyncData, q as _sfc_main$2, g as __nuxt_component_1 } from '../server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { u as useCustomHead } from './head.63eff9af.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'destr';
import 'h3';
import 'defu';
import '@vue/shared';
import '@tiptap/vue-3';
import '@tiptap/core';
import '@tiptap/extension-text';
import '@tiptap/extension-heading';
import 'prosemirror-state';
import 'prosemirror-view';
import '@tiptap/extension-focus';
import '@tiptap/extension-history';
import '@tiptap/starter-kit';
import '@tiptap/extension-underline';
import '@tiptap/extension-image';
import '@tiptap/suggestion';
import 'tippy.js';
import '@tiptap/extension-code';
import '@tiptap/extension-code-block';
import '@tiptap/extension-code-block-lowlight';
import 'lowlight';
import 'highlight.js/lib/languages/css';
import 'highlight.js/lib/languages/javascript';
import 'highlight.js/lib/languages/typescript';
import 'highlight.js/lib/languages/xml';
import 'linkifyjs';
import '@vueuse/integrations/useFocusTrap';
import 'events';
import 'unenv/runtime/npm/debug';
import 'util';
import 'crypto';
import 'url';
import 'bufferutil';
import 'buffer';
import 'utf-8-validate';
import 'http';
import 'https';
import 'typedarray-to-buffer';
import 'yaeti';
import 'cookie-es';
import 'ohash';
import 'prosemirror-utils';
import 'prosemirror-model';
import 'prosemirror-transform';
import 'string-strip-html';
import 'date-fns';
import '../../nitro/vercel.mjs';
import 'node-fetch-native/polyfill';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'node:url';
import 'ipx';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const client = useSupabaseClient();
    const profile = useSubdomainProfile();
    const { data, pending } = useAsyncData("posts", async () => {
      const { data: data2, error } = await client.from("posts").select("*, profiles!inner (username)").eq("active", true).eq("profiles.id", profile.value.id).order("created_at", { ascending: false });
      return data2;
    });
    useCustomHead(computed(() => {
      var _a;
      return `${(_a = profile.value) == null ? void 0 : _a.name}'s blog`;
    }));
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_PostCard = _sfc_main$2;
      const _component_Loader = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-20" }, _attrs))}><h1 class="text-4xl font-semibold">${ssrInterpolate((_a = unref(profile)) == null ? void 0 : _a.name)}&#39;s posts</h1><div>`);
      if (unref(data)) {
        _push(`<ul><!--[-->`);
        ssrRenderList(unref(data), (post) => {
          _push(`<li class="my-4">`);
          if (post.id) {
            _push(ssrRenderComponent(_component_PostCard, {
              subdomain: "",
              post
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_Loader, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/[siteId]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.a1d39ff1.mjs.map
