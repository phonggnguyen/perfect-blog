import { b as useSupabaseClient, q as useSubdomain, o as useSubdomainProfile, s as set, f as __nuxt_component_0 } from '../server.mjs';
import { defineComponent, unref, useSSRContext } from 'vue';
import { u as useAsyncData } from './asyncData.fd5e9436.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[siteId]",
  __ssrInlineRender: true,
  setup(__props) {
    const client = useSupabaseClient();
    const subdomain = useSubdomain();
    const profile = useSubdomainProfile();
    useAsyncData("profile", async () => {
      const { data, error } = await client.from("profiles").select("*").or(`username.eq.${subdomain.value}, subdomain.eq.${subdomain.value}`).maybeSingle();
      set(profile, data);
      return data;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(profile)) {
        _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      } else {
        _push(`<div class="text-4xl my-20 font-bold text-center">Page not found</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/[siteId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_siteId_.ff2cedef.mjs.map
