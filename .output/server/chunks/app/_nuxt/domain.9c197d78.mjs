import { _ as _sfc_main$1 } from './Button.03c55e24.mjs';
import { _ as __nuxt_component_0$2 } from '../server.mjs';
import { u as useProfile, a as useProfileSave } from './dashboard.3448fb77.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "domain",
  __ssrInlineRender: true,
  setup(__props) {
    const profile = useProfile();
    const payload = ref({ subdomain: profile.value.subdomain });
    const isSaving = ref(false);
    const { save } = useProfileSave(payload);
    const saveDomain = async () => {
      try {
        isSaving.value = true;
        const data = await $fetch("/api/add-domain", {
          method: "POST",
          body: {
            domain: payload.value.subdomain
          }
        });
        console.log(data);
        await Promise.all([save(), checkDomain()]);
      } catch (err) {
        console.log(err);
      } finally {
        isSaving.value = false;
      }
    };
    const isCheckingDomain = ref(false);
    const isValid = ref(false);
    const checkDomain = async () => {
      isCheckingDomain.value = true;
      const { valid } = await $fetch("/api/check-domain", {
        method: "POST",
        body: {
          domain: payload.value.subdomain
        }
      });
      isValid.value = valid;
      isCheckingDomain.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="flex w-full justify-end">`);
      _push(ssrRenderComponent(_component_Button, {
        loading: isSaving.value,
        onClick: saveDomain,
        class: "mb-8 btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Save <span class="ml-2"${_scopeId}>\u2318S</span>`);
          } else {
            return [
              createTextVNode("Save "),
              createVNode("span", { class: "ml-2" }, "\u2318S")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center"><label for="domain" class="flex-shrink-0 mr-2">Domain :</label><input type="text" name="domain" id="domain" class="bg-white"${ssrRenderAttr("value", payload.value.subdomain)} placeholder="https://foo.bar.com"></div>`);
      if (!isValid.value && payload.value.subdomain) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_Button, {
          loading: isCheckingDomain.value,
          class: "btn-plain mt-12",
          onClick: checkDomain
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Check domain`);
            } else {
              return [
                createTextVNode("Check domain")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="mt-4 bg-white p-6 rounded-2xl"><p>Set the following record on your DNS provider to continue:</p><div class="mt-6 flex items-center space-x-6"><div class="flex-shrink-0 justify-start"><p>Type</p><p>CNAME</p></div><div class="flex-shrink-0"><p>Name</p><p>${ssrInterpolate(payload.value.subdomain.split(".")[0])}</p></div><div class="flex-grow"><p>Value</p><p>cname.vercel-dns.com</p></div></div><div class="mt-4 text-sm text-gray-400"> Depending on your provider, it might take some time for the changes to apply. `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          target: "_blank",
          to: "https://vercel.com/guides/why-is-my-vercel-domain-unverified"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Learn More`);
            } else {
              return [
                createTextVNode("Learn More")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/domain.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=domain.9c197d78.mjs.map
