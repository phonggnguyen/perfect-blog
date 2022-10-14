import { i as useRoute } from '../server.mjs';
import { defineComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'destr';
import 'h3';
import 'defu';
import '@vue/shared';
import '@tiptap/vue-3';
import '@tiptap/core';
import '@tiptap/extension-text';
import '@tiptap/extension-heading';
import 'prosemirror-state';
import 'prosemirror-view';
import '@tiptap/extension-focus';
import '@tiptap/extension-history';
import '@tiptap/starter-kit';
import '@tiptap/extension-underline';
import '@tiptap/extension-image';
import '@tiptap/suggestion';
import 'tippy.js';
import '@tiptap/extension-code';
import '@tiptap/extension-code-block';
import '@tiptap/extension-code-block-lowlight';
import 'lowlight';
import 'highlight.js/lib/languages/css';
import 'highlight.js/lib/languages/javascript';
import 'highlight.js/lib/languages/typescript';
import 'highlight.js/lib/languages/xml';
import 'linkifyjs';
import '@vueuse/integrations/useFocusTrap';
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
import 'prosemirror-utils';
import 'prosemirror-model';
import 'prosemirror-transform';
import 'string-strip-html';
import 'date-fns';
import '../../nitro/vercel.mjs';
import 'node-fetch-native/polyfill';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'node:url';
import 'ipx';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    const { params } = useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>Home for user ${ssrInterpolate(unref(params).slug)}</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/[siteId]/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=home.f624a73a.mjs.map
