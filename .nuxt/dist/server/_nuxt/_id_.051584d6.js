import { b as useSupabaseUser, c as useSupabaseClient, i as useRoute, j as useLocalStorage, d as useMagicKeys, f as useAsyncData, n as navigateTo, g as __nuxt_component_1, _ as _sfc_main$1, k as _sfc_main$2, l as _sfc_main$3, m as _sfc_main$4, o as _sfc_main$5 } from "../server.mjs";
import { defineComponent, ref, withAsyncContext, unref, withCtx, createTextVNode, createVNode, isRef, useSSRContext } from "vue";
import "vue-router";
import "destr";
import { u as useCustomHead } from "./head.63eff9af.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { stripHtml } from "string-strip-html";
import slugify from "slugify";
import "ohmyfetch";
import "ufo";
import "#internal/nitro";
import "hookable";
import "unctx";
import "h3";
import "defu";
import "@vue/shared";
import "@tiptap/vue-3";
import "@tiptap/core";
import "@tiptap/extension-text";
import "@tiptap/extension-heading";
import "prosemirror-state";
import "prosemirror-view";
import "@tiptap/extension-focus";
import "@tiptap/extension-history";
import "@tiptap/starter-kit";
import "@tiptap/extension-underline";
import "@tiptap/extension-image";
import "@tiptap/suggestion";
import "tippy.js";
import "@tiptap/extension-code";
import "@tiptap/extension-code-block";
import "@tiptap/extension-code-block-lowlight";
import "lowlight";
import "highlight.js/lib/languages/css";
import "highlight.js/lib/languages/javascript";
import "highlight.js/lib/languages/typescript";
import "highlight.js/lib/languages/xml";
import "linkifyjs";
import "@vueuse/integrations/useFocusTrap";
import "events";
import "debug";
import "util";
import "crypto";
import "url";
import "bufferutil";
import "buffer";
import "utf-8-validate";
import "http";
import "https";
import "typedarray-to-buffer";
import "yaeti";
import "cookie-es";
import "ohash";
import "prosemirror-utils";
import "prosemirror-model";
import "prosemirror-transform";
import "@vueform/multiselect";
import "date-fns";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const user = useSupabaseUser();
    const client = useSupabaseClient();
    const { params } = useRoute();
    const postId = ref(params.id);
    const title = postId.value ? ref("") : useLocalStorage("new-post-title", "");
    const body = postId.value ? ref("") : useLocalStorage("new-post-body", "");
    const settings = ref({
      image: "",
      active: false,
      tags: []
    });
    const isSaving = ref(false);
    const isLoginVisible = ref(false);
    const save = async () => {
      var _a, _b;
      if (!title.value || !stripHtml(body.value).result || isSaving.value)
        return;
      if (!((_a = user.value) == null ? void 0 : _a.id)) {
        isLoginVisible.value = true;
        return;
      }
      isSaving.value = true;
      const { data, error } = await client.from("posts").upsert({
        id: (_b = postId.value) == null ? void 0 : _b.toString(),
        slug: slugify(title.value, { lower: true }),
        title: title.value,
        body: body.value,
        author_id: user.value.id,
        active: settings.value.active,
        cover_img: settings.value.image,
        tags: settings.value.tags
      }).single();
      console.log({ data });
      if (data) {
        if (!postId.value) {
          postId.value = data.id;
          localStorage.removeItem("new-post-title");
          localStorage.removeItem("new-post-body");
          navigateTo(`/edit/${postId.value}`);
        }
      }
      isSaving.value = false;
    };
    useMagicKeys({
      passive: false,
      onEventFired(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "s" && e.type === "keydown") {
          e.preventDefault();
          save();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "e" && e.type === "keydown") {
          isDrawerOpen.value = !isDrawerOpen.value;
        }
      }
    });
    const { pending } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      `post-${postId.value}`,
      async () => {
        var _a, _b, _c;
        if (!postId.value)
          throw Error("no id found");
        const { data } = await client.from("posts").select("*").eq("id", postId.value).single();
        title.value = data.title;
        body.value = data.body;
        settings.value = {
          image: (_a = data.cover_img) != null ? _a : "",
          active: (_b = data.active) != null ? _b : false,
          tags: (_c = data.tags) != null ? _c : []
        };
        return data;
      },
      { server: false, lazy: true }
    )), __temp = await __temp, __restore(), __temp);
    const isDrawerOpen = ref(false);
    useCustomHead("Write your post");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Loader = __nuxt_component_1;
      const _component_Button = _sfc_main$1;
      const _component_TiptapHeading = _sfc_main$2;
      const _component_Tiptap = _sfc_main$3;
      const _component_DrawerEditPost = _sfc_main$4;
      const _component_ModalLogin = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_Loader, null, null, _parent));
      } else {
        _push(`<div class="flex flex-col mt-8"><div class="flex justify-end prose mx-auto w-full"><button${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} class="btn-plain mr-6"> Settings <span class="ml-2">\u2318E</span></button>`);
        _push(ssrRenderComponent(_component_Button, {
          loading: isSaving.value,
          class: "btn-primary",
          onClick: save
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
        _push(`</div><div class="md:p-2 prose mx-auto w-full" spellcheck="false">`);
        _push(ssrRenderComponent(_component_TiptapHeading, {
          modelValue: unref(title),
          "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null
        }, null, _parent));
        _push(ssrRenderComponent(_component_Tiptap, {
          editable: "",
          modelValue: unref(body),
          "onUpdate:modelValue": ($event) => isRef(body) ? body.value = $event : null
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_DrawerEditPost, {
          show: isDrawerOpen.value,
          "onUpdate:show": ($event) => isDrawerOpen.value = $event,
          settings: settings.value
        }, null, _parent));
        _push(`<div id="modal"></div>`);
        _push(ssrRenderComponent(_component_ModalLogin, {
          show: isLoginVisible.value,
          "onUpdate:show": ($event) => isLoginVisible.value = $event
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_.051584d6.js.map
