import { a as useSupabaseUser, b as useSupabaseClient, _ as __nuxt_component_0$2, f as __nuxt_component_0 } from '../server.mjs';
import { _ as __nuxt_component_1 } from './Loader.99f1410e.mjs';
import { u as useProfile } from './dashboard.3448fb77.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { u as useAsyncData } from './asyncData.b47cc6d5.mjs';
import { u as useCustomHead } from './head.57e126bf.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import 'ohmyfetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import 'vue-router';
import 'defu';
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
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import './Logo.0cc12086.mjs';
import './_plugin-vue_export-helper.a1a6add7.mjs';
import './index.de9279c0.mjs';
import './functions.0aa32198.mjs';

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
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_Loader = __nuxt_component_1;
      const _component_NuxtPage = __nuxt_component_0;
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
//# sourceMappingURL=dashboard.990e3b26.mjs.map
