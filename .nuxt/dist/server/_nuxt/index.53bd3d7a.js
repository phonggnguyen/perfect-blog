import { c as useSupabaseClient, f as useAsyncData, d as useMagicKeys, a as __nuxt_component_0, p as __nuxt_component_3, g as __nuxt_component_1, q as _sfc_main$1 } from "../server.mjs";
import { u as useCustomHead } from "./head.1997bdc2.js";
import { defineComponent, ref, watch, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from "vue";
import "vue-router";
import "destr";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
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
import "string-strip-html";
import "slugify";
import "date-fns";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useCustomHead("Experience keyboard-first blogging platform");
    const client = useSupabaseClient();
    const { data, pending } = useAsyncData(
      "posts",
      async () => {
        const { data: data2 } = await client.from("posts").select("*, profiles(avatar_url, name, username, domains (url, active) )").eq("active", true).order("created_at", { ascending: false });
        return data2;
      },
      { lazy: true }
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
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_3;
      const _component_Loader = __nuxt_component_1;
      const _component_PostCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pb-20" }, _attrs))}><div class="relative my-20 md:my-30 text-center"><div class="z-100"><h1 class="text-4xl md:text-6xl font-bold"> Keyboard-first <br> Blogging Platform </h1><h2 class="mt-8 text-xl md:text-3xl font-semibold text-gray-300"> KeyPress let you write your blog <br> with only keyboard </h2><div class="mt-12 flex flex-col items-center justify-center">`);
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
      _push(`<span class="text-sm mt-2 text-gray-300">or &#39;Tab&#39; to Navigate</span></div></div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "https://github.com/zernonia/keypress",
        target: "_blank",
        class: "w-full relative block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtImg, {
              style: { "object-position": "0 20%" },
              class: "w-full h-60 md:h-80 object-cover rounded-2xl",
              src: "https://images.unsplash.com/photo-1665049420194-8f562db50cbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
              alt: ""
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="absolute left-4 md:left-1/2 top-8 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:text-3xl font-semibold flex flex-wrap items-center"${_scopeId}><div class="i-mdi-github mr-2"${_scopeId}></div> Nuxt 3 + Supabase + Vercel </h3>`);
          } else {
            return [
              createVNode(_component_NuxtImg, {
                style: { "object-position": "0 20%" },
                class: "w-full h-60 md:h-80 object-cover rounded-2xl",
                src: "https://images.unsplash.com/photo-1665049420194-8f562db50cbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
                alt: ""
              }),
              createVNode("h3", { class: "absolute left-4 md:left-1/2 top-8 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:text-3xl font-semibold flex flex-wrap items-center" }, [
                createVNode("div", { class: "i-mdi-github mr-2" }),
                createTextVNode(" Nuxt 3 + Supabase + Vercel ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h2 class="mt-20 text-4xl font-bold">Posts</h2>`);
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index.53bd3d7a.js.map
