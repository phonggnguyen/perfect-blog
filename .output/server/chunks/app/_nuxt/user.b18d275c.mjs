import { a as useSupabaseUser, _ as __nuxt_component_0$2 } from '../server.mjs';
import { _ as __nuxt_component_1 } from './Logo.0cc12086.mjs';
import { _ as _sfc_main$2 } from './Command.a0882455.mjs';
import { _ as __nuxt_component_3 } from './nuxt-img.b323c92f.mjs';
import { u as useUrl } from './url.221072b4.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, createVNode, unref, createTextVNode } from 'vue';
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
import '@vueuse/integrations/useFuse';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const url = useUrl();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_Logo = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-screen-lg mx-auto" }, _attrs))}><footer class="mt-12 py-6 border-t-2 border-light-700 flex flex-col sm:flex-row justify-between"><div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "flex items-center font-bold text-xl text-dark-300",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Logo, { class: "w-auto h-10 mr-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Logo, { class: "w-auto h-10 mr-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-4 sm:mt-0 flex text-sm sm:text-base space-x-6"><ul><h5 class="pr-10 mb-4 font-semibold text-dark-50">Menu</h5><li class="py-0.5">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "text-gray-400 hover:text-dark-300 transition",
        to: `${unref(url)}/write`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Write`);
          } else {
            return [
              createTextVNode("Write")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="py-0.5">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "text-gray-400 hover:text-dark-300 transition",
        to: `${unref(url)}/posts`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`All Posts`);
          } else {
            return [
              createTextVNode("All Posts")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="py-0.5">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "text-gray-400 hover:text-dark-300 transition",
        to: `${unref(url)}/login`
      }, {
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
      _push(`</li></ul><ul><h5 class="pr-10 mb-4 font-semibold text-dark-50">Open Source</h5><li class="py-0.5">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "text-gray-400 hover:text-dark-300 transition",
        to: "https://github.com/phonggnguyen/perfect-blog",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`GitHub`);
          } else {
            return [
              createTextVNode("GitHub")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></footer></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "user",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_Logo = __nuxt_component_1;
      const _component_Command = _sfc_main$2;
      const _component_NuxtImg = __nuxt_component_3;
      const _component_Footer = _sfc_main$1;
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
        _push(ssrRenderComponent(_component_NuxtLink, {
          rel: "noopener",
          to: `https://meetoon.co/login`
        }, {
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
      _push(`</div></div></nav><div class="min-h-screen">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/user.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=user.b18d275c.mjs.map
