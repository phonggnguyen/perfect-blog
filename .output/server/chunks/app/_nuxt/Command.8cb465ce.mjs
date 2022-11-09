import { _ as _sfc_main$1 } from './Modal.f98003a6.mjs';
import { x as useRouter, a as useSupabaseUser, q as useSubdomain, u as useState } from '../server.mjs';
import { defineComponent, watch, computed, ref, unref, isRef, withCtx, createVNode, withDirectives, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { u as useUrl } from './url.221072b4.mjs';
import { u as useMagicKeys } from './index.de9279c0.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useFuse } from '@vueuse/integrations/useFuse';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Command",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const user = useSupabaseUser();
    const subdomain = useSubdomain();
    const url = useUrl();
    const keys = useMagicKeys();
    const CmdK = keys["Meta+K"];
    const Escape = keys["Escape"];
    const isVisible = useState("command-visible", () => false);
    watch(Escape, () => isVisible.value = false);
    watch(CmdK, (v) => {
      if (v) {
        isVisible.value = !isVisible.value;
      }
    });
    const navAction = (path) => {
      router.push(path);
      isVisible.value = false;
      searchTerm.value = "";
    };
    const navList = computed(
      () => {
        var _a, _b, _c, _d;
        return subdomain.value ? [
          { label: "Home", value: "home", action: () => navAction("/"), show: true },
          {
            label: "Write",
            value: "write",
            action: () => window.location.href = url + "/write",
            show: true
          },
          {
            label: "Login",
            value: "login",
            action: () => window.location.href = url + "/login",
            show: !((_a = user.value) == null ? void 0 : _a.id)
          },
          {
            label: "Dashboard",
            value: "dashboard",
            action: () => window.location.href = url + "/dashboard/posts",
            show: (_b = user.value) == null ? void 0 : _b.id
          },
          {
            label: "KeyPress",
            value: "keypress",
            action: () => window.location.href = url,
            show: true
          }
        ] : [
          { label: "Home", value: "home", action: () => navAction("/"), show: true },
          { label: "Write", value: "write", action: () => navAction("/write"), show: true },
          { label: "Posts", value: "posts", action: () => navAction("/posts"), show: true },
          { label: "Login", value: "login", action: () => navAction("/login"), show: !((_c = user.value) == null ? void 0 : _c.id) },
          { label: "Dashboard", value: "dashboard", action: () => navAction("/dashboard/posts"), show: (_d = user.value) == null ? void 0 : _d.id }
        ];
      }
    );
    const searchTerm = ref("");
    const { results } = useFuse(
      searchTerm,
      navList.value.filter((i) => i.show),
      {
        fuseOptions: {
          keys: ["label"]
        },
        matchAllWhenSearchEmpty: true
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><button class="btn-plain">\u2318K</button>`);
      _push(ssrRenderComponent(_component_Modal, {
        class: "!items-start",
        "inner-class": "!max-w-screen-sm rounded-xl mt-48",
        open: unref(isVisible),
        "onUpdate:open": ($event) => isRef(isVisible) ? isVisible.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="p-2"${_scopeId}><div${_scopeId}><input type="text" class="not-default p-2 w-full focus-visible:outline-none text-sm"${ssrRenderAttr("value", searchTerm.value)} placeholder="Search for commands..."${_scopeId}></div><div class="py-6"${_scopeId}>`);
            if ((_a = unref(results)) == null ? void 0 : _a.length) {
              _push2(`<ul${_scopeId}><div class="text-xs p-2"${_scopeId}>Navigation</div><!--[-->`);
              ssrRenderList(unref(results), ({ item }) => {
                _push2(`<li${_scopeId}><button class="not-default outline-none bg-transparent focus-visible:bg-light-300 rounded-lg transition-all p-2 my-0.5 w-full text-left text-sm"${_scopeId}>${ssrInterpolate(item.label)}</button></li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<div class="p-8 text-sm text-center"${_scopeId}>No results found.</div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2" }, [
                createVNode("div", null, [
                  withDirectives(createVNode("input", {
                    type: "text",
                    class: "not-default p-2 w-full focus-visible:outline-none text-sm",
                    "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                    placeholder: "Search for commands..."
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, searchTerm.value]
                  ])
                ]),
                createVNode("div", { class: "py-6" }, [
                  ((_b = unref(results)) == null ? void 0 : _b.length) ? (openBlock(), createBlock("ul", { key: 0 }, [
                    createVNode("div", { class: "text-xs p-2" }, "Navigation"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(results), ({ item }) => {
                      return openBlock(), createBlock("li", null, [
                        createVNode("button", {
                          onClick: ($event) => item.action(),
                          class: "not-default outline-none bg-transparent focus-visible:bg-light-300 rounded-lg transition-all p-2 my-0.5 w-full text-left text-sm"
                        }, toDisplayString(item.label), 9, ["onClick"])
                      ]);
                    }), 256))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "p-8 text-sm text-center"
                  }, "No results found."))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Command.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Command.8cb465ce.mjs.map
