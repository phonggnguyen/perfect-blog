import { H as Head, T as Title } from './components.9fcb8527.mjs';
import { b as useSupabaseClient, _ as __nuxt_component_0$2 } from '../server.mjs';
import { _ as __nuxt_component_1 } from './Loader.99f1410e.mjs';
import { _ as _sfc_main$1 } from './Card.be52aa2f.mjs';
import { defineComponent, ref, watch, withCtx, createTextVNode, createVNode, unref, useSSRContext } from 'vue';
import { u as useAsyncData } from './asyncData.b47cc6d5.mjs';
import { u as useMagicKeys } from './index.de9279c0.mjs';
import { ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
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
import './nuxt-img.7c2aee1d.mjs';
import 'string-strip-html';
import 'date-fns';
import './functions.0aa32198.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const client = useSupabaseClient();
    const { data, pending } = useAsyncData(
      "posts",
      async () => {
        const { data: data2 } = await client.from("posts").select("*, profiles(avatar_url, name, username, domains (url, active) )").eq("active", true).order("created_at", { ascending: false });
        return data2;
      },
      { lazy: true, server: false }
    );
    const writeEl = ref();
    const { Slash } = useMagicKeys();
    watch(Slash, (n) => {
      if (n && writeEl.value) {
        writeEl.value.$el.focus();
        setTimeout(() => {
          writeEl.value.$el.click();
        }, 300);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_Loader = __nuxt_component_1;
      const _component_PostCard = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Title, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Experience keyboard-first blogging platform `);
                } else {
                  return [
                    createTextVNode(" Experience keyboard-first blogging platform ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Title, null, {
                default: withCtx(() => [
                  createTextVNode(" Experience keyboard-first blogging platform ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pb-20"><div class="relative my-20 md:my-30 text-center"><div class="z-100"><h1 class="text-4xl md:text-6xl font-bold"> Keyboard-first <br> Blogging Platform </h1><h2 class="mt-8 text-xl md:text-3xl font-semibold text-gray-300"> KeyPress let you write your blog <br> with only keyboard </h2><div class="mt-12 flex flex-col items-center justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        ref_key: "writeEl",
        ref: writeEl,
        class: "btn-primary text-xl",
        to: "/write"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Press &#39;/&#39; to write`);
          } else {
            return [
              createTextVNode("Press '/' to write")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="text-sm mt-2 text-gray-300">or &#39;Tab&#39; to Navigate</span></div></div></div><h2 class="mt-20 text-4xl font-bold">Posts</h2>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_Loader, null, null, _parent));
      } else {
        _push(`<ul class="mt-4"><!--[-->`);
        ssrRenderList(unref(data), (post) => {
          _push(`<li>`);
          _push(ssrRenderComponent(_component_PostCard, { post }, null, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.51ea7668.mjs.map
