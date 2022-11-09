import { a as useSupabaseUser, _ as __nuxt_component_0$2 } from '../server.mjs';
import { _ as __nuxt_component_1 } from './Logo.0cc12086.mjs';
import { _ as _sfc_main$1 } from './Command.a0882455.mjs';
import { _ as __nuxt_component_3 } from './nuxt-img.b323c92f.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
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
import './_plugin-vue_export-helper.a1a6add7.mjs';
import './Modal.d92b76d3.mjs';
import './index.769825b9.mjs';
import '@vueuse/integrations/useFocusTrap';
import './url.221072b4.mjs';
import '@vueuse/integrations/useFuse';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_Logo = __nuxt_component_1;
      const _component_Command = _sfc_main$1;
      const _component_NuxtImg = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 bg-light-300 min-h-screen w-full flex flex-col" }, _attrs))}><div class="max-w-screen-lg mx-auto w-full"><nav class="flex justify-between items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Logo, { class: "w-12 h-12" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Logo, { class: "w-12 h-12" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center">`);
      _push(ssrRenderComponent(_component_Command, { class: "mr-4" }, null, _parent));
      if (!unref(user)) {
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Login`);
            } else {
              return [
                createTextVNode("Login")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div>`);
      if ((_b = (_a = unref(user)) == null ? void 0 : _a.user_metadata) == null ? void 0 : _b.avatar_url) {
        _push(ssrRenderComponent(_component_NuxtImg, {
          class: "w-10 h-10 rounded-full",
          src: (_d = (_c = unref(user)) == null ? void 0 : _c.user_metadata) == null ? void 0 : _d.avatar_url,
          alt: (_f = (_e = unref(user)) == null ? void 0 : _e.user_metadata) == null ? void 0 : _f.full_name
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></nav>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default.0935073d.mjs.map
