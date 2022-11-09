import { _ as __nuxt_component_0$2 } from '../server.mjs';
import { _ as __nuxt_component_3 } from './nuxt-img.7c2aee1d.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { stripHtml } from 'string-strip-html';
import { format } from 'date-fns';
import { c as constructUrl } from './functions.0aa32198.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    subdomain: Boolean,
    post: Object
  },
  setup(__props) {
    const props = __props;
    const url = computed(() => constructUrl(props.post, props.subdomain));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_NuxtImg = __nuxt_component_3;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        class: "group block",
        to: unref(url)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="p-4 md:p-6 my-4 flex flex-col-reverse md:flex-row bg-white shadow-none group-focus:shadow-xl group-focus:shadow-xl hover:shadow-xl shadow-gray-200 rounded-2xl transition-all cursor-pointer"${_scopeId}><div class="w-full flex flex-col justify-between md:h-40"${_scopeId}><div${_scopeId}>`);
            if (!__props.subdomain) {
              _push2(`<div class="flex items-center space-x-2"${_scopeId}>`);
              if (__props.post.profiles.avatar_url) {
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  class: "w-5 h-5 rounded-full",
                  src: (_a = __props.post.profiles) == null ? void 0 : _a.avatar_url
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<h4 class="text-sm font-medium"${_scopeId}>${ssrInterpolate(__props.post.profiles.name)}</h4></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h1 class="mt-2 font-semibold text-2xl"${_scopeId}>${ssrInterpolate(__props.post.title)}</h1><p class="mt-1 text-gray-400"${_scopeId}>${ssrInterpolate(unref(stripHtml)(__props.post.body).result.slice(0, 120))}...</p></div><div class="mt-4 text-sm text-gray-400 place-items-end"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(format)(new Date(__props.post.created_at), "MMM d"))}</span>`);
            if (__props.post.tags.length > 0) {
              _push2(`<span class="ml-2 bg-light-300 px-2 py-1 rounded"${_scopeId}>${ssrInterpolate((_b = __props.post.tags) == null ? void 0 : _b[0])}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.post.cover_img) {
              _push2(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full md:w-40 h-40 md:ml-12 mb-6 md:mb-0 rounded-xl flex-shrink-0",
                src: __props.post.cover_img
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 md:p-6 my-4 flex flex-col-reverse md:flex-row bg-white shadow-none group-focus:shadow-xl group-focus:shadow-xl hover:shadow-xl shadow-gray-200 rounded-2xl transition-all cursor-pointer" }, [
                createVNode("div", { class: "w-full flex flex-col justify-between md:h-40" }, [
                  createVNode("div", null, [
                    !__props.subdomain ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center space-x-2"
                    }, [
                      __props.post.profiles.avatar_url ? (openBlock(), createBlock(_component_NuxtImg, {
                        key: 0,
                        class: "w-5 h-5 rounded-full",
                        src: (_c = __props.post.profiles) == null ? void 0 : _c.avatar_url
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("h4", { class: "text-sm font-medium" }, toDisplayString(__props.post.profiles.name), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("h1", { class: "mt-2 font-semibold text-2xl" }, toDisplayString(__props.post.title), 1),
                    createVNode("p", { class: "mt-1 text-gray-400" }, toDisplayString(unref(stripHtml)(__props.post.body).result.slice(0, 120)) + "...", 1)
                  ]),
                  createVNode("div", { class: "mt-4 text-sm text-gray-400 place-items-end" }, [
                    createVNode("span", null, toDisplayString(unref(format)(new Date(__props.post.created_at), "MMM d")), 1),
                    __props.post.tags.length > 0 ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "ml-2 bg-light-300 px-2 py-1 rounded"
                    }, toDisplayString((_d = __props.post.tags) == null ? void 0 : _d[0]), 1)) : createCommentVNode("", true)
                  ])
                ]),
                __props.post.cover_img ? (openBlock(), createBlock(_component_NuxtImg, {
                  key: 0,
                  class: "w-full md:w-40 h-40 md:ml-12 mb-6 md:mb-0 rounded-xl flex-shrink-0",
                  src: __props.post.cover_img
                }, null, 8, ["src"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Post/Card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Card.be52aa2f.mjs.map
