import { _ as _sfc_main$1 } from './Button.03c55e24.mjs';
import { u as useProfile, a as useProfileSave } from './dashboard.94ecb51f.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import '../server.mjs';
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
import './index.769825b9.mjs';
import './functions.0aa32198.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const profile = useProfile();
    const payload = ref({ name: profile.value.name });
    const { save, isSaving } = useProfileSave(payload);
    const saveProfile = async () => {
      save();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="flex w-full justify-end">`);
      _push(ssrRenderComponent(_component_Button, {
        loading: unref(isSaving),
        onClick: saveProfile,
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
      _push(`</div><div class="flex items-center"><label for="name" class="flex-shrink-0 mr-2">Name :</label><input type="text" name="name" id="name" class="bg-white"${ssrRenderAttr("value", payload.value.name)}></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile.792dea87.mjs.map
