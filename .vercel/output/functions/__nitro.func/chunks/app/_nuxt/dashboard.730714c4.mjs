import { b as useSupabaseUser, c as useSupabaseClient, f as useAsyncData, a as __nuxt_component_0$1, g as __nuxt_component_1 } from '../server.mjs';
import { u as useProfile } from './dashboard.c15009c5.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { u as useCustomHead } from './head.63eff9af.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    const client = useSupabaseClient();
    const profile = useProfile();
    const { pending } = useAsyncData(
      "profile",
      async () => {
        var _a;
        const { data } = await client.from("profiles").select("*, domains(url, active), posts(id, title, created_at)").order("created_at", { ascending: false, foreignTable: "posts" }).eq("id", (_a = user.value) == null ? void 0 : _a.id).maybeSingle();
        profile.value = data;
        return data;
      },
      { server: false }
    );
    useCustomHead("Dashboard");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Loader = __nuxt_component_1;
      const _component_NuxtPage = resolveComponent("NuxtPage");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-12" }, _attrs))}><h2 class="text-3xl font-bold">Dashboard</h2><div class="flex"><aside class="flex-shrink-0 w-72 my-8"><ul><li class="my-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/posts" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Posts`);
          } else {
            return [
              createTextVNode("Posts")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="my-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/profile" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Profile`);
          } else {
            return [
              createTextVNode("Profile")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="my-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/domain" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Domain`);
          } else {
            return [
              createTextVNode("Domain")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></aside>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_Loader, null, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard.730714c4.mjs.map
