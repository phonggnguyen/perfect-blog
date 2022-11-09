import { _ as __nuxt_component_0$2 } from '../server.mjs';
import { u as useProfile } from './dashboard.3448fb77.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { format } from 'date-fns';
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
import './index.de9279c0.mjs';
import './functions.0aa32198.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "posts",
  __ssrInlineRender: true,
  setup(__props) {
    const profile = useProfile();
    console.log("profile", profile.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><ul><!--[-->`);
      ssrRenderList(unref(profile).posts, (post) => {
        _push(`<li class="my-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/edit/${post.id}`,
          class: "block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="p-4 rounded-2xl bg-white shadow-none focus:shadow-lg hover:shadow-lg transition"${_scopeId}><h2 class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(post.title)}</h2><span class="text-sm text-gray-400"${_scopeId}>${ssrInterpolate(unref(format)(new Date(post.created_at), "MMM d"))}</span></div>`);
            } else {
              return [
                createVNode("div", { class: "p-4 rounded-2xl bg-white shadow-none focus:shadow-lg hover:shadow-lg transition" }, [
                  createVNode("h2", { class: "text-lg font-semibold" }, toDisplayString(post.title), 1),
                  createVNode("span", { class: "text-sm text-gray-400" }, toDisplayString(unref(format)(new Date(post.created_at), "MMM d")), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/posts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=posts.adf8ae62.mjs.map
