import { H as Head, T as Title } from './components.9fcb8527.mjs';
import { _ as __nuxt_component_1 } from './Loader.99f1410e.mjs';
import { _ as _sfc_main$1 } from './Card.be52aa2f.mjs';
import { b as useSupabaseClient } from '../server.mjs';
import { defineComponent, withCtx, createTextVNode, createVNode, unref, useSSRContext } from 'vue';
import { u as useAsyncData } from './asyncData.b47cc6d5.mjs';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import './Logo.0cc12086.mjs';
import './_plugin-vue_export-helper.a1a6add7.mjs';
import './nuxt-img.7c2aee1d.mjs';
import 'string-strip-html';
import 'date-fns';
import './functions.0aa32198.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "posts",
  __ssrInlineRender: true,
  setup(__props) {
    const client = useSupabaseClient();
    const { data, pending } = useAsyncData("posts", async () => {
      const { data: data2 } = await client.from("posts").select("*, profiles(avatar_url, name,username, domains (url, active))").eq("active", true).order("created_at", { ascending: false });
      return data2;
    });
    const { data: tags } = useAsyncData("tags", async () => {
      const { data: data2 } = await client.from("tags_view").select("*");
      return data2;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_Loader = __nuxt_component_1;
      const _component_PostCard = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Title, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Explore all posts `);
                } else {
                  return [
                    createTextVNode(" Explore all posts ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Title, null, {
                default: withCtx(() => [
                  createTextVNode(" Explore all posts ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="my-12"><h1 class="text-4xl font-semibold">Posts</h1><div class="flex flex-col-reverse md:flex-row"><div class="w-full">`);
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
      _push(`<!--]--></ul></aside></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/posts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=posts.4e6d9e7c.mjs.map
