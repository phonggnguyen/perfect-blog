import { _ as _sfc_main$1 } from './Card.be52aa2f.mjs';
import { _ as __nuxt_component_1 } from './Loader.99f1410e.mjs';
import { b as useSupabaseClient, o as useSubdomainProfile } from '../server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { u as useAsyncData } from './asyncData.b47cc6d5.mjs';
import { u as useCustomHead } from './head.57e126bf.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import './nuxt-img.7c2aee1d.mjs';
import 'string-strip-html';
import 'date-fns';
import './functions.0aa32198.mjs';
import './Logo.0cc12086.mjs';
import './_plugin-vue_export-helper.a1a6add7.mjs';
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
      const _component_PostCard = _sfc_main$1;
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
//# sourceMappingURL=index.8048aeab.mjs.map
