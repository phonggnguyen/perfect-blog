import { _ as __nuxt_component_1$1 } from './Logo.0cc12086.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper.a1a6add7.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Logo = __nuxt_component_1$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-20 flex flex-col justify-center w-full items-center" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Logo, { class: "w-12 h-12 animate-spin animate-duration-1500 animate-ease-in-out" }, null, _parent));
  _push(`<div class="mt-12 font-medium text-gray-400 flex"><p class="mr-2">Tips:</p><p>\u2318 + K to search for commands</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Loader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=Loader.99f1410e.mjs.map
