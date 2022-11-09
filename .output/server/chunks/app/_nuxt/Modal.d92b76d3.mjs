import { defineComponent, ref, watch, nextTick, mergeProps, useSSRContext } from 'vue';
import { o as onKeyStroke, d as onClickOutside } from './index.769825b9.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  __ssrInlineRender: true,
  props: { open: Boolean, confirmAction: Function, innerClass: String },
  emits: ["update:open"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const el = ref();
    const { activate, deactivate } = useFocusTrap(el, { immediate: true });
    onKeyStroke("Escape", () => emits("update:open", false));
    onClickOutside(el, () => {
      emits("update:open", !props.open);
    });
    watch(
      () => props.open,
      (n) => nextTick(() => n ? activate() : deactivate())
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.open) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 w-screen h-screen z-300 flex items-center justify-center" }, _attrs))}><div class="${ssrRenderClass([__props.innerClass, "inner w-full mx-4 max-w-112 bg-white rounded-2xl shadow-xl overflow-hidden"])}">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`Content`);
        }, _push, _parent);
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Modal.d92b76d3.mjs.map
