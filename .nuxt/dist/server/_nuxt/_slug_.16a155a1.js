import { c as useSupabaseClient, i as useRoute, f as useAsyncData, s as constructUrl, p as __nuxt_component_3, a as __nuxt_component_0, g as __nuxt_component_1 } from "../server.mjs";
import { defineComponent, computed, unref, withCtx, createVNode, useSSRContext } from "vue";
import "vue-router";
import "destr";
import { u as useUrl } from "./url.b4db8f0f.js";
import { u as useCustomHead } from "./head.1997bdc2.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { format } from "date-fns";
import { stripHtml } from "string-strip-html";
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
import "slugify";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const client = useSupabaseClient();
    const { params } = useRoute();
    const url = useUrl();
    const { data, pending } = useAsyncData(`posts-${params.slug}`, async () => {
      const { data: data2 } = await client.from("posts").select("*, profiles(avatar_url, name, username)").eq("slug", params.slug).single();
      return data2;
    });
    useCustomHead(
      computed(() => {
        var _a;
        return (_a = data.value) == null ? void 0 : _a.title;
      }),
      computed(() => {
        var _a, _b, _c, _d;
        return ((_a = data.value) == null ? void 0 : _a.body) ? (_d = (_c = stripHtml((_b = data.value) == null ? void 0 : _b.body)) == null ? void 0 : _c.result) == null ? void 0 : _d.slice(0, 160) : void 0;
      }),
      computed(() => {
        var _a, _b;
        return ((_a = data.value) == null ? void 0 : _a.cover_img) === "" ? `${url}/og/${params.slug}` : (_b = data.value) == null ? void 0 : _b.cover_img;
      })
    );
    const fullUrl = computed(() => constructUrl(data.value, false));
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtImg = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Loader = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (!unref(pending) && unref(data)) {
        _push(`<article class="prose mx-auto w-full"><div class="not-prose flex items-center pt-8 pb-4">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          class: "w-12 h-12 rounded-full mr-4",
          src: unref(data).profiles.avatar_url
        }, null, _parent));
        _push(`<div><h3 class="text-lg">${ssrInterpolate((_a = unref(data).profiles) == null ? void 0 : _a.name)}</h3><h4 class="text-sm text-gray-400">${ssrInterpolate(unref(format)(new Date(unref(data).created_at), "MMMM d"))}</h4></div></div><h1>${ssrInterpolate(unref(data).title)}</h1>`);
        if (unref(data).cover_img) {
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: unref(data).cover_img,
            class: "my-8 w-full h-auto"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div>${unref(data).body}</div><hr><div class="not-prose mt-2 flex items-center space-x-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "px-1 text-2xl text-gray-300 focus:text-dark-300 hover:text-dark-300 transition",
          to: `https://twitter.com/intent/tweet?url=${unref(fullUrl)}&text=Check%20out%20this%20new%20post`,
          target: "_blank"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="i-mdi-twitter"${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { class: "i-mdi-twitter" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "px-1 text-2xl text-gray-300 focus:text-dark-300 hover:text-dark-300 transition",
          to: `https://www.facebook.com/sharer/sharer.php?u=${unref(fullUrl)}`,
          target: "_blank"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="i-mdi-facebook"${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { class: "i-mdi-facebook" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "px-1 text-2xl text-gray-300 focus:text-dark-300 hover:text-dark-300 transition",
          to: `https://www.linkedin.com/shareArticle?mini=true&url=${unref(fullUrl)}`,
          target: "_blank"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="i-mdi-linkedin"${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { class: "i-mdi-linkedin" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></article>`);
      } else {
        _push(ssrRenderComponent(_component_Loader, null, null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/[siteId]/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_slug_.16a155a1.js.map
